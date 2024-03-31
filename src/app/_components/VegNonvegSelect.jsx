import React from 'react'

const VegNonvegSelect = () => {
  return (
    <div>
       <div className='example mt-5 flex items-center gap-4 overflow-scroll'>
              <div className='flex items-center gap-2 border-solid border-zinc-300 rounded-lg border-2 min-w-fit p-1'>
                <div className='border-solid w-fit p-1 border-emerald-500 rounded-lg border-[2px] '>
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                </div>
                <span className='text-[12px]'>Veg</span>
              </div>
              <div className='flex items-center gap-2 border-solid border-zinc-300 rounded-lg border-2 min-w-fit p-1'>
                <div className='border-solid w-fit p-1 border-red-500 rounded-lg border-[2px] '>
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                </div>
                <span className='text-[12px]'>Non Veg</span>
              </div>
              <div className='flex items-center gap-2 border-solid border-zinc-300 rounded-lg border-2 min-w-fit p-1'>
                <div className='border-solid w-fit p-1 border-yellow-500 rounded-lg border-[2px] '>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                </div>
                <span className='text-[12px]'>Eggeterian</span>
              </div>
            </div>
    </div>
  )
}

export default VegNonvegSelect
