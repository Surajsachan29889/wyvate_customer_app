"use client"
import React from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { Ripple } from "primereact/ripple";



const CancelBtnPop = ({open, setOpenPopUp, bookingId}) => {

  const router = useRouter()

  const cancelOrder = async() => {
     const url = "https://wyvate-backend-s217.onrender.com/getDetails/cancelOrder";
    try {
        const response = await axios.post(url, {
          bookingId: bookingId,
        });
        console.log(response.data)
        setOpenPopUp(false)
        toast.success("Order Cancelled Successfully.");
        router.push("/wyvate")
    } catch (error) {
      console.error(error);
    }
      router.push("/wyvate");
  };

  return (
    <div className={`${open ? "flex md:max-w-[30rem] max-w-[20rem] h-[200px] mx-auto items-center justify-center bg-zinc-100 shadow-2xl rounded-lg absolute top-[50px] bottom-[50px] left-0 right-0 visible" : "hidden"}`}>
          <Toaster toastOptions={{duration:1000}}/>

      <div>
        <div className="flex flex-col justify-center items-center pb-10">
          <h2 className="">Do you want to cancel order?</h2>
        </div>

        <div className="flex gap-2">
          <Button
           
            className="p-ripple"
            onMouseOver={(e) => (e.target.style.backgroundColor = "#E3FFE6")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#F4F4F5")}
            onClick={() => setOpenPopUp(false)}
            variant="outlined"
            color="success"
            sx={{
              // backgroundColor: "#FE3636",
              fontWeight: "bold",
              textTransform: "none",
              fontSize: "1rem",
              width: "140px",
            }}
          >
            No
            <Ripple
                  pt={{
                    root: { style: { background: "rgba(9, 194, 126, 0.2)" } },
                  }}
                />
          </Button>

          <Button
            onClick={() => cancelOrder()}
            sx={{
              // backgroundColor: "#FE3636",
              fontWeight: "bold",
              textTransform: "none",
              fontSize: "1rem",
              width: "140px",
            }}
            className="p-ripple"
            variant="outlined"
            color="error"
          >
           Yes
           <Ripple
                  pt={{
                    root: { style: { background: "rgba(9, 194, 126, 0.2)" } },
                  }}
                />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CancelBtnPop;
