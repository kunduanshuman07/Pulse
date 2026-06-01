from orchestrator.pipeline import AnalysisPipeline

from schemas.analysis_schema import AnalysisResult
from schemas.project_schema import ProjectContext


class AnalysisEngine:
    def __init__(self):
        self.pipeline = AnalysisPipeline()

    def analyze(
        self,
        context: ProjectContext,
    ) -> AnalysisResult:
        agent_results = self.pipeline.run(context)

        weights = {
            "Audience Agent": 0.30,
            "Trend Agent": 0.25,
            "Competitor Agent": 0.25,
            "Virality Agent": 0.20,
        }

        overall_score = int(
            sum(
                result.score * weights[result.agent_type]
                for result in agent_results
            )
        )

        high_score_agents = [
            result.agent_type
            for result in agent_results
            if result.score >= 85
        ]

        summary = (
            "The project demonstrates strong potential in "
            f"{', '.join(high_score_agents)} with favorable "
            "market alignment and growth indicators."
        )

        return AnalysisResult(
            overall_score=overall_score,
            summary=summary,
            agents=agent_results,
        )