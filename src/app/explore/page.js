"use client"
import React from "react";
import Image from "next/image";
import restlogo from "../images/rest_lgo.png";
import res3 from "../images/res3.png";
import { LuClock } from "react-icons/lu";
import aicon from '../images/aicon.png'
import { useRouter } from "next/navigation";


const Page = () => {

  const router = useRouter()
  const gotoPlace = () => {
         router.push("/explore/placename")
  }
  return (
    <div className="md:max-w-[30rem] mx-auto">

      {/* Filter buttons */}
      <div className="example flex gap-2 mt-5 ml-2 mr-2 overflow-x-scroll">
        <button className="bg-emerald-500 text-white rounded-2xl px-4 text-sm p-1">
          All
        </button>
        <button className="bg-zinc-200 text-zinc-500 rounded-2xl px-4 text-sm p-1">
          Foodcourts
        </button>
        <button className="bg-zinc-200 text-zinc-500 rounded-2xl font-thin px-4 text-sm p-1">
          Bakery
        </button>
        <button className="bg-zinc-200 text-zinc-500 rounded-2xl px-4 text-sm p-1">
          Restraunts
        </button>
        <button className="bg-zinc-200 text-zinc-500 rounded-2xl px-4 text-sm p-1">
          Gym
        </button>
        <button className="bg-zinc-200 text-zinc-500 rounded-2xl px-4 text-sm p-1">
          Foodcourts
        </button>
        <button className="bg-zinc-200 text-zinc-500 rounded-2xl px-4 text-sm p-1">
          Foodcourts
        </button>
        <button className="bg-zinc-200 text-zinc-500 rounded-2xl px-4 text-sm p-1">
          Foodcourts
        </button>
      </div>

{/* Hotels to show */}
      <div className="p-4">
      <div onClick={gotoPlace} className="mt-5 cursor-pointer mx-auto bg-zinc-100 rounded-lg space-x-2 p-4 flex gap-2">
                <div className="flex gap-4 bg-white p-3 rounded">
                  <Image className=" w-[2.5rem] object-contain" src={restlogo} width={40} height={40} alt="img" />
                </div>

              {/* Schedule Time Design */}
              <div className="text-[10px] lg:text-sm space-y-2">
              <div className="flex flex-col">
                    <span className="text-sm text-zinc-800">
                      Moti Mahal Deluxe
                    </span>
                    <span className="text-zinc-500 text-xs">
                      ITI Park, Bengluru
                    </span>
                  </div>
               <div className="flex gap-2 items-center text-zinc-600 text-xs">
               <h4 className=" flex gap-1 items-center">
                 <LuClock size={12}/> 07:00 AM - 11:30AM 
                  
                </h4>
                <h4 className="flex gap-2 items-center">
                   <Image src={aicon} alt="a-icon" className="w-3 h-3"/> 3km
                </h4>
               </div>
              </div>
            </div>

      <div onClick={gotoPlace} className="mt-5 cursor-pointer bg-zinc-100 rounded-lg space-x-2 p-4 flex gap-2  mx-auto">
                <div className="flex gap-4 bg-white p-3 rounded">
                  <Image className=" w-[2.5rem] object-contain" src={res3} width={40} height={40} alt="img" />
                </div>

              {/* Schedule Time Design */}
              <div className="text-[10px] lg:text-sm space-y-2">
              <div className="flex flex-col">
                    <span className="text-sm text-zinc-800">
                      Moti Mahal Deluxe
                    </span>
                    <span className="text-zinc-500 text-xs font-medium">
                      ITI Park, Bengluru
                    </span>
                  </div>
               <div className="flex gap-2 items-center text-zinc-600 text-xs">
               <h4 className=" flex gap-1 items-center">
                 <LuClock size={12}/> 07:00 AM - 11:30AM 
                  
                </h4>
                <h4 className="flex gap-2 items-center">
                   <Image src={aicon} alt="a-icon" className="w-3 h-3"/> 3km
                </h4>
               </div>
              </div>
            </div>
      </div>
    </div>
  );
};

export default Page;
