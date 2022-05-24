from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config.config import initiate_database
from routes.user import router as UserRouter
from routes.note import router as NoteRouter

app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def start_database():
    await initiate_database()


app.include_router(UserRouter, tags=["User"], prefix="/user")
app.include_router(NoteRouter, tags=["Note"], prefix="/note")
