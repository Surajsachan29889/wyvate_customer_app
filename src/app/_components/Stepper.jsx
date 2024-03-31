"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import accept from '../images/accept.png'
import acceptd from '../images/accept_d.png'

const Stepper = ({status}) => {

    return (
    <div>
       <div>
            <div className="h-[2px] w-[16rem] md:w-full mx-auto bg-zinc-400 rounded flex relative">
              <div
                className="flex items-center cursor-pointer"
              >
                <div
                  className={`h-[100%] ${
                    status >= 3 ? " bg-emerald-600" : "bg-zinc-400"
                  } w-[33.3%] rounded-full shadow-lg absolute left-0`}
                ></div>
                <Image
                  src={accept}
                  alt=""
                  width={25}
                  height={25}
                  className="absolute w-7 left-0 shadow-xl rounded-full"
                />
                <h1 className="absolute left-[-17px] text-[10px] md:text-sm top-7 z-10">
                  Confirmed
                </h1>
              </div>

              <div
                className="flex items-center cursor-pointer"
              >
                <div
                  className={` ${
                    status >= 4 ? " bg-green-800" : "bg-zinc-400"
                  } h-[100%] 0 w-[33.3%] rounded-full absolute left-[33.3%]`}
                ></div>
                <Image
                  src={status >= 3 ? accept : acceptd}
                  alt=""
                  width={25}
                  height={25}
                  className="absolute w-7 left-[33.3%]"
                />
                <h1 className="absolute left-[30.3%] text-[10px] md:text-sm top-7 z-10">
                  Preparing
                </h1>
              </div>

              <div
                className="flex items-center cursor-pointer"
              >
                <div
                  className={`${
                    status >= 5 ? "bg-green-800" : "bg-zinc-400"
                  } h-[100%] w-[33.3%] rounded-full absolute left-[66.6%]`}
                ></div>
                <Image
                  src={status >= 4 ? accept : acceptd}
                  alt=""
                  width={25}
                  height={25}
                  className="absolute w-7 left-[66.6%]"
                />
                <h1 className="absolute w-8 left-[65.6%] text-[10px] md:text-sm top-7 z-10">
                  Ready
                </h1>
              </div>

              <div
                className="flex items-center cursor-pointer"
              >
                <Image
                  src={status >= 5 ? accept : acceptd}
                  alt=""
                  width={25}
                  height={25}
                  className="absolute w-7 left-[99.9%]"
                />
                <h1 className="absolute left-[95.9%] text-[10px] md:text-sm top-7 z-10">
                  Delivered
                </h1>
              </div>
            </div>
          </div>
    </div>
  )
}

export default Stepper
