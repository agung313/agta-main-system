import React, { useState } from 'react'
import DivContent from '../components/DivContent';
import SelectContent from '../components/SelectContent';
import DivTechnologies from '../components/DivTechnologies';
import NextJs from "../../icons/nextJs.svg";
import ReactJS from '../../icons/reactJs.svg';
import Typescript from "../../icons/typescript.svg";
import Javascript from "../../icons/javascript.svg";
import Redux from "../../icons/redux.svg";
import Mui from "../../icons/mui.svg";
import Tailwind from "../../icons/tailwind.svg";
import Golang from "../../icons/golang.svg";
import Postgresql from "../../icons/Postgresql.svg"

const Service = () => {
  const [codeLanguage, setCodeLanguage] = useState("id");
  const [codeLanguageList, setCodeLanguageList] = useState("id");
  const languangeList = [{ id: "id", name: "Indonesia" }, { id: "en", name: "English" }];

  const lisTehcnologies = [
    {
      image: NextJs,
      title: "Next.js",
      linkTech: "https://nextjs.org/",
      idText: "Framework modern untuk membangun aplikasi web yang cepat, responsif, dan SEO-friendly.",
      enText: "A modern framework for building fast, responsive, and SEO-friendly web applications."
    },
    {
      image: ReactJS,
      title: "React.js",
      linkTech: "https://react.dev/",
      idText: "Library JavaScript yang fleksibel untuk menciptakan antarmuka pengguna yang interaktif dan dinamis.",
      enText: "A flexible JavaScript library for creating interactive and dynamic user interfaces."
    },
    {
      image: Javascript,
      title: "Javascript",
      linkTech: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      idText: "Bahasa pemrograman serbaguna yang digunakan untuk membangun aplikasi web yang dinamis dan interaktif.",
      enText: "A versatile programming language used to build dynamic and interactive web applications."
    },
    {
      image: ReactJS,
      title: "React Native",
      linkTech: "https://reactnative.dev/",
      idText: "Solusi lintas platform untuk membangun aplikasi mobile berkinerja tinggi pada Android dan iOS.",
      enText: "A cross-platform solution for building high-performance mobile applications on both Android and iOS."
    },
    {
      image: Typescript,
      title: "Typescript",
      linkTech: "https://www.typescriptlang.org/",
      idText: "Superset JavaScript dengan tipe data yang kuat untuk meningkatkan kualitas, keterbacaan, dan skalabilitas kode.",
      enText: "A flexible JavaScript library for creating interactive and dynamic user interfaces."
    },
    {
      image: Redux,
      title: "Redux",
      linkTech: "https://redux.js.org/",
      idText: "Alat untuk pengelolaan data dan state secara efisien pada aplikasi web dan mobile.",
      enText: "A tool for efficient data and state management in web and mobile applications."
    },
    {
      image: Tailwind,
      title: "Tailwind CSS",
      linkTech: "https://tailwindcss.com/",
      idText: "Framework CSS yang ringan dan fleksibel untuk membuat desain yang unik dan estetis dengan efisiensi tinggi.",
      enText: "A lightweight and flexible CSS framework for creating unique and aesthetically pleasing designs with high efficiency."
    },
    {
      image: Mui,
      title: "Material UI",
      linkTech: "https://mui.com/",
      idText: "Library komponen desain modern untuk membangun antarmuka pengguna yang responsif dengan cepat.",
      enText: "A modern design component library for building responsive user interfaces quickly."
    },
    {
      image: Golang,
      title: "Golang",
      linkTech: "https://go.dev/",
      idText: "Bahasa pemrograman yang andal dan cepat untuk membangun sistem backend dan API.",
      enText: "A reliable and fast programming language for building backend systems and APIs."
    },
    {
      image: Postgresql,
      title: "PostgreSQL",
      linkTech: "https://www.postgresql.org/",
      idText: "Sistem manajemen basis data yang stabil, aman, dan cocok untuk kebutuhan skala kecil hingga besar.",
      enText: "A stable and secure database management system suitable for small to large-scale needs."
    },
  ];
  return (
    <div className='w-full p-5 flex flex-col'>
      <DivContent className='mb-10'>
        <div className='flex justify-between items-center mb-10'>
          <p className='font-extrabold text-neutral-300 text-[3vh]'>Description</p>
          <div className='bg-white rounded-lg'>
            <SelectContent
              valueList={languangeList}
              valueSelected={codeLanguage}
              setValueSelected={setCodeLanguage}
            />
          </div>
        </div>
        <p className="text-[1.5vh] text-justify sm:text-[2vh] xl:text-[2.5vh] text-white mb-[4vh] indent-5 sm:indent-10">
          {codeLanguage === "id"
            ? "AGTA hadir untuk menyediakan solusi pengembangan perangkat lunak yang andal dan inovatif. Kami membantu Anda membangun aplikasi web, mobile, dan sistem backend yang terintegrasi dengan pendekatan berbasis teknologi modern. Kami menggunakan teknologi berikut untuk memastikan setiap solusi yang kami bangun berkinerja tinggi, efisien, dan sesuai kebutuhan:"
            : "AGTA is here to provide reliable and innovative software development solutions. We help you build web applications, mobile apps, and integrated backend systems with a modern technology-driven approach. We utilize the following technologies to ensure that every solution we deliver is high-performing, efficient, and tailored to your needs:"
          }
        </p>
      </DivContent>
      <DivContent>
        <div className='flex justify-between items-center mb-10'>
          <p className='font-extrabold text-neutral-300 text-[3vh]'>List of Technologies Used</p>
          <div className='bg-white rounded-lg'>
            <SelectContent
              valueList={languangeList}
              valueSelected={codeLanguageList}
              setValueSelected={setCodeLanguageList}
            />
          </div>
        </div>
        {lisTehcnologies.map((item, index) => (
          <DivTechnologies
            key={index}
            codeLanguage={codeLanguageList}
            imageFile={item.image}
            titleText={item.title}
            linkTech={item.linkTech}
            idText={item.idText}
            enText={item.enText}
          />
        ))}
      </DivContent>
      <button
        type="submit"
        className="my-10 text-[2vh] w-full font-extrabold p-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white rounded-md hover:bg-gradient-to-r hover:from-purple-600 hover:via-pink-700 hover:to-red-700"
      >
        Save Changes
      </button>
    </div>
  );
};

export default Service;