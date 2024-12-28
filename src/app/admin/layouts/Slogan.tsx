import React, { useState } from 'react'
import DivContent from '../components/DivContent';
import SelectContent from '../components/SelectContent';

const Slogan = () => {
  const [codeLanguage, setCodeLanguage] = useState("id");
  const languangeList = [{ id: "id", name: "Indonesia" }, { id: "en", name: "English" }];
  return (
    <div className='w-full p-5 flex flex-col'>
      <DivContent>
        <p className='font-extrabold text-neutral-300 text-[3vh] mb-10'>Slogan</p>
        <div className="flex flex-col justify-center items-center">
          <p className="text-[3vh] xl:text-[4vh] text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300 -mb-3 xl:-mb-8 neon-glow">
            WHERE
          </p>
          <p className="font-montserrat font-extrabold text-[10vh] xl:text-[13vh] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 -mb-3 xl:-mb-8 neon-glow">
            IDEAS
          </p>
          <p className="text-[3vh] xl:text-[4vh] text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300 mb-[5vh] neon-glow">
            COME TO LIFE
          </p>
        </div>
      </DivContent>
      <DivContent className='my-10'>
        <div className='flex justify-between items-center mb-10'>
          <p className='font-extrabold text-neutral-300 text-[3vh]'>Description</p>
          <div className='bg-white rounded-lg'>
            <SelectContent
              valueList={languangeList}
              valueSelected={codeLanguage}
              setValueSelected={setCodeLanguage}
            />
          </div>
        </div>
        <p className="text-justify indent-5 text-[2.5vh] text-center text-white mt-5">
          {codeLanguage === "id"
            ? "Kami siap mengubah ide kreatif Anda menjadi solusi digital nyata. Dengan keahlian teknologi terkini dan dedikasi tinggi, kami menghadirkan inovasi berupa aplikasi, website, dan sistem yang berdampak besar. Bersama kami, ide Anda tidak hanya sekadar mimpi, kami wujudkan menjadi kenyataan."
            : "We are ready to turn your creative ideas into real digital solutions. With cutting-edge technology expertise and high dedication, we deliver innovations in the form of impactful applications, websites, and systems. With us, your ideas are not just dreams, we make them a reality."
          }
        </p>
      </DivContent>
      <button
        type="submit"
        className="text-[2vh] w-full font-extrabold p-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white rounded-md hover:bg-gradient-to-r hover:from-purple-600 hover:via-pink-700 hover:to-red-700"
      >
        Save Changes
      </button>
    </div>
  );
};

export default Slogan;