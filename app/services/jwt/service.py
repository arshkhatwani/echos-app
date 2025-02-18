import jwt
from app.config import config
from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer

token_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


class JWTService:
    def __init__(self):
        self.secret_key = config.JWT_SECRET_KEY
        self.algorithm = config.JWT_ALGORITHM

    def encode_user_id(self, user_id: str) -> str:
        return jwt.encode({"user_id": user_id}, self.secret_key, self.algorithm)

    def decode_user_id(self, token: str) -> str:
        payload = jwt.decode(token, self.secret_key, algorithms=[self.algorithm])

        if not payload.get("user_id"):
            raise Exception("Invalid token")

        return payload.get("user_id")


jwt_service = JWTService()


def get_user_id_from_token(
    token: str = Depends(token_scheme),
) -> str:
    try:
        return jwt_service.decode_user_id(token)
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid authorization token")
