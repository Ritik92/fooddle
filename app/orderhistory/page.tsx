"use client"
import VendorNavbar from "@/components/VendorNavbar";
import { Image } from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function ManageOrders(){
    const { data: session, status } = useSession();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    return(
        <div className="flex flex-col h-screen">
            <VendorNavbar active={"Manage Orders"}/>

            <div className="flex justify-center font-bold text-xl mt-8">
                All Orders
            </div>
            <div className="flex-grow overflow-hidden">
                <div className="h-full overflow-y-auto p-4 text-sm">
                    {orders.length > 0 ? (
                        orders.map((order) => {
                            // Calculate total quantity for this order
                            const totalQuantity = order.items.reduce((sum, item) => sum + item.quantity, 0);
                          
                            return (
                                <div key={order.id} className="mb-4 p-2 md:p-6 bg-white md:ml-[25%] md:w-1/2">
                                    <div className='text-center'>
                                        Order No. 3086
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
                                                <p className=''>₹{order.totalAmount}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center text-[#4D4D4D] grid place-items-center pb-[20%] h-full">
                            <div>
                                <div>Fetching orders....</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}