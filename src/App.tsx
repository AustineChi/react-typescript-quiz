import React, { useState } from "react";
import { fetchQuizQuestions } from "./Api";
import { Difficulty, AnswerObject } from "./utils";
import QuestionCard from "./components/QuestionCard";
import { Container, Button, Title } from "./style/main.style";

const TotalQuestions = 10;

const App = () => {
	const [loading, setLoading] = useState(false);
	const [questions, setQuestions] = useState([]);
	const [numbr, setNumbr] = useState(0);
	const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
	const [score, setScore] = useState(0);
	const [gameOver, setGameOver] = useState(true);

	const startQuiz = async () => {
		setLoading(true);

		const newQuestions = await fetchQuizQuestions(
			TotalQuestions,
			Difficulty.Medium
		);
		setQuestions(newQuestions);
		setGameOver(false);
		setNumbr(0);
		setScore(0);
		setUserAnswers([]);
		setLoading(false);
	};

	const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
		const providedAnswer = e.currentTarget.value;
		const correct = questions[numbr].correct_answer === providedAnswer;

		correct && setScore((prev) => prev + 1);

		const answerObject: AnswerObject = {
			question: questions[numbr].question,
			providedAnswer,
			correct,
			correctAnswer: questions[numbr].correct_answer,
		};
		setUserAnswers((prev) => [...prev, answerObject]);
		if (numbr + 1 < TotalQuestions) setNumbr(numbr + 1);
		if (userAnswers.length === TotalQuestions - 1) setGameOver(true);
	};

	return (
		<Container>
			<Title>QUIZ</Title>
			{gameOver && (
				<Button start={true} onClick={startQuiz}>
					Start
				</Button>
			)}
			<p>Score: {score}</p>
			{!loading && !gameOver && questions.length > 0 && (
				<>
					<QuestionCard
						questionNr={numbr + 1}
						totalquestions={TotalQuestions}
						question={questions[numbr].question}
						answers={questions[numbr].answers}
						userAnswer={
							userAnswers ? userAnswers[numbr] : undefined
						}
						callback={checkAnswer}
					/>
				</>
			)}

			{loading && <p>Loading...</p>}
		</Container>
	);
};

export default App;
