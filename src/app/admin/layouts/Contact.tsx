import React, { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import DivContent from '../components/DivContent';
import Email from '../../icons/email.svg';
import Instagram from '../../icons/instagram.svg';
import Linkedin from '../../icons/linkedin.svg';
import Maps from '../../icons/maps.svg';
import Telephone from '../../icons/telephone.svg';
import InputContent from '../components/InputContent';
import LoadingPage from '@/app/components/LoadingPage';
import { getContact, updateContact } from '@/app/api/admin';
import { hideLoadingSubmit, showLoadingSubmit } from '@/app/redux/admin';
import { showNotification } from '@/app/redux/components';

interface SloganProps {
  setConfirmDialogData: React.Dispatch<React.SetStateAction<{
    handleConfirm: () => void;
    ConfirmDialogHeader: { id: string; en: string };
    ConfirmDialogMessage: { id: string; en: string };
    ConfirmDialogWarning: { id: string; en: string };
    TextCancel: { id: string; en: string };
    TextConfirm: { id: string; en: string };
  }>>,
  openConfirmDialog: () => void,
  disableConfirmDialog: () => void,
}

const Contact: React.FC<SloganProps> = ({ setConfirmDialogData, openConfirmDialog, disableConfirmDialog }) => {
  const dispatch = useDispatch();
  const isLoadingSubmit = useSelector((state: { admin: { isLoadingSubmit: boolean } }) => state.admin.isLoadingSubmit);
  const isMounted = useRef(true);
  const [isLoading, setIsLoading] = useState(false);

  const [contactData, setContactData] = useState({
    email: '',
    address: '',
    addressLink: '',
    instagram: '',
    linkedinLink: '',
    phone: '',
  });

  const getServiceData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getContact();
      setContactData({...res.data.data});
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.log('cek error', error); // eslint-disable-line
      setIsLoading(false);
    }
  }, [setIsLoading]);

  useEffect(() => {
    if (isMounted.current) {
      getServiceData();
    }
    return () => {
      isMounted.current = false
    }
  }, [getServiceData]);

  const confirm = () => {
    openConfirmDialog();
    setConfirmDialogData({
      ConfirmDialogMessage: { id: 'Apakah anda ingin merubah data ini?', en: 'Do you want to change this data?' },
      ConfirmDialogHeader: { id: 'Konfirmasi Perubahan', en: 'Confirmation Updated' },
      ConfirmDialogWarning: { id: 'Data yang diubah tidak dapat dikembalikan, apakah anda yakin mengupdate data ini ?', en: 'Changed data cannot be restored, are you sure you want to update this data?' },
      handleConfirm: handleUpdateContact,
      TextConfirm: { id: 'Ya, Simpan', en: 'Yes, Update' },
      TextCancel: { id: 'Batal Simpan', en: 'Cancel Update' }
    });
  }

  const handleUpdateContact = async () => {
    disableConfirmDialog();
    dispatch(showLoadingSubmit());
    try {
      await updateContact(contactData);
      setTimeout(() => {
        dispatch(showNotification({ message: { id: 'Selamat, Contact berhasil diperbarui', en: 'Congratulations, Contact successfully updated' }, type: 'success' }));
        dispatch(hideLoadingSubmit());
      }, 1000);
    } catch (error) {
      console.log('cek error', error); // eslint-disable-line
      dispatch(showNotification({ message: { id: 'Maaf, Contact gagal diperbarui', en: 'Sorry, Contact failed to update' }, type: 'failed' }));
      dispatch(hideLoadingSubmit());
    }
  };

  return (
    <div>
      {isLoading
        ?
          <div className='flex w-full h-[90vh] justify-center items-center'>
            <LoadingPage color='#fff' size={70} isLoading={isLoading} />
          </div>
        :
        <div className='w-full p-5 flex flex-col'>
          <DivContent>
            <p className='font-extrabold text-neutral-300 text-[2.5vh] sm:text-[3vh] mb-10'>Contacts</p>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>

              <div className='flex items-center'>
                <div className='w-[10%]'>
                  <Image src={Email} alt="Logo" className="w-[5vh] h-auto" />
                </div>
                <div className="ml-4 w-[90%]">
                  <p className="text-purple-400 text-[2vh] sm:text-[2.5vh] mb-2">Email</p>
                  <InputContent
                    disabled={isLoadingSubmit}
                    id='contact-email'
                    type='text'
                    placeholder='Type email here...'
                    value={contactData.email}
                    setValue={value => setContactData({ ...contactData, email: value })}
                    classNameInput='text-[2vh] sm:text-[2.5vh] text-white border-none mb-0 w-full p-0'
                  />
                </div>
              </div>
              
              <div className='flex items-center'>
                <div className='w-[10%]'>
                  <Image src={Instagram} alt="Logo" className="w-[5vh] h-auto" />
                </div>
                <div className="ml-4 w-[90%]">
                  <p className="text-purple-400 text-[2vh] sm:text-[2.5vh] mb-2">Instagram</p>
                  <InputContent
                    disabled={isLoadingSubmit}
                    id='contact-instagram'
                    type='text'
                    placeholder='Type instagram here...'
                    value={contactData.instagram}
                    setValue={value => setContactData({ ...contactData, instagram: value })}
                    classNameInput='text-[2vh] sm:text-[2.5vh] text-white border-none mb-0 w-full p-0'
                  />
                </div>
              </div>

              <div className='flex items-center'>
                <div className='w-[10%]'>
                  <Image src={Linkedin} alt="Logo" className="w-[5vh] h-auto" />
                </div>
                <div className="ml-4 w-[90%]">
                  <p className="text-purple-400 text-[2vh] sm:text-[2.5vh] mb-2">Linkedin Link</p>
                  <InputContent
                    disabled={isLoadingSubmit}
                    id='contact-Linkedin'
                    type='text'
                    placeholder='Type linkedin link here...'
                    value={contactData.linkedinLink}
                    setValue={value => setContactData({ ...contactData, linkedinLink: value })}
                    classNameInput='text-[2vh] sm:text-[2.5vh] text-white border-none mb-0 w-full p-0'
                  />
                </div>
              </div>
              
              <div className='flex items-center'>
                <div className='w-[10%]'>
                  <Image src={Maps} alt="Logo" className="w-[5vh] h-auto" />
                </div>
                <div className="ml-4 w-[90%]">
                  <p className="text-purple-400 text-[2vh] sm:text-[2.5vh] mb-2">Address</p>
                  <InputContent
                    disabled={isLoadingSubmit}
                    id='contact-address'
                    type='text'
                    placeholder='Type address here...'
                    value={contactData.address}
                    setValue={value => setContactData({ ...contactData, address: value })}
                    classNameInput='text-[2vh] sm:text-[2.5vh] text-white border-none mb-0 w-full p-0'
                  />
                </div>
              </div>
              
              <div className='flex items-center'>
                <div className='w-[10%]'>
                  <Image src={Maps} alt="Logo" className="w-[5vh] h-auto" />
                </div>
                <div className="ml-4 w-[90%]">
                  <p className="text-purple-400 text-[2vh] sm:text-[2.5vh] mb-2">Address Link</p>
                  <InputContent
                    disabled={isLoadingSubmit}
                    id='contact-addressLink'
                    type='text'
                    placeholder='Type address link here...'
                    value={contactData.addressLink}
                    setValue={value => setContactData({ ...contactData, addressLink: value })}
                    classNameInput='text-[2vh] sm:text-[2.5vh] text-white border-none mb-0 w-full p-0'
                  />
                </div>
              </div>
              
              <div className='flex items-center'>
                <div className='w-[10%]'>
                  <Image src={Telephone} alt="Logo" className="w-[5vh] h-auto" />
                </div>
                <div className="ml-4 w-[90%]">
                  <p className="text-purple-400 text-[2vh] sm:text-[2.5vh] mb-2">Telephone</p>
                  <InputContent
                    disabled={isLoadingSubmit}
                    id='contact-phone'
                    type='text'
                    placeholder='Type telephone here...'
                    value={contactData.phone}
                    setValue={value => setContactData({ ...contactData, phone: value })}
                    classNameInput='text-[2vh] sm:text-[2.5vh] text-white border-none mb-0 w-full p-0'
                  />
                </div>
              </div>

            </div>
          </DivContent>
          <button
            type="submit"
            className="my-10 text-[2vh] w-full font-extrabold p-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white rounded-md hover:bg-gradient-to-r hover:from-purple-600 hover:via-pink-700 hover:to-red-700"
            onClick={confirm}
          >
            Save Changes
          </button>
        </div>
      }
    </div>
  );
};

export default Contact;