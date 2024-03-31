"use client";
import React, { useState, useEffect } from "react";
import { app, dbfs } from "../firebase";
import { getAuth } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

function SetProfile() {
  const router = useRouter();
  const [curUserUid, setCurUserUid] = useState("");
  const [data, setData] = useState({
    phoneNumber: "",
    first_name: "",
    last_name: "",
    gender: "",
    emailAddress: "",
    deviceToken: "",
    uid: "",
  });
  const [error, setError] = useState({});

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

  const saveData = (e) => {
    e.preventDefault();

    const error = {};
    if (data.fname === "") {
      error.fname = "Fname can't be empty";
    } else if (data.lname === "") {
      error.lname = "Lname can't be empty";
    } else if (data.email === "") {
      error.email = "Email can't be empty";
    }
    setError(error);

    const fullData = {
      ...data,
      uid: curUserUid.uid,
      phoneNum: curUserUid.phoneNumber,
    };

    if (Object.values(error).every((value) => value === "")) {
      try {
        const docRef = dbfs
          .collection("Users")
          .doc(curUserUid.uid)
          .set(fullData)
          .then((docRef) => {
            toast.success("Data saved successfully!");
          })
          .then(() => {
            router.push("/");
          });
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div>
      <div className=" bg-gray-100 pt-5 pb-10">
        <div className="mx-auto p-10">
          <div className="lg:pt-10 pt-5">
            <h3 className="font-semibold lg:pt-5 pt-5  text-2xl">Welcome,</h3>

            <h6 className="pb-5"> Complete Your Profile</h6>

            <div className="bg-white rounded p-8 gap-2">
              <form
                className="grid grid-cols-1 max-w-[400px] mx-auto gap-3"
                onSubmit={saveData}
              >
                <label htmlFor="fname">First Name*</label>
                <input
                  type="text"
                  name="first_name" 
                  className="outline-none border-[1px] border-solid border-gray-400 w-full rounded p-2"
                  placeholder="Your First Name"
                  required
                  onChange={gettingDetails}
                />

                <label htmlFor="lname">Last Name*</label>
                <input
                  type="text"
                  name="last_name"
                  className="outline-none border-[1px] border-solid border-gray-400 rounded p-2 w-full"
                  placeholder="Your Last Name"
                  onChange={gettingDetails}
                  required
                />

                <label htmlFor="email">Your Email*</label>
                <input
                  type="email"
                  name="emailAddress" 
                  className="outline-none border-[1px] border-solid border-gray-400 rounded p-2 w-full"
                  placeholder="Your Email"
                  onChange={gettingDetails}
                  required
                />

                <label htmlFor="phone">Your Phone*</label>
                <input
                  type="number"
                  name="phoneNumber"
                  className="outline-none border-[1px] border-solid border-gray-400 rounded p-2 w-full"
                  placeholder="Your Phone"
                  onChange={gettingDetails}
                  required
                />

                <h1 className="pt-5">Select Gender</h1>
                <div
                  className="grid grid-cols-2 buttons"
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
                <button
                  type="submit"
                  className="text-white w-full  rounded mt-5 p-2 px-6 bg-emerald-400"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SetProfile;
