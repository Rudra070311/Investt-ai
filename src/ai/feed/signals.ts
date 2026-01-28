import { FeedItem } from "./types";

export function computeEducationalValue(item: FeedItem): number {
    if (item.type === "COURSE" || item.type === "CHALLENGE") {
        return Math.min((item.engagement.completions ?? 0) / 100, 1);
    }
    return 0.3;
}

export function computeFreshness(item: FeedItem): number {
    const hoursOld =
        (Date.now() - new Date(item.createdAt).getTime()) / (1000 * 60 * 60);
    
    if (hoursOld < 6) return 1;
    if (hoursOld < 24) return 0.7;
    if (hoursOld < 72) return 0.4;
    return 0.1;
}

export function computeEngagementQuality(item: FeedItem): number {
    const { likes, comments, views } = item.engagement;
    if (views === 0) return 0;

    const ratio = (likes + comments) / views;
    return Math.min(ratio * 5, 1);
}

export function computeSafetyPenalty(item: FeedItem): number {
    return Math.min(
        item.safety.moderationRiskScore + item.safety.reportCount * 0.1,
    )
}