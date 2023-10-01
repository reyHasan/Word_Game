import React, { useState, useEffect } from 'react';
import { data } from '../../assets/data';
import Button from '../Button';
import { FaPlay, FaPause } from 'react-icons/fa';
const Game = () => {
  const [allData, setAllData] = useState(data);
  let current = Math.trunc(Math.random() * allData.length);
  const [question, setQuestion] = useState(allData[current]);
  const [selectedText, setSelectedText] = useState(null);
  const [number, setNumber] = useState(1);
  const [score, setScore] = useState(0);
  const [count, setCount] = useState(10);
  const [speedBonus, setSpeedBonus] = useState(0)
  const [correctQuestions, setCorrectQuestions] = useState(0)
  const [currentQuestionScore, setCurrentQuestionScore] = useState(0)
  const [currentQuestionSpeed, setCurrentQuestionSpeed] = useState(0)
  const [currentQuestionCorrect, setCurrentQuestionCorrect] = useState(false)
  const [isTimerPaused, setIsTimerPaused] = useState(false); // Track whether the timer is paused
  const [showScoreDiv, setShowScoreDiv]= useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [newGame, setNewGame] = useState(false)

  const changeQuestion = () => {
  if (number <=4) {
    setNewGame(false) 
    const returnData = allData.filter((data) => data.id !== question.id);
    setAllData(returnData);
    current = Math.trunc(Math.random() * returnData.length);
    setQuestion(returnData[current]);
    setSelectedText(null);
    setNumber((prev) => prev + 1);
    setCount(10);
    setIsTimerPaused(false); // Resume the timer when changing the question
    setShowScoreDiv(false)
    setCurrentQuestionCorrect(false)
    setCurrentQuestionScore(0)
    setCurrentQuestionSpeed(0)
} else {
    setGameOver (true)
}
  };

  useEffect(() => {
    let countdown;

    if (!isTimerPaused) {
      countdown = setInterval(() => {
        if (count === 0 && selectedText === null) {
          changeQuestion();
        } else {
          setCount((prevCount) => prevCount - 1);
        }
      }, 1000);
    }
    // Clear the interval when the component unmounts or when isTimerPaused is true
    return () => clearInterval(countdown);
  }, [count, selectedText, isTimerPaused]);


  const validate = (option) => {
    // Pause the timer when a button is clicked
    setIsTimerPaused(true);
    setTimeout(changeQuestion, 3000);
    setSelectedText(option.text);
    if (option.isCorrect) {
      setScore((prev) => prev + 100 * question.level);
      setSpeedBonus((prev)=> prev + count *10)
      setCorrectQuestions(prev=> prev +1)
      setCurrentQuestionScore (100*question.level)
      setCurrentQuestionSpeed  (10*count)
      setCurrentQuestionCorrect(true)
    }
    setShowScoreDiv(true)
  };


const startOver = () => {
  setCorrectQuestions(0);
  setNumber(0);
  setScore(0);
  setSpeedBonus(0);
  setAllData(data);
  setGameOver(false);
  setNewGame(true)
};

useEffect(() => {
  if (!gameOver && newGame) {
    // Reset the game when gameOver changes to false
    changeQuestion();
  }
}, [gameOver]);



     return (
  
      <div className='flex flex-col items-center gap-4 justify-center px-[5%] lg:[px-15%] py-[40px]'>
    
    {gameOver &&
    <div className='flex flex-col items-left gap-4 mt-[25%] md:mt-[10%]'>
    <h1 className='font-semibold text-3xl'>Game Over</h1>
    <p>You got {correctQuestions}/5 right</p>
    <p>Your base score is: {score}</p>
    <p>Your speed bonus points is: {speedBonus}</p>
    <p>Your total score is: {score + speedBonus}</p>
     <Button styles='bg-blue-500 text-white' onClick={startOver} text="play again"/>
     </div>
    }

    {!gameOver && <>

      <div className='grid grid-cols-3'>
        <div className='text-2xl md:text-3xl font-poppins flex flex-col items-center border border-blue-200 p-1 px-2 lg:px-8 gap-2'> <h3>Question</h3> <h3>{number}/5 </h3></div>
        <div className='text-2xl md:text-3xl font-poppins flex flex-col items-center border border-blue-200 p-1 px-2 lg:px-8 gap-2'> <h3>Time</h3> <h3>{count} </h3></div>  
        <div className='text-2xl md:text-3xl font-poppins flex flex-col items-center border border-blue-200 p-1 px-2 lg:px-8 gap-2'> <h3>Score</h3> <h3>{score+speedBonus} </h3></div>
      </div>
     
      <div className='mt-4 text-3xl font-poppins flex flex-col items-center border border-blue-200 p-1 px-2 lg:px-8 gap-2' onClick={()=>setIsTimerPaused(prev=> !prev)}> {isTimerPaused? <FaPlay/> : <FaPause/> } </div>
   
      {!isTimerPaused &&  <h3 className='text-3xl font-poppins mt-6'> {question.question} </h3>}

      {isTimerPaused && selectedText==null? <div className='mt-[25%] md:mt-[10%] font-poppins text-3xl'> Quiz Paused</div> : <div className='flex flex-col gap-3 w-[50%] mt-[20px]'>
        {question.options.map((option) => {
          return (
            <Button
              key={option.text}
              onClick={() => validate(option)}
              text={option.text}
              styles={`bg-blue-500 text-white 
                ${selectedText && option.isCorrect === true ? 'bg-lime-900' : ''}
                ${option.text === selectedText && option.isCorrect === true ? 'bg-lime-900' : ''}
                ${option.text === selectedText && option.isCorrect === false ? 'bg-red-500' : ''}
               `}
            />
          );
        })}
      </div>
     }
        {showScoreDiv && 
        <div>
            {currentQuestionCorrect? <h1 className='text-3xl font-semibold'>Correct</h1>: <h1 className='text-3xl font-semibold'>Wrong</h1>}
          <span className='block'> Question score : {currentQuestionScore} </span>
          <span className='block'> Speed Bonus Points : {currentQuestionSpeed} </span>    
        </div>}
     </>
        }
    </div> 
  )
} 


export default Game;
