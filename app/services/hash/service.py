import bcrypt


class HashService:
    def __init__(self):
        self.salt = bcrypt.gensalt()

    def hash_password(self, password: str) -> str:
        return bcrypt.hashpw(password.encode("utf-8"), self.salt).decode("utf-8")

    def check_password(self, password: str, hashed_password: str) -> bool:
        return bcrypt.checkpw(password.encode("utf-8"), hashed_password.encode("utf-8"))


hash_service = HashService()
