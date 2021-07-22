import React, { useEffect, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleDown } from '@fortawesome/free-solid-svg-icons'
import fileDownload from 'js-file-download'

const BYTES_TO_KILOBYTES = 1000
const MIN_SIZE_DIFFERENCE_BYTES = 500
const N_DECIMAL_POINTS = 2

function FileCard({ image }) {
  const [ imageSource, setImageSource ] = useState(URL.createObjectURL(image))

  function checkSizeDifference(originalSize: number, finalSize: number, minimumDifference: number) {
    return ((originalSize - finalSize) >= minimumDifference);
  }
  
  function onError() {
    setImageSource(URL.createObjectURL(image))
  }

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(imageSource)
    }
  })
  
  return (
    <li className='flex flex-row justify-start items-center w-full p-4 float-left box-border border-b-2 last:border-b-0'>
      <div className='w-16 h-10 mx-5 border border-white overflow-hidden'>
        <img
          className='w-full h-full align-bottom object-contain'
          src={imageSource}
          onError={onError}
        />
      </div>
      <div>
        <span className='max-w-2xs block whitespace-nowrap overflow-ellipsis text-gray-800 font-semibold'>
          {image.name}
        </span>
        <span className='max-w-2xs my-1 block whitespace-nowrap overflow-ellipsis text-gray-800 font-semibold'>
          {
            checkSizeDifference(image.originalSize, image.compressedSize, MIN_SIZE_DIFFERENCE_BYTES)
            ? `${(image.originalSize / BYTES_TO_KILOBYTES).toFixed(N_DECIMAL_POINTS)} KB → ${(image.compressedSize / BYTES_TO_KILOBYTES).toFixed(N_DECIMAL_POINTS)} KB`
            : 'File was already compressed!'
          }
        </span>
      </div>
      {
        // Make sure the file's been compressed before showing the download button
        image.wasCompressed &&
        <div className='justify-self-end mx-end-row text-2xl cursor-pointer'>
          {/* @ts-ignore */}
          <a onClick={() => fileDownload(image as Blob, `${image.referenceName}_compressed${image.fileExtension}`)}>
            <FontAwesomeIcon icon={faArrowCircleDown} />
          </a>
        </div>
      }
    </li>
  );
}

export default FileCard
