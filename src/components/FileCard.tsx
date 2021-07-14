import React from 'react'

function FileCard({ compressedSize, filename, thumbnailURL, originalSize }) {
  return (
    <li className='w-full p-4 box-border last:border-b-0'>
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
          {originalSize} → {compressedSize}
        </span>
      </div>
    </li>
  );
}

export default FileCard
