export type ModerationDecision =
  | "ALLOW"
  | "SOFT_WARN"
  | "SHADOW_HIDE"
  | "BLOCK"
  | "ESCALATE_ADMIN";

export type ContentType =
  | "POST"
  | "COMMENT"
  | "COURSE"
  | "LESSON";

export interface ModerationInput {
  contentId: string;
  contentType: ContentType;

  text?: string;
  imageUrls?: string[];

  authorId: string;
  authorRole: "LEARNER" | "CREATOR";

  isMinor: boolean;
  createdAt: string;
}

export interface KeywordHit {
  keyword: string;
  category:
    | "FINANCIAL_ADVICE"
    | "GET_RICH"
    | "MANIPULATION"
    | "MINOR_RISK"
    | "HARASSMENT";
}

export interface RuleResult {
  type: string;
  ruleId: string;
  triggered: boolean;
  severity: number;
  reason: string;
}

export interface TextAIScore {
  adviceLikelihood: number;
  persuasionScore: number;
  misinformationRisk: number;
}

export interface ImageAIScore {
  financialChartDetected: boolean;
  promotionalContentLikelihood: number;
  misleadingVisualRisk: number;
  unsafeForMinorsRisk: number;
}

export interface AISemanticScore {
  text?: TextAIScore;
  image?: ImageAIScore;
}

export interface ModerationResult {
  action(action: any): unknown;
  decision: ModerationDecision;
  riskScore: number;

  keywordHits: KeywordHit[];
  ruleResults: RuleResult[];
  aiScore?: AISemanticScore;

  explanation: string;
}
