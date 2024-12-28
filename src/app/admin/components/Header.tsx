"use client";

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Header = () => {
  const idTabActive = useSelector((state: { admin: { idTabActive: string } }) => state.admin.idTabActive);
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
        {idTabActive === 'homeTab' ? 'Dashboard' : idTabActive === 'aboutTab' ? 'Abouts' : idTabActive === 'serviceTab' ? 'Services' : 'Contacts'}
      </p>
      <div className="font-bold text-[1vh] sm:text-[2.5vh] mr-4 bg-clip-border bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 py-2 px-5 rounded-lg">
        {currentTime}
      </div>
    </div>
  );
};

export default Header;