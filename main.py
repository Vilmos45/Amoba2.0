from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

origins = [
    "http://localhost",  
    "http://localhost:8000" 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


class Item(BaseModel):
    name: str
    description: str = None


@app.get("/", response_class=HTMLResponse)
async def get_home():
    try:
        with open("static/Home.html", "r") as f:
            return f.read()
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Home.html not found")


@app.post("/item/")
def create_item(item: Item):
    return {"name": item.name, "description": item.description}
