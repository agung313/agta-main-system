import React, { useState } from 'react'
import DivContent from '../components/DivContent';
import Image from 'next/image';
import Email from '../../icons/email.svg';
import Instagram from '../../icons/instagram.svg';
import Linkedin from '../../icons/linkedin.svg';
import Pinlocation from '../../icons/pinLocation.svg';
import InputContent from '../components/InputContent';

const Contact = () => {
  const [contactData, setContactData] = useState([
    {
      img: Email,
      title: 'Email',
      text: 'sholihhudinagung@gmail.com',
    },
    {
      img: Instagram,
      title: 'Instagram',
      text: 'sholihhudinagung',
    },
    {
      img: Linkedin,
      title: 'Linkedin',
      text: 'muhammad agung sholihhudin',
    },
    {
      img: Pinlocation,
      title: 'Address',
      text: 'Jl. Daru - Daru VII, Pekanbaru, Riau, Indonesia',
    },
  ]);
  const [googleMapsLink, setGoogleMapsLink] = useState('https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.6816889525358!2d101.4941733!3d0.47417380000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d5afb14e200015%3A0x32f1a877bc30b00c!2sJl.%20Daru-Daru%20VII%2C%20Tengkerang%20Tim.%2C%20Kec.%20Tenayan%20Raya%2C%20Kota%20Pekanbaru%2C%20Riau%2028289!5e0!3m2!1sid!2sid!4v1734322498967!5m2!1sid!2sid');
  const [linkFrame, setLinkFrame] = useState(googleMapsLink);

  return (
    <div className='w-full p-5 flex flex-col'>
      <DivContent>
        <p className='font-extrabold text-neutral-300 text-[3vh] mb-10'>Contacts</p>
        <div className='grid grid-cols-2 gap-5'>
          {contactData.map((contact, index) => (
            <div key={index} className='flex items-center'>
              <div className='w-[10%]'>
                <Image src={contact.img} alt="Logo" className="w-[2vh] md:w-[3vh] lg:w-[4vh] h-auto" />
              </div>
              <div className="ml-4 w-[90%]">
                <p className="text-purple-400 text-[2.5vh] mb-2">{contact.title}</p>
                <InputContent
                  id={`contact-${index}`}
                  type='text'
                  value={contact.text}
                  setValue={value => {
                    const newContactData = [...contactData];
                    newContactData[index].text = value;
                    setContactData(newContactData);
                  }}
                  classNameInput='text-[2.5vh] text-white border-none mb-0 w-full p-0'
                />
              </div>
            </div>
          ))}
        </div>
        <div className='mt-16'>
          <div className='mb-5 flex items-center justify-between'>
            <p className="text-purple-400 text-[2.5vh]">Link Google Maps</p>
            <button onClick={() => setLinkFrame(googleMapsLink)} className='bg-clip-border bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 font-bold text-white px-2 py-1 rounded-md hover:bg-gradient-to-r hover:from-purple-600 hover:via-pink-700 hover:to-red-700'>
              Check Link
            </button>
          </div>
          <InputContent
            id='googleMapsLink'
            type='text'
            value={googleMapsLink}
            setValue={value => setGoogleMapsLink(value)}
            classNameInput='text-[2.5vh] text-white border-none mb-5 w-full p-0'
            rows={6}
          />
          <div className="order-1 sm:order-2">
            <iframe src={linkFrame} width="100%" height="400" loading="lazy" referrerPolicy="no-referrer-when-downgrade" style={{ backgroundColor: "#2c2c2c" }}/>
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