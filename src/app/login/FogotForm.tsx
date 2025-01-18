import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LoadingPage from '../components/LoadingPage';
import Bigsuccess from '../icons/bigsuccess.svg';
import Image from 'next/image';
import { resetPassword } from '../api/client';
import { showNotification } from '../redux/components';

interface LoginProps {
    setTypeForm: (type: string) => void; // eslint-disable-line
}

const ForgotForm: React.FC<LoginProps> = ({ setTypeForm }) => {
  const dispatch = useDispatch();
  const isMounted = useRef(true);
  const codeLanguage = useSelector(
    (state: { header: { codeLanguage: "id" | "en" } }) => state.header.codeLanguage
  );

  const [inputData, setInputData] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const checkTimeToReset = React.useCallback(() => {
    const timeToReset = localStorage.getItem('timeToReset');
    const now = new Date();
    if (timeToReset) {
      const timeDifference = now.getTime() - new Date(timeToReset).getTime();
      const oneMinute = 60 * 1000; // 1 minute in milliseconds
      if (timeDifference < oneMinute) {
        setIsSuccess(true);
      }
    }
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      checkTimeToReset();
    }
    return () => {
      isMounted.current = false
    }
  }, [checkTimeToReset]);

  const validateInput = async () => {
    if (!inputData) {
      setIsLoading(false);
      dispatch(showNotification({ message: { id: 'Email tidak boleh kosong', en: 'Email cannot be empty' }, type: 'failed' }));
      return true;
    }
    if (!inputData.includes("@") || !inputData.includes(".")) {
      setIsLoading(false);
      dispatch(showNotification({ message: { id: "Email tidak valid", en: "Email is not valid" }, type: "failed" }));
      return true;
    }
  };

  const handleForgotPassword = async () => {
    const now = new Date();
    setIsLoading(true);
    const isErros = await validateInput();
    if (isErros) return;
    try {
      await resetPassword({ email: inputData });
      setTimeout(() => {
        setIsSuccess(true);
        setIsLoading(false);
        localStorage.setItem('timeToReset', now.toISOString());
      }, 1000);
    } catch (err: any) { // eslint-disable-line
      const errorMessage = err.response?.data?.message 
      const message = {
        id: errorMessage === 'Email not found' ? 'Maaf email anda tidak terdaftar pada sistem' : 'Terjadi kesalahan, silakan coba lagi',
        en: errorMessage === 'Email not found' ? 'Sorry, your email is not registered in the system' : 'An error occurred, please try again'
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

      {isSuccess
        ? 
          <div className='flex flex-col items-center mb-[2vh] lg:mb-[4vh] mt-[4vh]'>
            <Image src={Bigsuccess} alt="Success Icon" width={100} height={100} />
            <p className="text-black font-bold mb-2 text-[1.5vh] sm:text-[2vh] text-center mt-[0.5vh]">
              Selamat! Password baru <br /> telah dikirim ke email Anda
            </p>
          </div>
        :
          <div className='mb-[2vh] lg:mb-[4vh]'>
            <p className="text-black font-bold mb-2 text-[1.5vh] sm:text-[2vh] mt-[0.8vh] lg:mt-[4vh]">Email</p>
            <input
              type="text"
              placeholder={codeLanguage === "id" ? "Masukan Email Anda" : "Enter Your Email"}
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              className="text-[1.5vh] sm:text-[2vh] p-2 rounded-md border border-gray w-full bg-transparent text-black focus:outline-none"
            />
          </div>
        }

      <div className='flex items-center'>
        <button
          type="submit"
          onClick={() => handleForgotPassword()}
          className="w-full text-[1.5vh] sm:text-[2vh] font-bold p-2 bg-gradient-to-r from-purple-500 via-pink-600 to-red-600 text-white rounded-md hover:bg-gradient-to-r hover:from-purple-700 hover:via-pink-800 hover:to-red-800"
          disabled={isLoading || isSuccess}
        >
          {!isSuccess && (isLoading ? <LoadingPage size={20} color="#fff" flex isLoading={isLoading} /> : codeLanguage === "id" ? "Lupa Password" : "Forgot Password")}
          {isSuccess && (codeLanguage === "id" ? "Tunggu hingga satu menit" : "Wait for a minute")}
        </button>
      </div>

      <p className="text-black font-extrabold text-[1.5vh] sm:text-[2vh] mt-[4vh] text-center">
        {codeLanguage === 'id' ? "Sudah memiliki akun ? " : "Already have an account ? "} 
        <b
          className='text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-600 to-red-600 cursor-pointer'
          onClick={() => setTypeForm('signin')}
        >
          Sign In
        </b>
      </p>

      <p className="text-neutral-500 text-[1vh] sm:text-[1.5vh] mt-[4vh] text-left">
        &copy; <span>{new Date().getFullYear()}</span> AGTA System. All rights reserved.
      </p>

    </div>
  )
}

export default ForgotForm