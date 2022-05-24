from beanie import Document
from fastapi.security import HTTPBasicCredentials
from pydantic import BaseModel, EmailStr, constr


class UserDataDB(Document):
    fullname: str
    email: EmailStr
    is_super_admin: bool
    hashed_password: str
    note: str


    class Collection:
        name = "user"

    class Config:
        schema_extra = {
            "example": {
                "fullname": "Anmol Garg",
                "email": "anmol@test.com",
                "password": "qwerty1234"
            }
        }


class UserSignIn(HTTPBasicCredentials):
    class Config:
        schema_extra = {
            "example": {
                "username": "anmol@test.com",
                "password": "qwerty1234"
            }
        }

class User(BaseModel):
    fullname: constr(min_length=1)
    email: EmailStr
    password: constr(min_length=1)


    class Config:
        schema_extra = {
            "example": {
                "fullname": "Anmol Garg",
                "email": "anmol@test.com",
                "password": "qwerty1234"
            }
        }

class UserData(BaseModel):
    fullname: str
    email: EmailStr
    is_super_admin: bool

    class Config:
        schema_extra = {
            "example": {
                "fullname": "Anmol Garg",
                "email": "qwerty1234",
                "is_super_admin": False
            }
        }
