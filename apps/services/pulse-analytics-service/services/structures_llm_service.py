import json

from services.llm_service import (
    LLMService,
)


class StructuredLLMService:
    def __init__(self):
        self.llm_service = (
            LLMService()
        )

    def generate(
        self,
        prompt: str,
    ):
        retries = 3

        for attempt in range(
            retries
        ):
            try:
                response = (
                    self.llm_service.generate(
                        prompt
                    )
                )

                if isinstance(
                    response,
                    str,
                ):
                    response = (
                        self.clean_response(
                            response
                        )
                    )

                    response = (
                        json.loads(
                            response
                        )
                    )

                return {
                    "summary": response.get(
                        "summary",
                        "No summary generated",
                    ),

                    "insights": self.normalize_list(
                        response.get(
                            "insights",
                            [],
                        )
                    ),

                    "risks": self.normalize_list(
                        response.get(
                            "risks",
                            [],
                        )
                    ),
                }

            except Exception as error:
                print(error)

                if (
                    attempt
                    == retries - 1
                ):
                    return {
                        "summary": (
                            "AI analysis "
                            "could not be generated"
                        ),

                        "insights": [],

                        "risks": [
                            "Structured AI generation failed"
                        ],
                    }

    def clean_response(
        self,
        response: str,
    ):
        response = (
            response.replace(
                "```json",
                "",
            )
            .replace(
                "```",
                "",
            )
            .strip()
        )

        return response

    def normalize_list(
        self,
        items,
    ):
        normalized = []

        for item in items:
            if isinstance(
                item,
                str,
            ):
                normalized.append(
                    item
                )

            elif isinstance(
                item,
                dict,
            ):
                normalized.append(
                    " | ".join(
                        [
                            str(value)
                            for value in item.values()
                        ]
                    )
                )

            else:
                normalized.append(
                    str(item)
                )

        return normalized