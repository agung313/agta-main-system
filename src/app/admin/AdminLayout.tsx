"use client";

import React from 'react';
import { useSelector } from 'react-redux';
import SideBar from './components/SideBar';
import Dashboard from './layouts/Dashboard';
import Slogan from './layouts/Slogan';
import About from './layouts/About';
import Service from './layouts/Service';
import Contact from './layouts/Contact';
import Messages from './layouts/Messages';
import Header from './components/Header';
import NotificationPage from '../components/NotificationPage';
import LoadingPage from '../components/LoadingPage';

const AdminLayout = () => {
  const idTabActive = useSelector((state: { admin: { idTabActive: string } }) => state.admin.idTabActive);
  const isLoadingSubmit = useSelector((state: { admin: { isLoadingSubmit: boolean } }) => state.admin.isLoadingSubmit);
  return (
    <div className="w-[100vw] h-[100vh] flex">
      <LoadingPage
        className='bg-black bg-opacity-60 fixed inset-0 z-50'
        color='#00B300'
        isLoading={isLoadingSubmit}
        textLoading='Loading Submit...'
      />
      <div className="hidden xl:flex w-[20vw]">
        <SideBar />
      </div>
      <div className="w-full xl:w-[80vw] h-full flex flex-col">
        <div className="h-[10vh]">
          <Header />
        </div>
        <div className="flex-1 overflow-auto">
          {idTabActive === 'homeTab' && <Dashboard />}
          {idTabActive === 'sloganTab' && <Slogan />}
          {idTabActive === 'aboutTab' && <About />}
          {idTabActive === 'serviceTab' && <Service />}
          {idTabActive === 'contactTab' && <Contact />}
          {idTabActive === 'messagesTab' && <Messages />}
        </div>
        <div className='flex justify-center'>
          <NotificationPage />
        </div>
      </div>
      <div className="xl:hidden w-full h-full flex items-center justify-center">
        <p className='font-extrabold text-neutral-300 text-[5vh] my-5 text-center'>Desktop Only</p>
      </div>
    </div>
  );
};

export default AdminLayout;