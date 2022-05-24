from fastapi import Body, APIRouter, HTTPException, Depends

from database.database import update_user
from models.note import Note
from auth.jwt_bearer import JWTBearer

router = APIRouter()
token_listener = JWTBearer(auto_error=False)

@router.get("")
async def get_note(req_current_user=Depends(token_listener)):
    if req_current_user:
        current_user = await req_current_user
        if current_user:
            return current_user.note

    raise HTTPException(
        status_code=401,
        detail="Invalid token or expired token"
    )


@router.post("")
async def update_note(note: Note, req_current_user=Depends(token_listener)):
    if req_current_user:
        current_user = await req_current_user
        if current_user:
            update_query = {"$set": {
                "note": note.note
            }}
            current_user = await update_user(current_user, update_query)
            return current_user.note

    raise HTTPException(
        status_code=401,
        detail="Invalid token or expired token"
    )
