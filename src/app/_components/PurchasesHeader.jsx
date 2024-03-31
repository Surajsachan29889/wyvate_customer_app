"use client"
import React from 'react'
import { IoIosHeartEmpty } from "react-icons/io";
import { IoShareSocialOutline } from "react-icons/io5";
import { BsTelephone } from "react-icons/bs";
import { MdArrowBackIos } from "react-icons/md";
import { useRouter } from 'next/navigation';


const PurchasesHeader = () => {

  const router = useRouter()
  return (
    <>
        <div className='py-5 md:max-w-[30rem] mx-auto shadow'>
        <div className='flex items-center justify-between mx-5'>
            <div>
                <MdArrowBackIos onClick={() => router.back()} size={25} />
            </div>

            
        </div>
        </div>
    </>
  )
}

export default PurchasesHeader
