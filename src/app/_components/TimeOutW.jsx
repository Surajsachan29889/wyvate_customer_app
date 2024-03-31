// ItemComponent.js
"use client";
import React, { useState, useEffect } from "react";

// export const timeToTimestamp = (timeString) => {
// //   const timeString = "10:33 AM";

//   // Split the time string into hours, minutes, and AM/PM parts
//   const [time, period] = timeString.split(" ");
//   const [hours, minutes] = time.split(":");

//   // Convert hours to 24-hour format if needed
//   let hour24 = parseInt(hours, 10);
//   if (period === "PM" && hour24 < 12) {
//     hour24 += 12;
//   } else if (period === "AM" && hour24 === 12) {
//     hour24 = 0;
//   }

//   // Create a new Date object with the current date and the extracted time
//   const date = new Date();
//   date.setHours(hour24, parseInt(minutes, 10), 0, 0);

//   // Get the timestamp in seconds
//   const timestamp = Math.floor(date.getTime() / 1000);

//   console.log(timestamp); // Output the timestamp
//   return timestamp;
// };

const TimeOutW = (bookingId) => {
  const item = { id: "kjjhjhgjkjuhhjkhhghkkkjk" };

  const [remainingTime, setRemainingTime] = useState(getRemainingTime(bookingId));

  useEffect(() => {
    const interval = setInterval(() => {
      const newRemainingTime = calculateRemainingTime();
      setRemainingTime(newRemainingTime);

      // If remaining time reaches 0, handle item expiration
      if (newRemainingTime === 0) {
        clearInterval(interval);
        // Handle item expiration here (e.g., remove item from the list)
      }
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Function to calculate remaining time
  const calculateRemainingTime = () => {
    const expirationTime = localStorage.getItem(`item_${bookingId}`);
    if (!expirationTime) return 0; // If expiration time not found, return 0
    const currentTime = Math.floor(new Date().getTime() / 1000); // Convert milliseconds to seconds
    const remainingTime = Math.max(0, expirationTime - currentTime);
    return remainingTime;
  };

  // Function to get remaining time from local storage or calculate it
  function getRemainingTime(bookingId) {
    const expirationTime = localStorage.getItem(`item_${bookingId}`);
    if (!expirationTime) return 0; // If expiration time not found, return 0
    const remainingTime = Math.max(0, expirationTime - timeToTimestamp());
    return remainingTime;
  }

  useEffect(() => {
    const expirationTime = localStorage.getItem(`item_${bookingId}`);
    console.log("expirationTime", expirationTime);
    if (!expirationTime) {
      const expirationTime = timeToTimestamp() + 5 * 60; // 5 minutes from current time
      localStorage.setItem(`item_${bookingId}`, expirationTime);
    }
  }, []);

  // Format remaining time for display
  const formatTime = () => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    // return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div>
      {formatTime()}
    </div>
  );
};

export default TimeOutW;
