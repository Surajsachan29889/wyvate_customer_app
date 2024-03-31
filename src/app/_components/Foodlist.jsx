import React from 'react'
import Image from "next/image";
import burger from '../images/burger.jpg'

const Foodlist = ({handleAddPopUp}) => {

  const addItemButton = () => {
         handleAddPopUp(true)
  }
  return (
    <div>
        <div className='mt-5'>
           <h2 className="font-semibold pl-2 lg:text-lg text-base border-l-4 border-solid border-emerald-400">
              Recommended
            </h2>
            <div className='flex justify-between mt-5'>
            <div className='space-y-4'>
               <div className='border-solid w-fit p-1 border-emerald-500 rounded-lg border-[2px] '>
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
               </div>
                <h2 className='text-[0.8rem] font-semibold'>Paneer Makhna Roti with chhole</h2>
                 <h3 className='font-semibold'> ₹ 212</h3>
            </div>
            <div className='relative'>
  <Image className='w-[6rem] rounded-lg' src={burger} alt='burger' width={300} height={300} />
  <button onClick={addItemButton} className='absolute bg-white bottom-[-8px] left-1/2 transform -translate-x-1/2 border-[1px] border-emerald-500 border-solid rounded text-emerald-500 px-3 py-1 text-sm'>+ADD</button>
</div>
            </div>
            <div className='flex justify-between mt-5'>
            <div className='space-y-4'>
               <div className='border-solid w-fit p-1 border-emerald-500 rounded-lg border-[2px] '>
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
               </div>
                <h2 className='text-[0.8rem] font-semibold'>Paneer Makhna Roti with chhole</h2>
                 <h3 className='font-semibold'> ₹ 212</h3>
            </div>
            <div className='relative'>
  <Image className='w-[6rem] rounded-lg' src={burger} alt='burger' width={300} height={300} />
  <button className='absolute bg-white bottom-[-8px] left-1/2 transform -translate-x-1/2 border-[1px] border-emerald-500 border-solid rounded text-emerald-500 px-3 py-1 text-sm'>+ADD</button>
</div>
            </div>
            <div className='flex justify-between mt-5'>
            <div className='space-y-4'>
               <div className='border-solid w-fit p-1 border-emerald-500 rounded-lg border-[2px] '>
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
               </div>
                <h2 className='text-[0.8rem] font-semibold'>Paneer Makhna Roti  with chhole</h2>
                 <h3 className='font-semibold'> ₹ 212</h3>
            </div>
            <div className='relative'>
  <Image className='w-[6rem] rounded-lg' src={burger} alt='burger' width={300} height={300} />
  <button className='absolute bg-white bottom-[-8px] left-1/2 transform -translate-x-1/2 border-[1px] border-emerald-500 border-solid rounded text-emerald-500 px-3 py-1 text-sm'>+ADD</button>
</div>

            </div>
           </div>
    </div>
  )
}

export default Foodlist
