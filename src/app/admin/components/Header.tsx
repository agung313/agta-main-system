"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { changeIsChangeLanguage, changeLanguage, fetchLocation } from '@/app/redux/header';
import { store } from '@/app/redux/store';
import { changeTabActive } from '@/app/redux/admin';
import Globe from '../../icons/globe.svg';
import NavigationBar from '../../icons/navigationBar.svg';
import DashboardIcont from '../icons/DashboardIcont';
import SloganIcont from '../icons/SloganIcont';
import AboutIcont from '../icons/AboutIcont';
import ServiceIcont from '../icons/ServiceIcont';
import ContactIcont from '../icons/ContactIcont';
import MessagesIcont from '../icons/MessagesIcont';
// import LogoutIcont from '../icons/LogoutIcont';
import AcountIcont from '../icons/AcountIcont';

const Header = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const idTabActive = useSelector((state: { admin: { idTabActive: string } }) => state.admin.idTabActive);
  const codeLanguage = useSelector(
    (state: { header: { codeLanguage: "id" | "en" } }) => state.header.codeLanguage
  );
  const isChangeLanguage = useSelector(
    (state: { header: { isChangeLanguage: boolean } }) => state.header.isChangeLanguage
  );
  const [navigationDialog, setNavigationDialog] = useState(false); // eslint-disable-line

  const isMounted = useRef(true);
  
  useEffect(() => {
    if (isMounted.current) {
      if (isChangeLanguage !== true) {
        dispatch(fetchLocation());
      }
    }
    return () => {
      isMounted.current = false;
    };
  }, [dispatch, isChangeLanguage]);

  type languageType = {
    name: string;
    code: string;
  };

  const languages: languageType[] = useMemo(() => [
    { name: 'Indonesia', code: 'id' },
    { name: 'English', code: 'en' },
  ], []);

  const [languageActive, setLanguageActive] = useState<languageType>(languages[0]);

  const selectedLanguage = useCallback((dataCode: string) => {
    const selectedLanguage = languages.find(lang => lang.code === dataCode);
    if (selectedLanguage) {
      setLanguageActive(selectedLanguage);
    }
    dispatch(changeLanguage(dataCode));
  }, [languages, dispatch]);

  useEffect(() => {
    selectedLanguage(codeLanguage);
  }, [codeLanguage, selectedLanguage]);


  const handleSelectedLanguage = (value: string) => {
    selectedLanguage(value);
    dispatch(changeIsChangeLanguage(true));
  };

  const changeTab = (tab: string) => {
    dispatch(changeTabActive(tab));
    setNavigationDialog(false);
  };

  return (
    <div className='p-4 w-full h-full bg-neutral-800 bg-opacity-50 flex items-center justify-between'>
      <p className="font-bold text-[2vh] sm:text-[3vh] ml-4">
        {idTabActive === 'homeTab' ? 'Dashboard' : idTabActive === 'aboutTab' ? 'Abouts' : idTabActive === 'serviceTab' ? 'Services' : idTabActive === 'contactTab' ? 'Contacts' : idTabActive === 'messagesTab' ? 'All Messages' : 'Profile Data'}
      </p>
      <div className="hidden xl:flex items-center ml-10 p-2 text-white rounded-xl bg-transparent cursor-pointer">
        <Image src={Globe} alt="Language Icon" className="w-6 h-6 mr-2" />
        <select
          className="p-2 focus:outline-none font-bold bg-transparent text-white cursor-pointer"
          value={languageActive.code}
          onChange={(e) => handleSelectedLanguage(e.target.value)}
        >
          {languages.map((language) => (
            <option key={language.code} value={language.code}>
              {language.name}
            </option>
          ))}
        </select>
      </div>
      <div className='flex items-center xl:hidden'>
        <Image src={Globe} alt="Language Icon" className="w-6 h-6 mr-6" />
        <button onClick={() => setNavigationDialog(true)}>
          <Image src={NavigationBar} alt="Language Icon" className="w-8 h-8" />
        </button>
      </div>
      <div onClick={() => setNavigationDialog(false)} className={`fixed inset-0 w-[100vw] h-[100vh] bg-black bg-opacity-50 z-50 flex items-center justify-end transition-all duration-5000 ${navigationDialog ? 'translate-x-0' : 'translate-x-full'}`}>
        {navigationDialog &&
          <div
            className='w-[50vw] h-[100vh] bg-neutral-800 flex flex-col p-4'
            onClick={(e) => e.stopPropagation()}
          >
            <button className="flex items-center mt-2" onClick={() => changeTab('homeTab')}>
              <DashboardIcont size={35} color={idTabActive === 'homeTab' ? '#fff' : '#4A4E56'} />
              <p className={`font-medium text-[2vh] ml-2 ${idTabActive === 'homeTab' ? 'text-white' : 'text-neutral-500'}`}>
                Dashboard
              </p>
            </button>
            <button className="flex items-center mt-8 pl-1" onClick={() => changeTab('sloganTab')}>
              <SloganIcont size={25} color={idTabActive === 'sloganTab' ? '#fff' : '#4A4E56'} />
              <p className={`font-medium text-[2vh] ml-3 ${idTabActive === 'sloganTab' ? 'text-white' : 'text-neutral-500'}`}>
                Slogan
              </p>
            </button>
            <button className="flex items-center mt-8 pl-1" onClick={() => changeTab('aboutTab')}>
              <AboutIcont size={25} color={idTabActive === 'aboutTab' ? '#fff' : '#4A4E56'} />
              <p className={`font-medium text-[2vh] ml-3 ${idTabActive === 'aboutTab' ? 'text-white' : 'text-neutral-500'}`}>
                Abouts
              </p>
            </button>
            <button className="flex items-center mt-8 pl-1" onClick={() => changeTab('serviceTab')}>
              <ServiceIcont size={25} color={idTabActive === 'serviceTab' ? '#fff' : '#4A4E56'} />
              <p className={`font-medium text-[2vh] ml-3 ${idTabActive === 'serviceTab' ? 'text-white' : 'text-neutral-500'}`}>
                Services
              </p>
            </button>
            <button className="flex items-center mt-8 pl-1" onClick={() => changeTab('contactTab')}>
              <ContactIcont size={25} color={idTabActive === 'contactTab' ? '#fff' : '#4A4E56'} />
              <p className={`font-medium text-[2vh] ml-3 ${idTabActive === 'contactTab' ? 'text-white' : 'text-neutral-500'}`}>
                Contacts
              </p>
            </button>
            <button className="flex items-center mt-8 pl-1" onClick={() => changeTab('messagesTab')}>
              <MessagesIcont size={25} color={idTabActive === 'messagesTab' ? '#fff' : '#4A4E56'} />
              <p className={`font-medium text-[2vh] ml-3 ${idTabActive === 'messagesTab' ? 'text-white' : 'text-neutral-500'}`}>
                Messagaes
              </p>
            </button>
            <button className="flex items-center mt-8" onClick={() => changeTab('profileTab')}>
              <AcountIcont size={35} color={idTabActive === 'profileTab' ? '#fff' : '#4A4E56'} />
              <p className={`font-medium text-[2vh] ml-2 ${idTabActive === 'profileTab' ? 'text-white' : 'text-neutral-500'}`}>
                Profile
              </p>
            </button>
          </div>
        }
      </div>
    </div>
  );
};

export default Header;