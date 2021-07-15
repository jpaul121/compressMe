import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';

function FileCard({ compressedSize, filename, thumbnailURL, originalSize }) {
  return (
    <li className='flex flex-row justify-start items-center w-full p-4 float-left box-border last:border-b-0'>
      <div className='w-16 h-10 mx-5 border border-white overflow-hidden'>
        <img
          className='w-full h-full align-bottom object-contain'
          src={thumbnailURL}
        />
      </div>
      <div className=''>
        <span className='max-w-2xs block whitespace-nowrap overflow-ellipsis text-gray-800 font-semibold'>
          {filename}
        </span>
        <span className='max-w-2xs my-1 block whitespace-nowrap overflow-ellipsis text-gray-800 font-semibold'>
          {(originalSize / 1000).toFixed(2)} KB → {compressedSize} KB
        </span>
      </div>
      <div className='justify-self-end mx-end-row text-2xl cursor-pointer'>
        <FontAwesomeIcon icon={faArrowCircleDown} />
      </div>
    </li>
  );
}

export default FileCard
