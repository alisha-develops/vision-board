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
    },
    {
        "theme": "lavender dream",
        "colors": ["#E8D5F5", "#C9A8E0", "#A67BC8", "#7B4F9E", "#4A2570"]
    },
    {
        "theme": "cherry blossom",
        "colors": ["#FFE4E6", "#FFADB5", "#FF7B8A", "#D94F5E", "#A3243A"]
    },
    {
        "theme": "mint fresh",
        "colors": ["#E0F5F1", "#A8E6DA", "#5CC8B8", "#2A9D8F", "#1A6B65"]
    },
    {
        "theme": "golden hour",
        "colors": ["#FFF3CD", "#FFD97D", "#EFA00B", "#C47A00", "#7A4A00"]
    },
    {
        "theme": "arctic",
        "colors": ["#EEF4F8", "#C5D9E8", "#8BB4D0", "#4A8FB5", "#1D5E82"]
    },
    {
        "theme": "rose gold",
        "colors": ["#FFF0F0", "#F4C2C2", "#E8A0A0", "#C97B7B", "#9E4A4A"]
    },
    {
        "theme": "midnight",
        "colors": ["#0D0D2B", "#1A1A4E", "#2D2D7A", "#4444A8", "#6B6BD4"]
    },
    {
        "theme": "autumn",
        "colors": ["#FF6B35", "#F7931E", "#FFD700", "#8B4513", "#2D1810"]
    },
    {
        "theme": "bubblegum",
        "colors": ["#FF9ECD", "#FFB3D9", "#FFC8E4", "#FFD4ED", "#FFE8F5"]
    },
    {
        "theme": "earthy",
        "colors": ["#8B6355", "#A07855", "#C4A882", "#DDD0B8", "#F5F0E8"]
    }
]


@app.get("/api/palette")
def get_palette():
    return random.choice(PALETTES)