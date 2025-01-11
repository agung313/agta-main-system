import React from 'react'
import Image from 'next/image'
import { useSelector } from 'react-redux';
import useAnimateElements from './components/useAnimateElements';

interface DashboardProps {
    dashboardData: {
      firstText: string,
      secondText: string,
      thirdText: string,
      description: { id: string, en: string },
      technologyLists: { link: string; title: string; icont: string; description: { id: string; en: string } }[],
    };
}

const DashboardPage: React.FC<DashboardProps> = ({ dashboardData }) => {
  const codeLanguage = useSelector(
    (state: { header: { codeLanguage: "id" | "en" } }) => state.header.codeLanguage
  );
  const { containerRef, iconsRef } = useAnimateElements();
  return (
    <div ref={containerRef} className="flex flex-col justify-center items-center">
        <p className="text-[3vh] xl:text-[4vh] text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300 -mb-3 xl:-mb-8 neon-glow">
          {dashboardData.firstText}
        </p>
        <p className="font-montserrat font-extrabold text-[10vh] xl:text-[13vh] text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-700 to-red-700 -mb-3 xl:-mb-8 neon-glow">
          {dashboardData.secondText}
        </p>
        <p className="text-[3vh] xl:text-[4vh] text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300 mb-[5vh] neon-glow">
          {dashboardData.thirdText}
        </p>
        <div className="w-[90vw] sm:w-[70vw] min-h-[20vh]">
          <p className="text-[1.5vh] text-justify indent-5 sm:indent-10 sm:text-[2vh] xl:text-[2.5vh] text-center text-white mb-[4vh]">
            {dashboardData.description[codeLanguage]}
          </p>
          <div ref={iconsRef} className="flex justify-center items-center space-x-10 lg:flex-row flex-wrap px-4">
            {dashboardData.technologyLists.length > 0 && dashboardData.technologyLists.map((item, index) => (
              <a key={index} href={item.link} target="_blank" rel="noreferrer" className="relative group">
                <Image src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}${item.icont}`} className="w-[4vh] md:w-[5vh] lg:w-[6vh] h-auto" alt="Logo" width={5} height={5} />
                <span className="absolute bottom-full mb-2 hidden group-hover:block text-white bg-black p-1 rounded">{item.title}</span>
              </a>
            ))}
          </div>
        </div>
    </div>
  )
}

export default DashboardPage