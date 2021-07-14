import Button from './Button'
import FileCard from './FileCard'
import React from 'react'

function FileModule({ imageFiles }) {
  function renderFileCards() {
    let fileCards = []
    for (const file of imageFiles) {
      fileCards.push(
        <FileCard
          key={file.objectURL}
          thumbnailURL={file.objectURL}
          filename={file.name}
          originalSize={file.size}
        />
      )
    return fileCards;
    }
  }
  
  return (
    <div className='flex flex-col flex-grow-2 justify-center items-center h-4/12 w-max mt-5 px-5 border-2 border-gray-800 bg-clip-padding box-border rounded-md top-0 z-30'>
      <ul>
        {renderFileCards()}
      </ul>
    </div>
  );
}

export default FileModule
