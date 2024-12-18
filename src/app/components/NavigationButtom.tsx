"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeActiveFromHeader, changeTabActive } from '../redux/header';
import scrollToElement from 'scroll-to-element';

const NavigationButtom = () => {
  const idTabActive = useSelector((state: { header: { idTabActive: string } }) => state.header.idTabActive);
  const codeLanguage = useSelector((state: { header: { codeLanguage: 'id' | 'en' } }) => state.header.codeLanguage);
  const dispatch = useDispatch();

  const tabs = {
    id: [{ name: 'Beranda', id: 'homeTab' }, { name: 'Tentang', id: 'aboutTab' }, { name: 'Layanan', id: 'servicesTab' }, { name: 'Kontak', id: 'contactTab' }],
    en: [{ name: 'Home', id: 'homeTab'}, { name: 'About', id: 'aboutTab' }, { name: 'Services', id: 'servicesTab' }, { name: 'Contact', id: 'contactTab' }],
  };
  const [tabActive, setTabActive] = useState<{ name: string; id: string }>(tabs[codeLanguage][0]);

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
      dispatch(changeTabActive(newTab.id));
      return newTab;
    });
    dispatch(changeActiveFromHeader(false));
  };

  useEffect(() => {
    const tab = tabs[codeLanguage].find(tab => tab.id === idTabActive);
    if (tab) {
      setTabActive(tab);
    }
  }, [idTabActive, codeLanguage]);

  return (
    <div className="fixed bottom-0 left-0 right-0 p-2 z-50 flex justify-center">
      <div className='flex justify-center items-center bg-gray-900 rounded-2xl py-2 px-4 mb-[5vh] w-[90vw] sm:w-auto'>
        <ul className="flex flex-wrap justify-center space-x-2 sm:space-x-4">
          {tabs[codeLanguage].map((tab: { name: string; id: string }, index: number) => (
            <li key={index} className="flex-1">
              <button
                className={`block text-center ${
                  tabActive.name === tab.name ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 border border-transparent bg-clip-border bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 font-bold text-[1.5vh] sm:text-[2vh] xl:text-[2.5vh] py-2 px-2 rounded-xl' : 'py-2 px-2 text-neutral-400 font-bold text-[1.5vh] sm:text-[2vh] xl:text-[2.5vh]'
                }`}
                onClick={() => clickTab(index)}
               >
                {tab.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavigationButtom;