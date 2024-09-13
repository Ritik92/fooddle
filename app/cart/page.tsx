"use client"
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/homePagecomponents/Navbar';
import Bluebar from '@/components/bluebar';
import { Image, Input } from '@nextui-org/react';
import axios from 'axios';
import Loader from '@/components/Loader';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '@/redux/slices/cartSlice';
import prisma from '@/lib/prisma';
import { useSession } from 'next-auth/react';
import Script from 'next/script';
// import { useNavigate } from 'react-router-dom';

declare global {
  interface Window {
    Razorpay: any;
  }
}
const Home = () => {
  


  const BackClickHandle = () => {
    router.back();
    
  };
  const dispatch = useDispatch();
  const cartTotalQuantity = useSelector((state: any) => state.cart.totalQuantity);
  const cartTotalAmount = useSelector((state: any) => state.cart.totalAmount);
  const cartItems = useSelector((state: any) => state.cart.items.filter(item => item.quantity > 0));
  const [restaurantName, setRestaurantName] = useState<string|null>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  
  const [orderId, setOrderId] = useState(null);
  let {data:session}=useSession();
  // const createRazorpayOrder = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.post('/api/create-razorpay-order', {
  //       amount: cartTotalAmount * 100, // Razorpay expects amount in paise
  //       currency: 'INR',
  //       receipt: `order_${Date.now()}`,
  //     });
  //     setOrderId(response.data.id);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error('Error creating Razorpay order:', error);
  //     setLoading(false);
  //     setError('Failed to create order. Please try again.');
  //   }
  // };
  const handlePayment = async () => {
    let amount=50
   const orderId="MT785099006888111"
    try {
      const response = await axios.post('/api/phonpe/initiate-payment', { amount, orderId });
      // Redirect to PhonePe payment page
      window.location.href = response.data.data.instrumentResponse.redirectInfo.url;
    } catch (error) {
      console.error('Payment initiation failed:', error);
    
    }
  };
  // const handlePayment1 = async () => {

  //   if (!orderId) {
  //     await createRazorpayOrder();
  //   }
      
  //   const options = {
  //     key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  //     amount: cartTotalAmount * 100,
  //     currency: 'INR',
  //     name: 'Your Food Delivery App',
  //     description: 'Food Order Payment',
  //     order_id: orderId,
  //     handler: async function (response) {
  //       try {
  //         setLoading(true);
  //         // Verify payment on the server
  //         const verificationResponse = await axios.post('/api/verify-payment', {
  //           razorpay_order_id: response.razorpay_order_id,
  //           razorpay_payment_id: response.razorpay_payment_id,
  //           razorpay_signature: response.razorpay_signature,
  //         });

  //         if (verificationResponse.data.success) {
  //           // Payment verified, create order in your system
  //           await orderConfirm();
  //         } else {
  //           setError('Payment verification failed. Please try again.');
  //         }
  //       } catch (error) {
  //         console.error('Error handling payment:', error);
  //         setError('An error occurred while processing your payment. Please try again.');
  //       } finally {
  //         setLoading(false);
  //       }
  //     },
  //     prefill: {
  //       name: session?.user?.name || '',
  //       email: session?.user?.email || '',
  //     },
  //     theme: {
  //       color: '#004BAD',
  //     },
  //   };
  //   const paymentObject = new window.Razorpay(options);
  //   paymentObject.open();
  // };
  const handleIncrement = (item) => {
    dispatch(cartActions.addItemToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      customizations: item.customizations,
      restaurantId:item.restaurantId
    }));
  };
  function handleaddmore(){
    router.push(`/restaurants/${cartItems[0].restaurantId}`)
  }
  const handleDecrement = (item) => {
    dispatch(cartActions.removeItemFromCart({
      id: item.id,
      customizations: item.customizations
    }));
  };
 
  const userID = session?.user ? (session.user as any).id : null;
  const orderConfirm = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/ordercreate', {
        userId: userID, 
        items: cartItems.map((item) => ({
          menuItemId: item.id,
          quantity: item.quantity,
          customizationIds: item.customizations.map((cust) => cust.id),
        })),
        totalAmount: Number(cartTotalAmount),
        restaurantId: cartItems[0].restaurantId,
      });
  
      console.log('Order created successfully:', response.data);
      setLoading(false);
      window.location.href = '/note';
    } catch (error) {
      console.error('Error creating order:', error.response?.data || error.message);
      setLoading(false);
      setError(error.response?.data || error.message);
    }
  };
  useEffect(() => {
    if (error) {
      // Add additional error handling logic, such as displaying an error message to the user
      console.error('Error:', error);
    }
  }, [error]);
  useEffect(() => {
    if (cartItems.length==0) {
      // Add additional error handling logic, such as displaying an error message to the user
     router.push('/')
    }
  }, [cartItems]);
  return (
    <>
     <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className='bg-[#F5F5F5] h-screen overflow-auto' onClick={BackClickHandle}>
      <div className='hidden lg:block'>
                <Navbar/>
            </div>
        <div className='flex justify-center md:mt-6'>
        <Bluebar title={'Cart'} />
        </div>
        {cartItems.length>0? <div><div className='flex flex-col items-center   '>
          <h2 className='text-xl font-bold  mb-4 '>{restaurantName}</h2>
          <div className='md:h-12 '></div>
          {cartItems.map((item: any) => (
            <div key={item.id} className='w-full max-w-md md:max-w-full md:pl-[20%] md:pr-[20%]  p-4    rounded '>
              <div className='flex justify-between'>
                <div className='flex  w-[30%]'>
                  <Image className='mt-2.5' src="./vegicon.png" width={20} height={15} />
                  <h3 className='md:text-lg  font-semibold pl-1'>{item.name} </h3>
                </div>
                <p className='md:text-lg font-medium  text-center '><div className='flex justify-center'>₹ {item.price}</div> </p>
                <div className='flex items-center justify-between w-[90px] h-[36.04px] bg-[#EAF3FF] rounded-[30.03px] font-urbanist text-[#004BAD] text-base font-semibold'>
                  <button
                    className='w-[36.04px] h-[36.04px] rounded-full flex items-center justify-center'
                    onClick={() => handleDecrement(item)}
                  >
                    -
                  </button>
                  {item.quantity}
                  <button
                    className='w-[36.04px] h-[36.04px] rounded-full flex items-center justify-center'
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </button>
                </div>
              </div>
              {item.customizations && item.customizations.length > 0 && (
                <div>
                  <ul className=' pl-1 text-gray-500'>
                    {item.customizations.map((customization: any, index: number) => (
                      <li key={index}>
                        {customization.name}: ₹{customization.price}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className=' md:pl-[20%] md:pr-[20%]'>
          {cartItems.length>0 && <div className='text-xl text-primary-700 font-semibold text-right p-2' onClick={handleaddmore}>
          Add More {'>'}
        </div>}
        
        <div className='p-4 '>
          <input className='w-full p-4 rounded-xl border-1 border-slate-400 bg-[#F5F5F5]' type='' placeholder='Add Instructions'></input>
        </div>
        <div>
          <div className='text-xl text-gray-700 p-4 '>
            <div className='font-semibold'>
              Bill Details
            </div>
            <div className='flex justify-between'>
              <div>
                Item Total
              </div>
              <div>
                ₹ {cartTotalAmount.toFixed(2)}
              </div>
            </div>
            <div className='flex justify-between'>
              <div>
                Delivery Charges
              </div>
              <div>
                0
              </div>
            </div>
            <div className='flex justify-between'>
              <div>
                GST
              </div>
              <div>
                0
              </div>
            </div>
            <div className='flex justify-between pt-4 text-primary-700 font-semibold'>
              <div className=''>
                Total
              </div>
              <div> ₹ {cartTotalAmount.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
        <div className='p-[10rem]'>
        </div>
        </div>
     
        <div className='flex justify-center'>
          <div className='bg-blue-800 h-[104px] w-full flex justify-between items-center md:h-[56.38px] md:w-[80%] lg:w-[70%]  mt-[30px] md:rounded-t-[24px] fixed bottom-0 z-50'>
            <div className='md:pl-[32px] flex pl-[24px] gap-[30px] text-white text-xs'>
              <div>
                <div className='text-base pl-5'>{cartTotalQuantity}</div>
                <div className='text-[#719AD0] font-light'>Total Count</div>
              </div>
              <div>
                <div className='text-base'>₹ {cartTotalAmount.toFixed(2)}</div>
                <div className='text-[#719AD0] font-light'>Total Price</div>
              </div>
            </div>
            <div className='pl-4 md:mr-[32px] mr-[24px]'>
            <button
          onClick={handlePayment}
          className='bg-primary-100 text-primary-700 w-[138px] h-[38px] rounded-[25.71px] flex justify-center items-center font-semibold text-base'
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Pay Now'}
        </button>
            </div>
          </div>
        </div></div>:<div></div>}
        
      </div>
    </>
  );
};

export default Home;