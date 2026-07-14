print(">>> LOADED THE CORRECT MAIN.PY <<<")

import os
import random

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

MUSIC_FOLDER = "music"

app.mount("/music", StaticFiles(directory=MUSIC_FOLDER), name="music")


@app.get("/")
def home():
    return {"message": "alisha's music api!"}


@app.get("/api/random")
def random_track(request: Request):
    files = [
        f for f in os.listdir(MUSIC_FOLDER)
        if f.lower().endswith((".mp3", ".wav", ".ogg"))
    ]

    if not files:
        return {"error": "No music found"}

    song = random.choice(files)

    return {
        "name": os.path.splitext(song)[0],
        "url": str(request.base_url) + f"music/{song}"
    }


@app.get("/api/songs")
def get_songs(request: Request):
    files = [
        f for f in os.listdir(MUSIC_FOLDER)
        if f.lower().endswith((".mp3", ".wav", ".ogg"))
    ]

    return [
        {
            "name": os.path.splitext(song)[0],
            "url": str(request.base_url) + f"music/{song}"
        }
        for song in files
    ]


PALETTES = [
    {
        "theme": "vintage",
        "colors": ["#F3D3AE", "#D7B899", "#A67C52", "#664B2C", "#3E3024"]
    },
    {
        "theme": "forest",
        "colors": ["#6B8F71", "#A3B18A", "#DAD7CD", "#588157", "#3A5A40"]
    },
    {
        "theme": "sunset",
        "colors": ["#FFB5A7", "#FCD5CE", "#F8EDEB", "#F9DCC4", "#FEC89A"]
    },
    {
        "theme": "ocean",
        "colors": ["#A8DADC", "#457B9D", "#1D3557", "#F1FAEE", "#5FA8D3"]
    },
    {
        "theme": "coffee",
        "colors": ["#4B3621", "#8B5E3C", "#C4A484", "#E6D5B8", "#FFF8F0"]
    }
]


@app.get("/api/palette")
def get_palette():
    return random.choice(PALETTES)