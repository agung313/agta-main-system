"use client";

import React from 'react'
import Image from 'next/image';
import { useSelector } from 'react-redux';
import bgDashboard from "../icons/bgDashboard.jpg";
import NextJs from "../icons/nextJs.svg";
import ReactJs from "../icons/reactJs.svg";
import Typescript from "../icons/typescript.svg";
import Javascript from "../icons/javascript.svg";
import Redux from "../icons/redux.svg";
import Mui from "../icons/mui.svg";
import Tailwind from "../icons/tailwind.svg";
import Golang from "../icons/golang.svg";
import Postgresql from "../icons/postgresql.svg"

const DashboardHome = () => {
  const codeLanguage = useSelector((state: { header: { codeLanguage: 'id' | 'en' } }) => state.header.codeLanguage);
  return (
    <div className='relative w-full h-full'>
      <Image src={bgDashboard} alt="Logo" layout="fill" objectFit="cover" className="z-0" />
      <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
        <p className="font-extrabold text-[10vh] md:text-[12vh] xl:text-[15vh] text-white">AgTa</p>
        <p className="text-[2vh] md:text-[2.5vh] xl:text-[3vh] font-extrabold text-white mb-[4vh]">Where Ideas Come to Life</p>
        <div className="w-[90vw] sm:w-[50vw]">
          {codeLanguage === 'id'
            ?
              <p className="text-[1.5vh] sm:text-[2vh] xl:text-[2.5vh] text-center text-white mb-[4vh]">Kami siap mengubah ide-ide kreatif Anda menjadi solusi digital nyata. Dengan keahlian teknologi terkini dan dedikasi tinggi, kami wujudkan inovasi Anda menjadi aplikasi, website, dan sistem yang membawa dampak besar. Bersama kami, ide Anda bukan sekadar mimpi, itu akan menjadi kenyataan</p>
            :
              <p className="text-[1.5vh] sm:text-[2vh] xl:text-[2.5vh] text-center text-white mb-[4vh]">We are ready to turn your creative ideas into real digital solutions. With the latest technological expertise and high dedication, we turn your innovation into applications, websites and systems that have a big impact. With us, your idea is not just a dream, it will become a reality</p>
          }
        </div>
        <div className="mb-[5vh]">
          <button className="border-2 border-white rounded-tl-lg rounded-br-lg p-3 text-white hover:text-black hover:bg-white">
            <p className="font-bold text-[1.5vh] sm:text-[2vh] xl:text-[2.5vh]">{codeLanguage === 'id' ? 'Lihat lebih lanjut' : 'View more'}</p>
          </button>
        </div>
        <div className="flex justify-center items-center space-x-10 lg:flex-row flex-wrap px-4">
          <div className="relative group">
            <Image src={NextJs} alt="Logo" className="w-[4vh] md:w-[5vh] lg:w-[6vh] h-auto" />
            <span className="absolute bottom-full mb-2 hidden group-hover:block text-white bg-black p-1 rounded">Next.js</span>
          </div>
          <div className="relative group">
            <Image src={ReactJs} alt="Logo" className="w-[5vh] md:w-[6vh] lg:w-[7vh] h-auto" />
            <span className="absolute bottom-full mb-2 hidden group-hover:block text-white bg-black p-1 rounded">React & React Native</span>
          </div>
          <div className="relative group">
            <Image src={Javascript} alt="Logo" className="w-[4vh] md:w-[5vh] lg:w-[6vh] h-auto" />
            <span className="absolute bottom-full mb-2 hidden group-hover:block text-white bg-black p-1 rounded">JavaScript</span>
          </div>
          <div className="relative group">
            <Image src={Typescript} alt="Logo" className="w-[4vh] md:w-[5vh] lg:w-[6vh] h-auto" />
            <span className="absolute bottom-full mb-2 hidden group-hover:block text-white bg-black p-1 rounded">TypeScript</span>
          </div>
          <div className="relative group">
            <Image src={Redux} alt="Logo" className="w-[4vh] md:w-[5vh] lg:w-[6vh] h-auto" />
            <span className="absolute bottom-full mb-2 hidden group-hover:block text-white bg-black p-1 rounded">Redux</span>
          </div>
          <div className="relative group">
            <Image src={Mui} alt="Logo" className="w-[4vh] md:w-[5vh] lg:w-[6vh] h-auto" />
            <span className="absolute bottom-full mb-2 hidden group-hover:block text-white bg-black p-1 rounded">MUI</span>
          </div>
          <div className="relative group">
            <Image src={Tailwind} alt="Logo" className="w-[5vh] md:w-[6vh] lg:w-[7vh] h-auto" />
            <span className="absolute bottom-full mb-2 hidden group-hover:block text-white bg-black p-1 rounded">Tailwind</span>
          </div>
          <div className="relative group">
            <Image src={Golang} alt="Logo" className="w-[7vh] md:w-[8vh] lg:w-[9vh] h-auto" />
            <span className="absolute bottom-full mb-2 hidden group-hover:block text-white bg-black p-1 rounded">Golang</span>
          </div>
          <div className="relative group">
            <Image src={Postgresql} alt="Logo" className="w-[6vh] md:w-[7vh] lg:w-[8vh] h-auto" />
            <span className="absolute bottom-full mb-2 hidden group-hover:block text-white bg-black p-1 rounded">PostgreSQL</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardHome