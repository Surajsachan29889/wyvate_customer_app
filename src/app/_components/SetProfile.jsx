"use client";
import React, { useState, useEffect } from "react";
import { app, dbfs } from "../firebase";
import { getAuth } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import india from "../images/india.png";
import { PulseLoader } from "react-spinners";

function SetProfile({
  getPhone,
  showingOTPhidingProfile,
  startotp,
  userData,
  phoneNo,
}) {
  const router = useRouter();
  const [curUserUid, setCurUserUid] = useState("");
  const [phoneExists, setPhoneExists] = useState("");
  const [emailExists, setEmailExists] = useState("");
  const [data, setData] = useState({
    phoneNumber: phoneNo !== "" ? phoneNo : "",
    first_name: "",
    last_name: "",
    gender: "",
    emailAddress: "",
    deviceToken: "{4587458746952145dfafad45454}",
  });
  const [error, setError] = useState({});

  const [loaderEnable, setLoaderEnable] = useState(false);
  const CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  // getting the current user
  useEffect(() => {
    const auth = getAuth(app);

    let curUser = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurUserUid(user);
      } else {
        setCurUserUid(null);
        // router.push("/login");
      }
    });
  }, []);

  const gettingDetails = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const saveData = async (e) => {
    e.preventDefault();

    setLoaderEnable(true);
    const error = {};
    if (data.fname === "") {
      error.fname = "Fname can't be empty";
    } else if (data.lname === "") {
      error.lname = "Lname can't be empty";
    } else if (data.email === "") {
      error.email = "Email can't be empty";
    }
    setError(error);

    if (Object.values(error).every((value) => value === "")) {
      try {
        const endPoints =
        "https://wyvate-backend-s217.onrender.com/auth/signup";
        const phoneResponse = await axios.post(endPoints, {
          phoneNumber: data.phoneNumber,
        });
        const emailResponse = await axios.post(endPoints, {
          emailAddress: data.emailAddress,
        });

        if (
          phoneResponse.data.message === "New User, Redirect to OTP Page" &&
          emailResponse.data.message === "New User, Redirect to OTP Page"
        ) {
          startotp(true);
          showingOTPhidingProfile(true, false);
          getPhone(data.phoneNumber);
          userData(data);
          setLoaderEnable(false);
        } else if (
          phoneResponse.data.message === "New User, Redirect to OTP Page"
        ) {
          setPhoneExists("");
        } else if (
          emailResponse.data.message === "New User, Redirect to OTP Page"
        ) {
          setEmailExists("");
        } else {
          setPhoneExists("User Already Exists!");
          setEmailExists("Email Already Exists!");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div>
      <div className=" bg-gray-100 rounded-lg p-2 pt-5 pb-10">
        <div className="mx-auto">
          <div className="lg:pt-10 pt-5">
            <h3 className="font-semibold pt-5 text-2xl">SignUp,</h3>

            <h6 className="pb-5">Enter Your Details</h6>

            <div className="bg-white rounded gap-2 p-2">
              <form
                className="grid grid-cols-1 lg:grid-cols-2 lg:max-w-[800px] mx-auto gap-3"
                onSubmit={saveData}
              >
                <div>
                  <div className="">
                    <div className="space-y-2">
                      <label htmlFor="fname">First Name*</label>
                      <input
                        type="text"
                        name="first_name"
                        className="outline-none border-[1px] border-solid border-gray-400 w-full rounded p-2"
                        placeholder="Your First Name"
                        required
                        onChange={gettingDetails}
                      />
                    </div>

                    <div className="space-y-2 pt-2">
                      <label htmlFor="lname">Last Name*</label>
                      <input
                        type="text"
                        name="last_name"
                        className="outline-none border-[1px] border-solid border-gray-400 rounded p-2 w-full"
                        placeholder="Your Last Name"
                        onChange={gettingDetails}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="">
                  <div className="">
                    <div className="space-y-2">
                      <label htmlFor="email">Your Email*</label>
                      <input
                        type="email"
                        name="emailAddress"
                        className="outline-none border-[1px] border-solid border-gray-400 rounded p-2 w-full"
                        placeholder="Your Email"
                        onChange={gettingDetails}
                        required
                      />
                      <span className="text-red-500">{emailExists}</span>
                    </div>

                    {/* <div className="space-y-2 pt-2">
                      <label htmlFor="phone">Your Phone*</label>
                      <input
                        type="tel"
                        maxLength={10}
                        max={10}
                        value={data.phoneNumber}
                        name="phoneNumber"
                        className="outline-none border-[1px] border-solid border-gray-400 rounded p-2 w-full"
                        placeholder="Your Phone"
                        onChange={gettingDetails}
                        required
                      />
                      <span className="text-red-500">{phoneExists}</span>
                    </div> */}
                    <div className="relative w-full space-y-2 pt-2">
                      <label htmlFor="phone">Your Phone*</label>

                      <div className="relative text-gray-600 focus-within:text-gray-400">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2 gap-2">
                          <Image
                            src={india}
                            width={100}
                            height={100}
                            alt="img"
                            className="w-[30px]"
                          />
                          <h4 className="text-black">+91</h4>
                        </span>
                        <input
                          type="tel"
                          name="phoneNumber"
                          maxLength={10}
                          value={data.phoneNumber}
                          max={10}
                          className="outline-none border-[1px] w-full border-solid border-gray-400 p-2 rounded pl-[4.8rem] lg:pl-[5rem] text-black"
                          placeholder="Phone Number"
                          onChange={gettingDetails}
                          required
                        />
                      </div>
                      <span className="text-red-500">{phoneExists}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h1 className="py-2">Select Gender</h1>
                  <div
                    className="flex flex-wrap items-center gap-1 buttons"
                    role="group"
                    onChange={gettingDetails}
                  >
                    <div className="flex gap-2">
                      <input
                        id="Male"
                        type="radio"
                        name="gender"
                        value="0"
                        className="w-5"
                      />
                      <label htmlFor="Male">Male</label>
                    </div>
                    <div className="flex gap-2">
                      <input
                        id="Female"
                        type="radio"
                        name="gender"
                        value="1"
                        className="w-5"
                      />
                      <label htmlFor="Female">Female</label>
                    </div>

                    <div className="flex gap-2">
                      <input
                        id="donot"
                        type="radio"
                        name="gender"
                        value="2"
                        className="w-5"
                      />
                      <label htmlFor="donot">Do not Disclose</label>
                    </div>
                  </div>

                  <button className="bg-emerald-500 flex items-center justify-center gap-4 text-white rounded mt-5 w-full py-3 text-base lg:text-base">
                    {loaderEnable ? (
                      <PulseLoader
                        color="white"
                        loading={loaderEnable}
                        cssOverride={CSSProperties}
                        size={12}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    ) : (
                      <span>Sign Up</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SetProfile;
