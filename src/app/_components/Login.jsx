"use client";
import React, { useEffect, useState } from "react";
import { app, auth } from "../firebase";
import OtpInput from "react-otp-input";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getAuth } from "firebase/auth";
import password from "../images/password.png";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import india from "../images/india.png";
import logo from "../images/wyvatelogo.png";
import axios from "axios";
import SetProfile from "../_components/SetProfile";
import { PulseLoader } from "react-spinners";
import wlogo from '../images/wyvate_logohere (1).png'

function Login() {
  const searchParams = useSearchParams()
  const redirectURL = JSON.parse(searchParams.get("key"));
  const [ph, setPh] = useState("");
  const [otp, setOtp] = useState("");
  const [usersData, setUserData] = useState({});
  const [showOTP, setShowOTP] = useState(false);
  const [showSetProfile, setShowSetProfile] = useState(false);
  const [user, setUser] = useState("");
  const [startVerifyOTP, setStartVerifyOTP] = useState(false);
  const [uid, setUid] = useState("");
  const [btnnum, setBtnNum] = useState(59);
  const router = useRouter();
  const [loaderEnable, setLoaderEnable] = useState(false);
  const CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  // const reference = searchParams.get("reference");
  useEffect(() => {
    const auth = getAuth(app);

    let curUser = auth.onAuthStateChanged((user) => {
      if (user) {
        router.replace("/");
      }
    });

    return () => curUser();
  }, []);


  //handle setprofile child data
  const hanldeChildData = (showOTP, showSetProfile) => {
    setShowOTP(showOTP);
    setShowSetProfile(showSetProfile);
  };

  const getPhoneNumber = (phone) => {
    setPh(phone);
  };

  const startOTP = (value) => {
    setStartVerifyOTP(value);
  };

  const gettingUserData = (obj) => {
    setUserData(obj);
  };

 
  function onCaptchaVerify() {
    // Clear the previous recaptchaVerifier and recaptchaWidget
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
      delete window.recaptchaVerifier;
      delete window.recaptchaWidgetId;
    }
  
    // Create a new RecaptchaVerifier
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA verification successful, you can proceed with the authentication
          onSignUp();
        },
        "expired-callback": () => {
          // Handle the case where reCAPTCHA has expired
          console.log("reCAPTCHA expired");
        },
      }
    );
  
    // Render the reCAPTCHA widget
    window.recaptchaVerifier.render().then((widgetId) => {
      window.recaptchaWidgetId = widgetId;
    });
  }
  

  useEffect(() => {
    if (!startVerifyOTP) {
      return
    }
      onCaptchaVerify();
      setShowOTP(true);
      const appVerifier = window.recaptchaVerifier;
      const COUNTRY_CODE = "+91";
      const formatPh = COUNTRY_CODE + ph;
      signInWithPhoneNumber(auth, formatPh, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setLoaderEnable(false);
          toast.success("OTP Sent Successfully!", { autoClose: 2000 });
        })
        .catch((error) => {
          console.error("Error sending OTP:", error);
          setLoaderEnable(false);
        });
    
  }, [startVerifyOTP]);

  const onVerifyPhone = async () => {
    if (ph === "" || ph.length < 10) {
      toast.error("Please Enter Phone Number!", { autoClose: 1000 });
    } else {
      setLoaderEnable(true);

      try {
        const endPoints = "https://wyvate-backend-s217.onrender.com/auth/login";
        const response = await axios.post(endPoints, {
          phoneNumber: ph,
        });

        console.warn(response.data);
        if (
          response.data.message ===
          "User does not exist. Redirect to signup page."
        ) {
          setShowSetProfile(true);
        } else {
           onCaptchaVerify();
          setShowOTP(true);
          const appVerifier = window.recaptchaVerifier;
          const formatPh = "+91" + ph;
          await signInWithPhoneNumber(auth, formatPh, appVerifier)
            .then((confirmationResult) => {
              window.confirmationResult = confirmationResult;
              setLoaderEnable(false);

              toast.success("OTP Sent Successfully!", { autoClose: 2000 });
            })
            .catch((error) => {
              console.error(error);
              console.log("this is error");
              setLoaderEnable(false);
            });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const onOTPVerify = () => {
    if (otp.length === 0 || otp.length < 6) {
      toast.error("Enter valid OTP");
    } else {
      // Setting LOADER State true for OTP Button initially
      setLoaderEnable(true);
      if (typeof window !== "undefined") {
        // Access window or any browser-specific APIs here
        window.confirmationResult
        .confirm(otp)
        .then(async (res) => {
          // OTP verification successful
          setUser(res.user);
         // Setting LOADER State false once OTP received
          setLoaderEnable(false);
      
          // Sending UserData PAYLOAD TO BACKEND
          const isObjectEmpty = Object.keys(usersData).length !== 0;
          if (isObjectEmpty) {
            const endpoint = "https://wyvate-backend-s217.onrender.com/auth/signupOtp";
            try {
              const response = await axios.post(endpoint, usersData);
              console.log(response.data);
            } catch (error) {
              console.error("Error sending data to the backend:", error);
            }
          }
        })
        .catch((error) => {
          // Setting LOADER State false If any Error Occured
          setLoaderEnable(false);
      
          // Customize the error message based on the Firebase error code
          // For example, 'auth/invalid-verification-code' indicates an incorrect OTP
          console.error("Error verifying OTP:", error);
      
          // Display an error message to the user
          toast.error("Invalid OTP. Please try again.");
        });
      
      }
    }
  };
  

  useEffect(() => {
   
    if(showOTP){
      const c = setInterval(() => {
        if (btnnum >= 0 && showOTP) {
          if (btnnum === 0) {
            clearInterval(c);
            return;
          } else {
            setBtnNum(btnnum - 1);
          }
        }
      }, 1000);
      return () => clearInterval(c);

    }

  }, [showOTP, btnnum]);

  return (
    <div className="select-none">
          <div id="recaptcha-container"></div>

      <Toaster
        containerStyle={{ fontWeight: "revert" }}
        position="top-center"
        toastOptions={{ duration: 1000 }}
      />
    
      <div className="grid grid-cols-1 justify-items-center mx-auto h-[90vh] p-10">

        <div>
          {user ? 
            redirectURL ? 
                router.push(`/${redirectURL.referto}`)
               : 
                router.push("/")
           : showSetProfile ? (
            <SetProfile
              getPhone={getPhoneNumber}
              showingOTPhidingProfile={hanldeChildData}
              startotp={startOTP}
              userData={gettingUserData}
              phoneNo ={ph}
            />
          ) : showOTP ? (
            <div className="mt-10">
              <div className="grid grid-cols-1 justify-items-center">

                <Image
                  className="w-24"
                  src={wlogo}
                  alt="image"
                  width={200}
                  height={200}
                />
                <h2 className="text-base">Verify with OTP</h2>
                <h2 className="mt-3 text-zinc-400 font-light">Enter Six digit code, Sent on</h2>
                <h1 className="text-emerald-500">{"+91 " + ph}</h1>
              </div>

              <div className="grid grid-cols-1 justify-items-center mt-5 caret-black">
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  inputType="number"
                  containerStyle={"input"}
                  placeholder="000000"
                  inputStyle={{
                    borderWidth: .5,
                    borderRadius: 4,
                    width: 45,
                    height: 45,
                    textAlign: "center",
                    borderColor: "#BBBABA",
                    borderStyle: "solid",
                    margin: 5,
                  }}
                  skipDefaultStyles={true}
                  shouldAutoFocus={false}
                  renderSeparator={<span> </span>}
                  renderInput={(props) => <input {...props} />}
                />

                <h2 className="py-5">
                  {" "}
                  Didn&apos;t receive the OTP?{"   "}
                  <span className="text-red-600 font-medium pt-4">
                    {btnnum === 0 ? (
                      <button
                        className="cursor-pointer text-base"
                        onClick={onVerifyPhone}
                      >
                        Resend Code
                      </button>
                    ) : (
                      btnnum + "s"
                    )}
                  </span>
                </h2>
              </div>

              <button
                onClick={onOTPVerify}
                className="bg-emerald-400 flex gap-2 items-center justify-center mt-5 py-2.5 text-white w-full rounded"
              >
                   {loaderEnable ? (
    <PulseLoader
      color="white"
      loading={loaderEnable}
      cssOverride={CSSProperties}
      size={12}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
   
) :           <span>Verify OTP</span>       
} 
                
              </button>
            </div>
          ) : (
            <div>
              <div>
                <div className="flex justify-center pb-10">
                  <Image
                    className="w w-24"
                    src={wlogo}
                    width={400}
                    height={400}
                    alt="logo"
                  />
                </div>
                <h1 className="text-gray-300 text-md lg:text-base">
                  Welcome to Wyvate <br />
                </h1>
                <h1 className="text-base text-emerald-500 mb-5">
                  Login/Signup to Continue
                </h1>
              </div>

              <div className="relative w-full">
                <div className="relative text-gray-600 focus-within:text-gray-400">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2 gap-2">
                    <Image
                      src={india}
                      width={100}
                      height={100}
                      alt="img"
                      className="w-[30px]"
                    />
                    <h4 className="text-black text-base">+91</h4>
                  </span>
                  <input
                    type="tel"
                    name="q"
                    maxLength={10}
                    max={10}
                    className="outline-none border-[1px] w-full border-solid border-gray-400 text-base text-black p-3 rounded-md pl-[4.8rem] lg:pl-[5rem] "
                    placeholder="Enter Phone Number"
                    autoComplete="off"
                    onChange={(e) => {
                      const num = e.target.value;
                      const numericValue = num.replace(/\D/g, "");
                      setPh(numericValue);
                    }}
                    value={ph}
                  />
                </div>
              </div>

              <div>
                <button
                  className="bg-emerald-500 flex items-center justify-center gap-4 text-white rounded mt-5 w-full py-3 text-base lg:text-base"
                  onClick={() => onVerifyPhone()}
                >
                  {loaderEnable ? (
    <PulseLoader
      color="white"
      loading={loaderEnable}
      cssOverride={CSSProperties}
      size={12}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
   
) :                   <span>Continue</span>
}  
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



export default Login;
