from fastapi import FastAPI
from orchestrator.analysis_engine import AnalysisEngine
from schemas.project_schema import ProjectContext
from schemas.api_schema import AnalyzeProjectRequest
from routes.stream_routes import (
    router as stream_router,
)
from fastapi.middleware.cors import (
    CORSMiddleware,
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    stream_router
)


engine = AnalysisEngine()


@app.get("/health")
def health():
    return {
        "status": "healthy",
    }


@app.post("/analyze")
def analyze_project(
    payload: AnalyzeProjectRequest,
):
    context = ProjectContext(
        title=payload.title,
        description=payload.description,
        industry=payload.industry,
        target_market=payload.target_market,
    )

    result = engine.analyze(context)
    return result