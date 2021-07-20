import React, { useEffect, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';

function FileCard({ image }) {
  const [ imageSource, setImageSource ] = useState(URL.createObjectURL(image))

  function onError() {
    setImageSource(URL.createObjectURL(image))
  }

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(imageSource)
    }
  })
  
  return (
    <li className='flex flex-row justify-start items-center w-full p-4 float-left box-border last:border-b-0'>
      <div className='w-16 h-10 mx-5 border border-white overflow-hidden'>
        <img
          className='w-full h-full align-bottom object-contain'
          src={imageSource}
          onError={onError}
        />
      </div>
      <div className=''>
        <span className='max-w-2xs block whitespace-nowrap overflow-ellipsis text-gray-800 font-semibold'>
          {image.referenceName}
        </span>
        <span className='max-w-2xs my-1 block whitespace-nowrap overflow-ellipsis text-gray-800 font-semibold'>
          {(image.originalSize / 1000).toFixed(2)} KB {image.compressedSize ? '→ ' + (image.compressedSize / 1000).toFixed(2) + ' KB': null}
        </span>
      </div>
      {
        // Make sure the file's been compressed before showing the download button
        image.wasCompressed &&
        <div className='justify-self-end mx-end-row text-2xl cursor-pointer'>
          <FontAwesomeIcon icon={faArrowCircleDown} />
        </div>
      }
    </li>
  );
}

export default FileCard
