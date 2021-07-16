import 'regenerator-runtime/runtime'

import * as PNG from 'upng-js'

import React, { useEffect, useRef, useState } from 'react'

import { Buffer } from 'buffer'
import Button from './Button'
import Compressor from 'compressorjs'
import FileModule from './FileModule'
import { isEqual } from 'lodash'
import usePrevious from '../hooks/usePrevious'
import useRefWithEventListener from '../hooks/useRefWithEventListener'

function UploadSection() {
  const [ imageFiles, setImageFiles ] = useState<Map<string, ImageFile> | null>(null)

  const prevImageFiles = usePrevious(imageFiles)
  const [ uploadButtonRefObject, uploadButtonRef ] = useRefWithEventListener(processImage)

  async function compressImage(file: File): Promise<ImageFile> {
    return new Promise<ImageFile>((resolve, reject) => {
      new Compressor(file, {
        quality: 0.3,
        success: result => {
          const image = result as ImageFile
          image.compressedSize = image.size
          image.objectURL = URL.createObjectURL(image)
          image.originalSize = file.size
          image.referenceName = file.name
          image.wasCompressed = true
          resolve(image)
        },
        error: reject,
      })
    });
  }

  async function compressPNG(file: File, paletteSize=256): Promise<ImageFile> {
    return new Promise(async resolve => {
      // Convert File type to raw binary data for compression
      let rawData = await new Promise(async resolve => {
        const reader = new FileReader()
        reader.onload = function() {
          resolve(Buffer.from(this.result as ArrayBuffer))
        }
        reader.readAsArrayBuffer(file)
      })
      
      const png = PNG.decode(rawData)
      let compressedPNG = PNG.encode([ PNG.toRGBA8(png)[0] ], png.width, png.height, paletteSize)
      
      let image: any = Buffer.from(compressedPNG)
      // @ts-ignore
      image = new Blob([ new Uint8Array(rawData, rawData.byteOffset, rawData.byteLength / Uint8Array.BYTES_PER_ELEMENT) ])
      image = image as ImageFile
      
      image.compressedSize = image.size
      image.objectURL = URL.createObjectURL(image)
      image.originalSize = file.size
      image.referenceName = file.name
      image.wasCompressed = true
      
      resolve(image)
    });
  }

  async function processImage(e: HTMLInputEvent): Promise<void> {
    const latestFile = e.target.files.item(e.target.files.length - 1)
    const image = /.png$/i.test(latestFile.name) ? await compressPNG(latestFile) : await compressImage(latestFile)
    
    setImageFiles(prevState => {
      const nextState = new Map(prevState)
      nextState.set(image.referenceName, image)
      return nextState;
    })
  }
  
  useEffect(() => {
    return () => {
      // Revoke objectURLs on dismount to avoid memory leaks
      if (imageFiles && !isEqual(prevImageFiles, imageFiles)) {
        for (const [ _, image ] of imageFiles.entries()) {
          URL.revokeObjectURL(image.objectURL)
        }
      }
    }
  }, [ imageFiles ])
  
  return (
    <div className='flex flex-col items-center h-7/12 w-full-send bg-white rounded-md z-10'>
      <input type='file' id='upload-button' ref={uploadButtonRef} hidden />
      {
        (imageFiles === null || uploadButtonRefObject.current?.files.length === 0) &&
        <div className='flex flex-col flex-grow-2 justify-center items-center h-4/12 w-golden mt-5 px-5 border-2 border-dashed border-gray-800 bg-clip-padding box-border rounded-md top-0 z-30'>
          <span className='font-bold'>Drop your .jpg or .png files here!</span>
          <p className='text-sm'>Resize an unlimited amount of images with zero file size limits.</p>
          <label
            htmlFor='upload-button'
            className='box-border inline-block bg-indigo-600 hover:bg-indigo-500 py-3 px-4 mx-5 rounded-lg text-lg text-white font-bold mt-5 cursor-pointer'
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
        <label
          htmlFor='upload-button'
          className='box-border inline-block bg-indigo-600 hover:bg-indigo-500 py-3 px-4 mx-5 rounded-lg text-lg text-white font-bold mt-5 cursor-pointer'
        >
          Add files
        </label>
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
