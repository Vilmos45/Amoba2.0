from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse, RedirectResponse
from pydantic import BaseModel  
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

origins = [
    "http://127.0.0.1:8000",  # Frontend URL-je
    "http://127.0.0.1:8000"  # FastAPI server URL-je
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# Item adatmodellje
class Item(BaseModel):
    name: str
    description: str = None

# Kezdőlap (Home.html) kiszolgálása
@app.get("/", response_class=HTMLResponse)
async def get_home():
    try:
        with open("static/Home.html", "r") as f:
            return HTMLResponse(content=f.read(), status_code=200)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading Home.html: {str(e)}")

# Dinamikusan generált Item adat
@app.get("/item/{item_id}", response_class=HTMLResponse)
async def read_item(item_id: int):
    return {"item_id": item_id, "message": "Item found"}

# Új Item létrehozása
@app.post("/item/")
def create_item(item: Item):
    return {"name": item.name, "description": item.description}

# Kezdőlap átirányítása
@app.get("/redirect_home", response_class=RedirectResponse)
async def redirect_home():
    return RedirectResponse(url="/static/Home.html")

# Kereséses query paraméter átirányítása
@app.get("/redirect_home_with_query", response_class=RedirectResponse)
async def redirect_home_with_query(query: str):
    return RedirectResponse(url=f"/static/Home.html?query={query}")

# FastAPI szerver indítása
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
