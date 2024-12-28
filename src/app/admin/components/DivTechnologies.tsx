import Image from 'next/image';
import React from 'react';

interface DivTechnologiesProps {
  codeLanguage?: string;
  imageFile?: string;
  titleText?: string;
  linkTech?: string;
  idText?: string;
  enText?: string;
}
// href={linkTech} target="_blank" rel="noreferrer"
const DivTechnologies: React.FC<DivTechnologiesProps> = ({ codeLanguage = 'id', imageFile = '', titleText, linkTech, idText, enText }) => {
  return (
    <div className='w-full border rounded-xl p-4 flex items-center mb-8'>
      <Image src={imageFile} alt="Logo" className="w-[4vh] md:w-[5vh] lg:w-[6vh] h-auto" />
      <div className="w-full ml-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-purple-400 text-[2.5vh]">{titleText}</p>
          <a href={linkTech} target="_blank" rel="noreferrer" className='bg-clip-border bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 font-bold text-white px-2 py-1 rounded-md'>
            Check Link
          </a>
        </div>
        <p className="text-pink-400 text-[2.5vh] mb-2">{linkTech}</p>
        <p className="text-[2.5vh] text-white">
        {codeLanguage === "id" ? idText : enText}
        </p>
      </div>
    </div>
  );
};

export default DivTechnologies;