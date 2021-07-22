import React from 'react'

function Button({ onClick, text }) {
  return (
    <a 
      className='box-border inline-block bg-indigo-600 hover:bg-indigo-500 py-3 px-4 mx-5 rounded-lg text-lg text-white font-bold mt-5 cursor-pointer'
      onClick={onClick}
    >
      {text}
    </a>
  );
}

export default Button
