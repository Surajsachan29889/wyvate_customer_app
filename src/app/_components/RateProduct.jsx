import React, { useState } from "react";
import Image from "next/image";
import star from "../images/star.png";
import starfill from "../images/starfill.png";
import { MdOutlineCancel } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";

const RateProduct = ({ btnPop, handleRating }) => {
  const [rated, setRated] = useState(0);

  const getText = (rated) => {
    const textOptions = {
      1: { text: "Useless", color: "text-red-500" },
      2: { text: "Poor", color: "text-orange-500" },
      3: { text: "Ok", color: "text-green-500" },
      4: { text: "Good", color: "text-green-500" },
      5: { text: "Excellent", color: "text-green-500" },
    };
    return textOptions[rated] || { text: "Excellent", color: "green-500" };
  };

  const ar = [1, 2, 3, 4, 5];
  const { text, color } = getText(rated);

  const submitRating = () => {
    if (rated > 0) {
      handleRating(false);
      toast.success("Thanks For Rating.");
    }
  };

  return (
    <div
      className={`${
        btnPop === true ? "bottom-[0px]  z-10 visible" : "hidden"
      } rounded-t-2xl shadow-2xl fixed p-5  bg-white left-0 w-full `}
    >
      <div className="flex justify-end">
        <MdOutlineCancel
          onClick={() => handleRating(false)}
          size={30}
          className="cursor-pointer"
          color="#10B981"
        />
      </div>
      <h1 className="text-xl text-center font-semibold">Rate Your Product</h1>

      <div className="flex items-center justify-center gap-2 font-bold text-blue-gray-500 pt-5 caret-transparent">
        {/* <Rating value={4} name="rating" onChange={(value) => setRated(value)} />
         */}
        <div className="flex items-center gap-3">
          {ar.map((cur) => {
            return (
              <Image
                key={cur}
                src={cur <= rated ? starfill : star}
                className="w-[30px]"
                width={400}
                height={400}
                onClick={() => setRated(cur)}
                onMouseOver={() => setRated(cur)}
                alt="start-image"
              />
            );
          })}
        </div>
        <h1 className={`font-semibold ${color}`}>{text}</h1>
      </div>

      <div className="mt-10">
        <button
          onClick={() => submitRating()}
          className="bg-emerald-400 text-white p-2 font-semibold rounded-lg w-full border-2 border-solid hover:border-emerald-400 hover:bg-white hover:text-emerald-400"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default RateProduct;
