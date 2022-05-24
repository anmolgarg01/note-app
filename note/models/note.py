from pydantic import BaseModel


class Note(BaseModel):
    note: str

    class Config:
        schema_extra = {
            "example": {
                "note": "Note Text"
            }
        }
