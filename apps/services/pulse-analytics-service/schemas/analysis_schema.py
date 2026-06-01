from pydantic import BaseModel
from typing import List
from schemas.agent_schema import AgentResult

class AnalysisResult(BaseModel):
    overall_score: int
    summary: str
    agents: List[AgentResult]