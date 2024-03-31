"use client";
import React from "react";
import { MdArrowBackIos } from "react-icons/md";
import { useRouter } from "next/navigation";

const NotificationHeader = () => {
  const router = useRouter();

  return (
    <>
      <div className="shadow">
        
        <div className="flex items-center">
        <div className="pl-5">
        <MdArrowBackIos onClick={() => router.back()} size={20} />
        </div>
        <div className="mx-auto">
            {/* Add margin to separate the icon and header */}
            <h1 className="text-center font-semibold text-lg p-4">
              Notifications
            </h1>
        </div>
        </div>
      </div>
    </>
  );
};

export default NotificationHeader;
