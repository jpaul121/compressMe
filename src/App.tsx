import React, { useState } from 'react'

import Header from './components/Header'
import HeroSection from './components/HeroSection'
import SettingsModal from './components/SettingsModal'
import UploadWidget from './components/UploadWidget'
import background from './assets/background_img.jpg'

function App() {
  const [ showSettingsModal, setToggleSettingsModal ] = useState<boolean>(false)
  const [ imageQuality, setImageQuality ] = useState<number>(60)
  const [ maxWidth, setMaxWidth ] = useState<number | null>(null)
  const [ maxHeight, setMaxHeight ] = useState<number | null>(null)

  function toggleSettingsModal(e: HTMLInputEvent): void {
    e.preventDefault()
    setToggleSettingsModal(!showSettingsModal)
  }
  
  return (
      <div className='bg-indigo-900 relative overflow-hidden h-screen'>
        <img src={background} className='absolute h-full w-full object-cover'/>
        <div className='inset-0 bg-black opacity-25 absolute'>
        </div>
        <Header />
        <div className='container mx-auto px-6 md:px-12 relative z-10 flex justify-between py-24 xl:py-32'>
          <HeroSection />
          <UploadWidget
            imageQuality={imageQuality}
            maxHeight={maxHeight}
            maxWidth={maxWidth}
            toggleSettingsModal={toggleSettingsModal}
          />
        </div>
        {
          showSettingsModal &&
          <SettingsModal
            imageQuality={imageQuality}
            maxHeight={maxHeight}
            maxWidth={maxWidth}
            setImageQuality={setImageQuality}
            setMaxHeight={setMaxHeight}
            setMaxWidth={setMaxWidth}
            toggleSettingsModal={toggleSettingsModal}
          />
        }
      </div>
    );
}
export default App
