import React from 'react'
import { poppins } from '../fonts'
import { MdNavigateNext } from "react-icons/md";


const ItemsSelected = () => {
  return (
    <>
          <div className="bg-zinc-700 rounded-t-3xl flex items-center justify-around fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full p-3">
               
                  <div className={`${poppins.className} bg-emerald-500 rounded-lg text-white font-serif text-lg w-full p-1.5 flex items-center justify-between`}>
                   <div  className='flex flex-col pl-2'>
                   <span>2 ITEMS</span>
                    <span className='font-semibold'>₹248</span>
                   </div>

                   <div className='flex items-center gap-2 cursor-pointer'>
                    Next <MdNavigateNext size={25}/>
                   </div>
                  </div>
            </div>
    </>
  )
}

export default ItemsSelected
