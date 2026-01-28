import { ModerationAction } from "../shared/enums";
import { normalizeForScan } from "../shared/normalize";
import { isAllowedFinancialAdvice } from "../shared/agePolicy";
import {
  calculateConfidenceScore,
  isLowConfidence,
} from "../shared/confidence";

/* -----------------------------
   Types
------------------------------ */

export interface ModerationInput {
  content: string;
  images?: string[];
}

export interface ModerationResult {
  action: ModerationAction;
  reason: string;
}

/* -----------------------------
   Keyword sets (V1 heuristics)
------------------------------ */

const ADVICE_KEYWORDS = [
  "buy",
  "sell",
  "invest now",
  "guaranteed profit",
  "best stock",
  "should buy",
];

const SCAM_KEYWORDS = [
  "double your money",
  "get rich quick",
  "guaranteed return",
  "secret strategy",
  "risk free",
];
const AMBIGUOUS_MARKET_KEYWORDS = [
  "stock",
  "share",
  "market",
  "price",
  "trading",
];
/* -----------------------------
   Core Moderation Pipeline
------------------------------ */

export async function moderateContent(
  input: ModerationInput
): Promise<ModerationResult> {
  const normalizedText = normalizeForScan(input.content);

  // 1️⃣ Empty or low-signal content
  if (!normalizedText || normalizedText.length === 0) {
    return {
      action: ModerationAction.FLAG,
      reason: "Post contains insufficient information",
    };
  }

  // 2️⃣ Keyword detection
  const detectedAdvice = ADVICE_KEYWORDS.filter(keyword =>
    normalizedText.includes(keyword)
  );

  const detectedScam = SCAM_KEYWORDS.filter(keyword =>
    normalizedText.includes(keyword)
  );

  // 3️⃣ Scam / misleading content → REMOVE
  if (detectedScam.length > 0) {
    return {
      action: ModerationAction.REMOVE,
      reason: "Post appears misleading or scam-like",
    };
  }

  // 4️⃣ Financial advice policy (teen-safe)
  if (detectedAdvice.length > 0) {
    const allowed = isAllowedFinancialAdvice(true); // Investt is teen-first

    if (!allowed) {
      return {
        action: ModerationAction.REMOVE,
        reason: "Direct investment advice is not allowed on Investt",
      };
    }
  }

  const detectedAmbiguousMarket = AMBIGUOUS_MARKET_KEYWORDS.filter(keyword =>
    normalizedText.includes(keyword)
  );

  if (
    detectedAmbiguousMarket.length > 0 &&
    detectedAdvice.length === 0 &&
    detectedScam.length === 0
  ) {
    return {
      action: ModerationAction.FLAG,
      reason: "Post contains ambiguous market-related content",
    };
  }
  // 5️⃣ Confidence-based ambiguity handling
  const confidence = calculateConfidenceScore({
    keywordHits: detectedAdvice.length + detectedScam.length,
    length: normalizedText.length,
  });

  if (isLowConfidence(confidence)) {
    return {
      action: ModerationAction.FLAG,
      reason: "Content is ambiguous and requires manual review",
    };
  }

  // 6️⃣ Safe content
  return {
    action: ModerationAction.ALLOW,
    reason: "Content complies with Investt community guidelines",
  };
}
