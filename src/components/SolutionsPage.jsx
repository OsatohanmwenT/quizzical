import React from 'react';

export default function SolutionsPage({ data, restart, score }) {
    return(
        <div className="container">
            {data.map((item,index) =>(
                <div key={index} className="question-section">
                    <h2 className="question">{item.question}</h2>
                    <div className="answers">
                        {item.answer.map((answer,answerIndex) => (
                            <button key={answerIndex} className={`answer-btn ${answer.isCorrect ? "correct" : ""} ${answer.isPicked && !(answer.isCorrect) ? "incorrect" : ""}`}>{answer.text}</button>
                        ))}
                    </div>
                </div>
            ))
            }
            <div className='end'>
                <p className='result'>You scored {score}/5 correct answers</p>
                <button onClick={restart} className="btn restart">Play Again</button>
            </div>
        </div>
    )
}