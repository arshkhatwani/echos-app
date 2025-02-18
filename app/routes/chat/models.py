from pydantic import BaseModel


class SearchUserResult(BaseModel):
    username: str
    user_id: str
