import { FeedItem } from "./types";

export function computeDiversityBoost(item: FeedItem, context: {recentCreatorIds: string[], recentTypes: string[]}): number {
    let boost = 0;

    if (!context.recentCreatorIds.includes(item.creatorId)) {
        boost += 0.2;
    }
    if (!context.recentTypes.includes(item.type)) {
        boost += 0.1;
    }
    return Math.min(boost, 0.3);
}