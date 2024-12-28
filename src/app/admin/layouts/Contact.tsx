import React from 'react'
import DivContent from '../components/DivContent';
import Image from 'next/image';
import Email from '../../icons/email.svg';
import Instagram from '../../icons/instagram.svg';
import Linkedin from '../../icons/linkedin.svg';
import Pinlocation from '../../icons/pinLocation.svg';

const Contact = () => {
  return (
    <div className='w-full p-5 flex flex-col'>
      <DivContent>
        <p className='font-extrabold text-neutral-300 text-[3vh] mb-10'>Contacts</p>
        <div className='grid grid-cols-2 gap-5'>
          <div className='flex items-center'>
            <Image src={Email} alt="Logo" className="w-[2vh] md:w-[3vh] lg:w-[4vh] h-auto" />
            <div className="ml-4">
              <p className="text-purple-400 text-[2.5vh] mb-2">Email</p>
              <p className="text-[2.5vh] text-white">
                sholihhudinagung@gmail.com
              </p>
            </div>
          </div>
          <div className='flex items-center'>
            <Image src={Instagram} alt="Logo" className="w-[2vh] md:w-[3vh] lg:w-[4vh] h-auto" />
            <div className="ml-4">
              <p className="text-purple-400 text-[2.5vh] mb-2">Instagram</p>
              <p className="text-[2.5vh] text-white">
                sholihhudinagung
              </p>
            </div>
          </div>
          <div className='flex items-center'>
            <Image src={Linkedin} alt="Logo" className="w-[2vh] md:w-[3vh] lg:w-[4vh] h-auto" />
            <div className="ml-4">
              <p className="text-purple-400 text-[2.5vh] mb-2">Linkedin</p>
              <p className="text-[2.5vh] text-white">
                muhammad agung sholihhudin
              </p>
            </div>
          </div>
          <div className='flex items-center'>
            <Image src={Pinlocation} alt="Logo" className="w-[2vh] md:w-[3vh] lg:w-[4vh] h-auto" />
            <div className="ml-4">
              <p className="text-purple-400 text-[2.5vh] mb-2">Address</p>
              <p className="text-[2.5vh] text-white">
                Jl. Daru - Daru VII, Pekanbaru, Riau, Indonesia
              </p>
            </div>
          </div>
        </div>
        <div className='mt-10'>
          <div>
            <p className="text-purple-400 text-[2.5vh] mb-2">Link Google Maps</p>
            <p className="text-[2.5vh] text-white break-words">
              https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.6816889525358!2d101.4941733!3d0.47417380000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d5afb14e200015%3A0x32f1a877bc30b00c!2sJl.%20Daru-Daru%20VII%2C%20Tengkerang%20Tim.%2C%20Kec.%20Tenayan%20Raya%2C%20Kota%20Pekanbaru%2C%20Riau%2028289!5e0!3m2!1sid!2sid!4v1734322498967!5m2!1sid!2sid
            </p>
          </div>
          <div className="order-1 sm:order-2">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.6816889525358!2d101.4941733!3d0.47417380000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d5afb14e200015%3A0x32f1a877bc30b00c!2sJl.%20Daru-Daru%20VII%2C%20Tengkerang%20Tim.%2C%20Kec.%20Tenayan%20Raya%2C%20Kota%20Pekanbaru%2C%20Riau%2028289!5e0!3m2!1sid!2sid!4v1734322498967!5m2!1sid!2sid" width="100%" height="400" loading="lazy" referrerPolicy="no-referrer-when-downgrade" style={{ backgroundColor: "#2c2c2c" }}/>
          </div>
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

export default Contact;