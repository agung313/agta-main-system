import React, { useState } from 'react'
import DivContent from '../components/DivContent';
import SelectContent from '../components/SelectContent';
import NextJs from "../../icons/nextJs.svg";
import ReactJS from '../../icons/reactJs.svg';
import Typescript from "../../icons/typescript.svg";
import Javascript from "../../icons/javascript.svg";
import Redux from "../../icons/redux.svg";
import Mui from "../../icons/mui.svg";
import Tailwind from "../../icons/tailwind.svg";
import Golang from "../../icons/golang.svg";
import Postgresql from "../../icons/Postgresql.svg"
import InputContent from '../components/InputContent';

const Service = () => {
  const [codeLanguage, setCodeLanguage] = useState("id");
  const [codeLanguageList, setCodeLanguageList] = useState("id");
  const languangeList = [{ id: "id", name: "Indonesia" }, { id: "en", name: "English" }];
  
  const [descriptionText, setDescriptionText] = useState<{ [key: string]: string }>({
    id: "AGTA hadir untuk menyediakan solusi pengembangan perangkat lunak yang andal dan inovatif. Kami membantu Anda membangun aplikasi web, mobile, dan sistem backend yang terintegrasi dengan pendekatan berbasis teknologi modern. Kami menggunakan teknologi berikut untuk memastikan setiap solusi yang kami bangun berkinerja tinggi, efisien, dan sesuai kebutuhan:",
    en: "AGTA is here to provide reliable and innovative software development solutions. We help you build web applications, mobile apps, and integrated backend systems with a modern technology-driven approach. We utilize the following technologies to ensure that every solution we deliver is high-performing, efficient, and tailored to your needs:"
  });
  const [lisTechnologies, setLisTechnologies] = useState([
    {
      image: NextJs,
      title: "Next.js",
      linkTech: "https://nextjs.org/",
      id: "Framework modern untuk membangun aplikasi web yang cepat, responsif, dan SEO-friendly.",
      en: "A modern framework for building fast, responsive, and SEO-friendly web applications."
    },
    {
      image: ReactJS,
      title: "React.js",
      linkTech: "https://react.dev/",
      id: "Library JavaScript yang fleksibel untuk menciptakan antarmuka pengguna yang interaktif dan dinamis.",
      en: "A flexible JavaScript library for creating interactive and dynamic user interfaces."
    },
    {
      image: Javascript,
      title: "Javascript",
      linkTech: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      id: "Bahasa pemrograman serbaguna yang digunakan untuk membangun aplikasi web yang dinamis dan interaktif.",
      en: "A versatile programming language used to build dynamic and interactive web applications."
    },
    {
      image: ReactJS,
      title: "React Native",
      linkTech: "https://reactnative.dev/",
      id: "Solusi lintas platform untuk membangun aplikasi mobile berkinerja tinggi pada Android dan iOS.",
      en: "A cross-platform solution for building high-performance mobile applications on both Android and iOS."
    },
    {
      image: Typescript,
      title: "Typescript",
      linkTech: "https://www.typescriptlang.org/",
      id: "Superset JavaScript dengan tipe data yang kuat untuk meningkatkan kualitas, keterbacaan, dan skalabilitas kode.",
      en: "A flexible JavaScript library for creating interactive and dynamic user interfaces."
    },
    {
      image: Redux,
      title: "Redux",
      linkTech: "https://redux.js.org/",
      id: "Alat untuk pengelolaan data dan state secara efisien pada aplikasi web dan mobile.",
      en: "A tool for efficient data and state management in web and mobile applications."
    },
    {
      image: Tailwind,
      title: "Tailwind CSS",
      linkTech: "https://tailwindcss.com/",
      id: "Framework CSS yang ringan dan fleksibel untuk membuat desain yang unik dan estetis dengan efisiensi tinggi.",
      en: "A lightweight and flexible CSS framework for creating unique and aesthetically pleasing designs with high efficiency."
    },
    {
      image: Mui,
      title: "Material UI",
      linkTech: "https://mui.com/",
      id: "Library komponen desain modern untuk membangun antarmuka pengguna yang responsif dengan cepat.",
      en: "A modern design component library for building responsive user interfaces quickly."
    },
    {
      image: Golang,
      title: "Golang",
      linkTech: "https://go.dev/",
      id: "Bahasa pemrograman yang andal dan cepat untuk membangun sistem backend dan API.",
      en: "A reliable and fast programming language for building backend systems and APIs."
    },
    {
      image: Postgresql,
      title: "PostgreSQL",
      linkTech: "https://www.postgresql.org/",
      id: "Sistem manajemen basis data yang stabil, aman, dan cocok untuk kebutuhan skala kecil hingga besar.",
      en: "A stable and secure database management system suitable for small to large-scale needs."
    },
  ]);

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
        <InputContent
          id='description'
          value={descriptionText[codeLanguage]}
          setValue={value => setDescriptionText({ ...descriptionText, [codeLanguage]: value })}
          classNameInput='text-justify indent-5 text-[2.5vh] border-none'
          rows={5}
        />
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
        {lisTechnologies.map((item, index) => (
          <div key={index} className='w-full border rounded-xl p-4 flex items-center mb-8'>
            <InputContent
              id={`file-${index}`}
              type='fileImage'
              value={item.image}
              accept="image/*"
              widthImage={70}
              heightImage={70}
              setValue={value => setLisTechnologies(lisTechnologies.map((tech, i) => i === index ? { ...tech, image: value } : tech))}
            />
            <div className="w-full ml-8">
              <div className="flex items-center justify-between mb-2">
                <InputContent
                  id={`title-${index}`}
                  value={item.title}
                  setValue={value => setLisTechnologies(lisTechnologies.map((tech, i) => i === index ? { ...tech, title: value } : tech))}
                  classNameInput='text-purple-500 text-[2.5vh] border-none p-0 mb-0'
                />
                <a href={item.linkTech} target="_blank" rel="noreferrer" className='bg-clip-border bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 font-bold text-white px-2 py-1 rounded-md hover:bg-gradient-to-r hover:from-purple-600 hover:via-pink-700 hover:to-red-700'>
                  Check Link
                </a>
              </div>
              <InputContent
                id={`linkTech-${index}`}
                value={item.linkTech}
                setValue={value => setLisTechnologies(lisTechnologies.map((tech, i) => i === index ? { ...tech, linkTech: value } : tech))}
                classNameInput='text-pink-500 text-[2.5vh] border-none p-0'
              />
              <InputContent
                id={`idText-${index}`}
                value={codeLanguageList === "id" ? item.id : item.en}
                setValue={value => setLisTechnologies(lisTechnologies.map((tech, i) => i === index ? { ...tech, [codeLanguageList]: value } : tech))}
                classNameInput='text-[2.5vh] text-white border-none p-0 mb-0'
                rows={2}
              />
            </div>
          </div>
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