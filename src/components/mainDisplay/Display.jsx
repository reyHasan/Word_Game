import React from 'react'
import Button from '../Button'
import Game from '../game/Game'

const mainDisplay = () => {
 
 const [gameStarted, setGameStarted] = React.useState(false)

  return (
       !gameStarted? 
        <div className='px-[7.5%] lg:px-[20%] flex flex-col gap-3 lg:gap-4 my-[80px] lg:my-[140px] items-center'>        
          <div className='flex flex-col md:flex-row items-center justify-center gap-4 lg:border border-b'>
            <img src="https://merriam-webster.com/assets/mw/images/quiz/quiz-global-side-widget/vocabulary-logo-2761-8ee5431b3c1fbed34b4e752914f2f89c@1x.jpg"
              className='flex-1'
            />
            <div className='flex flex-col justify-center '> 
              <h2 className='font-poppins text-4xl my-2 text-center lg:text-left'>How Strong is Your Vocabulary?</h2>
              <p className='md:text-xl'>Take our 5-question quiz to find out — and maybe learn some new words along the way.
                  You can try it as often as you'd like (we have dozens of different versions).</p>
            </div>
          </div>
          <hr/>
          <p  className='md:text-xl'>You'll have 10 seconds to answer each question. The faster you answer, the higher your score. The harder the question, the higher your score.</p>
          <Button text='Start the quiz' styles='bg-blue-900 text-blue-100 w-[50%]' onClick={()=>setGameStarted(prev => !prev)}/>
        </div> 
                :
        <Game/>
  )
}

export default mainDisplay