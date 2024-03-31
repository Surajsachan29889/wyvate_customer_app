"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import CardSkelton from "@/app/_components/CardSkelton";
import { app, dbfs } from "../firebase";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import norequest from "../images/norequest.png";
import {trimDate, trimTime} from "../_components/timeMethods";
import { shortenLandmark } from "../_components/shortenLandmark";
import { Ripple } from "primereact/ripple";

const Wyvat = () => {
  const router = useRouter();
  const [wyvateData, setWyvateData] = useState([]);
  const [userPhonePayload, setUserPhonePayload] = useState("");
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false);


  const createQueryString = (name, value) => {
    const params = new URLSearchParams();
    params.set("key", JSON.stringify(value));
    return params.toString();
  };

  // getting the current user
  useEffect(() => {
    const auth = getAuth(app);
    let curUser = auth.onAuthStateChanged((user) => {
      if (user) {
        const originalPhoneNumber = user.phoneNumber;
        const trimmedPhoneNumber = originalPhoneNumber.substring(3);
        setUserPhonePayload(trimmedPhoneNumber);
      } else {
        setUserPhonePayload(null);
        router.push(
          "/login" + "?" + createQueryString("key", { referto: "wyvate" })
        );
      }
    });
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
          setLoading(false);
          if (response.data.bookingDetails.length === 0) {
            setNoData(true);
          } else {
            setNoData(false);
          }
          setWyvateData(response.data.bookingDetails);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [userPhonePayload]);

  // useEffect(() => {
  //   if (wyvateData.length !== 0) {
  //     setCreationTime(prevCreationTime => [
  //       ...prevCreationTime,
  //       ...wyvateData.map(item => item.created_at)
  //     ]);

  //     setBookingId(prevBookingId => [
  //       ...prevBookingId,
  //       ...wyvateData.map(item => item.bookingId)
  //     ])
  //   }
  // }, [wyvateData]);
  

  return (
    <div className="mx-auto md:max-w-[30rem] select-none">
      <div className="fixed top-0 left-0 md:max-w-[30rem] w-full mx-auto right-0 bg-white shadow-lg p-4 z-10">
        <h1 className="text-xl text-center text-emerald-400">Wyvate</h1>
      </div>

      {noData === false && (
        <div>
          {loading && (
            <div className="p-2 mt-12">
              <CardSkelton cards={8} />
            </div>
          )}
          <div className="p-4 mt-10 h-[190vh] space-y-2 rounded-lg overflow-y-auto">
            {wyvateData?.map((items) => (
              <Link
                href={{
                  pathname: `wyvate/${items.bookingid}`,
                  query: {
                    img: `http://wyvatedev.s3.amazonaws.com/${items.image}`,
                    name: items.store_name,
                    landmark: items.landmark,
                  },
                }}
                key={items.bookingid}
              >
                <div className="mt-5 border-[1.5px] border-zinc-200 rounded-lg border-solid gap-4 p-ripple">
                  <div className="flex items-center bg-zinc-100 justify-between border-b-[1px] p-3 border-solid border-zinc-200">
                    <div className="flex gap-4">
                      <Image
                        src={`http://wyvatedev.s3.amazonaws.com/${items.image}`}
                        width={100}
                        height={100}
                        className="w-[50px] h-[50px] rounded-lg"
                        objectFit="cover"
                        alt="img"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm text-zinc-800">
                          {items.store_name}
                        </span>
                        <span className="text-zinc-500 text-xs">
                          {shortenLandmark(items.landmark, 20)}
                        </span>
                      </div>
                    </div>

                    <div className="">
                      <button className="bg-gray-400 text-white rounded mt-2 text-[10px] px-4 py-1">
                        Request
                      </button>
                      <h5 className="font-medium text-sm text-emerald-500 text-right pt-2">
                        {/* {TimeOutW(trimTime(data[0]?.created_at))} */}
                        {/* {formatTime()} */}
                      </h5>
                    </div>
                  </div>
                  <div className="flex justify-between pt-4 p-2">
                    {items?.created_at != null ? (
                      <h4 className="text-zinc-600 text-[10px] md:text-xs">
                        {items?.now === true ? "Date" : "Schedule"} :{" "}
                        <span className="text-zinc-800 font-medium">
                          {trimDate(items?.created_at) +
                            " at " +
                            trimTime(items?.created_at)}
                        </span>
                      </h4>
                    ) : (
                      <div>
                        <h4 className="text-zinc-600 text-xs">Click to Pay</h4>
                      </div>
                    )}
                    <h4 className="font-medium text-xs">
                      {/* {wyvateData.length} Items |{"  "} */}
                      <span className="text-emerald-500 font-medium">
                        {/* ₹{items.totalamount} */}
                      </span>
                    </h4>
                  </div>
                  <Ripple
                    pt={{
                      root: { style: { background: "rgba(9, 194, 126, 0.2)" } },
                    }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {loading && (
        <div className="p-4 ">
          <CardSkelton cards={8} />
        </div>
      )}

      {/* IF THERE IS NO REQUESTS */}
      {noData && (
        <div className="flex items-center justify-center flex-col my-auto h-[90vh]">
          <Image
            src={norequest}
            className="lg:w-[6rem] w-[6rem] mx-auto"
            width={200}
            height={100}
            alt="image"
          />
          <h2 className="text-center text-zinc-600 text-xs lg:text-xs">
            There is no request from vendor
          </h2>
        </div>
      )}
    </div>
  );
};

export default Wyvat;
