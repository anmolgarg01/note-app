from fastapi import Body, APIRouter, HTTPException, Depends
from passlib.context import CryptContext

from auth.jwt_handler import sign_jwt
from database.database import add_user, get_user, update_user
from models.user import User, UserData, UserSignIn, UserDataDB
from models.note import Note
from auth.jwt_bearer import JWTBearer

router = APIRouter()
token_listener = JWTBearer(auto_error=False)

hash_helper = CryptContext(schemes=["bcrypt"])


@router.post("/login")
async def user_login(user_credentials: UserSignIn = Body(...)):
    user_exists = await get_user(user_credentials.username)
    if user_exists:
        password = hash_helper.verify(
            user_credentials.password, user_exists.hashed_password)
        if password:
            return sign_jwt(user_credentials.username)

    raise HTTPException(
        status_code=403,
        detail="Incorrect email or password"
    )


@router.post("", response_model=UserData)
async def user_signup(user: User,
                      req_current_user=Depends(token_listener)):

    if await UserDataDB.count() == 0:
        is_super_admin = True
    else:
        is_super_admin = False
        if req_current_user:
            current_user = await req_current_user
            if not current_user and not current_user.is_super_admin:
                raise HTTPException(
                    status_code=403,
                    detail="Permission denied"
                )
        else:
            raise HTTPException(
                status_code=403,
                detail="Permission denied"
            )

        user_exists = await get_user(user.email)
        if user_exists:
            raise HTTPException(
                status_code=409,
                detail="User with email supplied already exists"
            )


    hashed_password = hash_helper.encrypt(user.password)
    user_in_db = UserDataDB(**user.dict(), hashed_password=hashed_password,
                            is_super_admin = is_super_admin, note = "")

    new_user = await add_user(user_in_db)
    return new_user


@router.get("", response_model=UserData)
async def get_current_user(req_current_user=Depends(token_listener)):
    if req_current_user:
        current_user = await req_current_user
        if current_user:
            return current_user

    raise HTTPException(
        status_code=401,
        detail="Invalid token or expired token"
    )
