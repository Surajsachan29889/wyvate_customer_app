"use client"
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import Button from "@mui/material/Button";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";


const DialogBox = ({open, setOpenDialog, userName}) => {

  const router = useRouter()
  const logout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      setOpenDialog(false)
      router.push("/");

    });
  };

  return (
    <div className={`${open ? "flex md:max-w-[30rem] max-w-[20rem] h-[400px] mx-auto items-center justify-center bg-zinc-100 shadow-xl rounded-lg" : "hidden"}`}>
      <div className=" ">
        <div className="flex flex-col justify-center items-center pb-10">
          <FaUserCircle size={80} />
          <span className="text-lg">{userName}</span>
          <h2>Are You sure to Logout?</h2>
        </div>

        <div className="flex gap-2">
          <Button
            sx={{
                backgroundColor: "#09c27e",
              fontWeight: "bold",
              textTransform: "none",
              fontSize: "1rem",
              width: "140px",
            }}
            // onMouseOver={(e) => (e.target.style.backgroundColor = "#BBBABA")}
            onClick={() => setOpenDialog(false)}
            variant="contained"
            color="success"
          >
            Cancel
          </Button>

          <Button
            onClick={() => logout()}
            sx={{
              backgroundColor: "#FE3636",
              fontWeight: "bold",
              textTransform: "none",
              fontSize: "1rem",
              width: "140px",
            }}
            variant="contained"
            color="error"
          >
           Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
