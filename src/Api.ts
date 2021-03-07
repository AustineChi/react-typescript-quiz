import axios from 'axios';
import {shuffleArray, Difficulty, Question} from './utils'


export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=18&difficulty=${difficulty}&type=multiple`;
    const fetchQuizResponse = await axios.get(endpoint);
    return fetchQuizResponse.data.results.map((item: Question)  => ({ 
        ...item,
        answers: shuffleArray([...item.incorrect_answers, item.correct_answer])
    }))
}