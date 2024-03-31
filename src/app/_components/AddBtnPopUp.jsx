import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import burger from "../images/burger.jpg";
import Image from "next/image";
import { poppins } from "../fonts"

const AddBtnPopUp = ({ btnPop, handleAddPopUp, addSelectFinal }) => {

  const [itemCount, setItemCount] = useState(1)

  const addItems = ()=> {
    addSelectFinal(true)
    handleAddPopUp(false)

  }


  return (
    <div
      className={`  ${
        btnPop === true ? `bottom-[0px] z-10 visible `  : "hidden"
      } rounded-t-2xl shadow-2xl fixed p-5 h-[500px] bg-white left-0 w-full `}
    >
      <div>
        <div className="flex justify-end">
          <div>
            <MdOutlineCancel
              onClick={() => handleAddPopUp(false)}
              size={30}
              className="cursor-pointer"
              color="#10B981"
            />
          </div>
        </div>

        {/* ITEMS Section */}
        <div className="mt-5 max-h-[32rem] pb-[10rem] overflow-scroll ">
          <div>
            <div className="border-b-[1px] border-zinc-400 border-solid pb-4">
              <Image
                className="rounded-lg w-[30rem] h-[12rem] object-cover"
                src={burger}
                alt="burger-image"
                width={200}
                height={200}
              />
              <div className="flex items-center gap-2 pt-4">
                <div className="border-solid w-fit p-1 border-emerald-500 rounded-lg border-[2px] ">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                </div>
                <span className="font-semibold">Veg Burger</span>
              </div>
              <p className="pt-2 text-xs lg:text-sm">
                Lorem, ipsum dolor sit amet ipsum ratione eos! Expedita!
              </p>
            </div>

            {/* Second part of ui Portion */}
            <div className="pt-4 border-b-[1px] border-solid border-zinc-400 pb-4">
              <h2 className={`font-semibold lg:text-lg text-base ${poppins.className}`}>Portion</h2>
              <div className={`flex justify-between pt-2 lg:text-base text-sm ${poppins.className}`}>
                <span>Single: 1 Pc- Serves 1</span>
                <span>
                  ₹248 <input type="checkbox" className="w-4 h-4 " />
                </span>
              </div>
              <div className="flex justify-between pt-2 lg:text-base text-sm">
                <span>Single: 1 Pc- Serves 1</span>
                <span>
                  ₹248 <input type="checkbox" className="w-4 h-4 " />
                </span>
              </div>
            </div>

            {/* Add ones part */}

            <div className="pt-4 border-b-[1px] border-solid border-zinc-400 pb-4">
              <h2 className="font-semibold lg:text-lg text-base">Add Ons</h2>
              <div className="flex justify-between pt-2 lg:text-base text-sm">
                <span>Disposable Plate</span>
                <span>
                  ₹5 <input type="checkbox" className="w-4 h-4 " />
                </span>
              </div>
              <div className="flex justify-between pt-2 lg:text-base text-sm">
                <div className="flex items-center gap-2">
                  <div className="border-solid w-fit p-1 border-emerald-500 rounded-lg border-[2px] ">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  </div>
                  <span>Extra Mint Sauce 100 ML</span>
                </div>
                <span>
                  ₹29 <input type="checkbox" className="w-4 h-4 " />
                </span>
              </div>
              <div className="flex justify-between pt-2 lg:text-base text-sm">
                <div className="flex items-center gap-2">
                  <div className="border-solid w-fit p-1 border-emerald-500 rounded-lg border-[2px] ">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  </div>
                  <span>Extra Mint Sauce 100 ML</span>
                </div>
                <span>
                  ₹29 <input type="checkbox" className="w-4 h-4 " />
                </span>
              </div>
              <div className="flex justify-between pt-2 lg:text-base text-sm">
                <div className="flex items-center gap-2">
                  <div className="border-solid w-fit p-1 border-emerald-500 rounded-lg border-[2px] ">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  </div>
                  <span>Extra Mint Sauce 100 ML</span>
                </div>
                <span>
                  ₹29 <input type="checkbox" className="w-4 h-4 " />
                </span>
              </div>
            </div>


{/* Bottom Total UI */}
            <div className="bg-zinc-700 rounded-t-lg flex items-center justify-around fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full p-3">
                <div className="bg-white rounded-lg w-[6rem] text-xl p-2 flex items-center justify-between">
                   <span className="text-emerald-500 font-semibold" onClick={() => setItemCount(itemCount -1)}>-</span>
                   <span className="font-semibold">{itemCount}</span>
                   <span className="text-emerald-500 font-semibold" onClick={() => setItemCount(itemCount +1)}>+</span>
                </div>

                <div >
                  <button className={`${poppins.className} bg-emerald-500 rounded-lg text-white font-serif lg:text-base text-sm w-[10rem] p-2`} onClick={addItems}>Add Item ₹ 248</button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBtnPopUp;
