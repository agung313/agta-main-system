"use client";

import React, { useCallback, useEffect, useState } from 'react'
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ForgotForm from './FogotForm';
import NotificationPage from '../components/NotificationPage';
import { useRouter } from 'next/navigation';
import LoadingPage from '../components/LoadingPage';


const Login = () => {
  const router = useRouter();
  const [typeForm, setTypeForm] = useState('signin');

  const lastToken = typeof localStorage !== 'undefined' ? localStorage.getItem('lastToken') : null;
  const lastTokenAt = typeof localStorage !== 'undefined' ? localStorage.getItem('lastTokenAt') : null;

  
  const [isLoading, setIsLoading] = useState(true);
  const handleCheckToken = useCallback(() => {
    setIsLoading(true);
    if (lastToken && lastTokenAt) {
      const now = new Date();
      const lastTokenAtDate = new Date(lastTokenAt);
      const timeDifference = now.getTime() - lastTokenAtDate.getTime();
      const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds

      if (timeDifference < oneHour) {
        setTimeout(() => {
          router.push('/admin');
        }, 1000);
      } else if (timeDifference >= oneHour) {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, [lastToken, lastTokenAt, router]);
  
  useEffect(() => {
    handleCheckToken();
  }, [handleCheckToken]);

  return (
    <div className='flex justify-center items-center w-[100vw] h-[100vh]'>
      <LoadingPage className="bg-black z-50 fixed inset-0" isLoading={isLoading} />
      <div className="flex justify-center items-center w-[90vw]">
        <div className="flex-col justify-center items-center w-[60%] xl:w-[65%] hidden xl:flex">
          <p className="text-[3vh] xl:text-[4vh] text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300 -mb-3 xl:-mb-8 neon-glow">
            WHERE
          </p>
          <p className="font-montserrat font-extrabold text-[10vh] xl:text-[13vh] text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-700 to-red-700 -mb-3 xl:-mb-8 neon-glow">
            IDEAS
          </p>
          <p className="text-[3vh] xl:text-[4vh] text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300 neon-glow">
            COME TO LIFE
          </p>
        </div>

        {typeForm === 'signin' && <LoginForm setTypeForm={setTypeForm} />}
        {typeForm === 'signup' && <SignupForm setTypeForm={setTypeForm} />}
        {typeForm === 'forgot' && <ForgotForm setTypeForm={setTypeForm} />}
      </div>
      <NotificationPage />
    </div>
  );
};

export default Login;