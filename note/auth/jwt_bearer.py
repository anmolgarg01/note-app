from fastapi import Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from .jwt_handler import decode_jwt
from models.user import UserDataDB


def verify_jwt(jwtoken: str):
    isTokenValid: bool = False

    payload = decode_jwt(jwtoken)
    if payload:
        isTokenValid = True
    else:
        return None

    current_user = UserDataDB.find_one(UserDataDB.email == payload.get("user_id"))
    if current_user:
        return current_user

    return None


class JWTBearer(HTTPBearer):

    def __init__(self, auto_error: bool = True):
        super(JWTBearer, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(JWTBearer, self).__call__(request)
        if credentials:
            if not credentials.scheme == "Bearer":
                return None

            current_user = verify_jwt(credentials.credentials)
            return current_user
        else:
            return None
