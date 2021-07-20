import FileCard from './FileCard'
import React from 'react'
import uniqid from 'uniqid'

function FileModule({ imageFiles }) {
  function renderFileCards() {
    let fileCards = []
    for (const [ _, image ] of imageFiles.entries()) {
      fileCards.push(
        <FileCard
          key={uniqid()}
          image={image}
        />
      )
    }
    
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
