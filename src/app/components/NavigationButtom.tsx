"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTabActive } from '../redux/header';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavigationButtom = () => {
  const idTabActive = useSelector((state: { header: { idTabActive: string } }) => state.header.idTabActive);
  const codeLanguage = useSelector((state: { header: { codeLanguage: 'id' | 'en' } }) => state.header.codeLanguage);
  const dispatch = useDispatch();
  const pathname = usePathname();

  const tabs = useMemo(() => ({
    id: [{ name: 'Beranda', id: 'homeTab', link: '/' }, { name: 'Tentang', id: 'aboutTab', link: '/abouts' }, { name: 'Layanan', id: 'servicesTab', link: '/services' }, { name: 'Kontak', id: 'contactTab', link: '/contacts' }],
    en: [{ name: 'Home', id: 'homeTab', link: '/'}, { name: 'About', id: 'aboutTab',link: '/abouts' }, { name: 'Services', id: 'servicesTab', link: '/services' }, { name: 'Contact', id: 'contactTab', link: '/contacts' }],
  }), []);
  const [tabActive, setTabActive] = useState<{ name: string; id: string; link: string }>(tabs[codeLanguage][0]);

  const clickTab = (index: number) => {
    setTabActive(() => {
      const newTab = tabs[codeLanguage][index];
      dispatch(changeTabActive(newTab.id));
      return newTab;
    });
  };

  useEffect(() => {
    const tab = tabs[codeLanguage].find(tab => tab.id === idTabActive);
    if (tab) {
      setTabActive(tab);
    }
  }, [idTabActive, codeLanguage, tabs]);

  if (pathname === '/login' || pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 p-2 z-30 flex justify-center">
      <div className='flex justify-center items-center bg-gray-900 rounded-2xl py-2 px-4 mb-[5vh] w-[90vw] sm:w-auto'>
        <ul className="flex flex-wrap justify-center space-x-2 sm:space-x-4">
          {tabs[codeLanguage].map((tab: { name: string; id: string; link: string }, index: number) => (
            <li key={index} className="flex-1">
              <Link
                className={`block text-center ${
                  tabActive.name === tab.name ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-700 to-red-700 border border-transparent bg-clip-border bg-gradient-to-r from-purple-600 via-pink-700 to-red-700 font-bold text-[1.5vh] sm:text-[2vh] xl:text-[2.5vh] py-2 px-2 rounded-xl' : 'py-2 px-2 text-neutral-400 font-bold text-[1.5vh] sm:text-[2vh] xl:text-[2.5vh]'
                }`}
                href={`${tab.link}`}
                onClick={() => clickTab(index)}
               >
                {tab.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavigationButtom;