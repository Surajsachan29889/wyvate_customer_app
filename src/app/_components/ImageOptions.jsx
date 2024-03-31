import React from 'react'

const ImageOptions = ({handleUploadClick}) => {
 
    return (
        <>
       
    <div className='shadow-lg absolute top-[95px] rounded-lg bg-zinc-100 w-[150px] h-[100px] space-y-4 flex flex-col items-center justify-center'>
   
    <div className='top-[-14px] right-0 left-0 mx-auto absolute'
      style={{
        width: 0,
        height: 0,
        borderLeft: '15px solid transparent',
        borderRight: '15px solid transparent',
        borderBottom: '15px solid #F4F4F5',
      }}
    ></div>
     
      <h2 onClick={handleUploadClick} className='font-medium text-base cursor-pointer'>Change Photo</h2>
      <h2 className='text-base font-medium text-red-500 cursor-pointer'>Delete Photo</h2>
    </div>
    </>
  )
}

export default ImageOptions
