"use client"
import React, { useEffect, useState } from 'react';
import { Button, Switch, Image } from "@nextui-org/react";
import axios from "axios";
import { format } from "date-fns";
import { signOut, useSession } from "next-auth/react";
import Navbar from "./homePagecomponents/Navbar";
import StatusTracker from './vendortracker';
import SidebarMenu from './Sidebarmenu';
import VendorNavbar from './VendorNavbar';

export default function VendorLandingPage() {
  const [isOpen, setIsOpen] = useState(true);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activebutton, setActivebutton] = useState('Home');
  const [isOrderConfirmed,setisOrderConfirmed]=useState('Received')
  const [orderStatuses, setOrderStatuses] = useState({});
  const { data: session, status } = useSession();
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.post('/api/updateOrderStatus', { orderId, newStatus });
      if (response.status === 200) {
        setOrderStatuses(prevStatuses => ({
          ...prevStatuses,
          [orderId]: newStatus
        }));
        // Update the orders state to reflect the new status
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };


  const handleCancel = (orderId) => {
    updateOrderStatus(orderId, 'Canceled');
  };

  const handleOutForDelivery = (orderId) => {
    updateOrderStatus(orderId, 'Out for Delivery');
  };

  const handleDelivered = (orderId) => {
    updateOrderStatus(orderId, 'Delivered');
  };

  const handleConfirm = (orderId) => {
    updateOrderStatus(orderId, 'Confirmed');
  };
  
  useEffect(() => {
    const fetchOrders = async () => {
      if (status === 'authenticated' && session?.user) {
        try {
          const userId = (session.user as any).id;
          const response = await axios.get(`/api/ordercreate?userId=${userId}`);
          setOrders(response.data);
        } catch (err) {
          setError('Failed to fetch orders');
        } finally {
          setLoading(false);
        }
      } else if (status === 'unauthenticated') {
        setError('Please sign in to view orders');
        setLoading(false);
      }
    };

    if (status !== 'loading') {
      fetchOrders();
    }
  }, [status, session]);

  const toggleShopStatus = async () => {
    const newStatus = !isOpen;
    try {
      await axios.post(`/api/togglemode`, { 
        isOpen: newStatus,
        userID: (session.user as any).id
      });
      setIsOpen(newStatus);
    } catch (error) {
      console.error('Error updating shop status:', error);
      setIsOpen(!newStatus);
    }
  };

  function dataConvert(input){
        
    const date = new Date(input);

        const formattedDate = format(date, "d MMMM'’'yy, h:mm a");

        return formattedDate
}

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  if (error) {
    return <div>{error}</div>;
  }

  const pendingOrders = orders.filter(order => 
    ['Received', 'Pending', 'Confirmed', 'Out for Delivery'].includes(order.status) || 
    ['Received', 'Pending', 'Confirmed', 'Out for Delivery'].includes(orderStatuses[order.id])
  );
  

  return (
    <div className="bg-[#F5F5F5]">
      <VendorNavbar active="Home" />
      
      <div>
        <div className="text-center md:mt-10 text-lg md:text-2xl font-bold flex justify-center">
          Pending Orders - <div className='text-primary-700'>  {pendingOrders.length}</div>
        </div>
        <div className="text-center text-red-500 max-w-1/2 pl-2 pr-2">
          Orders can only be cancelled within 10 mins of order time
        </div>
        
        <div className="p-4 text-sm overflow-auto h-screen md:ml-[25%] md:w-1/2">
          {pendingOrders.length > 0 ? (
            pendingOrders.map((order) => {
              const totalQuantity = order.items.reduce((sum, item) => sum + item.quantity, 0);
            
              return (
                <div key={order.id} className="mb-4 p-2 md:p-6 bg-white">
                  <div className='text-center'>
                    Order No. 2086
                  </div>
                <div className='bg-[#004BAD1A] p-4 rounded-[12px]'>
                  <ul>
                    <div className='flex justify-between text-primary-700 md:p-2'>
                      <div className='pl-2'>Item</div>
                      <div>Quantity</div>
                      <div>Price</div>
                    </div>
                    {order.items.map((item) => {
                      const customizationTotal = item.customizations.reduce((sum, customization) => sum + (customization.price || 0), 0);
                      const itemTotal = (item.menuItem.price + customizationTotal) * item.quantity;
          
                      return (
                        <li key={item.id}>
                          <div className='flex justify-between font-semibold p-1 md:p-2'>
                            <div>
                              <div className='flex'>
                                <Image className='mt-2' src="./vegicon.png" width={10} height={10} />
                                <p className='pl-1 max-w-[2rem] flex-wrap'>{item.menuItem.name}</p>
                              </div>

                              <ul className='text-sm text-gray-500 max-w-6 flex-wrap pl-3'>
                                {item.customizations.map((customization) => (
                                  <li key={customization.id}>
                                    <p>{customization.name}</p>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <p>{item.quantity}</p>
                            <p>₹{itemTotal.toFixed(2)}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <div className='mt-2'>
                    <hr className="border-gray-500 p-1" />
                    
                    <div className='flex justify-between font-bold ml-2'>
                      <p>Total</p>
                      <p>{totalQuantity}</p>
                      <p className=' '>₹{order.totalAmount}</p>
                    </div>
                  </div>
                </div>
               <div className='gap-4 pt-4 md:p-4'>
               <div className='flex justify-between text-gray-500 text-sm'>
                <div >
                  Order Type-Delivery
                </div>
                <div>
                  Payment Mode UPI
                </div>
                </div>
                <div className='flex justify-between p-1 mt-3'>
                <div>
                  Customer Name
                </div>
                <div>
                  Asmi
                </div>
                </div>
             
                <div className='flex justify-between p-1'>
                <div>
                  Phone No.
                </div>
                <div>
                  P11411414
                </div>
                </div>
             
                <div className='flex justify-between p-1'>
                <div>
                  Delivery Address
                </div>
                <div>
                  Hostel L
                </div>
                </div>
               </div>
             
             <div className='text-gray-600 pl-1 md:pl-4'>
             Instructions: Please make sure Pizzas are extra hot and spicy 
             </div>
             <div>
             <StatusTracker initialStatus={orderStatuses[order.id] || 'Received'} />
                </div>
  
{(orderStatuses[order.id] === 'Confirmed' || orderStatuses[order.id] === 'Out for Delivery'|| orderStatuses[order.id] === 'Delivered') ? (
  <div>
    <div className='flex justify-between gap-4'>
      <button className='bg-green-500 text-white w-[50%] pt-2 pb-2 rounded-3xl text-lg font-bold mt-4'>
        Call
      </button>
      <button className='bg-yellow-500 text-white w-[50%] pt-2 pb-2 rounded-3xl text-lg font-bold mt-4' onClick={() => handleOutForDelivery(order.id)}>
        Out For Delivery
      </button>
    </div>
    <button className='bg-primary-700 text-white w-full pt-2 pb-2 rounded-3xl text-lg font-bold mt-4' onClick={() => handleDelivered(order.id)}>
      Delivery Done
    </button>
  </div>
) : (orderStatuses[order.id] === 'Received' || !orderStatuses[order.id]  || orderStatuses[order.id] === 'Pending') ? (
  <div className='flex justify-between'>
    <button className='bg-red-500 text-white w-[50%] pt-2 pb-2 rounded-3xl text-lg font-bold mt-4' onClick={() => handleCancel(order.id)}>
      Cancel
    </button>
    <button className='bg-green-500 text-white w-[50%] pt-2 pb-2 rounded-3xl text-lg font-bold mt-4' onClick={() => handleConfirm(order.id)}>
      Confirm
    </button>
  </div>
) : null}


             <div className='h-[30%]'></div>   
              </div>            );
          })
          
        ) : (
          <div className="text-center text-[#4D4D4D] grid place-items-center pb-[20%] h-screen">
            <div>
              <div className="text-xl">All orders are complete</div>
              <div>No Pending orders right now. Relax and get ready for the next one!</div>
            </div>
          </div>
        )}
        <div className='h-[20%]'>

        </div>
      </div>
        
      <div className="absolute bottom-[4rem] hidden md:block">
        {format(new Date(), 'd MMMM')}
        <div>
          {orders.length} Orders Processed
        </div>
      </div>
      <div className="absolute bottom-[2rem] hidden md:block">
        Click to Close Shop 
        <label className="inline-flex items-center cursor-pointer absolute pl-2">
          <input 
            type="checkbox" 
            checked={isOpen}
            onChange={toggleShopStatus} 
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
      </div>
      </div>
     
    </div>
  );
}