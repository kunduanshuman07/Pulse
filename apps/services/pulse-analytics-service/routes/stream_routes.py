import json

from fastapi import (
    APIRouter,
)

from fastapi.responses import (
    StreamingResponse,
)

from schemas.project_schema import (
    ProjectContext,
)

from services.analysis_stream_orchestrator import (
    AnalysisStreamOrchestrator,
)

router = APIRouter()

orchestrator = (
    AnalysisStreamOrchestrator()
)


@router.get(
    "/stream-analysis"
)
async def stream_analysis():
    async def event_generator():
        context = (
            ProjectContext(
                title=
                    "Pulse AI",

                description=
                    (
                        "AI powered "
                        "market intelligence "
                        "platform"
                    ),

                industry=
                    "AI SaaS",

                target_market=
                    "Students",
            )
        )

        async for event in (
            orchestrator.execute(
                context
            )
        ):
            yield (
                f"data: "
                f"{json.dumps(event.dict())}\n\n"
            )

    return StreamingResponse(
        event_generator(),
        media_type=
            "text/event-stream",
    )