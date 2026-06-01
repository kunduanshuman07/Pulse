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

from prompts.competitor_prompt import (
    build_competitor_prompt,
)


class CompetitorAgent:
    def __init__(self):
        self.llm_service = (
            StructuredLLMService()
        )

    def run(
        self,
        context: ProjectContext,
    ) -> AgentResult:
        description = (
            context.description.lower()
        )

        industry = (
            context.industry.lower()
        )

        modifiers = []

        execution_logs = [
            "Scanning competitive ecosystem",
            "Evaluating market saturation",
            "Analyzing positioning opportunities",
            "Generating AI competitor intelligence",
        ]

        if "ai" in description:
            modifiers.append(8)

        if "saas" in industry:
            modifiers.append(5)

        if "automation" in description:
            modifiers.append(6)

        score = (
            ScoringService.calculate_score(
                72,
                modifiers,
            )
        )

        prompt = (
            build_competitor_prompt(
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
                "Competitor Agent",

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