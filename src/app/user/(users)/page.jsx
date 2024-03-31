"use client"
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { GoPencil } from "react-icons/go";
import { BiSupport } from "react-icons/bi";
import { FaRegQuestionCircle } from "react-icons/fa";
import { MdOutlineSettings } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { MdPayment } from "react-icons/md";
import Link from "next/link";
import { getAuth, signOut } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { app, dbfs } from "../../firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { RiStackshareLine } from "react-icons/ri";
// import { useDispatch } from "react-redux";
// import {username, userphone} from '../../store/userdetailslice'

import { Ripple } from 'primereact/ripple';


        
import axios from "axios";
import DialogBox from "@/app/_components/DialogBox";

const User = () => {
  const router = useRouter();

  const [userPhonePayload, setUserPhonePayload] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [openDialog, setOpenDialog] = useState(false)


  const logout = () => {
    setOpenDialog(true)
  };

  
  // getting the current user
  useEffect(() => {
    const auth = getAuth(app);

    let curUser = auth.onAuthStateChanged((user) => {
      if (user) {
        const originalPhoneNumber = user.phoneNumber; 
        const trimmedPhoneNumber = originalPhoneNumber.substring(3);
        setUserPhonePayload(trimmedPhoneNumber);
        console.log(trimmedPhoneNumber)
      } else {
        setUserPhonePayload(null);
      }
    });
  }, []);

  
  // Getting the USERnAME AND PHONE NUMBER FROM API
  useEffect(() => {

    const fetchData = async() => {
      try{

        if (userPhonePayload !== '') {
          const url = "https://wyvate-backend-s217.onrender.com/getDetails/user";
          const response = await axios.post(url, {
            phoneNumber: userPhonePayload
          });

          setUserName(`${response.data.user.first_name} ${response.data.user.last_name}`);
          setUserPhone(response.data.user.phone_number);
          localStorage.setItem("userData", JSON.stringify({name:`${response.data.user.first_name} ${response.data.user.last_name}`, phone:  response.data.user.phone_number}))
          console.log(response.data)
        }
      }catch(error){
        console.error(error)
      }
     }
    
    fetchData()

  }, [userPhonePayload])


  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
  
    if(userDataString){
      const userData = JSON.parse(userDataString);
      const userName = userData?.name;
      const userPhone = userData?.phone;
    setUserName(userName)
    setUserPhone(userPhone)
    }
  }, [])

  return (
       <div className="md:max-w-[30rem] mx-auto select-none">
      <Toaster toastOptions={{ duration: 1000 }} />
      <h1 className="text-center text-base p-4 shadow-lg">
        My Account
      </h1>

    { openDialog === false && <div>
      <div className="flex items-center  p-5 justify-around gap-2">
        <div className="flex items-center gap-4">
        <FaUserCircle  size={60} />
        <div className="text-black">
          <h2 className=" text-black text-base">{userName}</h2>
          <div className="flex items-center gap-2">
            <FiPhone color="#10b981" />
            <span className="font-medium text-xs">+91 {userPhone}</span>
          </div>
        </div>
        </div>
        <Link href="/user/profile">
       <div className="bg-emerald-100 rounded-full p-2">
       <GoPencil color="#10B981" size={25} />
       </div>
       </Link>
      </div>

      <div className="p-2 space-y-2 rounded-lg pt-8 h-full">
            
            <div  onClick={() => router.push("/user/support")} className="border-[1px] border-zinc-300 rounded-md border-solid p-4 gap-4 flex items-center p-ripple">
                <BiSupport color="#10B981" size={25} />
                <span className="text-sm text-zinc-700">Customer Support</span>
                <Ripple
        pt={{
            root: { style: { background: 'rgba(9, 194, 126, 0.2)' } }
        }}
    />
    
            </div>

        <div onClick={() => router.push("/terms")} className="p-ripple border-[1px] border-zinc-300 rounded-md border-solid p-4 gap-4 flex items-center">
          <FaRegQuestionCircle color="#10B981" size={25} />
          <span className="text-sm text-zinc-700">Terms of Use</span>
          <Ripple
        pt={{
            root: { style: { background: 'rgba(9, 194, 126, 0.2)' } }
        }} />
        </div>

          {/* <div onClick={() => router.push("/user/settings")} className="border-[1px] border-zinc-300 rounded-md border-solid p-4 gap-4 flex items-center">
            <MdOutlineSettings color="#10B981" size={25} />
            <span className="text-sm text-zinc-700">Setting</span>
          </div> */}
        

        <div
          onClick={() => logout()}
          className="border-[1px] border-zinc-300 rounded-md border-solid p-4 gap-4 flex items-center cursor-pointer p-ripple"
        >
          <MdLogout color="#10B981" size={25} />
          <span className="text-sm text-zinc-700">Logout </span>
          <Ripple
        pt={{
            root: { style: { background: 'rgba(9, 194, 126, 0.2)' } }
        }} />
        </div>
      </div>
    </div>}

{     openDialog === true && <div className="my-10">
  <DialogBox open={openDialog} setOpenDialog={setOpenDialog} userName={userName}/>
</div>
}    </div>
   
  );
};

export default User;
