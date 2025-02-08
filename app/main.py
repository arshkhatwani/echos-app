from contextlib import asynccontextmanager
from fastapi import FastAPI

from config import config
from services.db.postgres.database import sessionmanager


def init_app(init_db=True):
    lifespan = None

    if init_db:
        sessionmanager.init(config.DB_CONFIG)

        @asynccontextmanager
        async def lifespan(app: FastAPI):
            yield
            if sessionmanager._engine is not None:
                await sessionmanager.close()

    server = FastAPI(title="FastAPI server", lifespan=lifespan)

    from routes.auth.routes import router as auth_router

    server.include_router(auth_router, prefix="/auth", tags=["Auth"])

    return server


app = init_app()
