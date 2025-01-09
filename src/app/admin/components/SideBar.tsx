"use client";

import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '@/app/redux/store';
import { changeTabActive } from '@/app/redux/admin';
import DashboardIcont from '../icons/DashboardIcont';
import SloganIcont from '../icons/SloganIcont';
import AboutIcont from '../icons/AboutIcont';
import ServiceIcont from '../icons/ServiceIcont';
import ContactIcont from '../icons/ContactIcont';
import MessagesIcont from '../icons/MessagesIcont';
import LogoutIcont from '../icons/LogoutIcont';

const SideBar = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const idTabActive = useSelector((state: { admin: { idTabActive: string } }) => state.admin.idTabActive);

  const changeTab = (tab: string) => {
    dispatch(changeTabActive(tab));
  };

  return (
    <div className='w-full h-[100vh] bg-neutral-800 bg-opacity-50 border-r border-neutral-800 flex flex-col'>
      <Link href='/admin' onClick={() => changeTab('homeTab')} className='flex justify-center items-center text-white mx-4 py-5 border-b-2 border-neutral-800'>
        <p className="font-bold text-[1vh] sm:text-[3vh] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">AGTA Widget</p>
      </Link>
      <div className='px-5 pt-10 flex-grow'>
        <p className='font-medium text-neutral-300 text-[2vh] mb-5'>Menu</p>
        <button className="flex items-center mt-8" onClick={() => changeTab('homeTab')}>
          <DashboardIcont size={35} color={idTabActive === 'homeTab' ? '#fff' : '#4A4E56'} />
          <p className={`font-medium text-[2vh] ml-2 ${idTabActive === 'homeTab' ? 'text-white' : 'text-neutral-600'}`}>
            Dashboard
          </p>
        </button>
        <button className="flex items-center mt-8 pl-1" onClick={() => changeTab('sloganTab')}>
          <SloganIcont size={25} color={idTabActive === 'sloganTab' ? '#fff' : '#4A4E56'} />
          <p className={`font-medium text-[2vh] ml-3 ${idTabActive === 'sloganTab' ? 'text-white' : 'text-neutral-600'}`}>
            Slogan
          </p>
        </button>
        <button className="flex items-center mt-8 pl-1" onClick={() => changeTab('aboutTab')}>
          <AboutIcont size={25} color={idTabActive === 'aboutTab' ? '#fff' : '#4A4E56'} />
          <p className={`font-medium text-[2vh] ml-3 ${idTabActive === 'aboutTab' ? 'text-white' : 'text-neutral-600'}`}>
            Abouts
          </p>
        </button>
        <button className="flex items-center mt-8 pl-1" onClick={() => changeTab('serviceTab')}>
          <ServiceIcont size={25} color={idTabActive === 'serviceTab' ? '#fff' : '#4A4E56'} />
          <p className={`font-medium text-[2vh] ml-3 ${idTabActive === 'serviceTab' ? 'text-white' : 'text-neutral-600'}`}>
            Services
          </p>
        </button>
        <button className="flex items-center mt-8 pl-1" onClick={() => changeTab('contactTab')}>
          <ContactIcont size={25} color={idTabActive === 'contactTab' ? '#fff' : '#4A4E56'} />
          <p className={`font-medium text-[2vh] ml-3 ${idTabActive === 'contactTab' ? 'text-white' : 'text-neutral-600'}`}>
            Contacts
          </p>
        </button>
        <button className="flex items-center mt-8 pl-1" onClick={() => changeTab('messagesTab')}>
          <MessagesIcont size={25} color={idTabActive === 'messagesTab' ? '#fff' : '#4A4E56'} />
          <p className={`font-medium text-[2vh] ml-3 ${idTabActive === 'messagesTab' ? 'text-white' : 'text-neutral-600'}`}>
            Messagaes
          </p>
        </button>
      </div>
      <div className='px-5 py-10 mt-auto'>
        <div className='mb-5 pb-4 border-b-2 border-neutral-800'>
          <p className='font-medium text-neutral-700 text-[2vh] mb-2'>SIGNED AS</p>
          <p className='font-medium text-neutral-300 text-[2vh]'>sholihhudinagung@gmail.com</p>
        </div>
        <Link href='/' className='flex items-center mt-8'>
          <p className='font-bold text-neutral-700 text-[2vh] mr-3'>Log out</p>
          <LogoutIcont color='#4A4E56' />
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
