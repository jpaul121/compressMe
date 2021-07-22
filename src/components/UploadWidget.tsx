import 'regenerator-runtime/runtime'

import * as PNG from 'upng-js'

import React, { useState } from 'react'

import { Buffer } from 'buffer'
import Button from './Button'
import Compressor from 'compressorjs'
import FileModule from './FileModule'
import useRefWithEventListener from '../hooks/useRefWithEventListener'

const IMAGE_QUALITY_PCT_CEILING = 100
const IMAGE_QUALITY_PCT_FLOOR = 0
const PALETTE_SIZE_CEILING = 255
const PALETTE_SIZE_FLOOR = 10
const QUALITY_MAP_SLOPE = (PALETTE_SIZE_CEILING - PALETTE_SIZE_FLOOR) / (IMAGE_QUALITY_PCT_CEILING - IMAGE_QUALITY_PCT_FLOOR)

function UploadWidget({ imageQuality, maxHeight, maxWidth, toggleSettingsModal }) {
  const [ imageFiles, setImageFiles ] = useState<Map<string, ImageFile> | null>(null)

  const [ uploadButtonRefObject, uploadButtonRef ] = useRefWithEventListener(processImage)

  function castAsImageFile(blob: Blob, originalFile: File): ImageFile {
    const image = blob as ImageFile
    
    image.compressedSize = image.size
    image.fileExtension = originalFile.name.substring(originalFile.name.lastIndexOf('.'))
    image.name = originalFile.name
    image.originalSize = originalFile.size
    image.referenceName = originalFile.name.substring(0, originalFile.name.lastIndexOf('.'))
    
    return image;
  }
  
  function clearImages(e: HTMLInputEvent): void {
    e.preventDefault()
    setImageFiles(null)
  }

  async function compressImage(file: File, imageQuality: number, maxHeight: number | null, maxWidth: number | null): Promise<ImageFile> {
    return new Promise<ImageFile>((resolve, reject) => {
      new Compressor(file, {
        quality: imageQuality / 100,
        maxHeight: maxHeight ? maxHeight : Infinity,
        maxWidth: maxWidth ? maxWidth : Infinity,
        success: result => {
          const image = castAsImageFile(result, file)
          image.wasCompressed = true
          resolve(image)
        },
        error: reject,
      })
    });
  }

  async function compressPNG(file: File, imageQuality: number, maxHeight: number | null, maxWidth: number | null): Promise<ImageFile> {
    // Map the percentage value of image quality chosen by the user to a palette size ranging
    // from 10 to 255, which UPNG.js expects in order to determine the quality of the compressed image. 
    const paletteSize = PALETTE_SIZE_FLOOR + Math.floor(QUALITY_MAP_SLOPE * (imageQuality - IMAGE_QUALITY_PCT_FLOOR))
    
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
      let compressedPNG = PNG.encode([ PNG.toRGBA8(png)[0] ], maxWidth ? maxWidth : png.width, maxHeight ? maxHeight : png.height, paletteSize)
      
      let image: any = Buffer.from(compressedPNG)
      // @ts-ignore
      image = new Blob([ new Uint8Array(rawData, rawData.byteOffset, rawData.byteLength / Uint8Array.BYTES_PER_ELEMENT) ])
      image = castAsImageFile(image, file)
      image.wasCompressed = true
      
      resolve(image)
    });
  }

  async function processImage(e: HTMLInputEvent): Promise<void> {
    const latestFile = e.target.files.item(e.target.files.length - 1)
    if (latestFile) {
      const image = /.png$/i.test(latestFile.name)
      ? await compressPNG(latestFile, imageQuality, maxHeight, maxWidth)
      : await compressImage(latestFile, imageQuality, maxHeight, maxWidth)
      
      setImageFiles(prevState => {
        const nextState = new Map(prevState)
        nextState.set(image.referenceName, image)
        return nextState;
      })
    }
  }
  
  return (
    <div className='flex flex-col items-center h-7/12 w-full-send bg-white rounded-md z-10'>
      <input type='file' id='upload-button' ref={uploadButtonRef} accept='image/*' hidden />
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
        (imageFiles !== null && uploadButtonRefObject.current?.files.length > 0) &&
        <FileModule
          imageFiles={imageFiles}
        />
      }
      <div className='flex w-max mb-5'>
        <label
          htmlFor='upload-button'
          className='box-border inline-block bg-indigo-600 hover:bg-indigo-500 py-3 px-4 mx-5 rounded-lg text-lg text-white font-bold mt-5 cursor-pointer'
        >
          Add files
        </label>
        <Button
          onClick={clearImages}
          text='Clear all'
        />
        <Button
          onClick={toggleSettingsModal}
          text='Settings'
        />
      </div>
    </div>
  );
}

export default UploadWidget
