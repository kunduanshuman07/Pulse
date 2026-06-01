from openai import OpenAI

import os


class LLMService:
    def __init__(self):
        self.client = OpenAI(
            base_url=
                "https://openrouter.ai/api/v1",

            api_key=os.getenv(
                "OPENROUTER_API_KEY"
            ),
        )

    def generate(
        self,
        prompt: str,
    ):
        completion = (
            self.client.chat.completions.create(
                model="openrouter/free",

                messages=[
                    {
                        "role":
                            "user",

                        "content":
                            prompt,
                    }
                ],
            )
        )

        return (
            completion
            .choices[0]
            .message
            .content
        )
