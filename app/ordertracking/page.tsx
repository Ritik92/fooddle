"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Bluebar from '@/components/bluebar';
import Searchbar from '@/components/homePagecomponents/Searchbar';
import dynamic from 'next/dynamic';
import { format } from 'date-fns';
import { Button, Image, Navbar } from '@nextui-org/react';
import BluebarWide from '@/components/bluebarwide';
import OrderTracking from '@/components/ordertracking';
import OrderTrackingMobile from '@/components/ordertrackingweb';
import Loader from '@/components/Loader';
const Home = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const fetchOrders = async () => {
            try {
                const userId = "user-12"; // Replace with dynamic userId if needed
                const response = await axios.get(`/api/ordertracking?userId=${userId}`);
                setOrders(response.data);
            } catch (err) {
                setError('Failed to fetch orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (!isClient) {
        return <Loader/>; // Or return a loading spinner
    }
  
    if (error) {
        return <div>{error}</div>;
    }
    
    function dataConvert(input){
        
        const date = new Date(input);

            const formattedDate = format(date, "d MMMM'’'yy, h:mm a");

            return formattedDate
    }
    let restaurantName;
    {orders.length > 0 ? (
        orders.map((order) => {
             restaurantName = order.items?.[0]?.menuItem?.category?.menu?.restaurant?.name || ' Restaurant';
        })
    ) : (
        <p><Loader/></p>
    )}
    

    return (
        <div className='bg-[#F5F5F5]'>
            
             
           <div className='flex justify-center md:pt-10'>
           <Bluebar title={'Order Tracking'} />
           </div>
           <div className='block md:hidden'>
           <OrderTrackingMobile status={'preparing'} restaurantName={restaurantName}  />
           </div>
           <div className='md:block hidden'>
           <OrderTracking orderStatus={'preparing'}/>
           </div>
          
            <div className='flex justify-center  pt-[18px] md:pt-0'>   
            </div>
            <div className='h-screen bg-[#F5F5F5] md:pl-[15%] md:pr-[15%] overflow-auto'>
                <div className=''>
                    <div>
                   
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <div key={order.id} className=" mb-4 pl-6 pr-6 bg-[#F5F5F5]  rounded-[12px]">
                                
                               
                                <ul>
                                    {order.items.map((item) => (
                                        <li key={item.id}>
                                            <div className='flex justify-between font-semibold'>
                                                <div className='flex'>
                                                <Image className='mt-2' src="./vegicon.png" width={10} height={10}/>
                                                <p className='pl-1'>{item.menuItem.name}</p>
                                                </div>
                                       
                                            <p> {item.quantity}</p>
                                            </div>
                                            <ul className='text-sm text-gray-500 pb-1'>
                                                {item.customizations.map((customization) => (
                                                    <li key={customization.id}>
                                                        <p>{customization.name}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    ))}
                                </ul>
                                <div className='mt-2'>
                                <hr className="border-gray-500 p-1" />
                                <div className='flex justify-between'>
                                <p>{dataConvert(order.createdAt)}</p>
                                <p className=' text-primary-700 font-bold'> ₹{order.totalAmount}</p>
                                
                                </div>
                                
                                
                                </div>
                                
                            </div>
                        ))
                    ) : (
                        <div className='flex  justify-center h-screen'>Fetching Orders</div>
                    )}
                    </div>
                   
                </div>
                <div className='p-[7rem]'></div>
            </div>
        </div>
    );
};

export default Home;
