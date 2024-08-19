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

const Home = () => {
    const dispatch = useDispatch();
    const cartTotalQuantity = useSelector((state: any) => state.cart.totalQuantity);
    const cartTotalAmount = useSelector((state: any) => state.cart.totalAmount);
    const cartItems = useSelector((state: any) => state.cart.items.filter(item => item.quantity > 0));
    const [restaurantName, setRestaurantName] = useState('');
    const [loading, setLoading] = useState(true);  
    const router = useRouter();
    const handleIncrement = (item) => {
        dispatch(cartActions.addItemToCart({
            id: item.id,
            name: item.name,
            price: item.price,
            customizations: item.customizations
        }));
    };

    const handleDecrement = (item) => {
        dispatch(cartActions.removeItemFromCart({
            id: item.id,
            customizations: item.customizations
        }));
    };
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
    
            // axios.post(`/api/ordercreate`, orderData)
            //     .then(response => {
            //         console.log('Order created successfully:', response.data);
            //         setLoading(false);
            //     })
            //     .catch(error => {
            //         console.error('Error creating order:', error.response?.data || error.message);
            //         setLoading(false);
            //     });
        }
    }, [cartItems, cartTotalAmount]);

    function orderConfirm() {
        router.push('/note');
    }
    
    return (
        <>
          
          <div className='bg-[#F5F5F5] h-screen overflow-auto'>
                <Bluebar title={'Cart'} />
                <div className='flex flex-col items-center  '>
                    <h2 className='text-xl font-bold   mb-4 '>{restaurantName}</h2>
                    {cartItems.map((item: any) => (
                        <div key={item.id} className='w-full max-w-md p-4   rounded '>
                            <div className='flex justify-between'>
                                <div className='flex'>
                                    <Image className='mt-2.5' src="./vegicon.png" width={10} height={10}/>
                                    <h3 className='md:text-lg  font-semibold pl-1'>{item.name}</h3>
                                </div>
                                <p className='md:text-lg font-medium'> ₹  {item.price}</p>
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
                    <div className='text-xl text-primary-700 font-semibold text-right p-2'>
                        Add More {'>'}
                    </div>
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
            
        </>
    );
};

export default Home;
