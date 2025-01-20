"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import Globe from '../../icons/globe.svg';
import { changeIsChangeLanguage, changeLanguage, fetchLocation } from '@/app/redux/header';
import { store } from '@/app/redux/store';

const Header = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const idTabActive = useSelector((state: { admin: { idTabActive: string } }) => state.admin.idTabActive);
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

  return (
    <div className='p-4 w-full h-full bg-neutral-800 bg-opacity-50 flex items-center justify-between'>
      <p className="font-bold text-[1vh] sm:text-[3vh] ml-4">
        {idTabActive === 'homeTab' ? 'Dashboard' : idTabActive === 'aboutTab' ? 'Abouts' : idTabActive === 'serviceTab' ? 'Services' : idTabActive === 'contactTab' ? 'Contacts' : idTabActive === 'messagesTab' ? 'All Messages' : 'Profile Data'}
      </p>
      <div className="flex items-center ml-10 p-2 text-white rounded-xl bg-transparent cursor-pointer">
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
    </div>
  );
};

export default Header;