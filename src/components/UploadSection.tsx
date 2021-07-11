import React, { useEffect, useState } from 'react'

import Button from './Button'
import Compressor from 'compressorjs'
import { useRefWithEventListener } from '../hooks/useRefWithEventListener'

function UploadSection() {
  const [ compressedImages, setCompressedImages ] = useState<CompressedImages | null>(null)

  const [ uploadButtonRef ] = useRefWithEventListener(compressImage)

  function compressImage(e: HTMLInputEvent) {
    const file = e.target.files[0]

    if (!file) return;

    new Compressor(file, {
      quality: 0.7,
      success(result: CompressedImage) {
        setCompressedImages(prevState => ({
          ...prevState,
          [ result.name ]: result,
        }))
      },
      error(err) {
        console.log(err)
      },
    })
  }
  
  useEffect(() => {
    // blah blah
  })
  
  return (
    <div className='flex flex-col items-center h-7/12 w-6/12 bg-white rounded-md z-10'>
      <div className='flex flex-col flex-grow-2 justify-center items-center h-4/12 w-max mt-5 px-5 border-2 border-dashed border-gray-800 bg-clip-padding box-border rounded-md top-0 z-30'>
        <span className='font-bold'>Drop your .jpg or .png files here!</span>
        <p className='text-sm'>Resize an unlimited amount of images with zero file size limits.</p>
        <input type='file' id='upload-button' ref={uploadButtonRef} hidden />
        <label
          htmlFor='upload-button'
          className='box-border inline-block bg-indigo-600 hover:bg-indigo-500 py-3 px-4 mx-5 rounded-lg text-lg text-white font-bold mt-5'
        >
          No file chosen
        </label>
      </div>
      <div className='flex w-max mb-5'>
        <Button 
          text='Add files'
        />
        <Button 
          text='Clear all'
        />
        <Button 
          text='Settings'
        />
      </div>
    </div>
  );
}

export default UploadSection
