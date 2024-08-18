"use client"
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/homePagecomponents/Navbar';
import Bluebar from '@/components/bluebar';
import { Image } from '@nextui-org/react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Loader from '@/components/Loader';
import { useRouter } from 'next/navigation';

const Home = () => {
    const cartTotalQuantity = useSelector((state: any) => state.cart.totalQuantity);
    const cartTotalAmount = useSelector((state: any) => state.cart.totalAmount);
    const cartItems = useSelector((state: any) => state.cart.items);
    const [restaurantName, setRestaurantName] = useState('');
    const [loading, setLoading] = useState(true);  
    const router = useRouter();

    useEffect(() => {
        if (cartItems.length > 0) {
            const transformedItems = cartItems.map(item => ({
                menuItemId: item.id,
                quantity: item.quantity,
                customizationIds: item.customizations.map(cust => cust.id)
            }));
    
            const orderData = {
                userId: 'clzyjtich0000zj0efz6daw6u', // Replace with the actual user ID
                items: transformedItems,
                totalAmount: Number(cartTotalAmount)
            };
    
            setLoading(true);
    
            axios.post(`/api/ordercreate`, orderData)
                .then(response => {
                    console.log('Order created successfully:', response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error creating order:', error.response?.data || error.message);
                    setLoading(false);
                });
        }
    }, [cartItems, cartTotalAmount]);

    function orderConfirm() {
        router.push('/note');
    }

    return (
        <>
            {loading ? (
                <div><Loader /></div>
            ) : (
                <div>
                    <Bluebar title={'Cart'} />
                    <div className='flex flex-col items-center overflow-auto h-screen'>
                        <h2 className='text-xl font-bold mb-4 '>{restaurantName}</h2>
                        {cartItems.map((item: any) => (
                            <div key={item.id} className='w-full max-w-md p-4 mb-4 bg-white rounded shadow'>
                                <h3 className='text-lg font-semibold'>{item.name}</h3>
                                <p>Quantity: {item.quantity}</p>
                                <p>Base Price: ₹{item.price}</p>
                                {item.customizations && item.customizations.length > 0 && (
                                    <div>
                                        <p className='font-medium mt-2'>Customizations:</p>
                                        <ul className='list-disc pl-5'>
                                            {item.customizations.map((customization: any, index: number) => (
                                                <li key={index}>
                                                    {customization.name}: ₹{customization.price}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                <p className='font-bold mt-2'>Total: ₹{item.totalPrice}</p>
                            </div>
                        ))}
                    </div>
                    <div className='flex justify-center'>
                        <div className='bg-blue-800 h-[104px] w-full flex justify-between items-center md:h-[56.38px] md:w-[892px] mt-[30px] md:rounded-t-[24px] fixed bottom-0 z-50'>
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
                                <button onClick={orderConfirm} className='bg-primary-100 text-primary-700 w-[138px] h-[38px] rounded-[25.71px] flex justify-center items-center font-semibold text-base'>
                                    Pay Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Home;
