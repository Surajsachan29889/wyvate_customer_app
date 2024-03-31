"use client";

import React, { useState, useEffect } from "react";
import ActivePurchase from "../_components/ActivePurchase";
import AllPurchase from "../_components/AllPurchases";
import { app } from "../firebase";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { setActive } from "@material-tailwind/react/components/Tabs/TabsContext";
import { Ripple } from 'primereact/ripple';


const Purchase = () => {

  const router = useRouter()
  
  const [activeTab, setActiveTab] = useState("active");

  const createQueryString = (name, value) => {
    const params = new URLSearchParams();
    params.set("key", JSON.stringify(value));
    return params.toString();
  };

   // getting the current user
   useEffect(() => {
    const auth = getAuth(app);
    let curUser = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push(
          "/login" + "?" + createQueryString("key", { referto: "purchase" })
        );

        }
    });
  }, []);

  return (
    <div className="md:max-w-[30rem] mx-auto relative">
    <div className="pb-2 fixed top-0 left-0 w-full bg-white z-10 ">
    <div className="p-4">
      <h1 className="text-lg text-center">
      Purchases
        </h1>
      </div>
      <div className="flex justify-center">
        <div className="caret-transparent rounded-3xl mt-3 text-white font-medium flex gap-2">
          <button onClick={() => setActiveTab("active")} className={`${activeTab === "active" ? "bg-emerald-400" : "bg-zinc-200 text-zinc-700"} rounded-3xl px-7 text-sm py-2 p-ripple`} >Active   <Ripple
        pt={{
            root: { style: { background: 'rgba(9, 194, 126, 0.2)' } }
        }} /></button>
          <button  onClick={() => setActiveTab("all")} className={`${activeTab === "all" ? "bg-emerald-400" : "bg-zinc-200 text-zinc-700"} rounded-3xl px-10 py-2 text-sm p-ripple`}>All <Ripple
        pt={{
            root: { style: { background: 'rgba(9, 194, 126, 0.2)' } }
        }} /></button>
        </div>
      </div>
      </div>
      <div className="pb-28">{activeTab === "active" ? <ActivePurchase /> : <AllPurchase />}</div>
    </div>
  );
};

export default Purchase;
