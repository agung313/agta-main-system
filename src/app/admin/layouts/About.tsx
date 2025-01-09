import React, { useState } from 'react';
import DivContent from '../components/DivContent';
import SelectContent from '../components/SelectContent';
import InputContent from '../components/InputContent';

const About = () => {
  const [codeLanguage, setCodeLanguage] = useState("id");
  const languangeList = [{ id: "id", name: "Indonesia" }, { id: "en", name: "English" }];

  const [aboutText, setAboutText] = useState<{
    topText: { [key: string]: string };
    bottomText: { [key: string]: string };
  }>({
    topText: {
      id: "AGTA adalah perusahaan yang bergerak di bidang pengembangan perangkat lunak. Kami memiliki tujuan utama untuk membantu bisnis dan individu menciptakan solusi digital yang inovatif, efektif, dan berdampak. Dengan memanfaatkan teknologi terkini dan tim yang berpengalaman, kami berkomitmen untuk:",
      en: "AGTA is a software development company. Our primary goal is to help businesses and individuals create innovative, effective, and impactful digital solutions. Leveraging cutting-edge technology and an experienced team, we are committed to:",
    },
    bottomText: {
      id: "Dengan visi untuk menjadi pemimpin di industri teknologi, AGTA hadir sebagai solusi lengkap untuk setiap kebutuhan teknologi Anda mulai dari perencanaan, pengembangan, hingga implementasi. Bersama kami, setiap ide akan diwujudkan menjadi kenyataan.",
      en: "With a vision to become a leader in the technology industry, AGTA is here as a complete solution for all your technology needs from planning, development, to implementation. With us, every idea will be realized into reality.",
    },
  });

  const [commitmentList, setCommitmentList] = useState<Array<{
    title: { [key: string]: string };
    desc: { [key: string]: string };
  }>>([
    {
      title: {
        id: "Mewujudkan Ide Kreatif",
        en: "Bringing Creative Ideas to Life",
      },
      desc: {
        id: "Kami mengubah ide-ide kreatif Anda menjadi aplikasi, website, dan sistem digital yang nyata, memberikan solusi yang sesuai dengan kebutuhan Anda.",
        en: "We transform your creative ideas into real applications, websites, and digital systems, providing solutions that fit your needs.",
      },
    },
    {
      title: {
        id: "Mendorong Transformasi Digital",
        en: "Driving Digital Transformation",
      },
      desc: {
        id: "Membantu bisnis dari berbagai skala beradaptasi dengan era digital melalui layanan teknologi yang inovatif dan relevan, meningkatkan efisiensi dan daya saing di pasar.",
        en: "Helping businesses of all sizes adapt to the digital era through innovative and relevant technology services, and increasing efficiency and competitiveness in the market.",
      },
    },
    {
      title: {
        id: "Memberikan Dampak Nyata",
        en: "Delivering Real Impact",
      },
      desc: {
        id: "Kami berfokus pada pengembangan perangkat lunak yang tidak hanya memenuhi kebutuhan teknis, tetapi juga memberikan dampak positif terhadap pertumbuhan bisnis, pengalaman pengguna, dan keberlanjutan.",
        en: "We focus on developing software that not only meets technical requirements but also creates a positive impact on business growth, user experience, and sustainability.",
      },
    },
    {
      title: {
        id: "Menjadi Mitra Teknologi Terpercaya",
        en: "Becoming a Trusted Technology Partner",
      },
      desc: {
        id: "AGTA percaya pada hubungan jangka panjang dengan klien. Kami bekerja sebagai mitra strategis yang mendukung perjalanan digitalisasi dan pertumbuhan bisnis Anda dengan solusi yang dapat diandalkan.",
        en: "At AGTA, we value long-term relationships with our clients. We work as a strategic partner to support your journey of digital transformation and business growth with reliable solutions.",
      },
    },
  ]);

  return (
    <div className='w-full p-5 flex flex-col'>
      <DivContent>
        <div className='flex justify-between items-center mb-10'>
          <p className='font-extrabold text-neutral-300 text-[3vh]'>About Text</p>
          <div className='bg-white rounded-lg'>
            <SelectContent
              valueList={languangeList}
              valueSelected={codeLanguage}
              setValueSelected={setCodeLanguage}
            />
          </div>
        </div>
        <div>
          <InputContent
            id='topText'
            value={aboutText.topText[codeLanguage]}
            setValue={value => setAboutText({ ...aboutText, topText: { ...aboutText.topText, [codeLanguage]: value } })}
            classNameInput='text-justify indent-5 text-[2.5vh] p-4 border-none'
            rows={3}
          />

          {commitmentList.map((commitment, index) => (
            <div key={index} className='pl-4'>
              <div className='flex items-center w-full'>
                <div className='w-[2%]'>
                  <p className="text-[2.5vh] font-bold mb-5">{index + 1}.</p>
                </div>
                <div className='w-[98%]'>
                  <InputContent
                    id={`title-${index}`}
                    value={commitment.title[codeLanguage]}
                    setValue={value => {
                      const newCommitmentList = [...commitmentList];
                      newCommitmentList[index].title = { ...commitment.title, [codeLanguage]: value };
                      setCommitmentList(newCommitmentList);
                    }}
                    classNameInput='text-justify text-[2.5vh] border-none'
                  />
                </div>
              </div>
              <InputContent
                id={`desc-${index}`}
                value={commitment.desc[codeLanguage]}
                setValue={value => {
                  const newCommitmentList = [...commitmentList];
                  newCommitmentList[index].desc = { ...commitment.desc, [codeLanguage]: value };
                  setCommitmentList(newCommitmentList);
                }}
                classNameInput='text-justify text-[2.5vh] border-none -mt-5 ml-5'
                rows={3}
              />
            </div>
          ))}
          <InputContent
            id='bottomText'
            value={aboutText.bottomText[codeLanguage]}
            setValue={value => setAboutText({ ...aboutText, bottomText: { ...aboutText.bottomText, [codeLanguage]: value } })}
            classNameInput='text-justify indent-5 text-[2.5vh] border-none'
            rows={3}
          />
        </div>
      </DivContent>
      <button
        type="submit"
        className="my-10 text-[2vh] w-full font-extrabold p-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white rounded-md hover:bg-gradient-to-r hover:from-purple-600 hover:via-pink-700 hover:to-red-700"
      >
        Save Changes
      </button>
    </div>
  );
};

export default About;