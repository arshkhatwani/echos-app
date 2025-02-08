from fastapi import APIRouter
from routes.auth.controllers.login_user import LoginUser
from routes.auth.models import LoginResponse

router = APIRouter(
    prefix="/auth",
    tags=["Auth"],
)

@router.post('/login',
             description='Authenticates user and creates account if one does not exist',
            response_model=LoginResponse
)
async def login(username: str, password: str) -> LoginResponse:
    return await LoginUser(
        username=username,
        password=password
    ).handle_request()

