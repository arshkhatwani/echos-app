from app.routes.auth.models import LoginResponse, UserBody


class LoginUser:
    def __init__(self, user_body: UserBody):
        self.user_body = user_body

    async def handle_request(self) -> LoginResponse:
        return LoginResponse(access_token="test token")
