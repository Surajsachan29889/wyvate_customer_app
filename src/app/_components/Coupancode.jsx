import React from 'react'
import { TbDiscount2 } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";

const Coupancode = () => {
  return (
    <div>
     <div className='example flex items-center gap-2  overflow-scroll'>
    
     <div className='flex bg-white items-center min-w-[200px] rounded-xl border border-zinc-300'>
        <TbDiscount2 size={50} color='#26D084'/>
        <div className='bg-zinc-100 rounded p-2'>
            <h2 className='font-semibold text-sm'>20% Off upto ₹80</h2>
            <span className='text-xs lg:text-sm'>use code HURRY</span>
        </div>
      </div>
     <div className='flex bg-white items-center min-w-[200px] rounded-xl border border-zinc-300'>
        <TbDiscount2 size={50} color='#26D084'/>
        <div className='bg-zinc-100 rounded p-2'>
            <h2 className='font-semibold text-sm'>20% Off upto ₹80</h2>
            <span className='lg:text-sm text-xs'>use code HURRY</span>
        </div>
      </div>
   
    
   
    
     </div>

      <div className="flex justify-center relative items-center gap-5 pt-5">
            <FiSearch
              className="absolute sm:top-7 left-3"
              color="#09C27E"
              size={25}
            />
            <input
              className="p-2 w-full bg-zinc-100 pl-10 rounded-md border-[1px] border-solid border-zinc-400"
              type="text"
              placeholder="Search menu"
            />
           
          </div>
    </div>
  )
}

export default Coupancode
