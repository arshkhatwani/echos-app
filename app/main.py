from typing import Union

from fastapi import FastAPI
from routes.auth.routes import router as auth_router

app = FastAPI()


app.include_router(auth_router)
