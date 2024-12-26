import React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { StoreProvider } from "../redux/StoreProvider";
import SideBar from "./components/SideBar";
import Header from "./components/Header";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const montserrat = localFont({
  src: "../fonts/Montserrat-VariableFont_wght.ttf",
  variable: "--Montserrat",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Admin",
  description: "Admin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <div
        className={`${montserrat.variable} ${geistSans.variable} ${geistMono.variable} antialiased bg-black w-[100vw] h-[100vh] overflow-hidden`}
      >
        <div className="flex h-[100vh]">
          <div className="w-[20vw] hidden sm:flex">
            <SideBar />
          </div>
          <div className="w-full sm:w-[80vw] h-[100vh]">
            <div className="w-full h-[10vh]">
              <Header />
            </div>
            <div className="w-full overflow-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
    </StoreProvider>
  );
}
