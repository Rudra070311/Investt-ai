import { ModelConfig } from "./modelConfig";

export async function analyzeText(text: string, EDUCATIONAL_MODEL_CONFIG: ModelConfig) {
    return {
        adviceLikelihood: 0,
        persuasionScore: 0,
        misinformationRisk: 0,
        explanation: "This is a placeholder explanation.",
    };
}

export async function analyzeImages(imageUrls: string[]) {
    return {
        financialChartDetected: false,
        promotionalContentLikelihood: 0,
        misleadingVisualRisk: 0,
        unsafeForMinorsRisk: 0,
    };
}