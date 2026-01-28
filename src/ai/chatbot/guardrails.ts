export function violateGuardrail(message: string): {
    blocked : boolean;
    reason? : string;
} {
    const lowered = message.toLowerCase();

    const advicePatterns = [
        "should i buy",
        "should i sell",
        "what stock",
        "best investment",
        "guaranteed profit",
    ];

    if (advicePatterns.some(p => lowered.includes(p))) {
        return {
            blocked: true,
            reason: "Investment Advice Request Detected",
        };
    }

    return {
        blocked: false,
    };
}