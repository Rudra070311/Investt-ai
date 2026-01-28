import { ChatContentType } from "../chatbot/types";

export function buildEducationalPrompt(
  message: string,
  contextType: ChatContentType
): string {

  switch (contextType) {

    case "COURSE HELP":
      return `
The user is studying a course.
Explain concepts clearly and simply.
Do not give advice.

Question:
${message}
`;

    case "SIMULATION_HELP":
      return `
The user is viewing a simulation.
Explain what the results mean.
Do not suggest actions.

Question:
${message}
`;

    case "QUIZ_REVIEW":
      return `
The user is reviewing a quiz.
Explain reasoning behind answers.
Do not reveal future answers.

Question:
${message}
`;

    case "GENERAL QUESTION":
    default:
      return `
The user is asking a general educational question.
Answer neutrally and clearly.

Question:
${message}
`;
  }
}
