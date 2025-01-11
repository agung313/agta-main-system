import Image from 'next/image';
import React from 'react';

interface DivTechnologiesProps {
  codeLanguage?: string;
  imageFile?: string;
  titleText?: string;
  idText?: string;
  enText?: string;
}
// href={linkTech} target="_blank" rel="noreferrer"
const DivTechnologies: React.FC<DivTechnologiesProps> = ({ codeLanguage = 'id', imageFile = '', titleText, idText, enText }) => {
  return (
    <div className='w-full border rounded-xl p-4 flex items-center'>
      <Image src={imageFile} alt="Logo" className="w-[4vh] md:w-[5vh] lg:w-[6vh] h-auto" width={5} height={5} />
      <div className="w-full ml-4">
        <p className="text-[1.5vh] text-justify sm:text-[2vh] xl:text-[2.5vh] text-white">
          <span className="font-bold font-montserrat text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-700 to-red-700">{titleText}</span> {codeLanguage === "id" ? idText : enText}
        </p>
      </div>
    </div>
  );
};

export default DivTechnologies;