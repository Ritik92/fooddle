"use client"
import ForgotPassword from "@/components/forgotpassword";
import Email from "next-auth/providers/email";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import path from "path";

export default function forgot(){
    const pathname=useSearchParams();
    const email = pathname.get('email') || '';
    return(
        <ForgotPassword email={email} />
    )
}