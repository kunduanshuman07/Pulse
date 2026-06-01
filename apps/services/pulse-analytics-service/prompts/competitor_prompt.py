from prompts.language import (
    language_instruction,
)


def build_competitor_prompt(
    context,
):
    return f"""
You are an elite AI competitor intelligence analyst.

{language_instruction(context.language)}

Analyze this startup/project.

Project Title:
{context.title}

Description:
{context.description}

Industry:
{context.industry}

Target Market:
{context.target_market}

Return ONLY valid JSON.

Schema:

{{
    "summary": "string",

    "insights": [
        "string"
    ],

    "risks": [
        "string"
    ]
}}

Do not include markdown.
Do not include explanations.
Return valid JSON only.
"""