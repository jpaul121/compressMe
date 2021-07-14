import React, { useEffect, useState } from 'react'

import Button from './Button'
import Compressor from 'compressorjs'
import FileModule from './FileModule'
import { isEqual } from 'lodash'
import usePrevious from '../hooks/usePrevious'
import useRefWithEventListener from '../hooks/useRefWithEventListener'

function UploadSection() {
  const [ imageFiles, setImageFiles ] = useState<ImageFiles | null>(null)

  const prevImageFiles = usePrevious(imageFiles)
  const [ uploadButtonRefObject, uploadButtonRef ] = useRefWithEventListener(compressImage)

  function compressImage(e: HTMLInputEvent) {
    const file = e.target.files[0]

    if (!file) return;

    new Compressor(file, {
      quality: 0.7,
      success(result: ImageFile) {
        setImageFiles(prevState => ({
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
    // Set objectURLs for each image so they can be used for thumbnails
    if (
      imageFiles &&
      !isEqual(prevImageFiles, imageFiles)
    ) Object.keys(imageFiles).map(index => {
      const item = imageFiles[index]
      item.objectURL = URL.createObjectURL(item)
      setImageFiles({
       ...imageFiles,
       [ item.name ]: item,
      })
    })
    
    return () => {
      // Revoke objectURLs on dismount to avoid memory leaks
      if (
        imageFiles &&
        !isEqual(prevImageFiles, imageFiles)
      ) Object.keys(imageFiles).map(index => {
        const item = imageFiles[index]
        URL.revokeObjectURL(item.objectURL)
      })
    }
  }, [ imageFiles ])
  
  return (
    <div className='flex flex-col items-center h-7/12 w-6/12 bg-white rounded-md z-10'>
      <input type='file' id='upload-button' ref={uploadButtonRef} hidden />
      {
        (imageFiles === null || uploadButtonRefObject.current?.files.length === 0) &&
        <div className='flex flex-col flex-grow-2 justify-center items-center h-4/12 w-max mt-5 px-5 border-2 border-dashed border-gray-800 bg-clip-padding box-border rounded-md top-0 z-30'>
          <span className='font-bold'>Drop your .jpg or .png files here!</span>
          <p className='text-sm'>Resize an unlimited amount of images with zero file size limits.</p>
          <label
            htmlFor='upload-button'
            className='box-border inline-block bg-indigo-600 hover:bg-indigo-500 py-3 px-4 mx-5 rounded-lg text-lg text-white font-bold mt-5'
          >
            No file chosen
          </label>
        </div>
      }
      {
        (uploadButtonRefObject.current?.files.length > 0) &&
        <FileModule imageFiles={imageFiles} />
      }
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
