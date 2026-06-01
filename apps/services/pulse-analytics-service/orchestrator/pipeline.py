from agents.audience_agent import AudienceAgent
from agents.trend_agent import TrendAgent
from agents.competitor_agent import CompetitorAgent
from schemas.project_schema import ProjectContext
from agents.virality_agent import ViralityAgent

class AnalysisPipeline:
    def __init__(self):
        self.agents = [
            AudienceAgent(),
            TrendAgent(),
            CompetitorAgent(),
            ViralityAgent(),
        ]

    def run(self, context: ProjectContext):
        results = []

        for agent in self.agents:
            results.append(agent.run(context))

        return results