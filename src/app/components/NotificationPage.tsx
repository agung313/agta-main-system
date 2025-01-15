import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SuccessIcont from '../icons/success.svg';
import AlertIcont from '../icons/alert.svg';
import Image from 'next/image';
import useAnimateElements from './useAnimateElements';
import { hideNotification } from '../redux/components';

const NotificationPage = () =>{
  const dispatch = useDispatch();

  const { containerRef } = useAnimateElements();

  const [isOpened, setIsOpened] = useState(false);

  const openNotification = useSelector(
    (state: { components: { openNotification: boolean } }) => state.components.openNotification
  );
  const delayNotification = useSelector(
    (state: { components: { delayNotification: number } }) => state.components.delayNotification
  );
  const delayResetNotification = useSelector(
    (state: { components: { delayResetNotification: number } }) => state.components.delayResetNotification
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
      if (delayNotification > 0) {
        const timer = setTimeout(() => {
          setIsOpened(true);
        }, delayNotification);
        return () => clearTimeout(timer);
      } else {
        setIsOpened(true);
      }
    } else {
      setIsOpened(false);
    }
  }, [openNotification, delayNotification]);

  useEffect(() => {
    if (isOpened) {
      const timer = setTimeout(() => {
        setIsOpened(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => {
      dispatch(hideNotification());
    }, delayResetNotification);
    return () => clearTimeout(timer);
  }, [isOpened, dispatch, delayResetNotification]);

  if (!isOpened) return null;

  const styles: { [key: string]: string } = {
    success: 'bg-gradient-to-r from-green-600 via-green-700 to-green-800',
    failed: 'bg-gradient-to-r from-red-600 via-red-700 to-red-800',
  }

  const icont: { [key: string]: string } = {
    success: SuccessIcont,
    failed: AlertIcont,
  }

  return (
    <div className="fixed top-24 z-50 pointer-events-none flex justify-center w-full">
      <div
        ref={containerRef}
        className={`${styles[notificationType]} shadow-md rounded-md p-2 px-4 max-w-[80%]`}
      >
        <div className="flex items-center">
          <Image src={icont[notificationType]} alt="Success Icon" className="w-6 h-6" />
          <p className="text-white font-bold mx-2 text-[1.5vh] text-justify sm:text-[2vh] xl:text-[2.5vh">
            {notificationMessage[codeLanguage]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage