import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import DivContent from '../components/DivContent';
import SelectContent from '../components/SelectContent';
import InputContent from '../components/InputContent';
import DefaultImage from '../../icons/defaultImage.svg';
import { delImageData, getServices, updateServices, uploadImage } from '@/app/api/admin';
import LoadingPage from '@/app/components/LoadingPage';
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

const Service: React.FC<SloganProps> = ({ setConfirmDialogData, openConfirmDialog, disableConfirmDialog }) => {
  const dispatch = useDispatch();
  const isLoadingSubmit = useSelector((state: { admin: { isLoadingSubmit: boolean } }) => state.admin.isLoadingSubmit);
  const codeLanguageHeader = useSelector(
    (state: { header: { codeLanguage: "id" | "en" } }) => state.header.codeLanguage
  );
  const isMounted = useRef(true);
  const [isLoading, setIsLoading] = useState(false);
  const [codeLanguage, setCodeLanguage] = useState("id");
  const [listDeleteImage, setListDeleteImage] = useState<string[]>([]);
  const languangeList = [{ id: "id", name: "Indonesia" }, { id: "en", name: "English" }];
  
  const [descriptionText, setDescriptionText] = useState<{ [key: string]: string }>({
    id: "",
    en: ""
  });
  const [lisTechnologies, setLisTechnologies] = useState([
    {
      idActive: "id",
      icont: DefaultImage,
      title: "",
      link: "",
      descriptionText: { id: "", en: "" },
    },
  ]);

  useEffect(() => {
    setCodeLanguage(codeLanguageHeader);
    setLisTechnologies(prevTehnologiesList => 
      prevTehnologiesList.map(commitment => ({
        ...commitment,
        idActive: codeLanguageHeader
      }))
    );
  }, [codeLanguageHeader]);

  const handleAddTechnologies = () => {
    setLisTechnologies([
      ...lisTechnologies,
      {
        idActive: "id",
        icont: "",
        title: "",
        link: "",
        descriptionText: { id: "", en: "" },
      },
    ]);
  };

  const confirmDelete = (index: number) => {
    openConfirmDialog();
    setConfirmDialogData({
      ConfirmDialogMessage: { id: 'Apakah anda yakin menghapus data ini?', en: 'Are you sure you want to delete this data??' },
      ConfirmDialogHeader: { id: 'Konfirmasi Hapus', en: 'Confirmation Delete' },
      ConfirmDialogWarning: { id: 'Data yang dihapus tidak dapat dikembalikan, apakah anda yakin menghapus data ini ?', en: 'Deleted data cannot be recovered, are you sure you want to deleting this data?' },
      handleConfirm: () => handleDeleteTechnologies(index),
      TextConfirm: { id: 'Ya, Hapus', en: 'Yes, Delete' },
      TextCancel: { id: 'Batal Hapus', en: 'Cancel Delete' }
    });
  }

  const handleDeleteTechnologies = (index: number) => {
    disableConfirmDialog();
    const technologyToDelete = lisTechnologies[index];
    if (typeof technologyToDelete.icont === 'string' && technologyToDelete.icont.includes('agtaimage')) {
      setListDeleteImage([...listDeleteImage, technologyToDelete.icont]);
    }
    setLisTechnologies(lisTechnologies.filter((_, i) => i !== index));
  };

  const getServiceData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getServices();
      setDescriptionText({ ...res.data.data.description });
      setLisTechnologies(res.data.data.technologyLists.map((tech: object) => ({ ...tech, idActive: "id" })));
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
      handleConfirm: handleUpdateService,
      TextConfirm: { id: 'Ya, Simpan', en: 'Yes, Update' },
      TextCancel: { id: 'Batal Simpan', en: 'Cancel Update' }
    });
  }

  const handleUpdateService = async () => {
    disableConfirmDialog();
    dispatch(showLoadingSubmit());
  
    try {
      if (listDeleteImage.length > 0) {
        await Promise.all(
          listDeleteImage.map(async (filename) => {
            try {
              await delImageData({ filename });
            } catch (error) {
              console.error(`Failed to delete image ${filename}:`, error); // eslint-disable-line
            }
          })
        );
      }

      const updatedTechnologies = await Promise.all(
        lisTechnologies.map(async (tech) => {
          if (tech.icont && tech.icont !== "" && tech.icont instanceof File) {
            const response = await uploadImage(tech.icont);
            return { ...tech, icont: response };
          }
          return tech;
        })
      );
  
      await updateServices({
        description: descriptionText,
        technologiesList: updatedTechnologies.map(tech => ({
          icont: tech.icont,
          title: tech.title,
          link: tech.link,
          description: {
            id: tech.descriptionText?.id || '-',
            en: tech.descriptionText?.en || '-'
          }
        }))
      });

      setTimeout(() => {
        dispatch(showNotification({ message: { id: 'Selamat, Service berhasil diperbarui', en: 'Congratulations, Service data successfully updated' }, type: 'success' }));
        dispatch(hideLoadingSubmit());
      }, 1000);
    } catch (error) {
      console.error("Update service error:", error); // eslint-disable-line
      dispatch(showNotification({ message: { id: "Maaf, Service data gagal diperbarui", en: "Sorry, Service data failed to update" }, type: "failed" }));
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
            <DivContent className='mb-10'>
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
                disabled={isLoadingSubmit}
              />
            </DivContent>
            <DivContent>
              <p className='font-extrabold text-neutral-300 text-[3vh] mb-10'>List of Technologies Used</p>
              {lisTechnologies.map((item, index) => (
                <div key={index} className='w-full border-b rounded-xl p-4 mb-10'>
                  <div className='w-full flex items-center'>
                    <InputContent
                      id={`file-${index}`}
                      type='fileImage'
                      value={typeof item.icont === 'string' && item.icont.includes('agtaimage') ? `${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}${item.icont}` : (item.icont && item.icont !== "" ? item.icont : DefaultImage)}
                      accept="image/*"
                      widthImage={70}
                      heightImage={70}
                      setValue={value => setLisTechnologies(lisTechnologies.map((tech, i) => i === index ? { ...tech, icont: value } : tech))}
                      disabled={isLoadingSubmit}
                    />
                    <div className="w-full ml-8">
                      <div className="flex items-center justify-between mb-2">
                        <InputContent
                          id={`title-${index}`}
                          value={item.title}
                          placeholder='Type title here...'
                          setValue={value => setLisTechnologies(lisTechnologies.map((tech, i) => i === index ? { ...tech, title: value } : tech))}
                          classNameInput='text-purple-500 text-[2.5vh] border-none p-0 mb-0'
                          disabled={isLoadingSubmit}
                        />
                        <div className="flex items-center space-x-2">
                          <a href={item.link} target="_blank" rel="noreferrer" className='bg-clip-border bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 font-bold text-white p-3 rounded-lg hover:bg-gradient-to-r hover:from-purple-600 hover:via-pink-700 hover:to-red-700'>
                            Check Link
                          </a>
                          <div className='bg-white rounded-lg'>
                            <SelectContent
                              valueList={languangeList}
                              valueSelected={item.idActive}
                              setValueSelected={value => setLisTechnologies(lisTechnologies.map((tech, i) => i === index ? { ...tech, idActive: value } : tech))}
                            />
                          </div>
                        </div>
                      </div>
                      <InputContent
                        id={`link-${index}`}
                        value={item.link}
                        placeholder='Type link here...'
                        setValue={value => setLisTechnologies(lisTechnologies.map((tech, i) => i === index ? { ...tech, link: value } : tech))}
                        classNameInput='text-pink-500 text-[2.5vh] border-none p-0'
                        disabled={isLoadingSubmit}
                      />
                      <InputContent
                        id={`idText-${index}`}
                        placeholder={`Type description ${item.idActive === "id" ? "Indonesia" : "English"} here...`}
                        value={item.idActive === "id" ? item.descriptionText?.id || "" : item.descriptionText?.en || ""}
                        setValue={value => setLisTechnologies(lisTechnologies.map((tech, i) => i === index ? { ...tech, descriptionText: { ...tech.descriptionText, [item.idActive]: value } } : tech))}
                        classNameInput='text-[2.5vh] text-white border-none p-0 mb-0'
                        rows={2}
                        disabled={isLoadingSubmit}
                      />
                    </div>
                  </div>
                  {index !== 0 &&
                    <div className='flex items-center justify-end'>
                      <button
                        type="submit"
                        className='text-[2vh] font-extrabold py-2 px-8 bg-redCustom-700 rounded-md m-3 mt-4'
                        onClick={() => confirmDelete(index)}
                        disabled={isLoadingSubmit}
                      >
                        Delete
                      </button>
                    </div>
                  }
                </div>
              ))}
              <button
                onClick={handleAddTechnologies}
                className='text-[2vh] w-full font-bold p-2 bg-white text-black rounded-md hover:bg-gray-200'
                disabled={isLoadingSubmit}
              >
                Add Technologies
              </button>
            </DivContent>
            <button
              type="submit"
              className="my-10 text-[2vh] w-full font-extrabold p-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white rounded-md hover:bg-gradient-to-r hover:from-purple-600 hover:via-pink-700 hover:to-red-700"
              disabled={isLoadingSubmit}
              onClick={confirm}
            >
              Save Changes
            </button>
          </div>
      }
    </div>
  );
};

export default Service;