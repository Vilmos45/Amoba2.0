from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse, RedirectResponse, FileResponse
from pydantic import BaseModel  
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
import logging

# Alapértelmezett naplózó beállítása
logging.basicConfig(level=logging.DEBUG)

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

# Engedélyezett CORS származási helyek
origins = [
    "http://127.0.0.1:8005",  # Frontend URL-je
    "http://127.0.0.1:8005"  # FastAPI server URL-je
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
        file_path = "static/Home.html"
        if not os.path.exists(file_path):
            logging.error(f"File not found: {file_path}")
            raise HTTPException(status_code=404, detail="Home.html not found")

        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
            logging.info(f"File {file_path} successfully read")
            return HTMLResponse(content=content, status_code=200)
    except Exception as e:
        logging.error(f"Error occurred: {str(e)}")  # A részletes hibaüzenet naplózása
        raise HTTPException(status_code=500, detail=f"Error reading Home.html: {str(e)}")


# Favicon ikon kezelés
@app.get("/favicon.ico", response_class=FileResponse)
async def favicon():
    try:
        return FileResponse("static/Icon.png")  # Ellenőrizd, hogy a fájl létezik-e
    except Exception as e:
        logging.error(f"Error loading Icon.png: {str(e)}")
        raise HTTPException(status_code=500, detail="Error loading Icon.png")

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

@app.get("/home_redirect", response_class=RedirectResponse)
async def home_redirect():
    return RedirectResponse(url="/")

# Kereséses query paraméter átirányítása
@app.get("/redirect_home_with_query", response_class=RedirectResponse)
async def redirect_home_with_query(query: str):
    return RedirectResponse(url=f"/static/Home.html?query={query}")


# FastAPI szerver indítása
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8005, reload=True, debug=True)
