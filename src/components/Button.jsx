import React from 'react'

const Button = ({styles, text, icon, onClick}) => {
    return (
      <button className={`px-4 py-4 font-poppins rounded-xl font-medium text-[18px] ${styles}`} onClick={onClick}>
        {text} {icon}
      </button>
    )
}

export default Button
