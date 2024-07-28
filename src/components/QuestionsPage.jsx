import React from "react";

export default function QuestionsPage({ data, checkAnswer, handleAnswerClick }) {
    return(
        <main className="container">
            {data.map((item,index) =>(
                <div key={index} className="question-section">
                    <h2 className="question">{item.question}</h2>
                    <div className="answers">
                        {item.answer.map((answer,answerIndex) => (
                            <button 
                            onClick={() => handleAnswerClick(index,answerIndex)}
                             key={answerIndex} className={`answer-btn ${answer.isPicked ? "selected" : ""}`}>
                             {answer.text}
                             </button>
                        ))}
                    </div>
                </div>
            ))
            }
            <button onClick={() => checkAnswer(data)} className="btn">Check answer</button>
        </main>
    )
}