import React, {useState, useEffect} from 'react';
import { fetchQuizQuestions, Difficulty} from './Api';
import QuestionCard from './components/QuestionCard';

const TotalQuestions = 10;

type AnswerObject = {
  question: string,
  providedAnswer: string,
  correct: boolean,
  correctAnswer: string
}

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [numbr, setNumbr] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true)

  const startQuiz = async() => {
    setLoading(true);

    const newQuestions = await fetchQuizQuestions(TotalQuestions, Difficulty.Medium);
    setQuestions(newQuestions)
    setGameOver(false);
    setNumbr(0)
    setScore(0)
    setLoading(false);

  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    const providedAnswer = e.currentTarget.value;
    const correct =  questions[numbr].correct_answer === providedAnswer;
    
    correct && setScore(prev => prev + 1);

    const answerObject: AnswerObject = {
      question: questions[numbr].question,
      providedAnswer,
      correct,
      correctAnswer:  questions[numbr].correct_answer
    }
    setUserAnswers(prev => [...prev, answerObject ]);
    if ((numbr + 1) < TotalQuestions) setNumbr(numbr + 1);
    if(userAnswers.length === TotalQuestions -1) setGameOver(true);

    
  }



  return (
    <div>
      <h1>QUIZ</h1>
      {gameOver && <button onClick={startQuiz}>Start</button>}
      <p>Score: {score}</p>
      {(!loading && !gameOver && questions.length > 0) && <> 
      <QuestionCard
        questionNr={numbr + 1}
        totalquestions={TotalQuestions}
        question={questions[numbr].question}
        answers={questions[numbr].answers}
        userAnswer={userAnswers? userAnswers[numbr]: undefined}
        callback={checkAnswer}

      />
      </>}
      
     { loading && <p>Loading...</p>}
    </div>
  );
}

export default App;
