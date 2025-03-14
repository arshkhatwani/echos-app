from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm

from app.routes.auth.controllers.login_user import LoginUser
from app.routes.auth.controllers.get_user import GetUser
from app.routes.auth.models import LoginResponse, GetUserResponse
from app.services.jwt.service import get_user_id_from_token

router = APIRouter(
    prefix="/auth",
    tags=["Auth"],
)


@router.post(
    "/login",
    description="Authenticates user and creates account if one does not exist",
    response_model=LoginResponse,
)
async def login(user_body: OAuth2PasswordRequestForm = Depends()) -> LoginResponse:
    return await LoginUser(user_body).handle_request()


@router.get("/user", response_model=GetUserResponse)
async def get_user(user_id: str = Depends(get_user_id_from_token)) -> GetUserResponse:
    return await GetUser(user_id).handle_request()
