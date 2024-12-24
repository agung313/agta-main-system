"use client";

import React from "react";
import { useSelector } from "react-redux";
import NextJs from "./icons/nextJs.svg";
import ReactJs from "./icons/reactJs.svg";
import Typescript from "./icons/typescript.svg";
import Javascript from "./icons/javascript.svg";
import Redux from "./icons/redux.svg";
import Mui from "./icons/mui.svg";
import Tailwind from "./icons/tailwind.svg";
import Golang from "./icons/golang.svg";
import Postgresql from "./icons/Postgresql.svg";
import Image from "next/image";
import useAnimateElements from "./components/useAnimateElements";

const DashboardHome = () => {
  const codeLanguage = useSelector(
    (state: { header: { codeLanguage: "id" | "en" } }) => state.header.codeLanguage
  );

  const { containerRef, iconsRef } = useAnimateElements();

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div ref={containerRef} className="flex flex-col justify-center items-center">
        <p className="text-[3vh] xl:text-[4vh] text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300 -mb-3 xl:-mb-8 neon-glow">
          WHERE
        </p>
        <p className="font-montserrat font-extrabold text-[10vh] xl:text-[13vh] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 -mb-3 xl:-mb-8 neon-glow">
          IDEAS
        </p>
        <p className="text-[3vh] xl:text-[4vh] text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300 mb-[5vh] neon-glow">
          COME TO LIFE
        </p>
        <div ref={iconsRef} className="w-[90vw] sm:w-[70vw] min-h-[20vh]">
          <p className="text-[1.5vh] text-justify indent-5 sm:indent-10 sm:text-[2vh] xl:text-[2.5vh] text-center text-white mb-[4vh]">
            {codeLanguage === "id"
              ? "Kami siap mengubah ide kreatif Anda menjadi solusi digital nyata. Dengan keahlian teknologi terkini dan dedikasi tinggi, kami menghadirkan inovasi berupa aplikasi, website, dan sistem yang berdampak besar. Bersama kami, ide Anda tidak hanya sekadar mimpi, kami wujudkan menjadi kenyataan."
              : "We are ready to turn your creative ideas into real digital solutions. With cutting-edge technology expertise and high dedication, we deliver innovations in the form of impactful applications, websites, and systems. With us, your ideas are not just dreams, we make them a reality."
            }
          </p>
          <div className="flex justify-center items-center space-x-10 lg:flex-row flex-wrap px-4">
            <a href="https://nextjs.org/" target="_blank" rel="noreferrer" className="relative group">
              <Image src={NextJs} alt="Logo" className="w-[4vh] md:w-[5vh] lg:w-[6vh] h-auto" />
              <span className="absolute bottom-full mb-2 hidden group-hover:block text-white bg-black p-1 rounded">Next.js</span>
            </a>
            <a href="https://react.dev/" target="_blank" rel="noreferrer" className="relative group">
              <Image src={ReactJs} alt="Logo" className="w-[5vh] md:w-[6vh] lg:w-[7vh] h-auto" />
              <span className="absolute bottom-full mb-2 hidden group-hover:block text-white bg-black p-1 rounded">React.js</span>
            </a>
            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer" className="relative group">
              <Image src={Javascript} alt="Logo" className="w-[4vh] md:w-[5vh] lg:w-[6vh] h-auto" />
              <span className="absolute bottom-full mb-2 hidden group-hover:block text-white bg-black p-1 rounded">JavaScript</span>
            </a>
            <a href="https://reactnative.dev/" target="_blank" rel="noreferrer" className="relative group">
              <Image src={ReactJs} alt="Logo" className="w-[5vh] md:w-[6vh] lg:w-[7vh] h-auto" />
              <span className="absolute bottom-full mb-2 hidden group-hover:block text-white bg-black p-1 rounded">React Native</span>
            </a>
            <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer" className="relative group">
              <Image src={Typescript} alt="Logo" className="w-[4vh] md:w-[5vh] lg:w-[6vh] h-auto" />
              <span className="absolute bottom-full mb-2 hidden group-hover:block text-white bg-black p-1 rounded">TypeScript</span>
            </a>
            <a href="https://redux.js.org/" target="_blank" rel="noreferrer" className="relative group">
              <Image src={Redux} alt="Logo" className="w-[4vh] md:w-[5vh] lg:w-[6vh] h-auto" />
              <span className="absolute bottom-full mb-2 hidden group-hover:block text-white bg-black p-1 rounded">Redux</span>
            </a>
            <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer" className="relative group">
              <Image src={Tailwind} alt="Logo" className="w-[5vh] md:w-[6vh] lg:w-[7vh] h-auto" />
              <span className="absolute bottom-full mb-2 hidden group-hover:block text-white bg-black p-1 rounded">Tailwind CSS</span>
            </a>
            <a href="https://mui.com/" target="_blank" rel="noreferrer" className="relative group">
              <Image src={Mui} alt="Logo" className="w-[4vh] md:w-[5vh] lg:w-[6vh] h-auto" />
              <span className="absolute bottom-full mb-2 hidden group-hover:block text-white bg-black p-1 rounded">Material UI</span>
            </a>
            <a href="https://go.dev/" target="_blank" rel="noreferrer" className="relative group">
              <Image src={Golang} alt="Logo" className="w-[7vh] md:w-[8vh] lg:w-[9vh] h-auto" />
              <span className="absolute bottom-full mb-2 hidden group-hover:block text-white bg-black p-1 rounded">Golang</span>
            </a>
            <a href="https://www.postgresql.org/" target="_blank" rel="noreferrer" className="relative group">
              <Image src={Postgresql} alt="Logo" className="w-[6vh] md:w-[7vh] lg:w-[8vh] h-auto" />
              <span className="absolute bottom-full mb-2 hidden group-hover:block text-white bg-black p-1 rounded">PostgreSQL</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
