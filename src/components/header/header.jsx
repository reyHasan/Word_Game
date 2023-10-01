import React from 'react'
import {FaBars} from 'react-icons/fa'
import {RxCross1} from 'react-icons/rx'

const header = () => {

  const [display, setDisplay] = React.useState(false) 

  return (
    <div className='flex bg-blue-900 py-[20px] px-[5%] lg:px-[10%] items-center justify-between'>
        <div className='flex items-center gap-3'>
            <div className=' bg-transparent text-grey-200 border border-2 rounded-full p-4 text-center border-white text-gray-200'>Learn-a
             <br/> word</div>
            <h1 className='text-blue-100 text-2xl md:text-4xl font-pacific'>Games & Quizzes</h1>
        </div>

        <div>
          
           <div className='hidden gap-6 lg:flex items-center justify-between mr-6 text-blue-100 text-1xl font-poppins'> 
                   <a className=''>Home </a> 
                   <a >About The Game</a> 
                   <a href='https://www.linkedin.com/in/abdurrahman-adedokun-ab575115a/'> Contact Developer</a> 
            </div>

               <div className='flex sm:hidden text-grey-200 text-[24px] mr-2'> 
                 {!display? <FaBars onClick={()=>setDisplay(prevDisplay=> !prevDisplay)} className='text-blue-100'/> : <RxCross1 onClick={()=>setDisplay(prevDisplay=> !prevDisplay)} className='text-blue-100'/>} 
                </div>
         
               <div className=  {` ${display? 'flex' : 'hidden'} p-6 bg-blue-900 text-white absolute top-30 right-0 mx-4 my-2 
               min-w-[140px] rounded-xl sidebar z-10`} 
                    onClick={()=>setDisplay(prevDisplay=> !prevDisplay)}
                    aria-controls="example-fade-text"
                    aria-expanded={display}
                 > 

                <ul className='flex flex-col gap-8 px-[20px]' id="example-fade-text">
                   <a className=''>Home </a> 
                   <a >About </a> 
                   <a href='https://www.linkedin.com/in/abdurrahman-adedokun-ab575115a/'> Contact</a> 
                </ul>
        
            </div>
        </div>
    </div>
  )
}

export default header