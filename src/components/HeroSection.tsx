import React from 'react'

function HeroSection() {
  return (
    <div className='lg:w-3/5 xl:w-2/5 flex flex-col items-start relative z-10'>
      <h3 className='font-bold sm:text-7xl text-white leading-tight mt-4'>
        Compress images online
        <br/>
        right on your browser.
      </h3>
      <p className='text-white font-bold text-lg mt-5'>
        Compress images privately and at light speed with this serverless, browser-based image compressor. Because it runs on your browser, 
        there's no need to worry about giving your pictures to shady websites or having your private data infringed upon. Because there's no need
        to upload pictures to servers, this runs 10x faster than websites like tinypng and compressor.io. 
      </p>
    </div>
  );
}

export default HeroSection
