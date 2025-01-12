import React, { useState } from 'react'
import { useSelector } from 'react-redux';

interface LoginProps {
    setTypeForm: (type: string) => void; // eslint-disable-line
}

const ForgotForm: React.FC<LoginProps> = ({ setTypeForm }) => {
    const codeLanguage = useSelector(
      (state: { header: { codeLanguage: "id" | "en" } }) => state.header.codeLanguage
    );

    const [inputData, setInputData] = useState({
      email: "",
      oldpassword: "",
      newpassword: "",
    });

    const handleSignIn = () => {
      window.location.href = '/admin';
    };
  return (
    <div className='bg-white w-full rounded-xl w-[90%] sm:w-[60%] md:w-[70%] lg:w-[80%] xl:w-[35%] p-6 max-h-[65vh] lg:max-h-[100vh] overflow-auto'>
      <p className="font-montserrat text-[1.5vh] xl:text-[2.5vh] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-700 to-red-700">
        {codeLanguage === 'id' ? "Lengkapi form berikut ini" : "Complete the following form"}
      </p>

      <p className="text-black font-bold mb-2 text-[1.5vh] sm:text-[2vh] mt-[0.8vh] lg:mt-[4vh]">Email</p>
      <input
        type="text"
        placeholder={codeLanguage === "id" ? "Masukan Email Anda" : "Enter Your Email"}
        value={inputData.email}
        onChange={(e) => setInputData({ ...inputData, email: e.target.value })}
        className="text-[1.5vh] sm:text-[2vh] p-2 rounded-md border border-gray w-full bg-transparent text-black focus:outline-none"
      />

      <p className="text-black font-bold mb-2 text-[1.5vh] sm:text-[2vh] mt-[0.8vh] lg:mt-[4vh]">{codeLanguage === 'id' ? "Kata Sandi Lama" : "Old Password"}</p>
      <input
        type="password"
        placeholder={codeLanguage === "id" ? "Masukan Kata Sandi Lama Anda" : "Enter Your Old Password"}
        value={inputData.oldpassword}
        onChange={(e) => setInputData({ ...inputData, oldpassword: e.target.value })}
        className="p-2 rounded-md border text-[1.5vh] sm:text-[2vh] border-gray w-full bg-transparent text-black focus:outline-none"
      />

      <p className="text-black font-bold mb-2 text-[1.5vh] sm:text-[2vh] mt-[0.8vh] lg:mt-[4vh]">{codeLanguage === 'id' ? "Kata Sandi Baru" : "New Password"}</p>
      <input
        type="password"
        placeholder={codeLanguage === "id" ? "Masukan Kata Sandi Baru Anda" : "Enter Your New Password"}
        value={inputData.newpassword}
        onChange={(e) => setInputData({ ...inputData, newpassword: e.target.value })}
        className="p-2 rounded-md border text-[1.5vh] sm:text-[2vh] border-gray w-full bg-transparent text-black mb-[2vh] lg:mb-[4vh] focus:outline-none"
      />

      <div className='flex items-center'>
        <button
          type="submit"
          onClick={() => handleSignIn()}
          className="w-full text-[1.5vh] sm:text-[2vh] font-bold p-2 bg-gradient-to-r from-purple-500 via-pink-600 to-red-600 text-white rounded-md hover:bg-gradient-to-r hover:from-purple-700 hover:via-pink-800 hover:to-red-800"
        >
          {codeLanguage === "id" ? "Masuk" : "Sign In"}
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