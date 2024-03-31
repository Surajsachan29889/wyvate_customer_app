// "use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { app } from "../firebase";
import { getAuth } from "firebase/auth";
import { PulseLoader } from "react-spinners";
import norequest from '../images/norequest.png'
import CardSkelton from "./CardSkelton";
import { Ripple } from 'primereact/ripple';
import { trimTime, trimDate } from "./timeMethods";
import { shortenLandmark } from "./shortenLandmark";


const ActivePurchase = () => {

  const [userPhoneNumber, setUserPhoneNumber] = useState("")
  const [data, setData] = useState([])
  const [loaderEnable, setLoaderEnable] = useState(true);
  const [noData, setNoData] = useState(false)

  useEffect(() => {
    const initializeAuthObserver = () => {
      const auth = getAuth();
      if (!auth) return; // Ensure auth is available
      return auth.onAuthStateChanged((user) => {
        setUserPhoneNumber(user ? user.phoneNumber.substring(3) : null);
      });
    };

    const unsubscribe = initializeAuthObserver();

    // Cleanup function to unsubscribe from the observer
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [setUserPhoneNumber]);


  // fetching data for active items from api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = "https://wyvate-backend-s217.onrender.com/getDetails/activeOrders";
        const response = await axios.post(endpoint, {
          phoneNumber: userPhoneNumber,
        });
        console.log("active page data", response.data);
        setData(response.data.bookingDetails)
        setLoaderEnable(false)
        if(response.data.bookingDetails.length === 0){
          setNoData(true)
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoaderEnable(false)
      }
    };

    fetchData();
  }, [userPhoneNumber]);


  // Extracting the minutes from Average Prepraing time e.g : 00:19:00 -->> 19 min
  const avgTimeTrim = (timeString)=> {
    const minutes = timeString.split(":")[1]; // Extract the minutes part
    const parseminutes = parseInt(minutes, 10); // Explicitly specify base 10
    console.log('minutestis', parseminutes)
    return parseminutes
    }
  

  return (
    <div className="md:max-w-[30rem] mx-auto ">
    {
      loaderEnable === false &&   <div className="p-4 space-y-3">
       
       {/* Mapping through the data array and Showing details */}
       {data.map((items) => (
       <div  key={items.bookingid}>
       <Link
          
           href={{ pathname: `purchase/${items.bookingid}`, query: { img: `http://wyvatedev.s3.amazonaws.com/${items.image}`, place:items.store_name, landmark: items.landmark, phone: items.contact_phone, fssai: items.fssai_number, avgTime: avgTimeTrim(items.preparingtime), orderId: items.orderid } }}
         >
           <div className="mt-1 border-[1.5px] border-zinc-300 rounded-md border-solid gap-4 p-ripple">
             <div className="flex items-center justify-between border-b-[1px] p-3 border-solid border-zinc-200 bg-zinc-100">
               <div className="flex gap-4">
                 <Image src={`http://wyvatedev.s3.amazonaws.com/${items.image}`} width={40} height={40} alt="img" className="w-[50px] h-[50px] rounded-lg" objectFit="cover" />
                 <div className="flex flex-col">
                   <span className="text-[14px] text-zinc-800">
                     {items.store_name}
                   </span>
                   <span className="text-zinc-500 text-[12px]">
                     {shortenLandmark(items.landmark, 20)}
                   </span>
                 </div>
               </div>

               {/*CURRENT STATUS FOR PRODUCT */}
               <div className="flex">
                 <span
                   className={`${
                     items.status === "2"
                       ? "bg-white border-[1px] border-zinc-200 border-solid"
                       : items.status === "3" ? "bg-yellow-200": items.status ==="4" 
                       ? "bg-emerald-600 text-white" : "bg-sky-300"
                   }  text-center shadow font-medium rounded w-20 py-1 text-xs`}
                 >
                   {items.status ==="2" ? "Accepted" : items.status ==="3" ? "Preparing" : items.status ==="4" ? "Ready" : "Delivered"}
                 </span>
               </div>
             </div>

             {/* Schedule Time Design */}
             <div className="flex justify-between pt-4 text-[10px] lg:text-xs p-2">
             {items?.created_at != null ? <h4 className="text-zinc-600 text-[10px] md:text-xs">
                 {items?.now  === true ? "Date" : "Schedule"}:{" "}
                  <span className="text-zinc-800">
                    {trimDate(items?.created_at) + " at " + trimTime(items?.created_at)}
                  </span>
                </h4> : <div>
                  <h4 className="text-zinc-600 text-xs font-medium">Now</h4>
                </div>}
               <h4 className="font-medium text-xs">
                 {/* 3 Items |{"  "} */}
                 <span className="text-emerald-500 font-medium">₹{items.paidamount}</span>
               </h4>
             </div>

             <Ripple
        pt={{
            root: { style: { background: 'rgba(9, 194, 126, 0.2)' } }
        }}
    />
           </div>
         </Link>
       </div>
       ))}
     </div>
    }

      {loaderEnable && (
        <div className="p-2">
         <CardSkelton cards={8} />
         </div>
      )}

      {noData &&  <div className="py-[50px] flex items-center justify-center flex-col">
          <Image
            src={norequest}
            className="lg:w-[8rem] w-[6rem] mx-auto"
            width={200}
            height={100} alt="image"
          />
          <h2 className="text-center text-zinc-600 text-xs lg:text-[1rem]">
          Nothing to show here
          </h2>
        </div>}
    </div>
  );
};

export default ActivePurchase;
