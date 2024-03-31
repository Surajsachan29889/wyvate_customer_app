"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import sha256  from 'crypto-js/sha256'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

const Payment = () => {

    const router = useRouter()
    const [data, setData] = useState({

        name: "",
        mobile: "",
        amount: "",
        muid: ""
    })

    const getInputs = (e) => {

        let name = e.target.name;
        let value = e.target.value;

        setData((prev) => {return{...prev, [name] : value}})
    }

    const handleSubmit = async() => {

        const transactionID = "TR-"+uuidv4().toString(36).slice(-6);

        const payload = {
            // merchantId: process.env.NEXT_PUBLIC_MERCHANT_ID,
            merchantId: "PGTESTPAYUAT",
            merchantTransactionId: transactionID,
            merchantUserId: "MUID-"+uuidv4().toString(36).slice(-6),
            amount: data.amount * 100,
            // redirectUrl: `http://localhost:3000/api/status/${transactionID}`,
            redirectUrl: `https://wyvate-app.vercel.app/api/status/${transactionID}`,
            redirectMode: "POST",
            // callbackUrl: `http://localhost:3000/api/status/${transactionID}`,
            callbackUrl: `https://wyvate-app.vercel.app/api/status/${transactionID}`,
            mobileNumber: data.mobile,
            paymentInstrument: {
              type: "PAY_PAGE"
            }
          }

          const saltkey = '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399'
          const saltIndex = 1

          const dataPayload = JSON.stringify(payload)
          const dataBase64 = Buffer.from(dataPayload).toString("base64");

          // const fullURL = dataBase64 + "/pg/v1/pay" + process.env.NEXT_PUBLIC_SALT_KEY;
          const fullURL = dataBase64 + "/pg/v1/pay" + saltkey;
          const dataSha256 = sha256(fullURL);


          // const checkSum = dataSha256 + "###" + process.env.NEXT_PUBLIC_SALT_INDEX;
          const checkSum = dataSha256 + "###" + saltIndex;

          const UAT_PAY_API_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

          const response = await axios.post(UAT_PAY_API_URL, 
            {       request: dataBase64,
            },
            {
                headers: {
                    accept: "application/json",
                    "Content-Type" : "application/json",
                    "X-VERIFY": checkSum,
                  
                }
            }
            );

            const redirected = response.data.data.instrumentResponse.redirectInfo.url;
            router.push(redirected)

    }

  return (
    <div className='h-[90vh]'>
       <div className='flex flex-col justify-center w-[300px] mx-auto mt-10 gap-3'>
          <label  htmlFor="name">Name</label>
          <input className='p-2 border-zinc-400 border-[1px] rounded-lg border-solid outline-none' name='name' type="text" placeholder='Name' value={data.name} onChange={(e) => getInputs(e)}/>


          <label htmlFor="mobile">Mobile</label>
          <input className='p-2 border-zinc-400 border-[1px] rounded-lg border-solid outline-none' name='mobile' type="text" placeholder='Mobile'  value={data.mobile} onChange={(e) => getInputs(e)}/>

          <label htmlFor="amount">Amount</label>
          <input className='p-2 border-zinc-400 border-[1px] rounded-lg border-solid outline-none' name='amount' type="text" placeholder='Amount'  value={data.amount} onChange={(e) => getInputs(e)}/>

          <label htmlFor="muid">MUID</label>
          <input className='p-2 border-zinc-400 border-[1px] rounded-lg border-solid outline-none' name='muid' type="text" placeholder='MUID'  value={data.muid} onChange={(e) => getInputs(e)}/>

          <button onClick={handleSubmit} className='bg-emerald-600 font-semibold w-full text-white p-2 rounded-lg'>Pay</button>
       </div>
    </div>
  )
}

export default Payment
