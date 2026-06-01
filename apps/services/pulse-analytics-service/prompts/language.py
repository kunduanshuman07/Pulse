def language_instruction(
    language: str,
) -> str:
    if language == "hi":
        return (
            "Language: Respond entirely in Hindi "
            "using Devanagari script for all summary, "
            "insights, risks, and log text."
        )

    return (
        "Language: Respond entirely in English."
    )
