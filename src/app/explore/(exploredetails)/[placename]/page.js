"use client"
import React, {useState, useEffect} from "react";
import Image from "next/image";
import restlogo from "../../../images/rest_lgo.png";
import { LuClock } from "react-icons/lu";
import { AiFillStar } from "react-icons/ai";
import burger from "../../../images/burger.jpg";
import MenuItemsPopUp from "@/app/_components/MenuItemsPopUp";
import aicon from "../../../images/aicon.png";
import Coupancode from "@/app/_components/Coupancode";
import VegNonvegSelect from "@/app/_components/VegNonvegSelect";
import Foodlist from "@/app/_components/Foodlist";
import BottomFoodMenu from "@/app/_components/BottomFoodMenu";
import AddBtnPopUp from "@/app/_components/AddBtnPopUp";
import ItemsSelected from "@/app/_components/ItemsSelected";
import { useRouter } from "next/navigation";

const Placename = () => {

  const router = useRouter()
  const [openMenu, setOpenMenu] = useState(false)
  const [addItemPop, setAddItemPop] = useState(false)
  const [addItemsFinal, setAddItemsFinal] = useState(false)


  const handleCancel = (value) => {
    setOpenMenu(value)
  }

  const handleAddPopUp = (value) => {
    setAddItemPop(value)
  }

  const finalAddItems = (value)=> {
     setAddItemsFinal(value)

  }

   // CODE TO FREEZE SCROLLING WHILE CANCEL FORM IS OPEN
   useEffect(() => {
    // Add or remove the 'no-scroll' class based on the isScrollingEnabled prop
    if (openMenu || addItemPop) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    // Cleanup: Remove the class when the component unmounts
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [openMenu, addItemPop]);

  const handleClick = (click) => {
   setOpenMenu(click)
  }
  return (
    <div className="md:flex flex-col items-center justify-center">
      <div className=" mx-5 h-[190vh]">
        <div className="relative mt-5 md:max-w-[30rem] mx-auto space-x-2 p-4 flex gap-2">
          <div className="flex gap-4 bg-white p-3 rounded">
            <Image
              className=" w-[2.5rem] object-contain"
              src={restlogo}
              width={40}
              height={40}
              alt="img"
            />
          </div>

          {/* Schedule Time Design */}
          <div className="text-[10px] lg:text-sm space-y-2">
            <div className="flex flex-col">
              <span className="text-[14px] text-zinc-800 font-semibold">
                Moti Mahal Deluxe
              </span>
              <span className="text-zinc-500 text-[12px]">
                ITI Park, Bengluru
              </span>
            </div>
            <div className="flex gap-2 items-center text-zinc-600 text-[12px]">
              <h4 className=" flex gap-1 items-center font-semibold">
                <LuClock size={12} /> 07:00 AM - 11:30AM
              </h4>
              <h4 className="font-semibold flex gap-2 items-center">
                <Image src={aicon} alt="a-icon" className="w-3 h-3" /> 3km
              </h4>
            </div>
          </div>

          <span className="bg-emerald-500 absolute text-[10px] right-5  px-3 py-1 rounded-xl flex gap-1 items-center text-white">
            <AiFillStar size={12} color="white" />
            <span>4.3</span>
          </span>
        </div>

        <div className="">
          <Coupancode />

          <VegNonvegSelect />

          <Foodlist handleAddPopUp={handleAddPopUp}/>

          <BottomFoodMenu handleClick={handleClick}/>

          <MenuItemsPopUp btnPop={openMenu} handleCancel={handleCancel}/>
          <AddBtnPopUp btnPop={addItemPop} handleAddPopUp={handleAddPopUp} addSelectFinal={finalAddItems}/>

         {addItemsFinal && <ItemsSelected />}
        </div>
      </div>

      
      <div  className={`${openMenu || addItemPop ? "visible" : "hidden"} overlay`} onclick="off()">
</div>
    </div>
  );
};

export default Placename;
