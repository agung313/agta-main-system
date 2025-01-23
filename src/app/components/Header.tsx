"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import Globe from '../icons/globe.svg';
import { changeIsChangeLanguage, changeLanguage, changeTabActive, fetchLocation } from '../redux/header';
import { store } from '../redux/store'; // Adjust the path as necessary
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import NotificationPage from './NotificationPage';
import SelectContent from '../admin/components/SelectContent';

const Header = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const pathname = usePathname();
  const codeLanguage = useSelector(
    (state: { header: { codeLanguage: "id" | "en" } }) => state.header.codeLanguage
  );
  const isChangeLanguage = useSelector(
    (state: { header: { isChangeLanguage: boolean } }) => state.header.isChangeLanguage
  );

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

  const languangeList = useMemo(() => [{ id: "id", name: "Indonesia" }, { id: "en", name: "English" }], []);
    const [languageActive, setLanguageActive] = useState("id");
  
    const selectedLanguage = useCallback((dataCode: string) => {
      const selectedLanguage = languangeList.find(lang => lang.id === dataCode);
      if (selectedLanguage) {
        setLanguageActive(selectedLanguage.id);
      }
      dispatch(changeLanguage(dataCode));
    }, [languangeList, dispatch]);
  
    useEffect(() => {
      selectedLanguage(codeLanguage);
    }, [codeLanguage, selectedLanguage]);
  
  
    const handleSelectedLanguage = (value: string) => {
      selectedLanguage(value);
      dispatch(changeIsChangeLanguage(true));
    };

  const handleHome = () => {
    dispatch(changeTabActive('homeTab'));
  };

  if (pathname.startsWith('/admin')) {
    return null;
  }


  return (
    <div className='w-full flex justify-center items-center fixed z-50 p-5'>
      <header className="text-black top-0 w-full">
        <nav className="container mx-auto flex justify-between items-center">
          <Link href='/' className="flex items-center" onClick={() => handleHome()}>
            <div className="items-center">
              <p className="font-montserrat font-extrabold text-[3vh] sm:text-[5vh] text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-700 to-red-700">AGTA</p>
            </div>
          </Link>
          <div className="flex items-center">
            <div className="flex items-center ml-10 p-2 text-white rounded-xl bg-transparent cursor-pointer">
              <Image src={Globe} alt="Language Icon" className="w-6 h-6 mr-2" />
              {/* <select
                className="p-2 focus:outline-none font-bold bg-transparent text-white cursor-pointer"
                value={languageActive.code}
                onChange={(e) => handleSelectedLanguage(e.target.value)}
              >
                {languages.map((language) => (
                  <option key={language.code} value={language.code}>
                    {language.name}
                  </option>
                ))}
              </select> */}
              <SelectContent
                valueList={languangeList}
                valueSelected={languageActive}
                setValueSelected={handleSelectedLanguage}
                className='bg-transparent text-white'
                colorIcont='#fff'
              />
            </div>
          </div>
        </nav>
      </header>
      <NotificationPage />
    </div>
  );
};


export default Header;