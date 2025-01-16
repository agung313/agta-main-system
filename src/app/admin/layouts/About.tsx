import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DivContent from '../components/DivContent';
import SelectContent from '../components/SelectContent';
import InputContent from '../components/InputContent';
import { hideLoadingSubmit, showLoadingSubmit } from '@/app/redux/admin';
import { showNotification } from '@/app/redux/components';
import { getAbouts, updateAbouts } from '@/app/api/admin';
import LoadingPage from '@/app/components/LoadingPage';

const About = () => {
  const dispatch = useDispatch();
  const isLoadingSubmit = useSelector((state: { admin: { isLoadingSubmit: boolean } }) => state.admin.isLoadingSubmit);
  const isMounted = useRef(true);
  const [isLoading, setIsLoading] = useState(false);
  const [codeLanguage, setCodeLanguage] = useState({ openingText: "id", closingText: "id" });
  const languangeList = [{ id: "id", name: "Indonesia" }, { id: "en", name: "English" }];

  const [aboutText, setAboutText] = useState<{
    openingText: { [key: string]: string };
    closingText: { [key: string]: string };
  }>({
    openingText: {
      id: "",
      en: "",
    },
    closingText: {
      id: "",
      en: "",
    },
  });

  const [commitmentList, setCommitmentList] = useState<Array<{
    idActive: string;
    titleText: { [key: string]: string };
    descriptionText: { [key: string]: string };
  }>>([
    {
      idActive: "id",
      titleText: {
        id: "",
        en: "",
      },
      descriptionText: {
        id: "",
        en: "",
      },
    },
  ]);

  const getAboutData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getAbouts();
      setAboutText({
        openingText: { ...res.data.data.openingText },
        closingText: { ...res.data.data.closingText },
      });
      setCommitmentList(res.data.data.comitmentLists.map((tech: object) => ({ ...tech, idActive: "id" })));
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
      getAboutData();
    }
    return () => {
      isMounted.current = false
    }
  }, [getAboutData]);

  const handleUpdateAbout = async () => {
    dispatch(showLoadingSubmit());
    try {
      await updateAbouts({ ...aboutText, comitmentLists: commitmentList });
      setTimeout(() => {
        dispatch(showNotification({ message: { id: 'Selamat, About berhasil diperbarui', en: 'Congratulations, About data successfully updated' }, type: 'success' }));
        dispatch(hideLoadingSubmit());
      }, 1000);
    } catch (error) {
      console.log('cek error', error); // eslint-disable-line
      dispatch(showNotification({ message: { id: 'Maaf, About data gagal diperbarui', en: 'Sorry, About data failed to update' }, type: 'failed' }));
      dispatch(hideLoadingSubmit());
    }
  };

  const handleAddCommitment = () => {
    setCommitmentList([
      ...commitmentList,
      {
        idActive: "id",
        titleText: {
          id: "",
          en: "",
        },
        descriptionText: {
          id: "",
          en: "",
        },
      },
    ]);
  };

  const handleDeleteCommitment = (index: number) => {
    const newCommitmentList = [...commitmentList];
    newCommitmentList.splice(index, 1);
    setCommitmentList(newCommitmentList);
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

            <DivContent className='mb-10'>
              <div className='flex justify-between items-center mb-4'>
                <p className='font-extrabold text-neutral-300 text-[3vh]'>Opening Text</p>
                <div className='bg-white rounded-lg'>
                  <SelectContent
                    valueList={languangeList}
                    valueSelected={codeLanguage.openingText}
                    setValueSelected={(value) => setCodeLanguage({ ...codeLanguage, openingText: value })}
                  />
                </div>
              </div>
              <InputContent
                id='openingText'
                value={aboutText.openingText[codeLanguage.openingText]}
                setValue={value => setAboutText({ ...aboutText, openingText: { ...aboutText.openingText, [codeLanguage.openingText]: value } })}
                classNameInput='text-justify indent-5 text-[2.5vh] p-4'
                rows={4}
                disabled={isLoadingSubmit}
              />
            </DivContent>

            <DivContent className='mb-10'>
              <p className='font-extrabold text-neutral-300 text-[2.5vh] mb-4'>Commitment List</p>
              {commitmentList.map((commitment, index) => (
                <div key={index} className='pb-4 border-b rounded-lg mb-10'>
                  <div className='flex items-center w-full'>
                    <div className='w-[2%]'>
                      <p className="text-[2.5vh] font-bold mb-5">{index + 1}.</p>
                    </div>
                    <div className='w-[98%] flex items-center justify-between'>
                      <div className='w-[80%]'>
                        <InputContent
                          id={`titleText-${index}`}
                          placeholder='Title here...'
                          value={commitment.titleText[commitment.idActive]}
                          setValue={value => {
                            const newCommitmentList = [...commitmentList];
                            newCommitmentList[index].titleText = { 
                              ...commitment.titleText, 
                              [commitment.idActive]: value 
                            };
                            setCommitmentList(newCommitmentList);
                          }}
                          classNameInput='text-justify text-[2.5vh]'
                          disabled={isLoadingSubmit}
                        />
                      </div>
                      <div className='bg-white rounded-lg mb-5'>
                        <SelectContent
                          valueList={languangeList}
                          valueSelected={commitment.idActive}
                          setValueSelected={(value) => {
                            const newCommitmentList = [...commitmentList];
                            newCommitmentList[index].idActive = value;
                            setCommitmentList(newCommitmentList);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <InputContent
                    id={`descriptionText-${index}`}
                    placeholder='Description here...'
                    value={commitment.descriptionText[commitment.idActive]}
                    setValue={value => {
                      const newCommitmentList = [...commitmentList];
                      newCommitmentList[index].descriptionText = { ...commitment.descriptionText, [commitment.idActive]: value };
                      setCommitmentList(newCommitmentList);
                    }}
                    classNameInput='text-justify text-[2.5vh] border-none -mt-5 ml-5'
                    rows={index !== 0 ? 3 : 5}
                    disabled={isLoadingSubmit}
                  />
                  {index !== 0 &&
                    <div className='flex items-center justify-end'>
                      <button
                        type="submit"
                        className='text-[2vh] font-extrabold py-2 px-8 bg-redCustom-700 rounded-md m-3'
                        onClick={() => handleDeleteCommitment(index)}
                      >
                        Delete
                      </button>
                    </div>
                  }
                </div>
              ))}
              <button
                onClick={handleAddCommitment}
                className='text-[2vh] w-full font-bold p-2 bg-white text-black rounded-md hover:bg-gray-200'
              >
                Add Commitment
              </button>
            </DivContent>

            <DivContent className='mb-10'>
              <div className='flex justify-between items-center mb-4'>
                <p className='font-extrabold text-neutral-300 text-[3vh]'>Closing Text</p>
                <div className='bg-white rounded-lg'>
                  <SelectContent
                    valueList={languangeList}
                    valueSelected={codeLanguage.closingText}
                    setValueSelected={(value) => setCodeLanguage({ ...codeLanguage, closingText: value })}
                  />
                </div>
              </div>
              <InputContent
                id='closingText'
                value={aboutText.closingText[codeLanguage.closingText]}
                setValue={value => setAboutText({ ...aboutText, closingText: { ...aboutText.closingText, [codeLanguage.closingText]: value } })}
                classNameInput='text-justify indent-5 text-[2.5vh]'
                classNameLabel='mt-8'
                rows={4}
                disabled={isLoadingSubmit}
              />
            </DivContent>
            <button
              type="submit"
              className="my-10 text-[2vh] w-full font-extrabold p-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white rounded-md hover:bg-gradient-to-r hover:from-purple-600 hover:via-pink-700 hover:to-red-700"
              onClick={handleUpdateAbout}
            >
              Save Changes
            </button>
          </div>
      }
    </div>
  );
};

export default About;