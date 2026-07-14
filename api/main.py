print(">>> LOADED THE CORRECT MAIN.PY <<<")

import random
import os

from fastapi import FastAPI
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
def random_track():
    files = [
        f for f in os.listdir(MUSIC_FOLDER)
        if f.endswith((".mp3",".wav",".ogg"))
    ]

    if not files:
        return {"error": "No music found"}

    song = random.choice(files)

    return {
        "name": os.path.splitext(song)[0],
        "url": f"http://127.0.0.1:8000/music/{song}"
    }

@app.get("/api/songs")
def get_songs():
    files = [
        f for f in os.listdir(MUSIC_FOLDER)
        if f.lower().endswith((".mp3", ".wav", ".ogg"))
    ]

    songs = []

    for song in files:
        songs.append({
            "name": os.path.splitext(song)[0],
            "url": f"http://127.0.0.1:8000/music/{song}"
        })

    return songs