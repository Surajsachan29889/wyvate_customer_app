import React, { useState } from 'react'
import { IoRestaurantOutline } from "react-icons/io5";


const BottomFoodMenu = ({handleClick}) => {

  const getClick = () => {
    handleClick(true)
  }
 
  return (
    <div>
        <div onClick={getClick} className="fixed bottom-5 left-1/2 transform -translate-x-1/2 w-14 cursor-pointer h-14 bg-emerald-500 rounded-full flex flex-col shadow-lg border-white border-2 border-solid items-center justify-center">
  <IoRestaurantOutline size={20} color='white'/>
  <span className='text-white text-xs'>Menu</span>
</div>
    </div>
  )
}

export default BottomFoodMenu
