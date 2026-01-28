import { ChatContentType, ChatInput, ChatResponse } from "./types";
import { violateGuardrail } from "./guardrails";
import { SYSTEM_PROMPT } from "./systemPrompt";

import { analyzeText } from "../models/aiClient";
import { EDUCATIONAL_MODEL_CONFIG } from "../models/modelConfig";
import { buildEducationalPrompt } from "../models/promptTemplates";

export async function runChatbot(
  input: ChatInput
): Promise<ChatResponse> {

  // 1. Guardrails
  const guard = violateGuardrail(input.message);

  if (guard.blocked) {
    return {
      answer:
        "I can’t help with investment advice, but I can explain the concepts behind your question.",
      flags: {
        educational: false,
        refusedAdvice: true,
        safetyFiltered: true,
      },
    };
  }

  // 2. Normalize context (based on YOUR types)
  const contextType: ChatContentType =
    input.context?.type ?? "GENERAL QUESTION";

  // 3. Build prompt
  const prompt = buildEducationalPrompt(
    input.message,
    contextType
  );

  // 4. AI call
  const aiResult = await analyzeText(
    `${SYSTEM_PROMPT}\n${prompt}`,
    EDUCATIONAL_MODEL_CONFIG
  );

  // 5. Response
  return {
    answer: aiResult.explanation ?? "Let’s explore this concept step by step.",
    flags: {
      educational: true,
      refusedAdvice: false,
      safetyFiltered: false,
    },
  };
}
