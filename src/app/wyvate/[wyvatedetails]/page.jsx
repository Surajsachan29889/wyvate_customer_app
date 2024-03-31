"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import sha256 from "crypto-js/sha256";
import { v4 as uuidv4 } from "uuid";
import CardSkeltonWyDet from "@/app/_components/CardSkeltonWyDet";
import { MdArrowBackIos } from "react-icons/md";
import Button from "@mui/material/Button";
import toast, { Toaster } from "react-hot-toast";
import CancelBtnPop from "@/app/_components/CancelBtnPop";
import { Ripple } from "primereact/ripple";
import {timeToTimestamp, trimDate, trimTime} from '../../_components/timeMethods'
import { shortenLandmark } from "@/app/_components/shortenLandmark";

const WyvateDetails = () => {
  const params = useParams();
  const bookingId = params.wyvatedetails;
  const search = useSearchParams();
  const router = useRouter();

  const [data, setData] = useState([]);
  const [vendor, setVendor] = useState({});
  const [loading, setLoading] = useState(true);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [remainingTime, setRemainingTime] = useState(
    getRemainingTime(params.wyvatedetails)
  );

  // CODE FOR GETTING THE DATA FROM API FOR THIS PAGE
  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoints =
          "https://wyvate-backend-s217.onrender.com/getDetails/wOrderDetailsPage";
        const response = await axios.post(endpoints, {
          bookingId: params.wyvatedetails,
        });
        setData(response.data.wOrderDetails);
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [params.wyvatedetails]);

  // CODE FOR GETTING THE VENDOR DETAILS TO SHOW IN UI from W
  useEffect(() => {
    const name = search.get("name");
    const landmark = search.get("landmark");
    const image = search.get("img");
    setVendor({ name, landmark, image });
  }, [search]);


  // Method to calculate the personal discount
  const calculateDiscount = () => {
    return data[0]?.personal_discount_type === "1"
      ? (data[0]?.personal_discount / 100) * data[0]?.coupon_discounted_price
      : data[0]?.personal_discount;
  };

  const formattedDiscount = calculateDiscount()?.toFixed(2);

  const serviceDiscountCalculate = (service_discount_type, service_discount, serviceprice, addonserviceprice, quantity) => {
    return service_discount_type === "1"
      ? ((service_discount * 0.01) * (serviceprice + addonserviceprice) * quantity)
      : service_discount * quantity;
  };


   // CODE TO GET THE TOTAL AMOUNT AFTER COUNTING ALL THE PRODUCTS COSTS
   const totalAmount = data?.reduce((accumulator, currenValue) => {
    return (
      accumulator +
      currenValue.quantity *( currenValue.serviceprice +
      currenValue.addonserviceprice) 
    );
  }, 0);


  const additionalCharges = () => {
    if (data[0]?.additionaldetails.length !== 0) {
      const charges = data[0]?.additionaldetails[0]?.price;
      return charges;
    } else {
      return 0;
    }
  };


  const totalFee = data[0]?.deductiondetails.reduce(
    (accumulator, currenValue) => {
      return accumulator + currenValue.amount;
    },
    0
  );

  // CODE FOR PAYMENT
  const acceptAndPay = async (amount) => {
    console.log("INSIDE ACCEPT AND PAY " + bookingId);

    const transactionID = "TR-" + uuidv4().toString(36).slice(-6);

    const payload = {
      // merchantId: process.env.NEXT_PUBLIC_MERCHANT_ID,
      merchantId: "PGTESTPAYUAT",
      bookingId: bookingId,
      merchantTransactionId: transactionID,
      merchantUserId: "MUID-" + uuidv4().toString(36).slice(-6),
      amount: data[0]?.vendor_total_amount.toFixed(2) * 100,
      redirectUrl: `https://wyvate-backend-s217.onrender.com/payments/validate/${transactionID}/${bookingId}`,
      redirectMode: "POST",
      callbackUrl: `https://wyvate-backend-s217.onrender.com/payments/validate/${transactionID}/${bookingId}`,
      // redirectUrl: `https://wyvate-app.vercel.app/api/status/${transactionID}`,
      // redirectMode: "POST",
      // callbackUrl: `http://localhost:3000/api/status/${transactionID}`,
      // callbackUrl: `https://wyvate-app.vercel.app/api/status/${transactionID}`,
      mobileNumber: data.mobile,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const saltkey = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
    const saltIndex = 1;

    const dataPayload = JSON.stringify(payload);
    const dataBase64 = Buffer.from(dataPayload).toString("base64");

    // const fullURL = dataBase64 + "/pg/v1/pay" + process.env.NEXT_PUBLIC_SALT_KEY;
    const fullURL = dataBase64 + "/pg/v1/pay" + saltkey;
    const dataSha256 = sha256(fullURL);

    // const checkSum = dataSha256 + "###" + process.env.NEXT_PUBLIC_SALT_INDEX;
    const checkSum = dataSha256 + "###" + saltIndex;

    const UAT_PAY_API_URL =
      "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

    try {
      const response = await axios.post(
        UAT_PAY_API_URL,
        { request: dataBase64 },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            "X-VERIFY": checkSum,
          },
        }
      );

      const redirected = response.data.data.instrumentResponse.redirectInfo.url;
      router.push(redirected);
      console.log(
        ">>response in data line 157 " + JSON.stringify(response.data)
      ); // Handle successful response
    } catch (error) {
      console.error("Axios request error:", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      } else if (error.request) {
        console.error("No response received. Request:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
    }
  };


  const cancelOrder = async () => {
    setOpenPopUp(true);
  };

  // Countdown Code FROM HERE
  useEffect(() => {
    const interval = setInterval(() => {
      const newRemainingTime = calculateRemainingTime();
      setRemainingTime(newRemainingTime);

      // If remaining time reaches 0, handle item expiration
      if (newRemainingTime === 0) {
        clearInterval(interval);
        // Handle item expiration here (e.g., remove item from the list)
      }
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Function to calculate remaining time
  const calculateRemainingTime = () => {
    const expirationTime = localStorage.getItem(`item_${params.wyvatedetails}`);
    if (!expirationTime) return 0; // If expiration time not found, return 0
    const currentTime = Math.floor(new Date().getTime() / 1000); // Convert milliseconds to seconds
    const remainingTime = Math.max(0, expirationTime - currentTime);
    return remainingTime;
  };

  // // Function to get remaining time from local storage or calculate it
  function getRemainingTime(bookingId) {
    const expirationTime = localStorage.getItem(`item_${bookingId}`);
    if (!expirationTime) return 0; // If expiration time not found, return 0
    if (data.length !== 0) {
      const remainingTime = Math.max(
        0,
        expirationTime - timeToTimestamp(trimTime(data[0]?.created_at))
      );
      return remainingTime;
    }
  }

  useEffect(() => {
    if (data && data.length !== 0) {
      const expirationTime = localStorage.getItem(`item_${params.wyvatedetails}`);
      console.log("expirationTime", expirationTime);
      if (!expirationTime) {
        const expirationTime =
          timeToTimestamp(trimTime(data[0]?.created_at)) + 10 * 60; // 5 minutes from current time
        localStorage.setItem(`item_${params.wyvatedetails}`, expirationTime);
      }
    }
  }, [data, params.wyvatedetails]); // Include params.wyvatedetails in the dependency array if it's used inside the useEffect
  

  // // Format remaining time for display
  const formatTime = () => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    return remainingTime
      ? `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
          2,
          "0"
        )}`
      : "00:00";
  };

  return (
    <div className="md:max-w-[30rem] mx-auto select-none">
      <Toaster toastOptions={{ duration: 1000 }} />
      <div>

      {/* Header Title and Back Button CODE */}
        <div className="flex text-lg font-medium shadow-lg items-center">
          <div className="p-ripple w-10 p-4" onClick={() => router.back()}>
            <Ripple
              pt={{
                root: { style: { background: "rgba(9, 194, 126, 0.2)" } },
              }}
            />
            <MdArrowBackIos className="cursor-pointer" size={20} />
          </div>
          <h1 className="text-center flex-grow">Your Order</h1>
        </div>

        {loading && <CardSkeltonWyDet cards={1} />}

        {loading === false && (
          <div className={`mx-auto p-3`}>
            <div className="mt-1 mx-auto border-[1.5px] border-zinc-300 rounded-md border-solid p-2 gap-4 ">
              <div className="flex items-center justify-between border-b-[1px] pb-1 border-solid border-zinc-200">
                <div className="flex gap-4">
                  <Image
                    src={vendor.image}
                    width={40}
                    height={40}
                    alt="image"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm text-zinc-800">{vendor.name}</span>
                    <span className="text-zinc-500 text-xs">
                      {shortenLandmark(vendor.landmark, 20)}
                    </span>
                  </div>
                </div>

                <div className="">
                  <button className="bg-gray-400 text-white rounded mt-2 text-[10px] px-4 py-1">
                    Request
                  </button>
                  <h5 className="font-medium text-sm text-emerald-500 text-right pt-2">
                    {/* {TimeOutW(trimTime(data[0]?.created_at))} */}
                    {formatTime()}
                  </h5>
                </div>
              </div>
              <div className="flex justify-between pt-4">
                {data[0]?.created_at != null && (
                  <h4 className="text-zinc-600 text-[10px] md:text-xs">
                    {data[0]?.now === true ? "Date" : "Schedule"} :{" "}
                    <span className="text-zinc-800 font-medium">
                      {trimDate(data[0]?.created_at) +
                        " at " +
                        trimTime(data[0]?.created_at)}
                    </span>
                  </h4>
                )}
                <h4 className="text-xs">
                  {data[0]?.totalItems} Items |{" "}
                  <span className="text-emerald-500">
                    ₹
                    {data[0]?.vendor_total_amount.toFixed(2)}
                  </span>
                </h4>
              </div>
            </div>

            {/* Accept And Cancel Buttons Code */}
            <div className="flex justify-end gap-4 items-center pt-3">
              {remainingTime == 0 ? (
                
                <Button
                  sx={{
                    backgroundColor: "#09c27e",
                    fontWeight: "bold",
                    textTransform: "none",
                    fontSize: "1rem",
                    width: "160px",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#09c27e")
                  }
                  variant="contained"
                >
                  Reorder
                </Button>
              ) : <div className="flex justify-end gap-4 items-center">
                  <Button
                    onClick={() => cancelOrder()}
                    sx={{
                      backgroundColor: "#BBBABA",
                      fontWeight: "bold",
                      textTransform: "none",
                      fontSize: "1rem",
                      width: "160px",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#BBBABA")
                    }
                    variant="contained"
                  >
                    Cancel
                  </Button>

                  <Button
                    onClick={() => acceptAndPay()}
                    sx={{
                      backgroundColor: "#09c27e",
                      fontWeight: "bold",
                      textTransform: "none",
                      fontSize: "1rem",
                      width: "160px",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#09c27e")
                    }
                    variant="contained"
                  >
                    Accept & Pay
                  </Button>
                </div>}
            </div>

            {/* ITEMS LIST */}
            <div className="space-y-5 pt-8">
              <h2 className="border-l-4 pl-2 border-solid border-emerald-400">
                Items
              </h2>

              {data?.map((item) => (
                <div
                  key={item.bookingserviceid}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`border-solid w-fit p-1 rounded-lg border-[2px] ${
                        item.veg == 0
                          ? "border-emerald-500"
                          : item.veg == 1
                          ? "border-red-500"
                          : "border-yellow-500"
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          item.veg == 0
                            ? "bg-emerald-500"
                            : item.veg == 1
                            ? "bg-red-500"
                            : "bg-yellow-500"
                        }`}
                      ></div>
                    </div>
                   
                    <div className="text-sm">
                      <h2>{`${item.quantity} × ${item.name}`}</h2>
                      <span className="text-gray-500 text-xs">
                        {item?.addonname !== null && item.addonname}
                      </span>
                    </div>
                  </div>
                  <div>
                   {item?.service_discount !== 0 && <span className="line-through text-sm">
                      ₹
                      {item.quantity * (item.serviceprice +
                        item.addonserviceprice)}
                    </span>
                    }

                    <span className="text-sm"> ₹{(item.quantity *( item.serviceprice +
                        item.addonserviceprice)) - serviceDiscountCalculate(item.service_discount_type, item.service_discount, item?.serviceprice, item?.addonserviceprice, item.quantity)?.toFixed(2)}
                    </span> 
                  </div>
                </div>
              ))}

              {/* ITEMS TOTAL */}

              <div className="rounded-lg shadow-2xl space-y-3 p-4 mt-5 text-xs md:text-sm text-zinc-700">
                <div className="flex justify-between">
                  <h6>Item Total</h6>
                  {/* <h6>₹{data[0]?.coupon_discounted_price}</h6> */}
                  <h6>₹{totalAmount}</h6>
                </div>
                {data[0]?.additionaldetails[0]?.price && (
                  <div className="flex justify-between">
                    <h6>Packing Charges</h6>
                    <h6>₹{data[0]?.additionaldetails[0]?.price}</h6>
                  </div>
                )}

                {data[0]?.coupon_discount !== 0 && (
                  <div className="flex justify-between text-emerald-500">
                    <h6>Coupan</h6>
                    <h6>₹{data[0]?.coupon_discount}</h6>
                  </div>
                )}
                {data && data[0]?.personal_discount !== 0 && (
                  <div className="flex justify-between text-emerald-500">
                    <h6>Personal Discount</h6>
                    <h6>₹{formattedDiscount}</h6>
                  </div>
                )}
                {data[0]?.service_discount !== 0 && (
                  <div className="flex justify-between text-emerald-500">
                    <h6>Service Discount</h6>
                    <h6>₹{data[0]?.total_service_discount}</h6>
                  </div>
                )}
                <div className="flex justify-between">
                  <h6>Tax & Charges</h6>
                  <h6>₹{data[0]?.Tax.toFixed(2)}</h6>
                </div>

                {data[0]?.deductiondetails[0]?.amount && (
                  <div className="space-y-3">
                    {data[0]?.deductiondetails?.map((fee) => (
                      <div key={fee.name} className="flex justify-between ">
                        <h6>{fee.name}</h6>
                        <h6>₹{fee.amount}</h6>
                      </div>
                    ))}
                  </div>
                )}

                <div className="bg-emerald-500 rounded-lg p-3 flex justify-between text-white">
                  <h6>Grand Total</h6>
                  <h6>₹ {data[0]?.vendor_total_amount.toFixed(2)}</h6> 
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

{/* Cancel Button Popup */}
      {openPopUp && (
        <div>
          <CancelBtnPop
            open={openPopUp}
            setOpenPopUp={setOpenPopUp}
            bookingId={bookingId}
          />
        </div>
      )}

{/* OVERLAY TO SHOW WHEN THE CANCEL BUTTON POPUP IS VISIBLE */}
      <div className={`${openPopUp ? "visible" : "hidden"} overlay1`}>
        <div className="text"></div>
      </div>
    </div>
  );
};

export default WyvateDetails;
