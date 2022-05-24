from typing import List, Union

from beanie import PydanticObjectId

from models.user import User, UserDataDB


async def add_user(new_user: User) -> User:
    user = await new_user.create()
    return user


async def get_user(email: str) -> User:
    user = await UserDataDB.find_one(UserDataDB.email == email)
    return user


async def update_user(user: User, update_query: dict) -> User:
    await user.update(update_query)
    return user
