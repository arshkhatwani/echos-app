import os


class Config:
    DB_CONFIG = os.getenv(
        "DB_CONFIG",
        "postgresql+asyncpg://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}".format(
            DB_USER=os.getenv("DB_USER", "root"),
            DB_PASSWORD=os.getenv("DB_PASSWORD", "1234"),
            DB_HOST=os.getenv("DB_HOST", "localhost:5432"),
            DB_NAME=os.getenv("DB_NAME", "echos"),
        ),
    )
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "secret")
    JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
    BASE_AI_MODEL = os.getenv("BASE_AI_MODEL", "deepseek-r1")


config = Config
