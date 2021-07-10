import Header from './components/Header'
import HeroSection from './components/HeroSection'
import React from 'react'
import UploadSection from './components/UploadSection'
import background from './background_img.jpg'

function App() {
    return (
      <div className='bg-indigo-900 relative overflow-hidden h-screen'>
        <img src={background} className='absolute h-full w-full object-cover'/>
        <div className='inset-0 bg-black opacity-25 absolute'>
        </div>
        <Header />
        <div className='container mx-auto px-6 md:px-12 relative z-10 flex justify-between py-32 xl:py-40'>
          <HeroSection />
          <UploadSection />
        </div>
      </div>
    );
}
export default App
