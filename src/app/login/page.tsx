"use client";

import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { motion } from "framer-motion";
import Header from '../components/Header';
import Google from '../icons/googleColor.svg'
import Image from 'next/image';
import BackgroundImage from '../icons/backgroundImage.jpg';

const Login = () => {
  const codeLanguage = useSelector(
    (state: { header: { codeLanguage: "id" | "en" } }) => state.header.codeLanguage
  );

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = () => {
    window.location.href = '/admin';
  };

  return (
    <div>
      <Image src={BackgroundImage} alt="Logo" layout="fill" objectFit="cover" className="z-0" style={{ opacity: 0.5 }} />
      <div className="absolute inset-0 z-10">
        <Header />
        <div className='flex justify-center items-center w-[100vw] h-[100vh]'>
          <motion.div
            className="flex justify-center items-center w-[90vw]"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="flex-col justify-center items-center w-[60%] xl:w-[65%] hidden xl:flex">
              <p className="text-[3vh] xl:text-[4vh] text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300 -mb-3 xl:-mb-8 neon-glow">
                WHERE
              </p>
              <p className="font-montserrat font-extrabold text-[10vh] xl:text-[13vh] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 -mb-3 xl:-mb-8 neon-glow">
                IDEAS
              </p>
              <p className="text-[3vh] xl:text-[4vh] text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300 neon-glow">
                COME TO LIFE
              </p>
            </div>

            <div className='bg-white w-full rounded-xl w-[90%] sm:w-[60%] md:w-[70%] lg:w-[80%] xl:w-[35%] p-6 max-h-[65vh] lg:max-h-[100vh] overflow-auto'>
              <p className="text-[1.5vh] xl:text-[2.5vh] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-600 to-red-600">
                {codeLanguage === 'id' ? "Masuk ke dalam" : "Sign in to"} AGTA
              </p>
              
              <button
                type="submit"
                className="w-full font-bold p-2 bg-white text-gray-400 text-[1.5vh] rounded-md border border-gray-300 shadow-md hover:shadow-lg mt-[3vh] flex items-center"
              >
                <Image src={Google} alt="Logo" className="w-[2vh] sm:w-[3vh] h-auto" />
                <p className='mx-auto'>{codeLanguage === "id" ? "Masuk dengan" : "Sign In with"} Google</p>
              </button>

              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-gray-300" />
                <p className="flex-shrink my-[1vh] sm:[3vh] text-[1.5vh] sm:text-[2vh] mx-4 text-gray-500">{codeLanguage === "id" ? "atau masuk dengan" : "or sign in with"} email</p>
                <div className="flex-grow border-t border-gray-300" />
              </div>

              <p className="text-black font-bold mb-2 text-[1.5vh] sm:text-[2vh] mt-[0.8vh] lg:mt-[4vh]">Email</p>
              <input
                type="email"
                placeholder={codeLanguage === "id" ? "Masukan Email Anda" : "Enter Your Email"}
                value={inputData.email}
                onChange={(e) => setInputData({ ...inputData, email: e.target.value })}
                className="text-[1.5vh] sm:text-[2vh] p-2 rounded-md border border-gray w-full bg-transparent text-black focus:outline-none"
              />

              <p className="text-black font-bold mb-2 text-[1.5vh] sm:text-[2vh] mt-[0.8vh] lg:mt-[4vh]">{codeLanguage === 'id' ? "Kata Sandi" : "Password"}</p>
              <input
                type="password"
                placeholder={codeLanguage === "id" ? "Masukan Kata Sandi Anda" : "Enter Your Password"}
                value={inputData.password}
                onChange={(e) => setInputData({ ...inputData, password: e.target.value })}
                className="p-2 rounded-md border text-[1.5vh] sm:text-[2vh] border-gray w-full bg-transparent text-black mb-[2vh] lg:mb-[4vh] focus:outline-none"
              />

              <div className='flex items-center'>
                <button
                  type="submit"
                  onClick={() => handleSignIn()}
                  className="w-[40%] text-[1.5vh] sm:text-[2vh] font-bold p-2 bg-gradient-to-r from-purple-500 via-pink-600 to-red-600 text-white rounded-md hover:bg-gradient-to-r hover:from-purple-700 hover:via-pink-800 hover:to-red-800"
                >
                  {codeLanguage === "id" ? "Masuk" : "Sign In"}
                </button>

                <a href='/' className="text-black text-[1.3vh] sm:text-[1.8vh] text-center ml-auto hover:text-red-500">
                  {codeLanguage === 'id' ? "Lupa kata sandi ?" : "Forgot password ?"}
                </a>
              </div>

              <p className="text-black font-extrabold text-[1.5vh] sm:text-[2vh] mt-[4vh] text-center">
                {codeLanguage === 'id' ? "Sistem yang didukung oleh" : "System supported by"} <b className='text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-600 to-red-600'>AGTA</b>
              </p>

            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;