export type FeedItemType =
    | "POST"
    | "COURSE"
    | "CHALLENGE"
    | "SIMULATION"

export interface FeedItem {
    id: string;
    type: FeedItemType;

    title?: string;
    text?: string;

    creatorId: string;
    creatorRole: "LEARNER" | "CREATOR" | "ADMIN";

    isCreatorVerified: boolean;
    createdAt: string; // ISO date string

    engagement: {
        likes: number;
        comments: number;
        views: number;
        completions?: number; // Only for COURSES and CHALLENGES
    }

    safety: {
        reportCount: number;
        moderationRiskScore: number; // 0.0 to 1.0
    }

    audience: {
        isMinorSafe: boolean;
        difficulty?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED"; // Only for COURSES and CHALLENGES
    }
}

export interface FeedScoreBreakdown {
    educationalValue: number; // 0.0 to 1.0
    engagementQuality: number; // 0.0 to 1.0
    safetyPenalty: number; // 0.0 to 1.0
    freshness: number; // 0.0 to 1.0
    diversityBoost: number; // 0.0 to 1.0
}

export interface RankedFeedItem {
  item: FeedItem;
  finalScore: number;
  breakdown: FeedScoreBreakdown;
}