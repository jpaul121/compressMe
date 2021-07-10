import React from 'react'

function HeroSection() {
  return (
    <div className='lg:w-3/5 xl:w-2/5 flex flex-col items-start relative z-10'>
      <span className='font-bold uppercase text-yellow-400'>
        compress.it
      </span>
      <h1 className='font-bold text-6xl sm:text-7xl text-white leading-tight mt-4'>
        Compress images online
        <br/>
        right on your browser.
      </h1>
    </div>
  );
}

export default HeroSection
