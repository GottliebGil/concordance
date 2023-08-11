import uvicorn
from fastapi import FastAPI

from routes import song_routes

app = FastAPI()

app.include_router(song_routes.router)

if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=8000)
