import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import DivContent from '../components/DivContent';
import Email from '../../icons/email.svg';
import ProfileCircle from '../../icons/profileCircle.svg';
import Password from '../../icons/password.svg';
import InputContent from '../components/InputContent';
import LoadingPage from '@/app/components/LoadingPage';
import { updateProfile } from '@/app/api/admin';
import { hideLoadingSubmit, showLoadingSubmit } from '@/app/redux/admin';
import { showNotification } from '@/app/redux/components';

interface ProfileProps {
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

const Profile: React.FC<ProfileProps> = ({ setConfirmDialogData, openConfirmDialog, disableConfirmDialog }) => {
  const dispatch = useDispatch();
  const isLoadingSubmit = useSelector((state: { admin: { isLoadingSubmit: boolean } }) => state.admin.isLoadingSubmit);
  const [isLoading, setIsLoading] = useState(true);
  const [codeLanguage, setCodeLanguage] = useState("id");

  const codeLanguageHeader = useSelector(
    (state: { header: { codeLanguage: "id" | "en" } }) => state.header.codeLanguage
  );
  useEffect(() => {
    setCodeLanguage(codeLanguageHeader);
  }, [codeLanguageHeader]);

  const [contactData, setContactData] = useState({
    name: localStorage.getItem('userDataName') || '',
    username: localStorage.getItem('userDataUserName') || '',
    email: localStorage.getItem('userDataEmail') ||'',
    password: '********',
    role: localStorage.getItem('userDataRole') || '',
  });

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const confirm = () => {
    openConfirmDialog();
    setConfirmDialogData({
      ConfirmDialogMessage: { id: 'Apakah anda ingin merubah data ini?', en: 'Do you want to change this data?' },
      ConfirmDialogHeader: { id: 'Konfirmasi Perubahan', en: 'Confirmation Updated' },
      ConfirmDialogWarning: { id: 'Data yang diubah tidak dapat dikembalikan, apakah anda yakin mengupdate data ini ?', en: 'Changed data cannot be restored, are you sure you want to update this data?' },
      handleConfirm: handleUpdateProfile,
      TextConfirm: { id: 'Ya, Simpan', en: 'Yes, Update' },
      TextCancel: { id: 'Batal Simpan', en: 'Cancel Update' }
    });
  }

  const handleUpdateProfile = async () => {
    disableConfirmDialog();
    dispatch(showLoadingSubmit());
    try {
      const res = await updateProfile(contactData.email, {...contactData, password: contactData.password !== '********' ? contactData.password : ''});
      localStorage.setItem('userDataName', res.data.userData.name);
      localStorage.setItem('userDataUserName', res.data.userData.username);
      localStorage.setItem('userDataEmail', res.data.userData.email);
      localStorage.setItem('userDataRole', res.data.userData?.role);
      setTimeout(() => {
        dispatch(showNotification({ message: { id: 'Selamat, Profile berhasil diperbarui', en: 'Congratulations, Profile successfully updated' }, type: 'success' }));
        dispatch(hideLoadingSubmit());
      }, 1000);
    } catch (error) {
      console.log('cek error', error); // eslint-disable-line
      dispatch(showNotification({ message: { id: 'Maaf, Profile gagal diperbarui', en: 'Sorry, Profile failed to update' }, type: 'failed' }));
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
            <p className='font-extrabold text-neutral-300 text-[3vh] mb-10'>Profile Settings</p>
            <div className='grid grid-cols-2 gap-5'>

              <div className='flex items-center'>
                <div className='w-[10%]'>
                  <Image src={ProfileCircle} alt="Logo" className="w-[5vh] h-auto" />
                </div>
                <div className="ml-4 w-[90%]">
                  <p className="text-purple-400 text-[2.5vh] mb-2">Name</p>
                  <InputContent
                    disabled={isLoadingSubmit}
                    id='contact-name'
                    type='text'
                    placeholder='Type name here...'
                    value={contactData.name}
                    setValue={value => setContactData({ ...contactData, name: value })}
                    classNameInput='text-[2.5vh] text-white border-none mb-0 w-full p-0'
                  />
                </div>
              </div>

              <div className='flex items-center'>
                <div className='w-[10%]'>
                  <Image src={ProfileCircle} alt="Logo" className="w-[5vh] h-auto" />
                </div>
                <div className="ml-4 w-[90%]">
                  <p className="text-purple-400 text-[2.5vh] mb-2">Username</p>
                  <InputContent
                    disabled={isLoadingSubmit}
                    id='contact-username'
                    type='text'
                    placeholder='Type username here...'
                    value={contactData.username}
                    setValue={value => setContactData({ ...contactData, username: value })}
                    classNameInput='text-[2.5vh] text-white border-none mb-0 w-full p-0'
                  />
                </div>
              </div>

              <div className='flex items-center'>
                <div className='w-[10%]'>
                  <Image src={Email} alt="Logo" className="w-[5vh] h-auto" />
                </div>
                <div className="ml-4 w-[90%]">
                  <p className="text-purple-400 text-[2.5vh] mb-2">Email</p>
                  <InputContent
                    disabled
                    id='contact-email'
                    type='text'
                    placeholder='Type email here...'
                    value={contactData.email}
                    setValue={value => setContactData({ ...contactData, email: value })}
                    classNameInput='text-[2.5vh] text-neutral-500 border-none mb-0 w-full p-0'
                  />
                  <p className="text-redCustom-300 text-[1.5vh] text-left -mt-5 ml-2">
                    {codeLanguage === 'id' ? 'Email tidak dapat diubah' : 'Email cannot be changed'}
                  </p>
                </div>
              </div>

              <div className='flex items-center'>
                <div className='w-[10%]'>
                  <Image src={Password} alt="Logo" className="w-[5vh] h-auto" />
                </div>
                <div className="ml-4 w-[90%]">
                  <p className="text-purple-400 text-[2.5vh] mb-2">Password</p>
                  <InputContent
                    disabled={isLoadingSubmit}
                    id='contact-password'
                    type='password'
                    placeholder='Type password here...'
                    value={contactData.password}
                    setValue={value => setContactData({ ...contactData, password: value })}
                    classNameInput='text-[2.5vh] text-white border-none mb-0 w-full p-0'
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

export default Profile;