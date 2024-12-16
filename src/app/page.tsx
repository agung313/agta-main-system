"use client";

import { useSelector } from "react-redux";
import DashboardHome from "./components/DashboardHome";
import Header from "./components/Header";
import BackgroundImage from "./icons/backgroundImage.jpg"
import Image from "next/image";
import NavigationButtom from "./components/NavigationButtom";
import DashboardAbout from "./components/DashboardAbout";
import DashboardServices from "./components/DashboardServices";
import DashboardContact from "./components/DashboardContact";

export default function Home() {
  const idTabActive = useSelector((state: { header: { idTabActive: string } }) => state.header.idTabActive);
  return (
    <div style={{ overflow: 'hidden' }}>
      <Image src={BackgroundImage} alt="Logo" layout="fill" objectFit="cover" className="z-0" style={{ opacity: 0.5 }} />
      <div className="absolute inset-0 z-10" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <Header />
        {idTabActive === 'homeTab' && <DashboardHome />}
        {idTabActive === 'aboutTab' && <DashboardAbout />}
        {idTabActive === 'servicesTab' && <DashboardServices />}
        {idTabActive === 'contactTab' && <DashboardContact />}
        <NavigationButtom />
      </div>
    </div>
  );
}