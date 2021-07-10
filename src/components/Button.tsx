import React from 'react'

function Button({ text }) {
  return (
    <a href='#' className='box-border inline-block bg-indigo-600 hover:bg-indigo-500 py-3 px-4 mx-5 rounded-lg text-lg text-white font-bold mt-5'>
      {text}
    </a>
  );
}

export default Button
