"use client";

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { showNotification } from '../redux/components';
import { login } from '../api/client';
import { useRouter } from 'next/navigation';
import LoadingPage from '../components/LoadingPage';

interface LoginProps {
    setTypeForm: (type: string) => void; // eslint-disable-line
}

const LoginForm: React.FC<LoginProps> = ({ setTypeForm }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const codeLanguage = useSelector(
    (state: { header: { codeLanguage: "id" | "en" } }) => state.header.codeLanguage
  );

  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const now = new Date();

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      const res = await login(inputData)
      localStorage.setItem('userDataName', res.data.userData.name);
      localStorage.setItem('userDataUserName', res.data.userData.username);
      localStorage.setItem('userDataEmail', res.data.userData.email);
      localStorage.setItem('userDataRole', res.data.userData?.role);
      localStorage.setItem('lastToken', res.data.token);
      localStorage.setItem('lastTokenAt', now.toISOString());
      setTimeout(() => {
        setIsLoading(false);
        router.push('/admin');
      }, 1000);
    } catch (err) {
      console.log('cek err', err); // eslint-disable-line
      localStorage.removeItem('userDataName');
      localStorage.removeItem('userDataUserName');
      localStorage.removeItem('userDataEmail');
      localStorage.removeItem('userDataRole');
      localStorage.removeItem('lastToken');
      localStorage.removeItem('lastTokenAt');
      setIsLoading(false);
      dispatch(showNotification({ message: { id: "Email atau password anda salah", en: "Your email or password is incorrect" }, type: "failed" }));
    }
  };
  
  return (
    <div className='bg-white w-full rounded-xl w-[90%] sm:w-[60%] md:w-[70%] lg:w-[80%] xl:w-[35%] p-6 max-h-[65vh] lg:max-h-[100vh] overflow-auto'>
      <p className="font-montserrat text-[1.5vh] xl:text-[2.5vh] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-700 to-red-700 mb-2">
        {codeLanguage === 'id' ? "Masuk ke" : "Sign in to"} AGTA
      </p>

      <p className="text-black font-bold mb-2 text-[1.5vh] sm:text-[2vh] mt-[0.8vh] lg:mt-[4vh]">Email</p>
      <input
        type="email"
        placeholder={codeLanguage === "id" ? "Masukan Email Anda" : "Enter Your Email"}
        value={inputData.email}
        onChange={(e) => setInputData({ ...inputData, email: e.target.value })}
        disabled={isLoading}
        className="text-[1.5vh] sm:text-[2vh] p-2 rounded-md border border-gray w-full bg-transparent text-black focus:outline-none"
      />

      <p className="text-black font-bold mb-2 text-[1.5vh] sm:text-[2vh] mt-[0.8vh] lg:mt-[4vh]">{codeLanguage === 'id' ? "Kata Sandi" : "Password"}</p>
      <input
        type="password"
        placeholder={codeLanguage === "id" ? "Masukan Kata Sandi Anda" : "Enter Your Password"}
        value={inputData.password}
        disabled={isLoading}
        onChange={(e) => setInputData({ ...inputData, password: e.target.value })}
        className="p-2 rounded-md border text-[1.5vh] sm:text-[2vh] border-gray w-full bg-transparent text-black mb-[2vh] lg:mb-[4vh] focus:outline-none"
      />

      <div className='flex items-center'>
        <button
          type="submit"
          onClick={() => handleSignIn()}
          className="w-[40%] text-[1.5vh] sm:text-[2vh] font-bold p-2 bg-gradient-to-r from-purple-500 via-pink-600 to-red-600 text-white rounded-md hover:bg-gradient-to-r hover:from-purple-700 hover:via-pink-800 hover:to-red-800"
        >
          {isLoading
            ? <LoadingPage size={20} color="#fff" flex isLoading={isLoading} />
            : codeLanguage === "id" ? "Masuk" : "Sign In"
          }
        </button>

        <button disabled={isLoading} onClick={() => setTypeForm('forgot')} className={`text-black text-[1.3vh] sm:text-[1.8vh] text-center ml-auto ${isLoading ? "" : "hover:text-red-500"}`}>
          {codeLanguage === 'id' ? "Lupa kata sandi ?" : "Forgot password ?"}
        </button>
      </div>

      <p className="text-black font-extrabold text-[1.5vh] sm:text-[2vh] mt-[4vh] text-center">
        {codeLanguage === 'id' ? "Belum memiliki akun ? " : "Don't have an account yet ? "} 
        <button
          disabled={isLoading}
          className='text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-600 to-red-600'
          onClick={() => setTypeForm('signup')}
        >
          Sign Up
        </button>
      </p>

      <p className="text-neutral-500 text-[1vh] sm:text-[1.5vh] mt-[4vh] text-left">
        &copy; <span>{new Date().getFullYear()}</span> AGTA System. All rights reserved.
      </p>

    </div>
  )
}

export default LoginForm