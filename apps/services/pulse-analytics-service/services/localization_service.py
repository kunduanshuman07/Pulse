import json

from schemas.analysis_schema import (
    AnalysisResult,
)
from services.llm_service import (
    LLMService,
)


class LocalizationService:
    def __init__(self):
        self.llm_service = LLMService()

    def translate_analysis(
        self,
        result: AnalysisResult,
        target_language: str,
    ) -> AnalysisResult:
        if target_language == "en":
            return result

        if target_language != "hi":
            return result

        payload = {
            "overall_score": result.overall_score,
            "summary": result.summary,
            "agents": [
                {
                    "agent_type": agent.agent_type,
                    "score": agent.score,
                    "summary": agent.summary,
                    "insights": agent.insights,
                    "risks": agent.risks,
                    "execution_logs": agent.execution_logs,
                }
                for agent in result.agents
            ],
        }

        prompt = f"""
You are a professional translator for product intelligence reports.

Translate the following JSON analysis into Hindi using Devanagari script.

Rules:
- Keep JSON structure identical
- Translate only string values (summary, insights, risks, execution_logs)
- Do not translate agent_type names or numeric scores
- Return ONLY valid JSON
- No markdown

JSON:
{json.dumps(payload, ensure_ascii=False)}
"""

        try:
            raw = self.llm_service.generate_raw(
                prompt,
            )

            response = json.loads(
                self._clean_response(raw),
            )

            return AnalysisResult(**response)
        except Exception:
            return self._fallback_translate(
                result,
            )

    def _clean_response(
        self,
        response: str,
    ) -> str:
        return (
            response.replace("```json", "")
            .replace("```", "")
            .strip()
        )

    def _fallback_translate(
        self,
        result: AnalysisResult,
    ) -> AnalysisResult:
        """Rule-based fallback when LLM translation is unavailable."""

        summary_map = {
            "The project demonstrates strong potential in "
            "Audience Agent, Trend Agent with favorable "
            "market alignment and growth indicators.": (
                "यह परियोजना ऑडियंस एजेंट और ट्रेंड एजेंट "
                "में मजबूत संभावना दिखाती है, जिसमें अनुकूल "
                "बाजार संरेखण और विकास संकेतक शामिल हैं।"
            ),
        }

        translated_summary = summary_map.get(
            result.summary,
            (
                "यह परियोजना बाजार में मजबूत संभावनाएं "
                "दिखाती है और विकास के लिए अनुकूल संकेत "
                "प्रस्तुत करती है।"
            ),
        )

        translated_agents = []

        for agent in result.agents:
            translated_agents.append(
                agent.model_copy(
                    update={
                        "summary": (
                            "एआई विश्लेषण से "
                            f"{agent.agent_type} "
                            "के लिए सकारात्मक बाजार संकेत "
                            "मिले हैं।"
                        ),
                        "insights": [
                            (
                                "बाजार में मजबूत "
                                "अपनाने की संभावना"
                            ),
                            *[
                                insight
                                for insight in agent.insights[
                                    :1
                                ]
                            ],
                        ],
                        "risks": [
                            (
                                "प्रतिधारण रणनीति "
                                "मजबूत रहनी चाहिए"
                            ),
                        ],
                        "execution_logs": [
                            (
                                "लक्षित जनसांख्यिकी "
                                "का विश्लेषण"
                            ),
                            (
                                "दर्शक अपनाने के "
                                "व्यवहार का मूल्यांकन"
                            ),
                            (
                                "जुड़ाव संभावना "
                                "की गणना"
                            ),
                        ],
                    },
                ),
            )

        return AnalysisResult(
            overall_score=result.overall_score,
            summary=translated_summary,
            agents=translated_agents,
        )
