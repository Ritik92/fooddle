import { Button } from "@nextui-org/react";
import axios from "axios";
import { format } from "path";
import { useState } from "react";
import { Image } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import Navbar from "./homePagecomponents/Navbar";
export default function VendorLandingPage(){
    const [orders, setOrders] = useState([]);
    const fetchorders=() => {
        
        const fetchOrders = async () => {
            try {
                const userId = "user-12"; // Replace with dynamic userId if needed
                const response = await axios.get(`/api/ordercreate?userId=${userId}`);
                setOrders(response.data);
            } catch (err) {
                console.log('Failed to fetch orders');
            } 
        };

        fetchOrders();
    }
   
    return (
        <div className="flex gap-8">
         
            <Button onClick={fetchorders}>My Orders</Button>
            <div className="w-full">
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
                    <Button onClick={()=>{signOut()}}>Log out</Button>
            <Button color="success">Go Online</Button>
            <Button color="danger">Go Offline</Button>
            
        </div>
    )
}