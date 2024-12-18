"use client";

import React, { useState } from 'react'
import Image from 'next/image';
import NavigationBar from '../../icons/navigationBar.svg';
import ProfileCircle from '../../icons/profileCircle.svg';
import { useDispatch } from 'react-redux';
import { changeTabActive } from '@/app/redux/header';

const Header = () => {
  const dispatch = useDispatch();
  const tabs = [
    { name: 'Dashboard', id: 'homeAdminTab' },
    { name: 'Tentang', id: 'aboutAdminTab' },
    { name: 'Layanan', id: 'servicesAdminTab' },
    { name: 'Kontak', id: 'contactAdminTab' },
  ];
  const [tabActive, setTabActive] = useState<{ name: string; id: string }>(tabs[0]);
  const handleHome = () => {
    window.location.href = '/admin';
  };

  const handleLogout = () => {
    window.location.href = '/';
  };

  const clickTab = (index: number) => {
    setTabActive(() => {
      const newTab = tabs[index];
      dispatch(changeTabActive(newTab.id));
      return newTab;
    });
  };

  return (
    <div className='w-full flex justify-center items-center fixed z-50 p-5'>
      <header className="text-black top-0 w-full">
        <nav className="container mx-auto flex justify-between items-center">
          <button className="flex items-center" onClick={() => handleHome()}>
            {/* <Image src={LogoUtama} alt="Logo" className="w-auto h-[5vh] sm:h-[10vh]" /> */}
            <div className="items-center">
              {/* <p className="font-extrabold text-[3vh] sm:text-[6vh] text-blueCustom-900">AGTA</p> */}
              <p className="font-extrabold text-[3vh] sm:text-[5vh] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">AGTA</p>
              {/* <p className="text-[0.75vh] sm:text-[1.5vh] font-bold text-blueCustom-800 mt-[-0.3rem]">Where Ideas Come to Life</p> */}
            </div>
          </button>
          <div className="flex items-center hidden xl:flex">
            <ul className="flex space-x-4">
              {tabs.map((tab: { name: string; id: string }, index: number) => (
                <li key={index}>
                  <button
                    className={`${
                      tabActive.name === tab.name ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 font-bold text-[2.3vh] py-2 px-4' : 'py-2 px-4 font-bold text-[2.3vh] text-white'
                    }`}
                    onClick={() => clickTab(index)}
                  >
                    {tab.name}
                  </button>
                </li>
              ))}
              <button className="flex items-center text-white hover:text-red-500" onClick={() => handleLogout()}>
                <Image src={ProfileCircle} alt="Logo" className="w-auto h-[4vh]" />
                <p className="font-bold text-[2.3vh] ml-2">Logout</p>
              </button>
            </ul>
          </div>
          <button className="flex items-center xl:hidden">
            <Image src={NavigationBar} alt="Logo" className="w-auto h-[5vh] sm:h-[7.5vh] xl:h-[10vh]" />
          </button>
        </nav>
      </header>
    </div>
  );
};

export default Header