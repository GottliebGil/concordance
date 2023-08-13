import uvicorn
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from routes import songs as songs_routes
from routes import groups as groups_routes
from routes import words as words_routes

app = FastAPI()

app.include_router(songs_routes.router, prefix="/api/songs")
app.include_router(groups_routes.router, prefix="/api/groups")
app.include_router(words_routes.router, prefix="/api/words")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


if __name__ == '__main__':
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
