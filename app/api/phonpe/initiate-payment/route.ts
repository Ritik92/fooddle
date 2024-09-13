import axios from 'axios';
import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

const MERCHANT_ID = 'M22QX5QNHS0ID';
const SALT_KEY = 'a727007c-1548-45bf-a210-7536cd07ae9e';
const SALT_INDEX = 1;

export  async function POST(req:NextRequest, res:NextResponse) {
  if (true) {
    const { amount, orderId } = await req.json();

    const payload = {
      merchantId: MERCHANT_ID,
      merchantTransactionId: orderId,
      amount: amount * 100, // Amount in paise
    
      redirectMode: 'GET',
      redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/note`,
      callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/phonpe/payment-callback`,
      mobileNumber: '9999999999', // Customer's mobile number
      paymentInstrument: {
        type: 'PAY_PAGE'
      }
    };

    const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
    const sha256 = crypto.createHash('sha256').update(base64Payload + '/pg/v1/pay' + SALT_KEY).digest('hex');
    const checksum = sha256 + '###' + SALT_INDEX;

    try {
      const response = await axios.post(
        'https://api.phonepe.com/apis/hermes/pg/v1/pay',
        {
          request: base64Payload
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-VERIFY': checksum
          }
        }
      );

      return  NextResponse.json(response.data,{status:200});
    } catch (error) {
      console.error('PhonePe API Error:', error);
      return  NextResponse.json({ error: 'Payment initiation failed' },{status:401});
    }
  } 
}