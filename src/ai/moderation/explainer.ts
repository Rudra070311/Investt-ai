import { ModerationResult, RuleResult } from "./types";

export function buildExplanation(params: {
  decision: string;
  ruleResults: RuleResult[];
  riskScore: number;
}): string {
  if (params.decision === "ALLOW") {
    return "Content complies with platform safety and educational guidelines.";
  }

  const triggeredRules = params.ruleResults
    .filter(r => r.triggered)
    .map(r => r.reason);

  return `
Content actioned due to the following reasons:
- ${triggeredRules.join("\n- ")}
Overall risk score: ${params.riskScore.toFixed(2)}
`.trim();
}