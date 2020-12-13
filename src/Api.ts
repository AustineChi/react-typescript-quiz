import axios from 'axios';
import {shuffleArray} from './utils'

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

export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=18&difficulty=${difficulty}&type=multiple`;
    const fetchQuizResponse = await axios.get(endpoint);
    return fetchQuizResponse.data.results.map((item: Question)  => ({ 
        ...item,
        answers: shuffleArray([...item.incorrect_answers, item.correct_answer])
    }))
}