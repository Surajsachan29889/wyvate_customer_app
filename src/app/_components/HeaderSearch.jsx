"use client"

import React, {useState} from "react";
import { FaLocationDot } from "react-icons/fa6";
import { TiDeleteOutline } from "react-icons/ti";
import { SlLocationPin } from "react-icons/sl";
import { IoMdArrowDropdown } from "react-icons/io";
import UserLocation from "./UserLocation";
import { poppins } from "../fonts";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";



const HeaderSearch = () => {

  const router = useRouter()
  const pathname = usePathname()
  console.log(pathname)

  const [cancelbtn, setCancelBtn] = useState(false);
  const [location, setLocation] = useState("Select Location")

  const shortenLocation = (address, limit) => {
    if (address.length > limit) {
      return address.slice(0, limit) + "...";
    }
    return address;
  };

  const handleCancel = (btnPop) => {
    setCancelBtn(btnPop);

  };

  const gotoBack = ()=> {
        router.back()
  }


  
  return (
   <div className="shadow">
     <div className="flex justify-between items-center p-2 text-black">
      <div className="flex items-center gap-1">
      <div className="">
        <SlLocationPin size={25} color="#09C27E" />
      </div>
      <div className="">
        <h6 className={`text-[10px] pt-1 ${poppins.className}`}>Location</h6>
        <div onClick={() => {
          setCancelBtn(!cancelbtn)  
   
}} className="flex gap-1 cursor-pointer">      
          <h6 className={`${poppins.className} text-sm font-semibold`}>{shortenLocation(location, 20)}</h6>

          <IoMdArrowDropdown size={20}/>
        </div>

      </div>

      </div>
      <div>
        <TiDeleteOutline onClick={gotoBack} color="#10b981" size={25} />
      </div>

     
    </div>

    <div>
          <UserLocation btnPop={cancelbtn} handleCancel={handleCancel} gettingLocation={setLocation}/>
        </div>
   </div>
  );
};

export default HeaderSearch;
