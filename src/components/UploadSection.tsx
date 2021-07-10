import Button from './Button'
import React from 'react'

function UploadSection() {
  return (
    <div className='flex flex-col items-center h-7/12 w-6/12 bg-white rounded-md z-10'>
      <div className='flex flex-col flex-grow-2 justify-center items-center h-4/12 w-max mt-5 px-5 border-2 border-dashed border-gray-800 bg-clip-padding box-border rounded-md top-0 z-30'>
        <span className='font-bold'>Drop your .jpg or .png files here!</span>
        <p className='text-sm'>Resize an unlimited amount of images with zero file size limits.</p>
        <Button 
          text='Select files...'
        />
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
