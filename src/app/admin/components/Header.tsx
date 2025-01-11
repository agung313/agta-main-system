"use client";

import LoadingPage from '@/app/components/LoadingPage';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Header = () => {
  const idTabActive = useSelector((state: { admin: { idTabActive: string } }) => state.admin.idTabActive);
  const isLoading = useSelector((state: { admin: { isLoading: boolean } } ) => state.admin.isLoading)
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    updateCurrentTime();
    const intervalId = setInterval(updateCurrentTime, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <div className='p-4 w-full h-full bg-neutral-800 bg-opacity-50 flex items-center justify-between'>
      <p className="font-bold text-[1vh] sm:text-[3vh] ml-4">
        {idTabActive === 'homeTab' ? 'Dashboard' : idTabActive === 'aboutTab' ? 'Abouts' : idTabActive === 'serviceTab' ? 'Services' : idTabActive === 'contactTab' ? 'Contacts' : 'All Messages'}
      </p>
      <div className="font-bold text-[1vh] sm:text-[2.5vh] mr-4 bg-clip-border bg-gradient-to-r from-purple-600 via-pink-700 to-red-700 py-2 px-5 rounded-lg">
        {currentTime}
      </div>
      <LoadingPage className='bg-black bg-opacity-90 z-50 fixed inset-0' isLoading={isLoading} />
    </div>
  );
};

export default Header;