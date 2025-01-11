import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SuccessIcont from '../icons/success.svg';
import AlertIcont from '../icons/alert.svg';
import Image from 'next/image';
import { hideNotification } from '../redux/components';
import useAnimateElements from './useAnimateElements';

const NotificationPage = () =>{
  const dispacth = useDispatch();

  const { containerRef } = useAnimateElements();

  const openNotification = useSelector(
    (state: { components: { openNotification: boolean } }) => state.components.openNotification
  );
  const notificationType = useSelector(
    (state: { components: { notificationType: string } }) => state.components.notificationType
  );
  const codeLanguage = useSelector(
    (state: { header: { codeLanguage: "id" | "en" } }) => state.header.codeLanguage
  );
  const notificationMessage = useSelector(
    (state: { components: { notificationMessage: { id: string; en: string } } }) => state.components.notificationMessage
  );

  useEffect(() => {
    if (openNotification) {
      const timer = setTimeout(() => {
        dispacth(hideNotification());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [openNotification, dispacth]);

  if (!openNotification) return null;

  const styles: { [key: string]: string } = {
    success: 'bg-gradient-to-r from-green-600 via-green-700 to-green-800',
    failed: 'bg-gradient-to-r from-red-600 via-red-700 to-red-800',
  }

  const icont: { [key: string]: string } = {
    success: SuccessIcont,
    failed: AlertIcont,
  }

  return (
    <div className="fixed top-24 z-50 pointer-events-none">
      <div
        ref={containerRef}
        className={`${styles[notificationType]} shadow-md rounded-md p-2`}
      >
        <div className="flex items-center">
          <Image src={icont[notificationType]} alt="Success Icon" className="w-6 h-6" />
          <p className="text-white font-bold mx-2">
            {notificationMessage[codeLanguage]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage