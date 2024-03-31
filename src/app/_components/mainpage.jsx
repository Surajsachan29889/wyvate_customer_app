"use client";

import React, { useState, useEffect } from "react";
import Bottommenu from "./Bottommenu";
import Navmenu from "./Navmenu";
import img1 from "../images/3.webp";
import img2 from "../images/4.webp";
import img3 from "../images/5.webp";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import checkout from "../images/self-checkout.png";
import Header from "./Header";
import { getAuth } from "firebase/auth";
import { dbfs } from "../firebase";
// import { UseSelector, useSelector } from "react-redux";


const Mainpage = () => {

  // const selector = useSelector((state) => state.bookingId)
  const [locationToggle, setLocationToggle] = useState(false);
  const [userLogin, setUserLogin] = useState(false)

  // console.log(selector)

  var settings = {
    dots: false,
    infinite: true,
    speed: 300,
    arrows: false,
    className: "center",
    slidesToShow: 1,
    variableWidth: true,
    centerMode: true,

    responsive: [
      {
        breakpoint: 840,
        settings: {
          slidesToShow: 1, // Adjust for smaller screens
          slidesToScroll: 1,
          variableWidth: false,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1, // Adjust for smaller screens
          slidesToScroll: 1,
          variableWidth: false,
        },
      },
      // Add more responsive breakpoints if needed
    ],
  };

   // getting the current user
   useEffect(() => {
    const auth = getAuth();

    let curUser = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserLogin(user.uid)
        console.log(true);
      } else {
        setUserLogin(false);
        console.log(false);
      }
    });

    return () => curUser();

  }, []);

  const data = [img1, img2, img3];

  function locationDrop(toggle) {
    setLocationToggle(toggle);
  }

  return (
    <>
      <div className="md:max-w-[30rem] mx-auto">
       {/* <Header locationDrop={locationDrop} /> */}
        {/* <Navmenu /> */} 
        <div >
          {/* Slider */}
          <div>
            <Slider {...settings} className="py-5">
              {data.map((curElm, index) => (
                <div key={index} className="flex gap-3 items-center">
                  <Image
                    src={curElm}
                    className=" w-[300px] rounded"
                    alt="product-category-image"
                    width={500}
                    height={500}
                  />
                </div>
              ))}
            </Slider>
          </div>

          <div className="flex flex-col items-center mt-5 space-y-3">
            <div>
              <Image
                className="w-28"
                src={checkout}
                width={400}
                height={200}
                alt="slider-images"
              />
            </div>
            <div className="text-xs text-zinc-700">
              <span className="block">No Reccomendations yet Explore and </span>
              <span className="block text-center">
                Get Offers and many more!
              </span>
            </div>

            <button className="text-emerald-500 underline">Order Now</button>
          
          </div>
        </div>
        {/* <Bottommenu pathIs="/" /> */}
      </div>

      <div  className={`${locationToggle ? "visible" : "hidden"} overlay`} onClick="off()">
  <div className="text"></div>
</div>

    </>
  );
};

export default Mainpage;
