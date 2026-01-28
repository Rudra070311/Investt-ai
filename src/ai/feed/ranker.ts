import { FeedItem, FeedScoreBreakdown, RankedFeedItem } from "./types";
import {
    computeEducationalValue,
    computeEngagementQuality,
    computeFreshness,
    computeSafetyPenalty,
} from "./signals";
import { computeDiversityBoost } from "./fairness";

export function rankFeed(
    items: FeedItem[],
    context: { recentCreatorIds: string[]; recentTypes: string[] },
): RankedFeedItem[] {
    return items
        .map((item) => {
            const breakdown: FeedScoreBreakdown = {
                educationalValue: computeEducationalValue(item),
                engagementQuality: computeEngagementQuality(item),
                safetyPenalty: computeSafetyPenalty(item),
                freshness: computeFreshness(item),
                diversityBoost: computeDiversityBoost(item, context),
            };

            const finalScore =
                breakdown.educationalValue * 0.35 +
                breakdown.engagementQuality * 0.25 +
                breakdown.freshness * 0.2 +
                breakdown.diversityBoost * 0.2 -
                breakdown.safetyPenalty * 0.5;
            
            return {
                item,
                finalScore,
                breakdown,
            };
        })
        .sort((a, b) => b.finalScore - a.finalScore);
}