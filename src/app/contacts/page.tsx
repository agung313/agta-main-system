"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import Email from "../icons/email.svg";
import Instagram from "../icons/instagram.svg";
import Linkedin from "../icons/linkedin.svg";
import Pinlocation from "../icons/pinLocation.svg";
import Image from "next/image";
import useAnimateElements from "../components/useAnimateElements";

const DashboardContact = () => {
  const { containerRef, iconsRef } = useAnimateElements();
  const codeLanguage = useSelector(
    (state: { header: { codeLanguage: "id" | "en" } }) => state.header.codeLanguage
  );
  
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    message: "",
  });

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div ref={containerRef} className="flex flex-col justify-center items-center">
        <p className="font-montserrat font-extrabold text-[5vh] xl:text-[8vh] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 neon-glow">
          {codeLanguage === "id" ? "KONTAK" : "CONTACT"}
        </p>
        <div ref={iconsRef} className="w-[90vw] sm:w-[80vw] min-h-[20vh] max-h-[70vh] overflow-y-auto pb-[8vh]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-[4vh] mb-[2vh] sm:mb-[4vh]">
            
            <div className="flex items-center sm:justify-center">
              <Image src={Email} alt="Logo" className="w-[2vh] md:w-[3vh] lg:w-[4vh] h-auto" />
              <div className="ml-4">
                <a href="mailto:sholihhudinagung@gmail.com" target="_blank" rel="noreferrer" className="text-[1.5vh] text-justify sm:text-[2vh] xl:text-[2.5vh] text-white">
                  sholihhudinagung@gmail.com
                </a>
              </div>
            </div>
            
            <div className="flex items-center sm:justify-center">
              <Image src={Instagram} alt="Logo" className="w-[2vh] md:w-[3vh] lg:w-[4vh] h-auto" />
              <div className="ml-4">
                <a href="https://www.instagram.com/sholihhudinagung/" target="_blank" rel="noreferrer" className="text-[1.5vh] text-justify sm:text-[2vh] xl:text-[2.5vh] text-white">
                  sholihhudinagung
                </a>
              </div>
            </div>
            
            <div className="flex items-center sm:justify-center">
              <Image src={Linkedin} alt="Logo" className="w-[2vh] md:w-[3vh] lg:w-[4vh] h-auto" />
              <div className="ml-4">
                <a href="https://www.linkedin.com/in/muhammad-agung-sholihhudin-567963265/" target="_blank" rel="noreferrer" className="text-[1.5vh] text-justify sm:text-[2vh] xl:text-[2.5vh] text-white">
                  muhammad agung sholihhudin
                </a>
              </div>
            </div>

          </div>
          <div className="flex items-center sm:justify-center">
            <Image src={Pinlocation} alt="Logo" className="w-[2vh] md:w-[3vh] lg:w-[4vh] h-auto" />
            <div className="ml-4">
              <a href="https://maps.app.goo.gl/3v6oiY9DpT2AhfMa9" target="_blank" rel="noreferrer" className="text-[1.5vh] text-justify sm:text-[2vh] xl:text-[2.5vh] text-white">
                Jl. Daru - Daru VII, Pekanbaru, Riau, Indonesia
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-[3vh] sm:mt-[5vh]">
            <div className="order-1 sm:order-2">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.6816889525358!2d101.4941733!3d0.47417380000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d5afb14e200015%3A0x32f1a877bc30b00c!2sJl.%20Daru-Daru%20VII%2C%20Tengkerang%20Tim.%2C%20Kec.%20Tenayan%20Raya%2C%20Kota%20Pekanbaru%2C%20Riau%2028289!5e0!3m2!1sid!2sid!4v1734322498967!5m2!1sid!2sid" width="100%" height="400" loading="lazy" referrerPolicy="no-referrer-when-downgrade" style={{ backgroundColor: "#2c2c2c" }}/>
            </div>
            <form className="flex flex-col order-2 sm:order-1">
              <p className="text-white font-bold mb-2">{codeLanguage === "id" ? "Nama" : "Name"}</p>
              <input
                type="text"
                placeholder={codeLanguage === "id" ? "Masukan Nama Anda" : "Enter Your Name"}
                value={inputData.name}
                onChange={(e) => setInputData({ ...inputData, name: e.target.value })}
                className="p-2 rounded-md border border-white bg-transparent text-white mb-4 focus:outline-none"
              />

              <p className="text-white font-bold mb-2">Email</p>
              <input
                type="email"
                placeholder={codeLanguage === "id" ? "Masukan Email Anda" : "Enter Your Email"}
                value={inputData.email}
                onChange={(e) => setInputData({ ...inputData, email: e.target.value })}
                className="p-2 rounded-md border border-white bg-transparent text-white mb-4 focus:outline-none"
              />

              <p className="text-white font-bold mb-2">{codeLanguage === "id" ? "Pesan" : "Message"}</p>
              <textarea
                placeholder={codeLanguage === "id" ? "Masukan Pesan Anda" : "Enter Your Message"}
                value={inputData.message}
                onChange={(e) => setInputData({ ...inputData, message: e.target.value })}
                className="p-2 rounded-md border border-white bg-transparent text-white mb-4 focus:outline-none"
                rows={4}
              />
              <button
                type="submit"
                className="font-bold p-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white rounded-md hover:bg-gradient-to-r hover:from-purple-600 hover:via-pink-700 hover:to-red-700"
              >
                {codeLanguage === "id" ? "Kirim" : "Send"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContact;