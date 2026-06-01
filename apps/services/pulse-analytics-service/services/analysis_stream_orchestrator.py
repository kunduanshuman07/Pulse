import asyncio

from agents.audience_agent import (
    AudienceAgent,
)

from agents.trend_agent import (
    TrendAgent,
)

from agents.competitor_agent import (
    CompetitorAgent,
)

from agents.virality_agent import (
    ViralityAgent,
)

from schemas.project_schema import (
    ProjectContext,
)

from schemas.stream_schema import (
    StreamEvent,
)


class AnalysisStreamOrchestrator:
    def __init__(self):
        self.agents = [
            AudienceAgent(),
            TrendAgent(),
            CompetitorAgent(),
            ViralityAgent(),
        ]

    async def execute(
        self,
        context: ProjectContext,
    ):
        total_agents = len(
            self.agents
        )

        completed = 0

        for agent in self.agents:
            agent_name = (
                agent.__class__.__name__
                .replace(
                    "Agent",
                    " Agent",
                )
            )

            # START EVENT

            yield StreamEvent(
                event=
                    "started",

                agent=
                    agent_name,

                message=
                    f"{agent_name} execution started",

                progress=int(
                    (
                        completed
                        / total_agents
                    )
                    * 100
                ),
            )

            # FORCE STREAM FLUSH

            await asyncio.sleep(
                0.2
            )

            # RUN AGENT IN BACKGROUND THREAD

            result = await asyncio.to_thread(
                agent.run,
                context,
            )

            completed += 1

            # COMPLETION EVENT

            yield StreamEvent(
                event=
                    "completed",

                agent=
                    agent_name,

                message=
                    result.summary,

                progress=int(
                    (
                        completed
                        / total_agents
                    )
                    * 100
                ),
            )

            # FORCE STREAM FLUSH

            await asyncio.sleep(
                0.2
            )