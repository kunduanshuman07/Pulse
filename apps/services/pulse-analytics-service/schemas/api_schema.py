from pydantic import BaseModel


class AnalyzeProjectRequest(BaseModel):
    title: str
    description: str
    industry: str
    target_market: str