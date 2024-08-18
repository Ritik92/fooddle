"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Bluebar from '@/components/bluebar';
import Searchbar from '@/components/homePagecomponents/Searchbar';
import dynamic from 'next/dynamic';

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
                    loop
                    style={{ width: '300px', height: '300px' }}
                    autoplay
                />
            </div>
        );
    }
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <Bluebar title={'Orders'} />
            <div className='flex justify-center pt-[18px]'>
                <Searchbar text={'Search Orders'} />
            </div>
            <div className='h-screen overflow-auto'>
                <div className='p-4'>
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <div key={order.id} className="mb-4 p-4 border rounded-lg">
                                <h3 className="font-bold">Order ID: {order.id}</h3>
                                <p>Status: {order.status}</p>
                                <p>Total Amount: ₹{order.totalAmount}</p>
                                <h4 className="font-semibold">Items:</h4>
                                <ul>
                                    {order.items.map((item) => (
                                        <li key={item.id}>
                                            <p>Item: {item.menuItem.name}</p>
                                            <p>Quantity: {item.quantity}</p>
                                            {item.customizations && item.customizations.length > 0 && (
                                                <p>Customizations:</p>
                                            )}
                                            <ul className='pl-4 list-disc'>
                                                {item.customizations.map((customization) => (
                                                    <li key={customization.id}>
                                                        <p>{customization.name}: ₹{customization.price}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    ) : (
                        <div>No orders found.</div>
                    )}
                </div>
                <div className='p-[7rem]'></div>
            </div>
        </div>
    );
};

export default Home;
