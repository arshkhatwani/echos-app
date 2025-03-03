from pydantic import BaseModel


class SearchUserResult(BaseModel):
    username: str
    user_id: str


class AddUserRequest(BaseModel):
    id: str


class SuccessResponse(BaseModel):
    message: str
