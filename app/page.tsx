import { Button } from "@nextui-org/react";
import Image from "next/image";
import SignIn from "./api/auth/signin/page";
import Login from "@/components/LandingPage";
import ForgotPassword from "@/components/forgotpassword";
import ResetPassword from "@/components/ResetPassword";
import Accordian from "@/components/Accordian";
import Profile from "@/components/profile";
import PersonalDetails from "@/components/PersonalDetails";
import HomeP from "@/components/homePagecomponents/homeP";
import MenuBar from "@/components/MenuBar";
import OrderTracking from "@/components/ordertracking";
import OrderTrackingMobile from "@/components/ordertrackingweb";
import VendorLandingPage from "@/components/vendorlandingpage";
import ShopSettings from "@/components/shopsettings";


export default function Home() {

  return (
   
    <Login/>
    
  );
}