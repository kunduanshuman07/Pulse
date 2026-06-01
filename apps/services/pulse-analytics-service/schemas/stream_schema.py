from pydantic import (
    BaseModel,
)


class StreamEvent(
    BaseModel,
):
    event: str

    agent: str

    message: str

    progress: int