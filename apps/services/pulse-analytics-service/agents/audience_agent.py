from schemas.agent_schema import AgentResult
from schemas.project_schema import ProjectContext

from services.scoring_service import ScoringService

from services.structures_llm_service import (
    StructuredLLMService,
)

from prompts.audience_prompt import (
    build_audience_prompt,
)

class AudienceAgent:
    def __init__(self):
        self.llm_service = (
            StructuredLLMService()
        )
    def run(self, context: ProjectContext) -> AgentResult:
        target_market = context.target_market.lower()
        description = context.description.lower()

        modifiers = []
        insights = []
        risks = []

        if "student" in target_market:
            modifiers.append(10)
            insights.append(
                "Strong Gen Z adoption potential"
            )

        if "ai" in description:
            modifiers.append(5)
            insights.append(
                "AI-native audience alignment detected"
            )

        if "productivity" in description:
            modifiers.append(4)
            insights.append(
                "High engagement potential in productivity sector"
            )

        risks.append(
            "Retention strategy must remain strong"
        )

        score = ScoringService.calculate_score(
            75,
            modifiers,
        )

        execution_logs = [
            "Analyzing target demographics",
            "Evaluating audience adoption behavior",
            "Calculating engagement probability",
        ]

        prompt = (
            build_audience_prompt(
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
                "Audience Agent",

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