export interface ModelConfig {
  model: string;
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
}

export const EDUCATIONAL_MODEL_CONFIG: ModelConfig = {
  model: "gpt-4o-mini",
  temperature: 0.2,
  maxTokens: 400,
  topP: 0.9,
  frequencyPenalty: 0.2,
  presencePenalty: 0.0,
};
