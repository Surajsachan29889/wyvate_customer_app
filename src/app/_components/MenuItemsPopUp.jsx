
import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";

const MenuItemsPopUp = ({ btnPop, handleCancel }) => {
  console.log(btnPop);

  const [inputValue, setInputValue] = useState("");



  console.log(inputValue);
  return (
    <div
      className={`${
        btnPop === true ? "bottom-[0px] z-10 visible " : "hidden"
      } rounded-t-2xl shadow-2xl fixed p-5 h-[500px] bg-white left-0 w-full `}
    >
      <div>
       <div className="flex justify-between">
    
        <h1 className="text-xl font-semibold border-l-4 border-emerald-500 p-2">Menu</h1>
        <div >
          <MdOutlineCancel
            onClick={() => handleCancel(false)}
            size={30}
            className="cursor-pointer"
            color="#10B981"
          />
        </div>
       </div>
        
        {/* ITEMS Section */}
        <div className="mt-5 overflow-scroll max-h-[400px]">
        <div className="flex justify-between border-b-[1px] border-zinc-400 py-5">
         <h3>Recommended</h3>
         <h3>17</h3>
       </div>
        <div className="flex justify-between border-b-[1px] border-zinc-400 py-5">
         <h3>Meal For One</h3>
         <h3>7</h3>
       </div>
        <div className="flex justify-between border-b-[1px] border-zinc-400 py-5">
         <h3>Appetizers</h3>
         <h3>12</h3>
       </div>
        <div className="flex justify-between border-b-[1px] border-zinc-400 py-5">
         <h3>Tandoori Momos</h3>
         <h3>18</h3>
       </div>
        <div className="flex justify-between border-b-[1px] border-zinc-400 py-5">
         <h3>Veg Kathi Roll</h3>
         <h3>12</h3>
       </div>
        <div className="flex justify-between border-b-[1px] border-zinc-400 py-5">
         <h3>Rumali Roti</h3>
         <h3>7</h3>
       </div>
        <div className="flex justify-between border-b-[1px] border-zinc-400 py-5">
         <h3>Daal Makhani</h3>
         <h3>12</h3>
       </div>
        <div className="flex justify-between border-b-[1px] border-zinc-400 py-5">
         <h3>Veg Mains</h3>
         <h3>18</h3>
       </div>
        <div className="flex justify-between border-b-[1px] border-zinc-400 py-5">
         <h3>Deserts</h3>
         <h3>12</h3>
       </div>
        </div>

      </div>
    </div>
  
  );
};

export default MenuItemsPopUp;
