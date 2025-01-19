import React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Image from "next/image";
import { StoreProvider } from "./redux/StoreProvider";
import BackgroundImage from "./icons/backgroundImage.jpg"
import Header from "./components/Header";
import NavigationButtom from "./components/NavigationButtom";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const montserrat = localFont({
  src: "./fonts/Montserrat-VariableFont_wght.ttf",
  variable: "--Montserrat",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "AgTa Ideas Come to Life",
  description: "Ideas Come to Life",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body
          className={`${montserrat.variable} ${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
        >
          <div className="relative h-screen">
            <Image src={BackgroundImage} alt="Logo" fill className="z-0" style={{ objectFit: "cover", opacity: 0.5 }} />
          </div>
          <div className="absolute inset-0 z-10">
            <Header />
            {children}
            <NavigationButtom />
          </div>
        </body>
      </html>
    </StoreProvider>
  );
}
