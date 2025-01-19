import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LoadingPage from '../components/LoadingPage';
import { signUp } from '../api/client';
import { showNotification } from '../redux/components';
import { useRouter } from 'next/navigation';

interface LoginProps {
    setTypeForm: (type: string) => void; // eslint-disable-line
}

const SignupForm: React.FC<LoginProps> = ({ setTypeForm }) => {
  const dispatch = useDispatch();
  const route = useRouter();
  const codeLanguage = useSelector(
    (state: { header: { codeLanguage: "id" | "en" } }) => state.header.codeLanguage
  );

  const [inputData, setInputData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const validateInput = async () => {
    if (!inputData.name && !inputData.username && !inputData.email && !inputData.password) {
      setIsLoading(false);
      dispatch(showNotification({ message: { id: 'Form tidak boleh kosong', en: 'Form cannot be empty' }, type: 'failed' }));
      return true;
    }
    if (!inputData.name) {
      setIsLoading(false);
      dispatch(showNotification({ message: { id: 'Nama tidak boleh kosong', en: 'Name cannot be empty' }, type: 'failed' }));
      return true;
    }
    if (!inputData.username) {
      setIsLoading(false);
      dispatch(showNotification({ message: { id: 'Username tidak boleh kosong', en: 'Username cannot be empty' }, type: 'failed' }));
      return true;
    }
    if (!inputData.email) {
      setIsLoading(false);
      dispatch(showNotification({ message: { id: 'Email tidak boleh kosong', en: 'Email cannot be empty' }, type: 'failed' }));
      return true;
    }
    if (!inputData.email.includes("@") || !inputData.email.includes(".")) {
      setIsLoading(false);
      dispatch(showNotification({ message: { id: "Email tidak valid", en: "Email is not valid" }, type: "failed" }));
      return true;
    }
    if (!inputData.password) {
      setIsLoading(false);
      dispatch(showNotification({ message: { id: 'Kata sandi tidak boleh kosong', en: 'Password cannot be empty' }, type: 'failed' }));
      return true;
    }
    return false;
  };

  const now = new Date();

  const handleSignUp =  async () => {
    setIsLoading(true);
    const isErros = await validateInput();
    if (isErros) return;
    try {
      const res = await signUp(inputData);
      localStorage.setItem('userDataName', res.data.userData.name);
      localStorage.setItem('userDataUserName', res.data.userData.username);
      localStorage.setItem('userDataEmail', res.data.userData.email);
      localStorage.setItem('userDataRole', res.data.userData?.role);
      localStorage.setItem('lastToken', res.data.token);
      localStorage.setItem('lastTokenAt', now.toISOString());
      setTimeout(() => {
        setIsLoading(false);
        route.push('/admin');
      }, 1000);
    } catch (err: any) { // eslint-disable-line
      const errorMessage = err.response?.data?.message 
      const message = {
        id: errorMessage === 'Email already exists' ? 'Maaf email anda sudah digunakan, harap masukan email lainnya' : 'Terjadi kesalahan, silakan coba lagi',
        en: errorMessage === 'Email already exists' ? 'Your session has expired, please re-login' : 'An error occurred, please try again'
      }
      setIsLoading(false);
      dispatch(showNotification({ message: { id: message.id, en: message.en }, type: 'failed' }));
    }
  };
  return (
    <div className='bg-white w-full rounded-xl w-[90%] sm:w-[60%] md:w-[70%] lg:w-[80%] xl:w-[35%] p-6 max-h-[65vh] lg:max-h-[100vh] overflow-auto'>
      <p className="font-montserrat text-[1.5vh] xl:text-[2.5vh] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-700 to-red-700">
        {codeLanguage === 'id' ? "Lengkapi form berikut ini" : "Complete the following form"}
      </p>

      <p className="text-black font-bold mb-2 text-[1.5vh] sm:text-[2vh] mt-[0.8vh] lg:mt-[4vh]">{codeLanguage === "id" ? "Nama" : "Name"}</p>
      <input
        disabled={isLoading}
        type="text"
        placeholder={codeLanguage === "id" ? "Masukan Nama Anda" : "Enter Your Name"}
        value={inputData.name}
        onChange={(e) => setInputData({ ...inputData, name: e.target.value })}
        className="text-[1.5vh] sm:text-[2vh] p-2 rounded-md border border-gray w-full bg-transparent text-black focus:outline-none"
      />

      <p className="text-black font-bold mb-2 text-[1.5vh] sm:text-[2vh] mt-[0.8vh] lg:mt-[2vh]">Username</p>
      <input
        disabled={isLoading}
        type="text"
        placeholder={codeLanguage === "id" ? "Masukan Username Anda" : "Enter Your Username"}
        value={inputData.username}
        onChange={(e) => setInputData({ ...inputData, username: e.target.value })}
        className="text-[1.5vh] sm:text-[2vh] p-2 rounded-md border border-gray w-full bg-transparent text-black focus:outline-none"
      />

      <p className="text-black font-bold mb-2 text-[1.5vh] sm:text-[2vh] mt-[0.8vh] lg:mt-[2vh]">Email</p>
      <input
        disabled={isLoading}
        type="email"
        placeholder={codeLanguage === "id" ? "Masukan Email Anda" : "Enter Your Email"}
        value={inputData.email}
        onChange={(e) => setInputData({ ...inputData, email: e.target.value })}
        className="text-[1.5vh] sm:text-[2vh] p-2 rounded-md border border-gray w-full bg-transparent text-black focus:outline-none"
      />

      <p className="text-black font-bold mb-2 text-[1.5vh] sm:text-[2vh] mt-[0.8vh] lg:mt-[2vh]">{codeLanguage === 'id' ? "Kata Sandi" : "Password"}</p>
      <input
        disabled={isLoading}
        type="password"
        placeholder={codeLanguage === "id" ? "Masukan Kata Sandi Anda" : "Enter Your Password"}
        value={inputData.password}
        onChange={(e) => setInputData({ ...inputData, password: e.target.value })}
        className="p-2 rounded-md border text-[1.5vh] sm:text-[2vh] border-gray w-full bg-transparent text-black mb-[2vh] lg:mb-[4vh] focus:outline-none"
      />

      <div className='flex items-center'>
        <button
          disabled={isLoading}
          type="submit"
          onClick={() => handleSignUp()}
          className="w-full text-[1.5vh] sm:text-[2vh] font-bold p-2 bg-gradient-to-r from-purple-500 via-pink-600 to-red-600 text-white rounded-md hover:bg-gradient-to-r hover:from-purple-700 hover:via-pink-800 hover:to-red-800"
        >
          {isLoading
            ? <LoadingPage size={20} color="#fff" flex isLoading={isLoading} />
            : codeLanguage === "id" ? "Daftar" : "Sign Up"
          }
        </button>
      </div>

      <div className='flex items-center justify-center mt-[4vh]'>
        <p className="text-black font-extrabold text-[1.5vh] sm:text-[2vh] text-center">
          {codeLanguage === 'id' ? "Sudah memiliki akun ? " : "Already have an account ? "} 
        </p>
        <button
          className='text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-600 to-red-600 cursor-pointer font-bold ml-2'
          onClick={() => setTypeForm('signin')}
          disabled={isLoading}
        >
          Sign In
        </button>
      </div>

      <p className="text-neutral-500 text-[1vh] sm:text-[1.5vh] mt-[4vh] text-left">
        &copy; <span>{new Date().getFullYear()}</span> AGTA System. All rights reserved.
      </p>

    </div>
  )
}

export default SignupForm