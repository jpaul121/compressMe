import Button from './Button'
import FileCard from './FileCard'
import React from 'react'
import uniqid from 'uniqid'

function FileModule({ imageFiles }) {
  function renderFileCards() {
    let fileCards = []
    Object.keys(imageFiles).map(index => {
      fileCards.push(
        <FileCard
          key={uniqid()}
          thumbnailURL={imageFiles[index].objectURL}
          filename={imageFiles[index].name}
          originalSize={imageFiles[index].size}
        />
      )
    })
    
    return fileCards;
  }
  
  return (
    <div className='flex flex-col flex-grow-2 justify-start items-center h-4/12 w-golden mt-5 px-5 border-2 border-gray-800 bg-clip-padding box-border rounded-md top-0 z-30'>
      <ul className='w-full'>
        {renderFileCards()}
      </ul>
    </div>
  );
}

export default FileModule
