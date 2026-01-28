export function calculateConfidenceScore(
  signals: {
    keywordHits: number;
    length: number;
  }
): number {
  let score = 1.0;

  if (signals.keywordHits > 0) {
    score -= 0.4;
  }

  if (signals.length < 5) {
    score -= 0.3;
  }

  return Math.max(0, Math.min(score, 1));
}

export function isLowConfidence(score: number): boolean {
  return score < 0.5;
}
