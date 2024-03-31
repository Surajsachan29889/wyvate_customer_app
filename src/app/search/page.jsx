"use client"

import React from 'react'
import { FiSearch } from "react-icons/fi";
import { useRef } from 'react';
import { TiDeleteOutline } from "react-icons/ti";
import Image from 'next/image';
import reslogo1 from '../images/reslogo1.webp'
import reslogo2 from '../images/reslogo2.webp'
import { poppins } from '../fonts';


const Search = () => {
  
  const searchInput = useRef("")

    return (
    <>
      <div className='lg:mx-auto mx-4 mt-10 lg:max-w-[800px]'>
      <div className='search border-zinc-400 border-[1px] border-solid p-2 rounded-lg flex items-center gap-2'>
         <span><FiSearch size={20} color="#10B981"/></span>
         <input  type="text" ref={searchInput} autoComplete='on' placeholder='Search here' className='w-full outline-none text-sm' />
        <TiDeleteOutline onClick={() => searchInput.current.value = ""} color='#939393' size={25}/>
        </div>

      <div className='mt-8 space-y-5'>
      <div className='flex items-center gap-2'>
            <div>
                <Image src={reslogo1} alt='rest-logo' width={400} height={400} className='rounded-lg w-11'/>
            </div>
            <div className='text-sm'>
                <h2 className='font-semibold'>Moti Mahal Deluxe</h2>
                <span className=''>Noida</span>
            </div>
      </div>
      <div className='flex items-center gap-2'>
            <div>
                <Image src={reslogo2} alt='rest-logo' width={400} height={400} className='rounded-lg w-11'/>
            </div>
            <div className='text-sm'>
                <h2 className='font-semibold'>Las Vegas Dummy</h2>
                <span className=''>Jaipur</span>
            </div>
      </div>
      <div className='flex items-center gap-2'>
            <div>
                <Image src={reslogo1} alt='rest-logo' width={400} height={400} className='rounded-lg w-11'/>
            </div>
            <div className='text-sm'>
                <h2 className='font-semibold'>Moti Mahal Deluxe</h2>
                <span className=''>Noida</span>
            </div>
      </div>
    
      </div>
      </div>
    </>
  )
}

export default Search
