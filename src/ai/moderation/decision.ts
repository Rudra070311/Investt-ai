import { ModerationDecision } from "./types";

export function decide(riskScore: number): ModerationDecision {
  if (riskScore < 0.3) return "ALLOW";
  if (riskScore < 0.5) return "SOFT_WARN";
  if (riskScore < 0.7) return "SHADOW_HIDE";
  if (riskScore < 0.9) return "BLOCK";
  return "ESCALATE_ADMIN";
}
