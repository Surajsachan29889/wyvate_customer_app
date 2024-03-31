"use client"
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { app } from "../firebase";
import { getAuth } from "firebase/auth";
import norequest from '../images/norequest.png'
import CardSkelton from "./CardSkelton";
import {trimTime, trimDate} from "./timeMethods";
import { Ripple } from 'primereact/ripple';
import { shortenLandmark } from "./shortenLandmark";


const AllPurchases = () => { 

  const [userPhoneNumber, setUserPhoneNumber] = useState("")
  const [data, setData] = useState([])
  const [loaderEnable, setLoaderEnable] = useState(true);
  const [noData, setNoData] = useState(false)

  useEffect(() => {
    const auth = getAuth(app);
    if (!auth) return; // Ensure auth is available

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const phoneNumber = user.phoneNumber;
        if (phoneNumber) {
          const trimmedPhoneNumber = phoneNumber.substring(3);
          setUserPhoneNumber(trimmedPhoneNumber);
        } else {
          setUserPhoneNumber(null);
        }
      } else {
        setUserPhoneNumber(null);
      }
    });

    // Cleanup function to unsubscribe from the observer
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // GETTING THE DATA FROM THE API 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = "https://wyvate-backend-s217.onrender.com/getDetails/allOrders";
        const response = await axios.post(endpoint, {
          phoneNumber: userPhoneNumber,
        });
        console.log(response.data);
        setData(response.data.bookingDetails)
        setLoaderEnable(false)
        if(response.data.bookingDetails.length === 0){
          setNoData(true)
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userPhoneNumber]);

  return (
    <div className="md:max-w-[30rem] mx-auto">

      {/* Mapping through the data array and Showing details */}
      <div>
      {
         loaderEnable === false &&   <div className="space-y-3 p-4">
         {
          
          data.map((items) => (
           <div  key={items.bookingid}>
           <Link
          
           href={{ pathname: `purchase/${items.bookingid}`, query: { img: `http://wyvatedev.s3.amazonaws.com/${items.image}`, place:items.store_name, landmark: items.landmark, phone: items.contact_phone, fssai: items.fssai_number } }}>
            <div className="mt-1  border-[1.5px] border-zinc-300 rounded-md border-solid gap-4 p-ripple">
              <div className="flex items-center justify-between bg-zinc-100 border-b-[1px] p-3 border-solid border-zinc-200">
                <div className="flex gap-4">
                  <Image  src={`http://wyvatedev.s3.amazonaws.com/${items.image}`} width={40} height={40} alt="img" className="w-[50px] h-[50px] rounded-lg" objectFit="cover" />
                  <div className="flex flex-col">
                    <span className="text-[14px] text-zinc-800">
                      {items?.store_name}
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
                        ? "bg-emerald-600 text-white" : items.status === "5" ? "bg-sky-100" : items.status === "6" ? "bg-red-600 text-white" : "bg-zinc-300"
                    }  text-center text-xs font-medium rounded w-20 py-1 shadow`}
                  >
                    {items.status ==="2" ? "Accepted" : items.status ==="3" ? "Preparing" : items.status ==="4" ? "Ready" : items.status === "5" ? "Delivered" : items.status === "6" ? "Canceled" : "Expired"}
                  </span>
                </div>
              </div>
              {/* Schedule Time Design */}
              <div className="flex justify-between pt-4 p-2 lg:text-xs">
              {items?.created_at != null ? <h4 className="text-zinc-600 text-[10px] md:text-xs">
                  {items?.status === "10" ? "Delivered" : "Date"} :{" "}
                  <span className="text-zinc-800 font-medium">
                    {trimDate(items?.created_at) + " at " + trimTime(items?.created_at)}
                  </span>
                </h4> : <h4 className="text-zinc-600 text-xs font-medium">Now</h4>}
                <h4 className="font-medium text-xs">
                  {/* 3 Items |{"  "} */}
                  <span className="text-emerald-500">₹{items?.paidamount}</span>
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
      </div>

      {loaderEnable && (
        <div className="p-2">
         <CardSkelton cards={8} />
         </div>
      )}

      {noData &&  <div className="py-[50px]  flex items-center justify-center flex-col">
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

export default AllPurchases;
