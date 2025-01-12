"use client";

import React, { useCallback, useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import LoadingPage from '../components/LoadingPage';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { showNotification } from '../redux/components';

const DashboardHome = () => {
  const dispatch = useDispatch();
  const route = useRouter();
  const [loadToken, setLoadToken] = useState(false); // eslint-disable-line

  const checkToken = useCallback(async () => {
    setLoadToken(true);
    const lastToken = localStorage.getItem('lastToken');
    const lastTokenAt = localStorage.getItem('lastTokenAt');
    const now = new Date();

    if (lastToken && lastTokenAt) {
      const lastVisitTime = new Date(lastTokenAt);
      const timeDifference = now.getTime() - lastVisitTime.getTime();
      const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds

      if (timeDifference < oneHour) {
        setTimeout(() => {
          setLoadToken(false);
          dispatch(showNotification({ message: { id: 'Selamat menggunakan sistem kami', en: 'Enjoy using our system' }, type: 'success', delay: 200 }));
        }, 1000);
      } else if (timeDifference >= oneHour) {
        setTimeout(() => {
          localStorage.removeItem('lastToken');
          localStorage.removeItem('lastTokenAt');
          dispatch(showNotification({ message: { id: 'Sesi anda telah berakhir, silakan login ulang', en: 'Your session has expired, please re-login' }, type: 'failed', delay: 100 }));
          route.push('/login');
        }, 1000);
      }
    } else {
      setTimeout(() => {
        localStorage.removeItem('lastToken');
        localStorage.removeItem('lastTokenAt');
        dispatch(showNotification({ message: { id: 'Sesi anda telah berakhir, silakan login ulang', en: 'Your session has expired, please re-login' }, type: 'failed', delay: 100 }));
        route.push('/login');
      }, 1000);
    }
  }, [route, dispatch]);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  return (
    <div>
      {loadToken
        ? <LoadingPage className='bg-black fixed inset-0' isLoading={loadToken} />
        : <AdminLayout />
      }
    </div>
  );
};

export default DashboardHome;