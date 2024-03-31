"use client";
import { RiHome2Line } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useState, useEffect } from "react";
import w from "../images/w.png";
import w_deac from "../images/w_deact.png";
import Image from "next/image";
import Link from "next/link";
import { getAuth } from "firebase/auth";
import axios from "axios";
import { app } from "../firebase";
import { LuUser } from "react-icons/lu";
import { RiUser3Line } from "react-icons/ri";
import { IoBagHandleOutline } from "react-icons/io5";
import localFont from 'next/font/local'
import { Ripple } from 'primereact/ripple';

const myFont = localFont({
  src: '../KeepCalm-Medium.ttf',
  display: 'swap',
})

const Bottommenu = ({ pathname }) => {
  const [activeItem, setActiveItem] = useState(
    pathname !== "" ? pathname : "/"
  );
  const [visible, setVisible] = useState(true);
  const [scroll, setScroll] = useState();
  const [userlogin, setUserLogin] = useState("");
  const [userPhonePayload, setUserPhonePayload] = useState("");
  const [wRequestLength, setWRequestLength] = useState([]);



  //CHECKING CURRENT USER
  useEffect(() => {
    const auth = getAuth(app);
    let curUser = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserLogin(user);
        const originalPhoneNumber = user.phoneNumber;
        const trimmedPhoneNumber = originalPhoneNumber.substring(3);
        setUserPhonePayload(trimmedPhoneNumber);
      
      } else {
        setUserLogin("");
        setUserPhonePayload("");
        setActiveItem("/")
      }
    });

    return () => curUser();
  }, []);

  // FETCHING DATA FROM API FOR WYVATE PAGE
  useEffect(() => {
    const fetchData = async () => {
      const url = "https://wyvate-backend-s217.onrender.com/getDetails/wPage";
      try {
        if (userPhonePayload !== "") {
          const response = await axios.post(url, {
            phoneNumber: userPhonePayload,
          });
          setWRequestLength(response.data.bookingDetails);
          console.log(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [userPhonePayload]);

 

  console.log(wRequestLength);

  const handleClick = (menu) => {
    setActiveItem(menu);
    console.log(menu);
  };

  // useEffect(() => {

  //   const handleScroll = () => {
  //     const currentScrollY = window.scrollY;
  //     setScroll(currentScrollY);

  //     // Check if the user is scrolling up or down
  //     if (currentScrollY > 40) {
  //       // Scrolling down, hide the menu
  //       setVisible(false);
  //     } else {
  //       // Scrolling up, show the menu
  //       setVisible(true);
  //     }
  //   };

  //   // Attach the scroll event listener
  //   window.addEventListener("scroll", handleScroll);

  //   // Cleanup the event listener on component unmount
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [scroll]); // Empty

  return (
    // OLD STYLE
    //   <div
    //   className={`md:w-[30rem] bottom-menu mx-auto flex justify-center bg-zinc-200  caret-transparent rounded-t-2xl `}
    // >
    //   <div className="flex gap-5">
    //     {data.map((items) => (
    //       <div
    //         className={`${
    //           activeItem == items.link
    //             ? "text-emerald-500 border-t-4 py-2 border-solid transition-all duration-4000 ease-linear opacity-1 border-emerald-500"
    //             : "text-zinc-400 py-2  transition-all duration-4000"
    //         }`}
    //         key={items.label}
    //         onClick={() => handleClick(items.link)}
    //       >
    //         <Link href={`${items.link}`} className="">
    //           <div
    //             className={`${
    //               activeItem === items.link ? "text-emerald-500" : "text-zinc-400"
    //             }  relative`}
    //           >
    //             {items.icon === "w" ? (
    //               <div>

    //                 <div className=" w-[5rem] flex flex-col items-center absolute bottom-[-10px] left-[-25px]">

    //             {
    //               wRequestLength.length > 0 &&  <div className="w-8 h-8 right-0 bottom-5 absolute rounded-full flex p-2 justify-center items-center z-10 bg-red-500">
    //                <div className="text-white font-semibold">{wRequestLength.length}</div>
    //              </div>
    //             }
    //                   <Image
    //                     className="bg-white w-[4rem] rounded-full"
    //                     src={w}
    //                     width={80}
    //                     height={80}
    //                     alt="img"
    //                   />
    //                 </div>
    //               </div>
    //             ) : (
    //               <div className="flex flex-col py-2 items-center">
    //                 {items.icon}
    //                 <span className={`${myFont.className} text-[12px]`}>{items.label}</span>
    //               </div>
    //             )}
    //           </div>
    //         </Link>
    //       </div>
    //     ))}
    //   </div>
    // </div>

    // new ONE
    <div
      className={`md:max-w-[30rem] bottom-menu mx-auto flex justify-center bg-zinc-200 caret-transparent rounded-t-2xl select-none`}
    >
      <div className="flex gap-6">
        <div
          className={`${
            activeItem == "/"
              ? "text-emerald-500 border-t-4 py-2 border-solid transition-all duration-4000 ease-linear opacity-1 border-emerald-500"
              : "text-zinc-400 py-2  transition-all duration-4000"
          } p-ripple`}
          onClick={() => handleClick("/")}
        >
           <Ripple
        pt={{
            root: { style: { background: 'rgba(9, 194, 126, 0.2)' } }
        }}/>
          <Link href="/">
            <div
              className={`${
                activeItem === "/" ? "text-emerald-500" : "text-zinc-400"
              }  relative`}
            >
              <div className="flex flex-col pt-2 items-center">
                <RiHome2Line size={20} />
                <span
                  className={`${myFont.className} text-[10px] font-medium`}
                >
                  Home
                </span>
              </div>
            </div>
          </Link>
         
        </div>

        {/* Explore */}
        <div
          className={`${
            activeItem == "/explore"
              ? "text-emerald-500 border-t-4 py-2 border-solid transition-all duration-4000 ease-linear opacity-1 border-emerald-500"
              : "text-zinc-400 py-2  transition-all duration-4000"
          } p-ripple`}
          onClick={() => handleClick("/explore")}
        >
         <Ripple
        pt={{
            root: { style: { background: 'rgba(9, 194, 126, 0.2)' } }
        }} />
          <Link href="/explore">
            <div
              className={`${
                activeItem === "/explore" ? "text-emerald-500" : "text-zinc-400"
              }  relative`}
            >
              <div className="flex flex-col pt-2 items-center">
                <FiSearch size={20} />
                <span
                  className={`${myFont.className} text-[10px] font-medium`}
                >
                  Explore
                </span>
              </div>
            </div>
          </Link>
         
        </div>

        {/* W Page */}
        <div
          onClick={() => handleClick("/wyvate")}
          className="w-[4.5rem] p-1 flex flex-col bg-white rounded-full items-center relative bottom-9 p-ripple"
        >
                  <Link href="/wyvate">

         <Ripple
        pt={{
            root: { style: { background: 'rgba(9, 194, 126, 0.2)' } }
        }}/>
            <div>
              {wRequestLength.length > 0 && (
                <div className="w-6 h-6 right-2 bottom-10 absolute rounded-full flex p-2 justify-center items-center z-10 bg-red-500">
                  <div className="text-white">
                    {wRequestLength.length}
                  </div>
                </div>
              )}
              <Image
                className="bg-white rounded-full w-[4rem]"
                src={activeItem == "/wyvate" ? w : w_deac}
                width={80}
                height={80}
                alt="logo"
              />
            </div>
          </Link>
        
        
        </div>

        {/* Purchase Pge */}
        <div
          className={`${
            activeItem == "/purchase"
              ? "text-emerald-500 border-t-4 py-2 border-solid transition-all duration-4000 ease-linear opacity-1 border-emerald-500"
              : "text-zinc-400 py-2  transition-all duration-4000"
          } p-ripple`}
          onClick={() => handleClick("/purchase")}
        >
        <Ripple
        pt={{
            root: { style: { background: 'rgba(9, 194, 126, 0.2)' } }
        }} />
          <Link href="/purchase">
            <div
              className={`${
                activeItem === "/purchase"
                  ? "text-emerald-500"
                  : "text-zinc-400"
              }  relative`}
            >
              <div className="flex flex-col pt-2 items-center">
                <IoBagHandleOutline size={20} />
                <span
                  className={`${myFont.className} text-[10px] font-medium`}
                >
                  Purchase
                </span>
              </div>
            </div>
          </Link>
          
        </div>

        {/* User Page */}
        <div
          className={`${
            activeItem == "/user"
              ? "text-emerald-500 border-t-4 py-2 border-solid transition-all duration-4000 ease-linear opacity-1 border-emerald-500"
              : "text-zinc-400 py-2  transition-all duration-4000"
          } p-ripple`}
          onClick={() => handleClick("/user")}
        >  <Ripple
        pt={{
            root: { style: { background: 'rgba(9, 194, 126, 0.2)' } }
        }} />
          <Link href={`${userlogin !== "" ? "/user" : "/login"}`}>
            <div
              className={`${
                activeItem === "/user" ? "text-emerald-500" : "text-zinc-400"
              }  relative`}
            >
              <div className="flex flex-col pt-2 items-center">
                <RiUser3Line size={20} />
                <span
                  className={`${myFont.className} text-[10px] font-medium`}
                >
                  {userlogin !== "" ? "Profile" : "Login"}
                </span>
              </div>
            </div>
          </Link>
        
        </div>
      </div>
    </div>
  );
};

export default Bottommenu;
