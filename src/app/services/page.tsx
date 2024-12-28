"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NextJs from "../icons/nextJs.svg";
import ReactJs from "../icons/reactJs.svg";
import Typescript from "../icons/typescript.svg";
import Javascript from "../icons/javascript.svg";
import Redux from "../icons/redux.svg";
import Mui from "../icons/mui.svg";
import Tailwind from "../icons/tailwind.svg";
import Golang from "../icons/golang.svg";
import Postgresql from "../icons/Postgresql.svg"
import Image from "next/image";
import useAnimateElements from "../components/useAnimateElements";
import { changeTabActive } from "../redux/header";

const DashboardServices = () => {
  const dispatch = useDispatch();
  const { containerRef, iconsRef } = useAnimateElements();
  const codeLanguage = useSelector(
    (state: { header: { codeLanguage: "id" | "en" } }) => state.header.codeLanguage
  );

  useEffect(() => {
    dispatch(changeTabActive('servicesTab'));
  }, [dispatch]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div ref={containerRef} className="flex flex-col justify-center items-center">
        <p className="font-montserrat font-extrabold text-[5vh] xl:text-[8vh] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 neon-glow">
          {codeLanguage === "id" ? "LAYANAN" : "SERVICES"}
        </p>
        <div ref={iconsRef} className="w-[90vw] sm:w-[70vw] min-h-[20vh] max-h-[70vh] overflow-y-auto pb-[8vh]">
          <p className="text-[1.5vh] text-justify sm:text-[2vh] xl:text-[2.5vh] text-white mb-[4vh] indent-5 sm:indent-10">
            {codeLanguage === "id"
              ? "AGTA hadir untuk menyediakan solusi pengembangan perangkat lunak yang andal dan inovatif. Kami membantu Anda membangun aplikasi web, mobile, dan sistem backend yang terintegrasi dengan pendekatan berbasis teknologi modern. Kami menggunakan teknologi berikut untuk memastikan setiap solusi yang kami bangun berkinerja tinggi, efisien, dan sesuai kebutuhan:"
              : "AGTA is here to provide reliable and innovative software development solutions. We help you build web applications, mobile apps, and integrated backend systems with a modern technology-driven approach. We utilize the following technologies to ensure that every solution we deliver is high-performing, efficient, and tailored to your needs:"
            }
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-[4vh]">
            
            <div className="border rounded-xl p-4 flex items-center">
              <Image src={NextJs} alt="Logo" className="w-[4vh] md:w-[5vh] lg:w-[6vh] h-auto" />
              <div className="ml-4">
                <p className="text-[1.5vh] text-justify sm:text-[2vh] xl:text-[2.5vh] text-white">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">Next.js</span> {codeLanguage === "id" ? "Framework modern untuk membangun aplikasi web yang cepat, responsif, dan SEO-friendly." : "A modern framework for building fast, responsive, and SEO-friendly web applications."}
                </p>
              </div>
            </div>

            <div className="border rounded-xl p-4 flex items-center">
              <Image src={ReactJs} alt="Logo" className="w-[4vh] md:w-[5vh] lg:w-[6vh] h-auto" />
              <div className="ml-4">
                <p className="text-[1.5vh] text-justify sm:text-[2vh] xl:text-[2.5vh] text-white">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">React.js</span> {codeLanguage === "id" ? "Library JavaScript yang fleksibel untuk menciptakan antarmuka pengguna yang interaktif dan dinamis." : "A flexible JavaScript library for creating interactive and dynamic user interfaces."}
                </p>
              </div>
            </div>

            <div className="border rounded-xl p-4 flex items-center">
              <Image src={Javascript} alt="Logo" className="w-[4vh] md:w-[5vh] lg:w-[6vh] h-auto" />
              <div className="ml-4">
                <p className="text-[1.5vh] text-justify sm:text-[2vh] xl:text-[2.5vh] text-white">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">JavaScript</span> {codeLanguage === "id" ? "Bahasa pemrograman serbaguna yang digunakan untuk membangun aplikasi web yang dinamis dan interaktif." : "A versatile programming language used to build dynamic and interactive web applications."}
                </p>
              </div>
            </div>

            <div className="border rounded-xl p-4 flex items-center">
              <Image src={ReactJs} alt="Logo" className="w-[4vh] md:w-[5vh] lg:w-[6vh] h-auto" />
              <div className="ml-4">
                <p className="text-[1.5vh] text-justify sm:text-[2vh] xl:text-[2.5vh] text-white">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">React Native</span> {codeLanguage === "id" ? "Solusi lintas platform untuk membangun aplikasi mobile berkinerja tinggi pada Android dan iOS." : "A cross-platform solution for building high-performance mobile applications on both Android and iOS."}
                </p>
              </div>
            </div>

            <div className="border rounded-xl p-4 flex items-center">
              <Image src={Typescript} alt="Logo" className="w-[4vh] md:w-[5vh] lg:w-[6vh] h-auto" />
              <div className="ml-4">
                <p className="text-[1.5vh] text-justify sm:text-[2vh] xl:text-[2.5vh] text-white">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">TypeScript</span> {codeLanguage === "id" ? "Superset JavaScript dengan tipe data yang kuat untuk meningkatkan kualitas, keterbacaan, dan skalabilitas kode." : "A strongly-typed superset of JavaScript that improves code quality, readability, and scalability."}
                </p>
              </div>
            </div>

            <div className="border rounded-xl p-4 flex items-center">
              <Image src={Redux} alt="Logo" className="w-[4vh] md:w-[5vh] lg:w-[6vh] h-auto" />
              <div className="ml-4">
                <p className="text-[1.5vh] text-justify sm:text-[2vh] xl:text-[2.5vh] text-white">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">Redux</span> {codeLanguage === "id" ? "Alat untuk pengelolaan data dan state secara efisien pada aplikasi web dan mobile." : "A tool for efficient data and state management in web and mobile applications."}
                </p>
              </div>
            </div>

            <div className="border rounded-xl p-4 flex items-center">
              <Image src={Tailwind} alt="Logo" className="w-[4vh] md:w-[5vh] lg:w-[6vh] h-auto" />
              <div className="ml-4">
                <p className="text-[1.5vh] text-justify sm:text-[2vh] xl:text-[2.5vh] text-white">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">Tailwind CSS</span> {codeLanguage === "id" ? "Framework CSS yang ringan dan fleksibel untuk membuat desain yang unik dan estetis dengan efisiensi tinggi." : "A lightweight and flexible CSS framework for creating unique and aesthetically pleasing designs with high efficiency."}
                </p>
              </div>
            </div>

            <div className="border rounded-xl p-4 flex items-center">
              <Image src={Mui} alt="Logo" className="w-[4vh] md:w-[5vh] lg:w-[6vh] h-auto" />
              <div className="ml-4">
                <p className="text-[1.5vh] text-justify sm:text-[2vh] xl:text-[2.5vh] text-white">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">Material UI</span> {codeLanguage === "id" ? "Library komponen desain modern untuk membangun antarmuka pengguna yang responsif dengan cepat." : "A modern design component library for building responsive user interfaces quickly."}
                </p>
              </div>
            </div>

            <div className="border rounded-xl p-4 flex items-center">
              <Image src={Golang} alt="Logo" className="w-[4vh] md:w-[5vh] lg:w-[6vh] h-auto" />
              <div className="ml-4">
                <p className="text-[1.5vh] text-justify sm:text-[2vh] xl:text-[2.5vh] text-white">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">Golang</span> {codeLanguage === "id" ? "Bahasa pemrograman yang andal dan cepat untuk membangun sistem backend dan API." : "A reliable and fast programming language for building backend systems and APIs."}
                </p>
              </div>
            </div>

            <div className="border rounded-xl p-4 flex items-center">
              <Image src={Postgresql} alt="Logo" className="w-[4vh] md:w-[5vh] lg:w-[6vh] h-auto" />
              <div className="ml-4">
                <p className="text-[1.5vh] text-justify sm:text-[2vh] xl:text-[2.5vh] text-white">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">PostgreSQL</span> {codeLanguage === "id" ? "Sistem manajemen basis data yang stabil, aman, dan cocok untuk kebutuhan skala kecil hingga besar." : "A stable and secure database management system suitable for small to large-scale needs."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardServices;