import React, { useState } from 'react';
import DivContent from '../components/DivContent';
import SelectContent from '../components/SelectContent';

const About = () => {
  const [codeLanguage, setCodeLanguage] = useState("id");
  const languangeList = [{ id: "id", name: "Indonesia" }, { id: "en", name: "English" }];
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
        <p className="text-[1.5vh] text-justify sm:text-[2vh] xl:text-[2.5vh] text-white mb-[4vh] indent-5 sm:indent-10">
            {codeLanguage === "id"
            ? "AGTA adalah perusahaan yang bergerak di bidang pengembangan perangkat lunak (software developer). Kami memiliki tujuan utama untuk membantu bisnis dan individu menciptakan solusi digital yang inovatif, efektif, dan berdampak. Dengan memanfaatkan teknologi terkini dan tim yang berpengalaman, kami berkomitmen untuk:"
            : "AGTA is a software developer company. Our main goal is to help businesses and individuals create innovative, effective, and impactful digital solutions. By leveraging the latest technology and an experienced team, we are committed to:"
            }
        </p>
        
        <div className="text-white">
            <p className="text-[2vh] sm:text-[2.5vh] font-bold">1. {codeLanguage === "id" ? "Mewujudkan Ide Kreatif" : "Bringing Creative Ideas to Life"}</p>
            <p className="text-[1.5vh] text-justify sm:text-[2vh] xl:text-[2.5vh] text-white mb-[4vh] ml-[2.5vh]">
            {codeLanguage === "id"
                ? "Kami mengubah ide-ide kreatif Anda menjadi aplikasi, website, dan sistem digital yang nyata, memberikan solusi yang sesuai dengan kebutuhan Anda."
                : "We transform your creative ideas into real applications, websites, and digital systems, providing solutions that fit your needs."
            }
            </p>
        </div>
        
        <div className="text-white">
            <p className="text-[2vh] sm:text-[2.5vh] font-bold">2. {codeLanguage === "id" ? "Mendorong Transformasi Digital" : "Driving Digital Transformation"}</p>
            <p className="text-[1.5vh] text-justify sm:text-[2vh] xl:text-[2.5vh] text-white mb-[4vh] ml-[2.5vh]">
            {codeLanguage === "id"
                ? "Membantu bisnis dari berbagai skala beradaptasi dengan era digital melalui layanan teknologi yang inovatif dan relevan, meningkatkan efisiensi dan daya saing di pasar."
                : "Helping businesses of all sizes adapt to the digital era through innovative and relevant technology services, and increasing efficiency and competitiveness in the market."
            }
            </p>
        </div>
        
        <div className="text-white">
            <p className="text-[2vh] sm:text-[2.5vh] font-bold">3. {codeLanguage === "id" ? "Memberikan Dampak Nyata" : "Delivering Real Impact"}</p>
            <p className="text-[1.5vh] text-justify sm:text-[2vh] xl:text-[2.5vh] text-white mb-[4vh] ml-[2.5vh]">
            {codeLanguage === "id"
                ? "Kami berfokus pada pengembangan perangkat lunak yang tidak hanya memenuhi kebutuhan teknis, tetapi juga memberikan dampak positif terhadap pertumbuhan bisnis, pengalaman pengguna, dan keberlanjutan."
                : "We focus on developing software that not only meets technical requirements but also creates a positive impact on business growth, user experience, and sustainability."
            }
            </p>
        </div>
        
        <div className="text-white">
            <p className="text-[2vh] sm:text-[2.5vh] font-bold">4. {codeLanguage === "id" ? "Menjadi Mitra Teknologi Terpercaya" : "Becoming a Trusted Technology Partner"}</p>
            <p className="text-[1.5vh] text-justify sm:text-[2vh] xl:text-[2.5vh] text-white mb-[4vh] ml-[2.5vh]">
            {codeLanguage === "id"
                ? "AGTA percaya pada hubungan jangka panjang dengan klien. Kami bekerja sebagai mitra strategis yang mendukung perjalanan digitalisasi dan pertumbuhan bisnis Anda dengan solusi yang dapat diandalkan."
                : "At AGTA, we value long-term relationships with our clients. We work as a strategic partner to support your journey of digital transformation and business growth with reliable solutions."
            }
            </p>
        </div>

        <p className="text-[1.5vh] text-justify sm:text-[2vh] xl:text-[2.5vh] text-white mb-[4vh] indent-5 sm:indent-10">
            {codeLanguage === "id"
            ? "Dengan visi untuk menjadi pemimpin di industri teknologi, AGTA hadir sebagai solusi lengkap untuk setiap kebutuhan teknologi Anda mulai dari perencanaan, pengembangan, hingga implementasi. Bersama kami, setiap ide akan diwujudkan menjadi kenyataan."
            : "With a vision to become a leader in the technology industry, AGTA offers comprehensive solutions for all your technological needs from planning and development to implementation. Together with us, every idea will turn into reality."
            }
        </p>
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