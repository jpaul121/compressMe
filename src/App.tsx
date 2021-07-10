import Header from './components/Header'
import React from 'react'
import background from './background_img.jpg'

function App() {
    return (
      <div className='bg-indigo-900 relative overflow-hidden h-screen'>
        <img src={background} className='absolute h-full w-full object-cover'/>
        <div className='inset-0 bg-black opacity-25 absolute'>
        </div>
        <Header />
        <div className='container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40'>
          <div className='lg:w-3/5 xl:w-2/5 flex flex-col items-start relative z-10'>
            <span className='font-bold uppercase text-yellow-400'>
              compress.it
            </span>
            <h1 className='font-bold text-6xl sm:text-7xl text-white leading-tight mt-4'>
              Compress images online
              <br/>
              right on your browser.
            </h1>
            <a href='#' className='block bg-white hover:bg-gray-100 py-3 px-4 rounded-lg text-lg text-gray-800 font-bold uppercase mt-10'>
              Check it out
            </a>
          </div>
        </div>
      </div>
    );
}
export default App
