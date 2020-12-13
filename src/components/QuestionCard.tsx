import React from 'react';

type Props = {
    question: any,
    answers: string[],
    callback: any,
    userAnswer: any,
    questionNr: number,
    totalquestions: number
}


const QuestionCard: React.FC<Props> = ({
    question,
     answers,
     callback, 
     userAnswer, 
     questionNr, 
     totalquestions
    }) => (
        <div> 
          <p>Question: {questionNr} / {totalquestions}</p> 
          <p dangerouslySetInnerHTML={{__html: question}}></p> 
          {answers && answers.map((answer, id) => (
          <div key={id}>
              <button disabled={userAnswer} value={answer} onClick={callback}>
                  <span dangerouslySetInnerHTML={{__html: answer}}></span>
              </button>

          </div>)
          )} 

        </div>
     )
     

export default QuestionCard