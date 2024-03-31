import React from 'react'
import reslogo1 from '../images/reslogo1.webp'
import reslogo2 from '../images/reslogo2.webp'
import Image from 'next/image'

const Notifications = () => {
 

    return (
   <>
     <div className='mt-5 space-y-8'>
     <div className='flex items-center justify-center gap-2'>
            <div>
                <Image src={reslogo2} alt='rest-logo' width={400} height={400} className='rounded-lg w-11'/>
            </div>
            <div className='text-sm'>
                <h2 className='font-semibold'>Your Order is prepared</h2>
                <span className='text-zinc-500'>Today at 5:13 | Motimahal Deluxe</span>
            </div>
      </div>
     <div className='flex items-center justify-center gap-2'>
            <div>
                <Image src={reslogo1} alt='rest-logo' width={400} height={400} className='rounded-lg w-11'/>
            </div>
            <div className='text-sm'>
                <h2 className='font-semibold'>Your Order is delivered</h2>
                <span className=''>Today at 3:13 | Motimahal Deluxe</span>
            </div>
      </div>
     <div className='flex items-center justify-center gap-2'>
            <div>
                <Image src={reslogo1} alt='rest-logo' width={400} height={400} className='rounded-lg w-11'/>
            </div>
            <div className='text-sm'>
                <h2 className='font-semibold'>Your Order is delivered</h2>
                <span className=''>Today at 3:13 | Motimahal Deluxe</span>
            </div>
      </div>
     </div>
   </>
  )
}

export default Notifications
