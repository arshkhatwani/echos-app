from fastapi import APIRouter
from routes.auth.controllers.login_user import LoginUser
from routes.auth.models import LoginResponse, UserBody

router = APIRouter(
    prefix="/auth",
    tags=["Auth"],
)


@router.post(
    "/login",
    description="Authenticates user and creates account if one does not exist",
    response_model=LoginResponse,
)
async def login(user_body: UserBody) -> LoginResponse:
    return await LoginUser(user_body).handle_request()
