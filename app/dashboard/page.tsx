"use client"
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Dashboard(){
    const router=useRouter();
    function handlenavigate(){
       
        router.push('/')
    }
    return (<div className="flex-wrap md:flex justify-center items-center md:h-screen">
        Your Email is registered Succesfully!
        Click <button onClick={handlenavigate} className="text-blue-950 underline p-1"> Here </button>  to Login
    </div>)
}