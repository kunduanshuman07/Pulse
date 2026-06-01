from pydantic import BaseModel
from typing import List


class AgentResult(BaseModel):
    agent_type: str
    score: int
    summary: str
    insights: List[str]
    risks: List[str]
    execution_logs: List[str]