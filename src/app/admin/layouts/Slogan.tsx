import React, { useState } from 'react'
import DivContent from '../components/DivContent';
import SelectContent from '../components/SelectContent';
import InputContent from '../components/InputContent';

const Slogan = () => {
  const [codeLanguage, setCodeLanguage] = useState("id");
  const languangeList = [{ id: "id", name: "Indonesia" }, { id: "en", name: "English" }];
  
  const [sloganText, setSloganText] = useState({
    firstText: "WHERE",
    secondText: "IDEAS",
    thirdText: "COME TO LIFE",
  });
  

  const [descriptionText, setDescriptionText] = useState<{ [key: string]: string }>({
    id: "Kami siap mengubah ide kreatif Anda menjadi solusi digital nyata. Dengan keahlian teknologi terkini dan dedikasi tinggi, kami menghadirkan inovasi berupa aplikasi, website, dan sistem yang berdampak besar. Bersama kami, ide Anda tidak hanya sekadar mimpi, kami wujudkan menjadi kenyataan.",
    en: "We are ready to turn your creative ideas into real digital solutions. With cutting-edge technology expertise and high dedication, we deliver innovations in the form of impactful applications, websites, and systems. With us, your ideas are not just dreams, we make them a reality."
  });

  return (
    <div className='w-full p-5 flex flex-col'>
      <DivContent>
        <p className='font-extrabold text-neutral-300 text-[3vh] mb-10'>Slogan</p>
        <div className='flex items-center mb-10'>
          <div className="flex flex-col justify-center w-[30%]">
            <InputContent
              id='firstText'
              label='First Text'
              value={sloganText.firstText}
              setValue={value => setSloganText({ ...sloganText, firstText: value })}
              classNameInput='w-full'
            />
            <InputContent
              id='secondText'
              label='Second Text'
              value={sloganText.secondText}
              setValue={value => setSloganText({ ...sloganText, secondText: value })}
            />
            <InputContent
              id='thirdText'
              label='Third Text'
              value={sloganText.thirdText}
              setValue={value => setSloganText({ ...sloganText, thirdText: value })}
            />
          </div>
          <div className="flex flex-col justify-center items-center w-[70%]">
            <p className="text-[3vh] xl:text-[4vh] text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300 -mb-3 xl:-mb-8 neon-glow">
              {sloganText.firstText}
            </p>
            <p className="font-montserrat font-extrabold text-[10vh] xl:text-[13vh] text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-700 to-red-700 -mb-3 xl:-mb-8 neon-glow">
              {sloganText.secondText}
            </p>
            <p className="text-[3vh] xl:text-[4vh] text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300 mb-[5vh] neon-glow">
              {sloganText.thirdText}
            </p>
          </div>
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
        <InputContent
          id='description'
          value={descriptionText[codeLanguage]}
          setValue={value => setDescriptionText({ ...descriptionText, [codeLanguage]: value })}
          classNameInput='text-justify indent-5 text-[2.5vh] border-none'
          rows={5}
        />
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