"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Bluebar from '@/components/bluebar';
import Searchbar from '@/components/homePagecomponents/Searchbar';
import dynamic from 'next/dynamic';
import { format } from 'date-fns';
import { Button, Image } from '@nextui-org/react';
import Navbar from '@/components/homePagecomponents/Navbar';
import BluebarWide from '@/components/bluebarwide';
import { useSession } from 'next-auth/react';

const DotLottieReact = dynamic(() => import('@lottiefiles/dotlottie-react').then(mod => mod.DotLottieReact), { ssr: false });

const Home = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isClient, setIsClient] = useState(false);
    const { data: session, status } = useSession();

    useEffect(() => {
        setIsClient(true);
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

    if (!isClient) {
        return null; // Or return a loading spinner
    }

    if (status === 'loading' || loading) {
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
        <div className='bg-[#F5F5F5]'>
            <div className='hidden lg:block'>
                <Navbar/>
            </div>
           <div className='flex justify-center md:pt-10'>
           <BluebarWide title={'Orders'} />
           </div>
           
            <div className='flex justify-center  pt-[18px] md:pt-0'>
                <div className='p-2'>
                <Searchbar text={'Search Orders'} />
                </div>
            </div>
            <div className='h-screen bg-[#F5F5F5] md:pl-[15%] md:pr-[15%] overflow-auto'>
                <div className='p-4'>
                    <div>
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <div key={order.id} className=" mb-4 p-6 bg-white   rounded-[12px]">
                                <div className='flex justify-between pb-2'>
                                <p className='font-semibold text-xl'> {order.items[0]?.menuItem?.category?.menu?.restaurant?.name || 'Your Orders'} </p>
                                
                                <p className='text-right font-medium text-green-500'>{order.status}</p>
                                
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
                                <div className='text-right pt-4'>
                                <button className='bg-primary-700 w-[20%] p-1 rounded-3xl text-white'>Reorder</button>
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