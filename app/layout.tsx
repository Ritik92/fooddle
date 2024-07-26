import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";

const urbanist = Urbanist({ 
  subsets: ["latin"],
  variable: '--font-urbanist',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Home | Fooddle",
  description: "Fooddle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={urbanist.variable}>
      <body className="font-sans">
         <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}