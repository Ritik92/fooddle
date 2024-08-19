"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Bluebar from '@/components/bluebar';
import Searchbar from '@/components/homePagecomponents/Searchbar';
import dynamic from 'next/dynamic';
import { format } from 'date-fns';
import { Image } from '@nextui-org/react';
const DotLottieReact = dynamic(() => import('@lottiefiles/dotlottie-react').then(mod => mod.DotLottieReact), { ssr: false });

const Home = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const fetchOrders = async () => {
            try {
                const userId = "clzyjtich0000zj0efz6daw6u"; // Replace with dynamic userId if needed
                const response = await axios.get(`/api/ordercreate?userId=${userId}`);
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
        return null; // Or return a loading spinner
    }
    if (loading) {
        return (
            <div className='flex items-center justify-center h-screen'>
                <DotLottieReact
                    src="https://lottie.host/4f806c6a-0425-4ed0-8920-2953a579810c/Z6LE7AXB72.lottie"
                    
                    style={{ width: '300px', height: '300px' }}
                    autoplay
                />
            </div>
        );
    }
    if (error) {
        return <div>{error}</div>;
    }
    
    function dataConvert(input){
        
        const date = new Date(input);

            const formattedDate = format(date, "d MMMM'’'yy, h:mm a");

            return formattedDate
    }
    return (
        <div>
            <Bluebar title={'Orders'} />
            <div className='flex justify-center bg-[#F5F5F5] pt-[18px]'>
                <div className='p-2'>
                <Searchbar text={'Search Orders'} />
                </div>
                
            </div>
            <div className='h-screen bg-[#F5F5F5] overflow-auto'>
                <div className='p-4'>
                    <div>
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <div key={order.id} className=" mb-4 p-2 bg-white   rounded-[12px]">
                                <div className='flex justify-between'>
                                <p className='font-bold text-xl'> {order.items[0]?.menuItem?.category?.menu?.restaurant?.name || 'Your Orders'} </p>
                                
                                <p className='text-right text-yellow-500'>{order.status}</p>
                                
                                </div>
                               
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
                        <div>No orders found.</div>
                    )}
                    </div>
                   
                </div>
                <div className='p-[7rem]'></div>
            </div>
        </div>
    );
};

export default Home;
