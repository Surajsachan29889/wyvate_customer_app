"use client"

import React, {useState} from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdNotificationsOutline } from "react-icons/io";
import { SlLocationPin } from "react-icons/sl";
import { IoMdArrowDropdown } from "react-icons/io";
import UserLocation from "./UserLocation";
import { poppins } from "../fonts";
import { useRouter } from "next/navigation";
import { MdOutlineLocationOff } from "react-icons/md";



const Header = () => {

  const router = useRouter()
  const [cancelbtn, setCancelBtn] = useState(false);
  const [location, setLocation] = useState("Select Location")
  const [permissionError, setPermissionError] = useState("")

  const shortenLocation = (address, limit) => {
    if (address.length > limit) {
      return address.slice(0, limit) + "...";
    }
    return address;
  };

  const handleCancel = (btnPop) => {
    setCancelBtn(btnPop);
    // locationDrop(btnPop)

  };

   
  return (
   <div className="select-none md:w-[30rem] mx-auto">
     <div className="flex justify-between p-2 text-black sele">
      <div className="flex items-center gap-1">
      <div className="">
        {/* <SlLocationPin size={25} color={`${permissionError ? "red" : "#25bd80"}`} /> */}
        {permissionError ?  <MdOutlineLocationOff size={25} color= "red" /> : <SlLocationPin size={25} color="#25bd80" /> }
       

      </div>
      <div className="">
      <h6 className={`text-[10px] pt-1 text-zinc-600`}>Location</h6>
        <div onClick={() => {
          setCancelBtn(!cancelbtn)  
          // locationDrop(!cancelbtn)
   
}} className="flex gap-1 cursor-pointer">      
          <h6 className={`text-sm ${location === "No Location Detected" ? "text-red-500" : "text-zinc-700"}`}>{shortenLocation(location, 20)}</h6>

          <IoMdArrowDropdown size={20}/>
        </div>

      </div>

      </div>
      <div>
        <IoMdNotificationsOutline onClick={() => router.push("/notifications")} size={25} />
      </div>

     
    </div>

    <div>
          <UserLocation gettingPermissionError={setPermissionError} btnPop={cancelbtn} handleCancel={handleCancel} gettingLocation={setLocation}/>
        </div>
   </div>
  );
};

export default Header;
