from fastapi import FastAPI
from dotenv import load_dotenv

load_dotenv()
from orchestrator.analysis_engine import AnalysisEngine
from schemas.project_schema import ProjectContext
from schemas.api_schema import (
    AnalyzeProjectRequest,
    TranslateAnalysisRequest,
)
from schemas.analysis_schema import (
    AnalysisResult,
)
from services.localization_service import (
    LocalizationService,
)
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
localization_service = LocalizationService()


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
        language=payload.language or "en",
    )

    result = engine.analyze(context)
    return result


@app.post("/translate")
def translate_analysis(
    payload: TranslateAnalysisRequest,
):
    result = AnalysisResult(
        overall_score=payload.overall_score,
        summary=payload.summary,
        agents=payload.agents,
    )

    translated = (
        localization_service.translate_analysis(
            result,
            payload.target_language,
        )
    )

    return translated