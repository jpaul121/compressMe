import Header from './components/Header'
import HeroSection from './components/HeroSection'
import React from 'react'
import UploadWidget from './components/UploadWidget'
import background from './assets/background_img.jpg'

function App() {
    return (
      <div className='bg-indigo-900 relative overflow-hidden h-screen'>
        <img src={background} className='absolute h-full w-full object-cover'/>
        <div className='inset-0 bg-black opacity-25 absolute'>
        </div>
        <Header />
        <div className='container mx-auto px-6 md:px-12 relative z-10 flex justify-between py-24 xl:py-32'>
          <HeroSection />
          <UploadWidget />
        </div>
      </div>
    );
}
export default App
