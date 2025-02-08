from routes.auth.models import LoginResponse


class LoginUser:
    def __init__(self, username: str, password: str):
        self.username = username
        self.password = password

    async def handle_request(self) -> LoginResponse:
        return LoginResponse(access_token="test token")
