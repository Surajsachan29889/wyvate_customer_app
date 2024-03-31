"use client"
import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const CancelPopUp = ({ btnPop, handleCancel, bookingId }) => {

  const router = useRouter()
  const [inputValue, setInputValue] = useState("");

  const cancelOrder = async() => {
    if (inputValue !== "") {
          const url = "https://wyvate-backend-s217.onrender.com/getDetails/cancelOrder";
          try {
            if (bookingId !== "") {
              const response = await axios.post(url, {
                bookingId: bookingId,
              });
              console.log(response.data);
              handleCancel(false);
              toast.success("Order Cancelled Successfully.");
              router.push("/purchase")
            }
          } catch (error) {
            console.error(error);
          }
        
    } else {
      toast.error("Select Reason");
    }
  };

  return (
    <div
      className={`${
        btnPop === true ? "bottom-[0px]  z-10 visible" : "hidden"
      } rounded-t-2xl shadow-2xl fixed p-5 h-[500px] bg-white left-0 w-full `}
    >
      <div>
        <div className="flex justify-end">
          <MdOutlineCancel
            onClick={() => handleCancel(false)}
            size={30}
            className="cursor-pointer"
            color="#10B981"
          />
        </div>
        <h1 className="text-xl">Reason For Cancel</h1>
        <div className="flex flex-col gap-5 mt-5">
          <div className="flex items-center gap-2">
            <input
              onChange={(e) => setInputValue(e.target.value)}
              value="gerfer ger"
              className="w-5 h-5"
              type="radio"
              name="cancel"
              id="html"
            />

            <label htmlFor="html">Lorem ipsum dolor sit amet.</label>
          </div>

          <div className="flex items-center gap-2">
            <input
              onChange={(e) => setInputValue(e.target.value)}
              value="lorem rgg"
              className="w-5 h-5"
              type="radio"
              name="cancel"
              id="css"
            />

            <label htmlFor="css">Lorem ipsum dolor sit amet.</label>
          </div>

          <div className="flex items-center gap-2">
            <input
              className="w-5 h-5"
              type="radio"
              name="cancel"
              onChange={(e) => setInputValue(e.target.value)}
              value="egerg g"
              id="js"
            />
            <label htmlFor="js">Lorem, ipsum dolor.</label>
          </div>
        </div>

        <div className="mt-10">
          <button
            onClick={() => cancelOrder()}
            className="bg-emerald-400 text-white p-2 font-semibold rounded-lg w-full border-2 border-solid hover:border-emerald-400 hover:bg-white hover:text-emerald-400"
          >
            Cancel Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelPopUp;
