import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
   
      // Handle the payment callback from PhonePe
       const { transactionId, merchantTransactionId, amount, status } = await req.json();
        console.log(transactionId)
      // Verify the payment status and update your database
      // Implement your business logic here
  
      NextResponse.json({ message: 'Payment callback received' },{status:200});
    
  }