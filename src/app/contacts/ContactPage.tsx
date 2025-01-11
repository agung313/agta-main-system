"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Email from "../icons/email.svg";
import Instagram from "../icons/instagram.svg";
import Linkedin from "../icons/linkedin.svg";
import Maps from "../icons/maps.svg";
import Image from "next/image";
import useAnimateElements from "../components/useAnimateElements";
import { sentMessage } from "../api/client";
import LoadingPage from "../components/LoadingPage";
import { showNotification } from "../redux/components";

interface ContactProps {
  contactData: {
    title: { id: string, en: string},
    email: string,
    instagram: string,
    linkedinLink: string,
    address: string,
    addressLink: string,
    phone: string,
  },
}

const ContactPage: React.FC<ContactProps> = ({ contactData }) => {
  const dispatch = useDispatch();
  const { containerRef } = useAnimateElements();
  const codeLanguage = useSelector(
    (state: { header: { codeLanguage: "id" | "en" } }) => state.header.codeLanguage
  );
  
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false,
  });

  const [loadSent, setLoadSent] = useState(false);

  const validateInput = async () => {
    if (!inputData.name && !inputData.email && !inputData.message) {
      setLoadSent(false);
      setErrors({ name: true, email: true, message: true });
      dispatch(showNotification({ message: { id: "Harap isi semua data", en: "Please fill in all data" }, type: "failed" }));
      return true;
    } else if (inputData.name && !inputData.email && !inputData.message) {
      setLoadSent(false);
      setErrors({ name: false, email: true, message: true });
      dispatch(showNotification({ message: { id: "Email tidak boleh kosong dan pesan minimal 10 karakter", en: "Email cannot be empty and message minimum 10 characters" }, type: "failed" }));
      return true;
    } else if (!inputData.name && inputData.email && !inputData.message) {
      setLoadSent(false);
      setErrors({ name: true, email: false, message: true });
      dispatch(showNotification({ message: { id: "Nama tidak boleh kosong dan pesan minimal 10 karakter", en: "Name message cannot be empty and message minimum 10 characters" }, type: "failed" }));
      return true;
    } else if (!inputData.name && !inputData.email && inputData.message) {
      setLoadSent(false);
      setErrors({ name: true, email: true, message: false });
      dispatch(showNotification({ message: { id: "Nama dan email tidak boleh kosong", en: "Name and email cannot be empty" }, type: "failed" }));
      return true;
    } else if (!inputData.name) {
      setLoadSent(false);
      setErrors({ name: true, email: false, message: false });
      dispatch(showNotification({ message: { id: "Nama tidak boleh kosong", en: "Name cannot be empty" }, type: "failed" }));
      return true;
    } else if (!inputData.email) {
      setLoadSent(false);
      setErrors({ name: false, email: true, message: false });
      dispatch(showNotification({ message: { id: "Email tidak boleh kosong", en: "Email cannot be empty" }, type: "failed" }));
      return true;
    } else if (!inputData.email.includes("@") || !inputData.email.includes(".")) {
      setLoadSent(false);
      setErrors({ name: false, email: true, message: false });
      dispatch(showNotification({ message: { id: "Email tidak valid", en: "Email is not valid" }, type: "failed" }));
      return true;
    } else if (inputData.message.length < 10) {
      setLoadSent(false);
      setErrors({ name: false, email: false, message: true });
      dispatch(showNotification({ message: { id: "Pesan minimal 10 karakter", en: "Message minimum 10 characters" }, type: "failed" }));
      return true;
    } else {
      setErrors({ name: false, email: false, message: false });
      return false
    }
  }

  const handleSentMessages = async () => {
    setLoadSent(true);

    const isErros = await validateInput();

    if (isErros) return;

    try {
      await sentMessage(inputData);
      setTimeout(() => {
        setLoadSent(false);
        dispatch(showNotification({ message: { id: "Pesan anda telah berhasil dikirim", en: "Your message has been sent successfully" }, type: "success" }));
      }, 1000);
    } catch (err) {
      console.log('cek err', err); // eslint-disable-line
      setLoadSent(false)
      dispatch(showNotification({ message: { id: "Pesan anda gagal dikirim", en: "Your message has failed to send" }, type: "failed" }));
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <LoadingPage
        className="bg-black bg-opacity-80 z-50 fixed inset-0"
        isLoading={loadSent}
      />
      <div ref={containerRef} className="flex flex-col justify-center items-center">
        <div className="w-[80vw] sm:w-[70vw] min-h-[20vh] max-h-[70vh] pb-[8vh]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-[4vh] mb-[2vh] sm:mb-[4vh]">
            <div className="flex flex-col justify-center">
              <p className="font-montserrat font-extrabold text-center sm:text-left text-[3vh] xl:text-[5vh] text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-700 to-red-700 neon-glow mb-4">
                {contactData.title[codeLanguage]}
              </p>
              <p className="text-[1.5vh] text-justify sm:text-[2vh] xl:text-[2.5vh] text-white mb-2">
                {contactData.email}
              </p>
              <p className="text-[1.5vh] text-justify sm:text-[2vh] xl:text-[2.5vh] text-white mb-2">
                {contactData.address}
              </p>
              <p className="text-[1.5vh] text-justify sm:text-[2vh] xl:text-[2.5vh] text-white mb-5">
                {contactData.phone && `${codeLanguage === "id" ? "Telp" : "Phone"} : ${contactData.phone}`}
              </p>
              <div className="flex items-center gap-6 mb-5 sm:mb-0">
                {contactData.email &&
                  <a href={`mailto:${contactData.email}`} target="_blank" rel="noreferrer">
                    <Image src={Email} alt="Logo" className="w-[3vh] md:w-[4vh] lg:w-[5vh] h-auto" />
                  </a>
                }
                {contactData.instagram &&
                  <a href={`https://www.instagram.com/${contactData.instagram}`} target="_blank" rel="noreferrer">
                    <Image src={Instagram} alt="Logo" className="w-[3vh] md:w-[4vh] lg:w-[5vh] h-auto" />
                  </a>
                }
                {contactData.linkedinLink &&
                  <a href={contactData.linkedinLink} target="_blank" rel="noreferrer">
                    <Image src={Linkedin} alt="Logo" className="w-[3vh] md:w-[4vh] lg:w-[5vh] h-auto" />
                  </a>
                }
                {contactData.addressLink &&
                  <a href={contactData.addressLink} target="_blank" rel="noreferrer">
                    <Image src={Maps} alt="Logo" className="w-[3vh] md:w-[4vh] lg:w-[5vh] h-auto" />
                  </a>
                }
              </div>
            </div>
            <div className="flex flex-col">
              <p className={`${errors.name ? "text-red-500" : "text-white"} font-bold mb-2 text-[1.5vh] text-justify sm:text-[2vh] xl:text-[2.5vh]`}>{codeLanguage === "id" ? "Nama" : "Name"}</p>
              <input
                type="text"
                placeholder={codeLanguage === "id" ? "Masukan Nama Anda" : "Enter Your Name"}
                value={inputData.name}
                onChange={(e) => setInputData({ ...inputData, name: e.target.value })}
                className={`p-2 rounded-md border ${errors.name ? "border-red-500" : "border-white"} bg-transparent text-white mb-4 focus:outline-none text-[1.5vh] text-justify sm:text-[2vh] xl:text-[2.5vh]`}
                disabled={loadSent}
              />

              <p className={`${errors.email ? "text-red-500" : "text-white"} font-bold mb-2 text-[1.5vh] text-justify sm:text-[2vh] xl:text-[2.5vh]`}>Email</p>
              <input
                type="email"
                placeholder={codeLanguage === "id" ? "Masukan Email Anda" : "Enter Your Email"}
                value={inputData.email}
                onChange={(e) => setInputData({ ...inputData, email: e.target.value })}
                className={`p-2 rounded-md border ${errors.email ? "border-red-500" : "border-white"} bg-transparent text-white mb-4 focus:outline-none text-[1.5vh] text-justify sm:text-[2vh] xl:text-[2.5vh]`}
                disabled={loadSent}
              />

              <p className={`${errors.message ? "text-red-500" : "text-white"} font-bold mb-2 text-[1.5vh] text-justify sm:text-[2vh] xl:text-[2.5vh]`}>{codeLanguage === "id" ? "Pesan" : "Message"}</p>
              <textarea
                placeholder={codeLanguage === "id" ? "Masukan Pesan Anda" : "Enter Your Message"}
                value={inputData.message}
                onChange={(e) => setInputData({ ...inputData, message: e.target.value })}
                className={`p-2 rounded-md border ${errors.message ? "border-red-500" : "border-white"} bg-transparent text-white mb-4 focus:outline-none text-[1.5vh] text-justify sm:text-[2vh] xl:text-[2.5vh]`}
                rows={4}
                disabled={loadSent}
              />
              <button
                type="submit"
                className={` text-[1.5vh] sm:text-[2vh] xl:text-[2.5vh] font-bold p-2 bg-gradient-to-r ${loadSent ? "from-purple-600 via-pink-700 to-red-700" : "from-purple-400 via-pink-500 to-red-500"} text-white rounded-md hover:bg-gradient-to-r hover:from-purple-600 hover:via-pink-700 hover:to-red-700`}
                onClick={() => handleSentMessages()}
                disabled={loadSent}
              >
                {codeLanguage === "id" ? "Kirim pesan anda" : "Send your message"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;