import Button from './Button'
import React from 'react'

const MAX_CANVAS_SIZE = 4096
const MIN_CANVAS_SIZE = 0

function SettingsModal({ imageQuality, maxHeight, maxWidth, setImageQuality, setMaxHeight, setMaxWidth, toggleSettingsModal }) {
  function changeImageQuality(e) {
    setImageQuality(e.target.value)
  }
  
  function changeMaxHeight(e) {
    setMaxHeight(e.target.value)
  }
  
  function changeMaxWidth(e) {
    setMaxWidth(e.target.value)
  }
  
  return (
    <div className='modal z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center'>
      <div className='modal-overlay absolute w-full h-full bg-gray-900 opacity-50'></div>
      
      <div className='modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto'>
        <div className='modal-content py-4 text-left px-6'>
          <div className='flex w-full'>
            <p className='self-start font-bold'>Image Quality</p>
            <p className='self-end mx-end-row font-bold'>{imageQuality}%</p>
          </div>
          <input
            className='rounded-lg overflow-hidden appearance-none bg-gray-400 h-3 w-full my-4'
            type='range'
            min='1'
            max='100'
            onChange={changeImageQuality}
            step='1'
            value={imageQuality}
          />

          <p className='my-4 font-bold'>Max Width (px)</p>
          <div className='mb-3 pt-0'>
            <input
              className='px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full'
              max={MAX_CANVAS_SIZE}
              min={MIN_CANVAS_SIZE}
              onChange={changeMaxWidth}
              type='number'
              value={maxWidth}
            />
          </div>
          
          <p className='my-4 font-bold'>Max Height (px)</p>
          <div className='mb-3 pt-0'>
            <input
              className='px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full'
              max={MAX_CANVAS_SIZE}
              min={MIN_CANVAS_SIZE}
              onChange={changeMaxHeight}
              type='number'
              value={maxHeight}
            />
          </div>

          <div className='flex justify-end'>
            <Button
              onClick={toggleSettingsModal}
              text='Done'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsModal
