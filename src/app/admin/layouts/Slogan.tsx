import React, { useCallback, useEffect, useRef, useState } from 'react'
import DivContent from '../components/DivContent';
import SelectContent from '../components/SelectContent';
import InputContent from '../components/InputContent';
import { getSlogan, updateSlogan } from '@/app/api/admin';
import LoadingPage from '@/app/components/LoadingPage';
import { useDispatch, useSelector } from 'react-redux';
import { showNotification } from '@/app/redux/components';
import { hideLoadingSubmit, showLoadingSubmit } from '@/app/redux/admin';

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

const Slogan: React.FC<SloganProps> = ({ setConfirmDialogData, openConfirmDialog, disableConfirmDialog }) => {
  const dispatch = useDispatch();
  const isLoadingSubmit = useSelector((state: { admin: { isLoadingSubmit: boolean } }) => state.admin.isLoadingSubmit);
  const isAdmin = useSelector((state: { admin: { isAdmin: boolean } }) => state.admin.isAdmin);
  const isMounted = useRef(true);
  const [isLoading, setIsLoading] = useState(false);
  const [codeLanguage, setCodeLanguage] = useState("id");
  const languangeList = [{ id: "id", name: "Indonesia" }, { id: "en", name: "English" }];

  const codeLanguageHeader = useSelector(
    (state: { header: { codeLanguage: "id" | "en" } }) => state.header.codeLanguage
  );
  useEffect(() => {
    setCodeLanguage(codeLanguageHeader);
  }, [codeLanguageHeader]);
  
  const [sloganData, setSloganData] = useState<{
    firstText: string;
    secondText: string;
    thirdText: string;
    description: { id: string; en: string };
  }>({
    firstText: "",
    secondText: "",
    thirdText: "",
    description: { id: "", en: "" }
  });

  const getSloganData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getSlogan();
      setSloganData({...res.data.data});
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
      getSloganData();
    }
    return () => {
      isMounted.current = false
    }
  }, [getSloganData]);

  const confirm = async () => {
    openConfirmDialog();
    setConfirmDialogData({
      ConfirmDialogMessage: { id: 'Apakah anda ingin merubah data ini?', en: 'Do you want to change this data?' },
      ConfirmDialogHeader: { id: 'Konfirmasi Perubahan', en: 'Confirmation Updated' },
      ConfirmDialogWarning: { id: 'Data yang diubah tidak dapat dikembalikan, apakah anda yakin mengupdate data ini ?', en: 'Changed data cannot be restored, are you sure you want to update this data?' },
      handleConfirm: handleUpdateSlogan,
      TextConfirm: { id: 'Ya, Simpan', en: 'Yes, Update' },
      TextCancel: { id: 'Batal Simpan', en: 'Cancel Update' }
    });
  }

  const handleUpdateSlogan = async () => {
    disableConfirmDialog();
    dispatch(showLoadingSubmit());
    try {
      await updateSlogan(sloganData);
      setTimeout(() => {
        dispatch(showNotification({ message: { id: 'Selamat, Slogan berhasil diperbarui', en: 'Congratulations, Slogan successfully updated' }, type: 'success' }));
        dispatch(hideLoadingSubmit());
      }, 1000);
    } catch (error) {
      console.log('cek error', error); // eslint-disable-line
      dispatch(showNotification({ message: { id: 'Maaf, Slogan gagal diperbarui', en: 'Sorry, Slogan failed to update' }, type: 'failed' }));
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
              <p className='font-extrabold text-neutral-300 text-[2.5vh] sm:text-[3vh] mb-10'>Slogan</p>
              <div className='block sm:flex items-center mb-10'>
                <div className="hidden sm:flex flex-col justify-center w-[30%]">
                  <InputContent
                    id='firstText'
                    label='First Text'
                    value={sloganData.firstText}
                    setValue={value => setSloganData({ ...sloganData, firstText: value })}
                    classNameInput='w-full border border-white'
                    disabled={isLoadingSubmit || isAdmin === false}
                  />
                  <InputContent
                    id='secondText'
                    label='Second Text'
                    value={sloganData.secondText}
                    setValue={value => setSloganData({ ...sloganData, secondText: value })}
                    classNameInput='w-full border border-white'
                    disabled={isLoadingSubmit || isAdmin === false}
                  />
                  <InputContent
                    id='thirdText'
                    label='Third Text'
                    value={sloganData.thirdText}
                    setValue={value => setSloganData({ ...sloganData, thirdText: value })}
                    classNameInput='w-full border border-white'
                    disabled={isLoadingSubmit || isAdmin === false}
                  />
                </div>
                <div className="flex flex-col justify-center items-center w-[100%] sm:w-[70%]">
                  <p className="text-[3vh] xl:text-[4vh] text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300 -mb-3 xl:-mb-8 neon-glow">
                    {sloganData.firstText}
                  </p>
                  <p className="font-montserrat font-extrabold text-[10vh] xl:text-[13vh] text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-700 to-red-700 -mb-3 xl:-mb-8 neon-glow">
                    {sloganData.secondText}
                  </p>
                  <p className="text-[3vh] xl:text-[4vh] text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300 mb-[5vh] neon-glow">
                    {sloganData.thirdText}
                  </p>
                </div>
                <div className="flex sm:hidden flex-col justify-center w-[100%]">
                  <InputContent
                    id='firstText'
                    label='First Text'
                    value={sloganData.firstText}
                    setValue={value => setSloganData({ ...sloganData, firstText: value })}
                    classNameInput='w-full border border-white'
                    disabled={isLoadingSubmit || isAdmin === false}
                  />
                  <InputContent
                    id='secondText'
                    label='Second Text'
                    value={sloganData.secondText}
                    setValue={value => setSloganData({ ...sloganData, secondText: value })}
                    classNameInput='w-full border border-white'
                    disabled={isLoadingSubmit || isAdmin === false}
                  />
                  <InputContent
                    id='thirdText'
                    label='Third Text'
                    value={sloganData.thirdText}
                    setValue={value => setSloganData({ ...sloganData, thirdText: value })}
                    classNameInput='w-full border border-white'
                    disabled={isLoadingSubmit || isAdmin === false}
                  />
                </div>
              </div>
            </DivContent>
            <DivContent className='my-10'>
              <div className='flex justify-between items-center mb-10'>
                <p className='font-extrabold text-neutral-300 text-[2.5vh] sm:text-[3vh]'>Description</p>
                <div className='hidden sm:block'>
                  <SelectContent
                    valueList={languangeList}
                    valueSelected={codeLanguage}
                    setValueSelected={setCodeLanguage}
                    className='py-2 px-3'
                    color='#fff'
                  />
                </div>
              </div>
              <InputContent
                id='description'
                value={sloganData.description[codeLanguage as keyof typeof sloganData.description]}
                setValue={value => setSloganData({ ...sloganData, description: { ...sloganData.description, [codeLanguage]: value } })}
                classNameInput='text-justify indent-5 text-[2vh] sm:text-[2.5vh] border-none'
                disabled={isLoadingSubmit || isAdmin === false}
                rows={5}
              />
            </DivContent>
            {isAdmin &&
              <button
                type="submit"
                className="text-[2vh] w-full font-extrabold p-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white rounded-md hover:bg-gradient-to-r hover:from-purple-600 hover:via-pink-700 hover:to-red-700"
                onClick={confirm}
              >
                Save Changes
              </button>
            }
          </div>
        }
    </div>
  );
};

export default Slogan;