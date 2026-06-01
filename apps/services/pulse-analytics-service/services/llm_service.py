import json

import ollama


class LLMService:
    def generate(
        self,
        prompt: str,
    ):
        response = ollama.chat(
            model="llama3.1",

            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are an elite AI "
                        "product intelligence analyst."
                    ),
                },
                {
                    "role": "user",
                    "content": prompt,
                },
            ],
        )

        content = response[
            "message"
        ]["content"]

        parsed = json.loads(content)

        return {
            "summary": parsed.get(
                "summary",
                "No summary generated",
            ),

            "insights": parsed.get(
                "insights",
                [],
            ),

            "risks": parsed.get(
                "risks",
                [],
            ),
        }

    def generate_raw(
        self,
        prompt: str,
    ) -> str:
        response = ollama.chat(
            model="llama3.1",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You return only valid JSON. "
                        "No markdown or explanations."
                    ),
                },
                {
                    "role": "user",
                    "content": prompt,
                },
            ],
        )

        return response[
            "message"
        ]["content"]