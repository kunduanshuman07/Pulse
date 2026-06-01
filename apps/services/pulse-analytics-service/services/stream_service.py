import asyncio
import json

from schemas.stream_schema import (
    StreamEvent,
)


class StreamService:
    async def send_event(
        self,
        event: StreamEvent,
    ):
        payload = json.dumps(
            event.dict()
        )

        yield (
            f"data: {payload}\n\n"
        )

        await asyncio.sleep(
            0.5
        )