from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import config
from app.services.db.postgres.database import sessionmanager


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

    server.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    from app.routes.auth.routes import router as auth_router
    from app.routes.chat.routes import router as chat_router

    server.include_router(auth_router)
    server.include_router(chat_router)

    return server
