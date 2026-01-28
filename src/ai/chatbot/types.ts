export type ChatContentType =
    | "GENERAL QUESTION"
    | "COURSE HELP"
    | "SIMULATION_HELP"
    | "QUIZ_REVIEW"

export interface ChatInput {
    userId: string;
    isMinor: boolean;

    message: string;

    context?: {
        type: ChatContentType;
        courseId?: string;
        simulationId?: string;
        quizId?: string;
    }
}

export interface ChatResponse {
    answer: string;
    
    flags: {
        educational: boolean;
        refusedAdvice: boolean;
        safetyFiltered: boolean;
    }
}