import React, { useState, useEffect, useCallback } from "react";
import HeaderPage from "./components/HeaderPage";
import QuestionsPage from "./components/QuestionsPage";
import SolutionsPage from "./components/SolutionsPage";
import { decode } from "html-entities";
import Confetti from "react-confetti";

function App () {
  const [startGame, setStartGame] = useState(false);
  const [data, setData] = useState([]);
  const [isChecked, setIsChecked] = useState(false)
  const [score, setScore] = useState(null)

  const startGameNow = () => {
    setStartGame(true)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://opentdb.com/api.php?amount=5&category=18&difficulty=medium&type=multiple');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const decodedData = data.results.map((item) => {
          const decodedCorrectAnswer = decode(item.correct_answer);
          const decodeIncorrectAnswer = item.incorrect_answers.map(answer => decode(answer));
          const decodedQuestion = decode(item.question);

          const answer = [
            ...decodeIncorrectAnswer.map((answer) => ({ text: answer, isCorrect: false, isPicked: false})),
            {text: decodedCorrectAnswer, isCorrect: true, isPicked: false}
          ]

          const shuffleAnswer = answer.sort(() => Math.random() - 0.5)

          return{
            ...item,
            question: decodedQuestion,
            answer: shuffleAnswer,
          };
        });

        setData(decodedData);
        console.log(decodedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  },[startGame])
 
  const handleAnswerClick = useCallback((questionIndex, answerIndex) => {
    setData(prevData =>
      prevData.map((item, qIndex) => {
        if (qIndex === questionIndex) {
          return {
            ...item,
            answer: item.answer.map((answer, aIndex) => ({
              ...answer,
              isPicked: aIndex === answerIndex
            }))
          };
        }
        return item;
      })
    );
  }, []);

  const checkAnswer = useCallback((data) => {
    const allQuestionsAnswered = data.every(question =>
      question.answer.some(answer => answer.isPicked)
    );

    if(allQuestionsAnswered){
      setIsChecked(true)
      setScore(calculateScore(data))
    }else{
      setIsChecked(false)
    }
  },[])

  const playAgain = () => {
    setIsChecked(false)
    setStartGame(false)
  }

  function calculateScore (data) {
    let score = 0;
    data.forEach(question => {
      question.answer.forEach(answer => {
        if(answer.isPicked && answer.isCorrect){
          score += 1;
        }
    })
    });
    return score;
  }

  return(
    <div className="wrapper">
      {!(startGame) && !(isChecked) &&
       <HeaderPage startGameNow={startGameNow} /> 
      }
      {startGame && data.length > 0 && !(isChecked) &&
      <QuestionsPage
        data={data}
        handleAnswerClick={handleAnswerClick}
        checkAnswer={checkAnswer}
      />
      }
      {isChecked && <Confetti width={1132} />}
      {isChecked && 
      <>
        <SolutionsPage data={data} restart={playAgain} score={score} />
      </>
      }
    </div>
  )
}

export default App;