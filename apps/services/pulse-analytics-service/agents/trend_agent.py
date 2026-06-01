from schemas.agent_schema import (
    AgentResult,
)

from schemas.project_schema import (
    ProjectContext,
)

from services.scoring_service import (
    ScoringService,
)

from services.structures_llm_service import (
    StructuredLLMService,
)

from prompts.trend_prompt import (
    build_trend_prompt,
)


class TrendAgent:
    def __init__(self):
        self.llm_service = (
            StructuredLLMService()
        )

    def run(
        self,
        context: ProjectContext,
    ) -> AgentResult:
        industry = (
            context.industry.lower()
        )

        description = (
            context.description.lower()
        )

        modifiers = []

        execution_logs = [
            "Scanning emerging market movements",
            "Evaluating AI sector momentum",
            "Analyzing industry growth acceleration",
            "Generating AI trend intelligence",
        ]

        if "ai" in description:
            modifiers.append(12)

        if "saas" in industry:
            modifiers.append(8)

        if "automation" in description:
            modifiers.append(6)

        score = (
            ScoringService.calculate_score(
                70,
                modifiers,
            )
        )

        prompt = (
            build_trend_prompt(
                context
            )
        )

        response = (
            self.llm_service.generate(
                prompt
            )
        )

        return AgentResult(
            agent_type=
                "Trend Agent",

            score=score,

            summary=response.get(
                "summary",
                "No summary generated",
            ),

            insights=response.get(
                "insights",
                [],
            ),

            risks=response.get(
                "risks",
                [],
            ),

            execution_logs=
                execution_logs,
        )