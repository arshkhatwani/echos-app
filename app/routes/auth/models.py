from pydantic import BaseModel


class UserBody(BaseModel):
    username: str
    password: str


class LoginResponse(BaseModel):
    access_token: str
