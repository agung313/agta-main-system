"use client";

import React from "react";
import { useSelector } from "react-redux";
import useAnimateElements from "../components/useAnimateElements";
import DivTechnologies from "../components/DivTechnologies";

interface ServicesProps {
  servicesData: {
    title: { id: string, en: string },
    description: { id: string, en: string },
    technologyLists: { link: string; title: string, icont: string, descriptionText: { id: string, en: string} }[],
  },
}

const ServicesPage: React.FC<ServicesProps> = ({ servicesData }) => {
  const { containerRef, iconsRef } = useAnimateElements();
  const codeLanguage = useSelector(
    (state: { header: { codeLanguage: "id" | "en" } }) => state.header.codeLanguage
  );

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div ref={containerRef} className="flex flex-col justify-center items-center">
        <p className="font-montserrat font-extrabold text-[5vh] xl:text-[8vh] text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-700 to-red-700 neon-glow">
          {servicesData.title[codeLanguage]}
        </p>
        <div ref={iconsRef} className="w-[90vw] sm:w-[70vw] min-h-[20vh] max-h-[70vh] overflow-y-auto pb-[8vh]">
          <p className="text-[1.5vh] text-justify sm:text-[2vh] xl:text-[2.5vh] text-white mb-[4vh] indent-5 sm:indent-10">
            {servicesData.description[codeLanguage]}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-[4vh]">
            {servicesData.technologyLists.length > 0 && servicesData.technologyLists.map((item, index) => (
              <DivTechnologies
                key={index}
                codeLanguage={codeLanguage}
                imageFile={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}${item.icont}`}
                titleText={item.title}
                idText={item.descriptionText.id}
                enText={item.descriptionText.en}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;