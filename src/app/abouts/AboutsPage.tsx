"use client";

import React from "react";
import { useSelector } from "react-redux";
import useAnimateElements from "../components/useAnimateElements";

interface AboutsProps {
  aboutData: {
    title: string,
    openingText: { id: string, en: string }
    closingText: { id: string, en: string }
    comitmentLists: { titleText: { id: string, en: string }, descriptionText: { id: string, en: string } }[],
  },
}

const AboutsPage: React.FC<AboutsProps> = ({ aboutData }) => {
  const { containerRef, iconsRef } = useAnimateElements();
  const codeLanguage = useSelector(
    (state: { header: { codeLanguage: "id" | "en" } }) => state.header.codeLanguage
  );

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div ref={containerRef} className="flex flex-col justify-center items-center">
        <p className="font-montserrat font-extrabold text-[5vh] xl:text-[8vh] text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-700 to-red-700 neon-glow">
          {aboutData.title}
        </p>
        <div ref={iconsRef} className="w-[90vw] sm:w-[70vw] min-h-[20vh] max-h-[70vh] overflow-y-auto pb-[8vh]">
          <div>
            <p className="text-[1.5vh] text-justify sm:text-[2vh] xl:text-[2.5vh] text-white mb-[4vh] indent-5 sm:indent-10">
             {aboutData.openingText[codeLanguage]}
            </p>
            
            {aboutData.comitmentLists.length > 0 && aboutData.comitmentLists.map((item, index) => (
              <div key={index} className="text-white">
                <p className="text-[2vh] sm:text-[2.5vh] font-bold">{index + 1}. {item.titleText[codeLanguage]}</p>
                <p className="text-[1.5vh] text-justify sm:text-[2vh] xl:text-[2.5vh] text-white mb-[4vh] ml-[2.5vh]">
                  {item.descriptionText[codeLanguage]}
                </p>
              </div>
            ))}

            <p className="text-[1.5vh] text-justify sm:text-[2vh] xl:text-[2.5vh] text-white mb-[4vh] indent-5 sm:indent-10">
              {aboutData.closingText[codeLanguage]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutsPage;