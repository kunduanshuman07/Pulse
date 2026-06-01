class ScoringService:
    @staticmethod
    def calculate_score(
        base_score: int,
        modifiers: list[int],
    ) -> int:
        final_score = base_score + sum(modifiers)

        return max(0, min(final_score, 100))