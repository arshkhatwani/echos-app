from pydantic import BaseModel


class SearchUserResult(BaseModel):
    username: str
    user_id: str


class AddUserRequest(BaseModel):
    id: str


class AddUserResponse(BaseModel):
    message: str
    user_id: str
    username: str
