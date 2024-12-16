"use client";

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import LogoUtama from '../icons/logoUtama.svg';
import NavigationBar from '../icons/navigationBar.svg';
import IDFlag from '../icons/indonesiaFlag.svg';
import ENFlag from '../icons/englishFlag.svg';
import { changeLanguage, changeActiveFromHeader } from '../redux/header';
import scrollToElement from 'scroll-to-element';

const Header = () => {
  const codeLanguage = useSelector((state: { header: { codeLanguage: 'id' | 'en' } }) => state.header.codeLanguage);
  const idTabActive = useSelector((state: { header: { idTabActive: string } }) => state.header.idTabActive);
  const dispatch = useDispatch();

  type languageType = {
    name: string;
    code: string;
    icont: any;
  };
  const languages = [
    { name: 'Indonesia', code: 'id', icont: IDFlag },
    { name: 'English', code: 'en', icont: ENFlag },
  ];
  const tabs = {
    id: [{ name: 'Beranda', id: 'homeTab' }, { name: 'Tentang', id: 'aboutTab' }, { name: 'Layanan', id: 'servicesTab' }, { name: 'Kontak', id: 'contactTab' }],
    en: [{ name: 'Home', id: 'homeTab'}, { name: 'About', id: 'aboutTab' }, { name: 'Services', id: 'servicesTab' }, { name: 'Contact', id: 'contactTab' }],
  };

  const [tabActive, setTabActive] = useState<{ name: string; id: string }>(tabs[codeLanguage][0]);
  const [languageActive, setLanguageActive] = useState<languageType>(languages[0]);

  const selectedLanguage = (dataCode: string) => {
    const selectedLanguage = languages.find(lang => lang.code === dataCode);
    if (selectedLanguage) {
      setLanguageActive(selectedLanguage);
    }
    dispatch(changeLanguage(dataCode));
  };

  const handleScroll = (divId: string) => {
    scrollToElement(`#${divId}`, {
      offset: 0,
      ease: 'out-cube',
      duration: 800
    });
  };

  const clickTab = (index: number) => {
    setTabActive(() => {
      const newTab = tabs[codeLanguage][index];
      handleScroll(newTab.id);
      dispatch(changeActiveFromHeader(true));
      return newTab;
    });
    dispatch(changeActiveFromHeader(false));
  };

  useEffect(() => {
    const tab = tabs[codeLanguage].find(tab => tab.id === idTabActive);
    if (tab) {
      setTabActive(tab);
    }
  }, [idTabActive]);

  return (
    <div className='w-full h-[10vh] sm:h-[15vh] bg-[#f8f9fa] flex justify-center items-center fixed top-0 z-50 py-3 px-4 xl:p-0'>
      <header className="text-black top-0 w-full">
        <nav className="container mx-auto flex justify-between items-center">
          <Link className="flex items-center" href="/">
            <Image src={LogoUtama} alt="Logo" className="w-auto h-[5vh] sm:h-[10vh]" />
            <div className="ml-2 items-center">
              <p className="font-extrabold text-[3vh] sm:text-[6vh] text-blueCustom-900">AgTa</p>
              <p className="text-[0.75vh] sm:text-[1.5vh] font-bold text-blueCustom-800 mt-[-0.3rem]">Where Ideas Come to Life</p>
            </div>
          </Link>
          <div className="flex items-center hidden xl:flex">
            <ul className="flex space-x-4">
              {tabs[codeLanguage].map((tab: { name: string; id: string }, index: number) => (
                <li key={index}>
                  <Link
                    href="/"
                    className={`${
                      tabActive.name === tab.name ? 'text-blueCustom-700 font-bold text-xl py-2 px-4' : 'py-2 px-4 text-black font-bold text-xl'
                    }`}
                    onClick={() => clickTab(index)}
                  >
                    {tab.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center ml-10 bg-blueCustom-700 p-2 text-white rounded-xl">
              <Image src={languageActive.icont} alt="Facebook" className="w-8 h-8 mr-2" />
              <select
                className="p-2 focus:outline-none font-bold bg-blueCustom-700"
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
          <div className="flex items-center xl:hidden">
            <Image src={NavigationBar} alt="Logo" className="w-auto h-[5vh] sm:h-[7.5vh] xl:h-[10vh]" />
          </div>
        </nav>
      </header>
    </div>
  );
};


export default Header;