import jwt
from app.config import config


class JWTService:
    def __init__(self):
        self.secret_key = config.JWT_SECRET_KEY
        self.algorithm = config.JWT_ALGORITHM

    def encode(self, payload: dict) -> str:
        return jwt.encode(payload, self.secret_key, self.algorithm)

    def decode(self, token: str) -> dict:
        return jwt.decode(token, self.secret_key, algorithms=[self.algorithm])


jwt_service = JWTService()
