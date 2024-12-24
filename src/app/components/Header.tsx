"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image, { StaticImageData } from 'next/image';
// import Link from 'next/link';
// import LogoUtama from '../icons/logoUtama.svg';
import IDFlag from '../icons/indonesiaFlag.svg';
import ENFlag from '../icons/englishFlag.svg';
import Globe from '../icons/globe.svg';
import { changeLanguage, changeTabActive, fetchLocation } from '../redux/header';
import { store } from '../redux/store'; // Adjust the path as necessary
import { usePathname } from 'next/navigation';

const Header = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
   const pathname = usePathname();
  const codeLanguage = useSelector(
    (state: { header: { codeLanguage: "id" | "en" } }) => state.header.codeLanguage
  );

  useEffect(() => {
    if (window.location.pathname === '/') {
      dispatch(fetchLocation());
    }
  }, [dispatch]);

  type languageType = {
    name: string;
    code: string;
    icont: StaticImageData;
  };

  const languages: languageType[] = useMemo(() => [
    { name: 'Indonesia', code: 'id', icont: IDFlag },
    { name: 'English', code: 'en', icont: ENFlag },
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

  const handleHome = () => {
    dispatch(changeTabActive('homeTab'));
    window.location.href = '/';
  };

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <div className='w-full flex justify-center items-center fixed z-50 p-5'>
      <header className="text-black top-0 w-full">
        <nav className="container mx-auto flex justify-between items-center">
          <button className="flex items-center" onClick={() => handleHome()}>
            {/* <Image src={LogoUtama} alt="Logo" className="w-auto h-[5vh] sm:h-[10vh]" /> */}
            <div className="items-center">
              {/* <p className="font-extrabold text-[3vh] sm:text-[6vh] text-blueCustom-900">AGTA</p> */}
              <p className="font-extrabold text-[3vh] sm:text-[5vh] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">AGTA</p>
              {/* <p className="text-[0.75vh] sm:text-[1.5vh] font-bold text-blueCustom-800 mt-[-0.3rem]">Where Ideas Come to Life</p> */}
            </div>
          </button>
          <div className="flex items-center">
            <div className="flex items-center ml-10 p-2 text-white rounded-xl bg-transparent cursor-pointer">
              <Image src={Globe} alt="Language Icon" className="w-6 h-6 mr-2" />
              <select
                className="p-2 focus:outline-none font-bold bg-transparent text-white cursor-pointer"
                value={languageActive.code}
                onChange={(e) => selectedLanguage(e.target.value)}
              >
                {languages.map((language) => (
                  <option key={language.code} value={language.code}>
                    {language.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};


export default Header;