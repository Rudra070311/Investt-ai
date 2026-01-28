import { KeywordHit, RuleResult, AISemanticScore } from "./types";

export function calculateRiskScore(params: {
    keywordHits: KeywordHit[];
    ruleResults: RuleResult[];
    aiScore?: AISemanticScore;
}): number {
    let score = 0;

    score += params.keywordHits.length * 5;

    for (const ruleResult of params.ruleResults) {
        if (ruleResult.triggered) {
            score += ruleResult.severity;
        }
    }

    if (params.aiScore?.text) {
        const textScore = params.aiScore.text;
        score += textScore.adviceLikelihood * 0.4;
        score += textScore.persuasionScore * 0.3;
        score += textScore.misinformationRisk * 0.3;
    }

    if (params.aiScore?.image) {
        const imageScore = params.aiScore.image;
        score += (imageScore.promotionalContentLikelihood || 0) * 0.4;
        score += (imageScore.misleadingVisualRisk || 0) * 0.4;
        score += (imageScore.unsafeForMinorsRisk || 0) * 0.6;
    }

    return Math.min(score, 1);
}