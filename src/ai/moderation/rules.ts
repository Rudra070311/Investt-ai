import { KeywordHit, ModerationInput, RuleResult } from "./types";

export function applyRules(
    input: ModerationInput,
    keywordHits: KeywordHit[]
): RuleResult[] {
    const results: RuleResult[] = [];

    if (input.isMinor && input.imageUrls && input.imageUrls.length > 0 && !input.text) {
        results.push({
            ruleId: "MINOR_IMAGE_ONLY",
            triggered: true,
            severity: 0.6,
            reason: "Image Only Financial Content Posted by A Minor",
        });
    }

    if (input.imageUrls && input.imageUrls.length > 3) {
        results.push({
            ruleId: "IMAGE_SCAM_RISK",
            triggered: true,
            severity: 0.3,
            reason: "High number of images may indicate promotional intent",
        });
    }

    if (input.isMinor && keywordHits.some(k => k.category === "FINANCIAL_ADVICE")) {
    results.push({
      ruleId: "MINOR_FIN_ADVICE",
      triggered: true,
      severity: 0.9,
      reason: "Financial advice language detected for a minor user",
    });
    }

    return results;
}