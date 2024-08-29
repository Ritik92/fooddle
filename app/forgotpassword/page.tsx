"use client"
import React, { Suspense } from 'react';
import ForgotPassword from "@/components/forgotpassword";
import { useSearchParams } from "next/navigation";

function ForgotContent() {
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || '';
    return <ForgotPassword email={email} />;
}

export default function Forgot() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ForgotContent />
        </Suspense>
    );
}