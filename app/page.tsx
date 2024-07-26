import { Button } from "@nextui-org/react";
import Image from "next/image";
import SignIn from "./api/auth/signin/page";
import Login from "@/components/LandingPage";
import ForgotPassword from "@/components/forgotpassword";
import ResetPassword from "@/components/ResetPassword";


export default function Home() {

  return (
   
    <Login/> 
    
  );
}