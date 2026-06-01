from pydantic import BaseModel


class ProjectContext(BaseModel):
    title: str

    description: str

    industry: str

    target_market: str

    language: str = "en"