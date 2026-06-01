from pydantic import BaseModel


class AnalyzeProjectRequest(BaseModel):
    title: str
    description: str
    industry: str
    target_market: str
    language: str = "en"


class TranslateAnalysisRequest(BaseModel):
    overall_score: int
    summary: str
    agents: list
    target_language: str = "hi"