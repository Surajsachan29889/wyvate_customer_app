"use client"
import React from 'react'
import { IoIosHeartEmpty } from "react-icons/io";
import { IoShareSocialOutline } from "react-icons/io5";
import { BsTelephone } from "react-icons/bs";
import { MdArrowBackIos } from "react-icons/md";
import { useRouter } from 'next/navigation';


const ExploreHeader = () => {

  const router = useRouter()
  return (
    <>
        <div className='py-5 md:max-w-[30rem] mx-auto shadow'>
        <div className='flex items-center justify-between mx-5'>
            <div>
                <MdArrowBackIos onClick={() => router.back()} size={25} />
            </div>

            <div className='flex gap-4 items-center'>
                <IoIosHeartEmpty  size={25} color="#09C27E"/>
                <IoShareSocialOutline  size={25} color="#09C27E"/>
                <BsTelephone
  size={25}
  color="#09C27E"
/>

            </div>
        </div>
        </div>
    </>
  )
}

export default ExploreHeader
