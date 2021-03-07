export const shuffleArray = (arr: string[]) => [...arr].sort(() => Math.random() - 0.5)

export enum Difficulty {
    Easy = 'easy',
    Medium = 'medium',
    Hard = 'hard'
}

export type Question = {
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    question: string,
    type: string,
    answers?: string[]
}

export type AnswerObject = {
    question: string,
    providedAnswer: string,
    correct: boolean,
    correctAnswer: string
  }

  export type AnswerProps = {
    question: any,
    answers: string[],
    callback: any,
    userAnswer: AnswerObject | undefined,
    questionNr: number,
    totalquestions: number
}
