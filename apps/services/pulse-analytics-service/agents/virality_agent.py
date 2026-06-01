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

from prompts.virality_prompt import (
    build_virality_prompt,
)


class ViralityAgent:
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

        target_market = (
            context.target_market.lower()
        )

        modifiers = []

        execution_logs = [
            "Evaluating social amplification potential",
            "Analyzing engagement loops",
            "Predicting organic growth velocity",
            "Generating AI virality intelligence",
        ]

        if "student" in target_market:
            modifiers.append(10)

        if "ai" in description:
            modifiers.append(7)

        if "automation" in description:
            modifiers.append(5)

        score = (
            ScoringService.calculate_score(
                74,
                modifiers,
            )
        )

        prompt = (
            build_virality_prompt(
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
                "Virality Agent",

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