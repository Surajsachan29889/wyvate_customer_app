"use client";
import React, { useEffect, useState } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";
import { PulseLoader } from "react-spinners";
import india from "../../images/india.png";
import Image from "next/image";
import user from "../../images/photoselection.png";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { app, dbfs } from "../../firebase";
import { useRef } from "react";
import ProfileSkelton from "@/app/_components/ProfileSkelton";
import ImageOptions from "@/app/_components/ImageOptions";
import { Ripple } from 'primereact/ripple';


const Profile = () => {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [phoneExists, setPhoneExists] = useState("");
  const [emailExists, setEmailExists] = useState("");
  const [userPhonePayload, setUserPhonePayload] = useState("");
  const [loading, setLoading] = useState(true)
  const [file, setFile] = useState("")
  const [showOptions, setShowOptions] = useState(false)
  const [data, setData] = useState({
    phoneNumber: userPhonePayload !== "" ? userPhonePayload : "",
    first_name: "",
    last_name: "",
    gender: "",
    emailAddress: "",
  });

  const [loaderEnable, setLoaderEnable] = useState(false);
  const CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
 

   // getting the current user NUMBER FROM FIREBASE
   useEffect(() => {
    const auth = getAuth(app);

    let curUser = auth.onAuthStateChanged((user) => {
      if (user) {
        const originalPhoneNumber = user.phoneNumber; 
        const trimmedPhoneNumber = originalPhoneNumber.substring(3);
        setUserPhonePayload(trimmedPhoneNumber);
        setData({...data, phoneNumber: trimmedPhoneNumber})
      } else {
        setUserPhonePayload(null);
      }
    });
  }, []);
  
  
  // GETTINGG THE USER DETAILS FROM API
  useEffect(() => {
    const fetchData = async(e) => {
      try{
          const url = "https://wyvate-backend-s217.onrender.com/getDetails/user";
          const response = await axios.post(url, {
            phoneNumber: userPhonePayload
          });

          if(response.status === 200){ 
          const phone = response?.data.user.phone_number
          const fname = response?.data.user.first_name
          const lname = response?.data.user.last_name
          const email = response?.data.user.email_address
          const gender = response?.data.user.gender
          setData({phoneNumber : phone, first_name: fname,last_name: lname, gender: gender, emailAddress:  email})
          setLoading(false)
          }
        
      }catch(error){
        console.error(error)
      }
     }
    
    fetchData()

  }, [userPhonePayload])


  const gettingDetails = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };


  const updateProfile = async(e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try{
          setLoaderEnable(true)
          const url = "https://wyvate-backend-s217.onrender.com/auth/updateDetails";
          const response = await axios.post(url, {
            "phoneNumber" : userPhonePayload,
            "first_name" : data?.first_name,
            "last_name" : data?.last_name,
            "gender" : data?.gender,
          });
          if(response.status === 201){
            router.push("/user")
            setLoaderEnable(false)
          }
        }catch(error){
            console.error(error)
        }
  };


  const handleUploadClick = () => {
    fileInputRef.current.click();
    setShowOptions(false)
  };

  const handleFileChange = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    setFile(file)
  };

  return (
    <div className="md:max-w-[30rem] mx-auto select-none">
      <div className="flex text-lg font-medium shadow-lg items-center">
      <div className="p-ripple w-10 p-4"  onClick={() => router.back()}>
         <Ripple
                  pt={{
                    root: { style: { background: "rgba(9, 194, 126, 0.2)" } },
                  }}
                />
         <MdArrowBackIos
            className="cursor-pointer"
            size={20}
          />
         </div> 
        <h1 className="text-center flex-grow p-4">My Profile</h1>
      </div>

     {loading === false &&  <div className="flex flex-col items-center justify-center pt-5 space-y-5 p-4">

    <div className="relative">
    <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    
      <Image
          src={file === "" ? user : file}
          width={200}
          height={200}
          className="w-[120px] h-[120px] rounded-full"
          alt="user-icon" onClick={() => setShowOptions(!showOptions)}
        />

{showOptions && <ImageOptions  handleUploadClick={handleUploadClick}/>}

    </div>

  
        <div className="bg-white rounded gap-2 p-2">
           <form
            className="grid grid-cols-1 items-center lg:max-w-[800px] mx-auto gap-3 space-y-3"
            onSubmit={updateProfile}
          >
            <div className="text-sm">
              <div className="flex gap-2 items-center">
                <div className="space-y-2">
                  <label htmlFor="fname" className="text-zinc-500">First Name*</label>
                  <input
                    type="text"
                    name="first_name" value={data.first_name}
                    className="outline-none border-b-[1px] border-solid border-gray-400 w-full p-2"
                    placeholder="Your First Name"
                    required
                    onChange={gettingDetails}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="lname" className="text-zinc-500">Last Name*</label>
                  <input
                    type="text"
                    name="last_name" value={data.last_name}
                    className="outline-none border-b-[1px] border-solid border-gray-400 p-2 w-full"
                    placeholder="Your Last Name"
                    onChange={gettingDetails}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="text-sm">
              <div className="">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-zinc-500">Your Email*</label>
                  <input
                    type="email"
                    name="emailAddress" value={data.emailAddress}
                    className="outline-none border-b-[1px] border-solid border-gray-400 p-2 w-full"
                    placeholder="Your Email"
                    onChange={gettingDetails}
                    required
                  />
                  <span className="text-red-500">{emailExists}</span>
                </div>

              
                <div className="relative w-full space-y-2 pt-5">
                  <label htmlFor="phone" className="text-zinc-500">Your Phone*</label>

                  <div className="relative text-gray-600 focus-within:text-gray-400">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2 gap-2">
                      <Image
                        src={india}
                        width={100}
                        height={100}
                        alt="img"
                        className="w-[30px]"
                      />
                      <h4 className="text-black">+91</h4>
                    </span>
                    <input
                      type="tel"
                      name="phoneNumber"
                      maxLength={10}
                      value={userPhonePayload}
                      max={10} disabled
                      className="outline-none border-b-[1px] w-full border-solid border-gray-400 p-2 pl-[4.8rem] lg:pl-[5rem] text-black"
                      placeholder="Phone Number"
                      onChange={gettingDetails}
                      required
                    />
                  </div>
                  <span className="text-red-500">{phoneExists}</span>
                </div>
              </div>
            </div>

            <div className="text-sm">
              <h1 className="py-2 text-zinc-500" >Select Gender</h1>
              <div
                className="flex flex-wrap md:flex-nowrap items-center gap-1 md:gap-2 buttons"
                role="group"
                onChange={gettingDetails}
              >
                <div className="flex gap-2">
                  <input
                    id="Male"
                    type="radio"
                    name="gender"
                    value="0"
                    className="w-5"
                    checked={data.gender === "0"}
                  />
                  <label htmlFor="Male">Male</label>
                </div>
                <div className="flex gap-2">
                  <input
                    id="Female"
                    type="radio"
                    name="gender"
                    value="1"
                    className="w-5"
                    checked={data.gender === "1"}

                  />
                  <label htmlFor="Female">Female</label>
                </div>

                <div className="flex gap-2">
                  <input
                    id="donot"
                    type="radio"
                    name="gender"
                    value="2"
                    className="w-5"
                    checked={data.gender === "2"}
                  />
                  <label htmlFor="donot">Others</label>
                </div>
              </div>

             <div className="lg:w-full mx-auto">
             <button  className="bg-emerald-500 flex items-center justify-center gap-4 text-white rounded-lg mt-5 w-full py-3 text-base font-light lg:text-base">
                {loaderEnable ? (
                  <PulseLoader
                    color="white"
                    loading={loaderEnable}
                    cssOverride={CSSProperties}
                    size={12}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  <span>Update Profile</span>
                )}
              </button>
             </div>
            </div>
          </form>
        </div>
      </div>}

      {
        loading && <ProfileSkelton />
      }
    </div>
  );
};

export default Profile;
