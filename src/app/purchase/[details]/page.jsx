"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import CancelPopUp from "@/app/_components/CancelPopUp";
import RateProduct from "@/app/_components/RateProduct";
import toast, { Toaster } from "react-hot-toast";
import { MdArrowBackIos } from "react-icons/md";
import { useRouter } from "next/navigation";
import axios from "axios";
import Stepper from "@/app/_components/Stepper";
import fssai from "../../images/fssai.png";
import CardSkeltonWyDet from "@/app/_components/CardSkeltonWyDet";
import {timeToTimestamp, trimDate, trimTime} from '../../_components/timeMethods'
import { Ripple } from "primereact/ripple";

const PurchaseDetails = () => {
  const searchParams = useSearchParams();
  const bookingId = useParams();
  const router = useRouter();
  const [ratingbtn, setRatingBtn] = useState(false);
  const [pickupOtp, setPickUpOTP] = useState();
  const [cancelbtn, setCancelBtn] = useState(false);
  const [vendorDetails, setVendorDetails] = useState({});
  const [data, setData] = useState([]);
  const [loaderEnable, setLoaderEnable] = useState(true);
  const [orderPickUp, setOrderPickUp] = useState();
  const [remainingTime, setRemainingTime] = useState(
    getRemainingTime(vendorDetails.orderId)
  );


  // GETTING THE STORE NAME IMAGE,ADRESS AND OTHER FROM PREVIOUS PAGE
  useEffect(() => {
    const image = searchParams.get("img");
    const place = searchParams.get("place");
    const landmark = searchParams.get("landmark");
    const phone = searchParams.get("phone");
    const fssai = searchParams.get("fssai");
    const avgTime = searchParams.get("avgTime");
    const orderId = searchParams.get("orderId");
    setVendorDetails({
      image,
      landmark,
      place,
      phone,
      fssai,
      avgTime,
      orderId,
    });
  }, []);


  // GEETING THE API DATA 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoints =
          "https://wyvate-backend-s217.onrender.com/getDetails/wOrderDetailsPage";
        const response = await axios.post(endpoints, {
          bookingId: bookingId.details,
        });
        setData(response.data.wOrderDetails); // Accessing the nested property if needed
        setLoaderEnable(false);
        console.log(response.data.wOrderDetails);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleRating = (click) => {
    setRatingBtn(click);
  };

  // CODE TO FREEZE SCROLLING WHILE CANCEL FORM IS OPEN
  useEffect(() => {
    // Add or remove the 'no-scroll' class based on the isScrollingEnabled prop
    if (cancelbtn || ratingbtn) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    // Cleanup: Remove the class when the component unmounts
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [cancelbtn, ratingbtn]);


  // CODE FOR PICKUP OTP
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url =
          "https://wyvate-backend-s217.onrender.com/getDetails/pickupOtp";
        const response = await axios.post(url, {
          bookingId: bookingId.details,
        });
        setPickUpOTP(response.data.pickupOtp.otp);
        console.log("inside otp " + response.data.pickupOtp.otp);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);


  // FUNCTION FOR PICKUP BUTTON
  const pickUpOrder = async () => {
    try {
      const url =
        "https://wyvate-backend-s217.onrender.com/getDetails/pickupOrder";
      const response = await axios.post(url, {
        bookingId: bookingId.details,
      });
      if (response.status === 200) {
        // router.push("/purchase")
        console.log("ORDER DATA>>>>" + response.data);
        setOrderPickUp(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // handle cancel
  const handleCancel = (btnPop) => {
    setCancelBtn(btnPop);
  };

  // CODE TO GET THE TOTAL AMOUNT AFTER COUNTING ALL THE PRODUCTS COSTS
  const totalAmount = data?.reduce((accumulator, currenValue) => {
    return (
      accumulator +
      currenValue.quantity *(currenValue.serviceprice +
      currenValue.addonserviceprice) 
    );
  }, 0);

  const totalFee = data[0]?.deductiondetails
    ? data[0].deductiondetails.reduce((accumulator, currentValue) => {
        return accumulator + (currentValue?.amount || 0);
      }, 0)
    : 0;

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

  const additionalCharges = () => {
    if (data[0]?.additionaldetails.length !== 0) {
      const charges = data[0]?.additionaldetails[0]?.price;
      return charges;
    } else {
      return 0;
    }
  };

  // CODE TO SHORT THE LENGTH OF THE STORE LANDMARK/ADDRESS
  const shortenLandmark = (address, limit) => {
    if (address?.length > limit) {
      return address.slice(0, limit) + "...";
    }
    return address;
  };

  //time management from here
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
    const expirationTime = localStorage.getItem(
      `item_${vendorDetails.orderId}`
    );
    if (!expirationTime) return 0; // If expiration time not found, return 0
    const currentTime = Math.floor(new Date().getTime() / 1000); // Convert milliseconds to seconds
    const remainingTime = Math.max(0, expirationTime - currentTime);
    return remainingTime;
  };

  // Function to get remaining time from local storage or calculate it
  function getRemainingTime(bookingId) {
    const expirationTime = localStorage.getItem(`item_${bookingId}`);
    if (!expirationTime) return 0; // If expiration time not found, return 0
    if (expirationTime && data.length !== 0) {
      const remainingTime = Math.max(
        0,
        expirationTime - timeToTimestamp(trimTime(data[0]?.created_at))
      );
      return remainingTime;
    }
  }

  useEffect(() => {
    const expirationTime = localStorage.getItem(
      `item_${vendorDetails.orderId}`
    );
    if (!expirationTime && data.length !== 0) {
      const expirationTime =
        timeToTimestamp(trimTime(data[0]?.created_at)) +
        vendorDetails.avgTime * 60; // avg minutes from current time
      localStorage.setItem(`item_${vendorDetails.orderId}`, expirationTime);
    }
  }, []);

  // Format remaining time for display
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
    <>
      <div className="md:max-w-[30rem] mx-auto select-none">
        <Toaster
          containerStyle={{ fontWeight: "revert" }}
          position="top-center"
          toastOptions={{ duration: 1000 }}
        />
        <div className="flex text-lg font-medium shadow-lg items-center">
          <div className="p-ripple w-10 p-4" onClick={() => router.back()}>
            <Ripple
              pt={{
                root: { style: { background: "rgba(9, 194, 126, 0.2)" } },
              }}
            />
            <MdArrowBackIos className="cursor-pointer" size={20} />
          </div>
          <h1 className="text-center flex-grow p-4">Purchases</h1>
        </div>

        {loaderEnable === false && (
          <div>
            <div className='md:max-w-[30rem] mx-auto'>
              <div className="p-5 flex flex-col justify-center">
              
                {/* Store Details Here Image, Name, Address */}
                <div className="flex items-center justify-between border-b-[1px] pb-3 border-solid border-zinc-200">
                  <div className="flex gap-4">
                    <Image
                      src={vendorDetails.image}
                      width={40}
                      height={40}
                      alt="image"
                      className="w-[50px] h-[50px] rounded-lg"
                      objectFit="cover"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm text-zinc-800">
                        {vendorDetails?.place}
                      </span>
                      <span className="text-zinc-500 text-xs">
                        {shortenLandmark(vendorDetails.landmark, 20)}
                      </span>
                    </div>
                  </div>

                  {/* Pick Up Buttton Code */}
                  {data[0]?.status < 6 && (
                    <div>
                      <button
                        onClick={() => pickUpOrder()}
                        disabled={data[0]?.status === "4" ? false : true}
                        className={`${
                          data[0]?.status === "4"
                            ? "bg-emerald-500 text-white"
                            : "bg-gray-300"
                        } font-medium text-black text-xs py-1 rounded px-4`}
                      >
                        Pick Up
                      </button>
                    </div>
                  )}
                </div>
                {data[0]?.status < 5 ? (
                  <div className="flex flex-col pt-4 gap-4 text-xs border-b-[1px] pb-3 border-solid border-zinc-200">
                    <div className="flex gap-3 items-center">
                      <h4 className=" text-zinc-500">Preparing Time :</h4>
                      <span className="text-emerald-500 text-base font-medium">
                        {remainingTime > 0
                          ? formatTime()
                          : "It is taking more time"}
                      </span>
                    </div>

                    <div className="flex gap-3 items-center">
                      <h4 className=" text-zinc-500">OTP :</h4>
                      <span className="text-emerald-500 text-base font-medium">
                        {pickupOtp}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="pt-4 flex justify-between text-xs">
                    <h2>
                      {data[0]?.status === "10"
                        ? "This order was Expired."
                        : data[0]?.status === "6"
                        ? "This order was cancelled."
                        : "This order was delivered."}
                    </h2>
                    {data[0]?.status !== "10" && data[0]?.status !== "6" && (
                      <h2 className="text-emerald-500 font-medium">
                        Rated Now
                      </h2>
                    )}
                  </div>
                )}
              </div>

              {/* STEPPER CODE */}
              <div
                className={`${
                  data[0]?.status !== "10" && data[0]?.status !== "6"
                    ? "visible"
                    : "hidden"
                } mt-1 mr-10 p-5`}
              >
                <Stepper status={data[0]?.status} />
              </div>

              {/* ITEMS LIST HERE */}
              <div
                className={`space-y-5 p-5 ${
                  data[0]?.status != "10" && data[0]?.status != "6"
                    ? "mt-10"
                    : "mt-0"
                }`}
              >
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

                <div className="rounded-lg shadow-2xl space-y-3 p-4 mt-8 text-xs md:text-sm  text-zinc-800 font-thin">
                  <div className="flex justify-between">
                    <h6>Item Total</h6>

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

                  {data[0]?.personal_discount !== 0 && (
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

                  {data[0]?.deductiondetails !== 0 && (
                    <div className="space-y-3">
                      {data[0]?.deductiondetails?.map((fee) => (
                        <div key={fee.name} className="flex justify-between ">
                          <h6>{fee.name}</h6>
                          <h6>₹{fee.amount}</h6>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* GRAND TOTAL */}
                  <div className="bg-emerald-500 p-4 flex rounded-lg justify-between text-white">
                    <h6>Grand Total</h6>
                    <h6>₹ {data[0]?.vendor_total_amount.toFixed(2)}</h6>
                  </div>
                </div>
              </div>

              {/* CANCEL BUTTON HERE*/}
              {data[0]?.status == 2 && (
                <div className="mt-1 p-5">
                  <button
                    className="bg-white text-red-400 p-2 rounded-lg w-full border-2 border-solid border-red-400 hover:bg-red-500 hover:text-white hover:border-none"
                    onClick={() => setCancelBtn(!cancelbtn)}
                  >
                    Cancel
                  </button>
                </div>
              )}

              {/*ORDER DETAILS  HERE*/}
              <div className="p-5">
                <h2 className="font-medium border-l-4 pl-2 border-solid border-emerald-400">
                  Order Details
                </h2>
                <div>
                  <div className="flex flex-col pt-4 gap-3 text-xs">
                    <div className="flex gap-5">
                      <h4 className="text-zinc-500">Order ID : </h4>
                      <span className="text-zinc-600">{data[0]?.orderid}</span>
                    </div>

                    <div className="flex gap-5">
                      <h4 className=" text-zinc-500">Date :</h4>
                      <span className="text-zinc-600">
                        {trimDate(data[0]?.created_at) +
                          " at " +
                          trimTime(data[0]?.created_at)}
                      </span>
                    </div>

                    <div className="flex gap-5">
                      <h4 className=" text-zinc-500">Payment :</h4>
                      <span className="text-zinc-600">
                        {data[0]?.payment_mode === "1"
                          ? "Cash"
                          : "Paid - Using UPI"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Restaurant Contacts */}
              <div className="text-center font-medium p-5">
                <h2 className="text-emerald-400 border-t-[1px] p-2 border-zinc-200 border-solid text-xs">
                  Call {vendorDetails?.place}{" "}
                  <a href={`tel:${vendorDetails?.phone}`}>
                    {" "}
                    {`+91 ${vendorDetails?.phone}`}
                  </a>
                </h2>
                <h2 className="text-emerald-400 p-2 border-b-[1px] border-t-[1px] border-zinc-200 border-solid text-xs">
                  <a href={`tel:${"+91 909090909090"}`}>
                    {" "}
                    Call Wyvate (+91 909090909090){" "}
                  </a>
                </h2>
              </div>

              {/* End Details */}
              <div className="text-sm text-zinc-400  p-5">
                <h6>{vendorDetails?.place}</h6>
                <Image src={fssai} width={100} height={100} alt="fssai-logo" />
                <h6>Lic No. - {vendorDetails.fssai}</h6>
              </div>
            </div>
            {/* Cancel Reason */}
            <div>
              <CancelPopUp
                btnPop={cancelbtn}
                handleCancel={handleCancel}
                bookingId={bookingId.details}
              />
            </div>

            <div>
              {data[0]?.status > 4 && (
                <RateProduct btnPop={ratingbtn} handleRating={handleRating} />
              )}
            </div>
          </div>
        )}

        <div
          className={`${cancelbtn || ratingbtn ? "visible" : "hidden"} overlay`}
        >
          <div className="text"></div>
        </div>
      </div>

     
      {loaderEnable && <CardSkeltonWyDet cards={1} />}
    </>
  );
};

export default PurchaseDetails;
