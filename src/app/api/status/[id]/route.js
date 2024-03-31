import sha256 from "crypto-js/sha256";
import { redirect } from "next/navigation";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req, res) {


  const data = await req.formData();
  

    // const body = JSON.parse(req.body);

    // const bookingId = body.bookingId;
    // console.log("Booking Id ---- >"+ bookingId)

  
  const status = data.get("code");
  const merchantId = data.get("merchantId");
  const transactionId = data.get("transactionId");
  // const bookingId = data.body("bookingId");
 
  const saltkey = '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399'
  const saltIndex = 1
  const st =
    `/pg/v1/status/${merchantId}/${transactionId}` +
    saltkey;
  // const st =
  //   `/pg/v1/status/${merchantId}/${transactionId}` +
  //   process.env.NEXT_PUBLIC_SALT_KEY;
  const dataSha256 = sha256(st);

  // const checkSum = dataSha256 + "###" + process.env.NEXT_PUBLIC_SALT_INDEX;
  const checkSum = dataSha256 + "###" + saltIndex;
  const options = {
    method: "GET",
    url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${transactionId}`,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-VERIFY" : checkSum,
      "x-MERCHANT-ID" : `${merchantId}`
    },
  };
  const response = await axios.request(options);
  console.log("code", response.data.code)

  if(response.data.code === "PAYMENT_SUCCESS"){
    return NextResponse.redirect("http://localhost:3000/purchase", {
        status: 301
    })

    // api call

    // return NextResponse.redirect("https://wyvate-app.vercel.app/purchase", {
    //     status: 301
    // })
  }else{
    return NextResponse.redirect("http://localhost:3000/payment/failure", {
        // A 301 is requred to redirect from a POST to GET route
        status: 301
    })
    // return NextResponse.redirect("https://wyvate-app.vercel.app/payment/failure", {
    //     // A 301 is requred to redirect from a POST to GET route
    //     status: 301
    // })
  }
   
}
