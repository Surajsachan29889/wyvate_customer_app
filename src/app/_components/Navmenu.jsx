"use client"

import React from "react";
import { MdQrCodeScanner } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { poppins } from "../fonts";
import logo from '../images/wyvate_logo.png'
import qrscan from '../images/qrscan.webp'


const Navmenu = () => {

  const router = useRouter()
  const gotoSeach = ()=> {
    router.push("/search")
  }
  return (
    <>
      <div className="shadow-lg md:w-[30rem] mx-auto">
        <div className="text-black flex justify-between p-2">
          {/* <div className="hidden">
            <Image src="logo.svg" width={120} height={120} alt="" />
          </div> */}

          <div className="flex justify-center relative items-center gap-5">
            <FiSearch
              className="absolute sm:top-2 left-1"
              color="#09C27E"
              size={25}
            />
            <div onClick={gotoSeach}
              className="p-2 w-[280px] bg-zinc-200 cursor-pointer pl-8 rounded-md"
              type="text">
              <span className={`${poppins.className} text-zinc-400 select-none`}>Search</span>
            </div>
            </div>
            <div>
              <MdQrCodeScanner  size={40} color="black"/>
            </div>
        </div>
      </div>
    </>
  );
};

export default Navmenu;
