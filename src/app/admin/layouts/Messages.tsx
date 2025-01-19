import React, { useCallback, useEffect, useRef, useState } from 'react';
import DivContent from '../components/DivContent';
import { useDispatch } from 'react-redux';
import { deleteMessage, getMessages } from '@/app/api/admin';
import LoadingPage from '@/app/components/LoadingPage';
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

const Messages: React.FC<SloganProps> = ({ setConfirmDialogData, openConfirmDialog, disableConfirmDialog }) => {
  const dispatch = useDispatch();
  const isMounted = useRef(true);
  const [isLoading, setIsLoading] = useState(false);
  interface Message {
    ID: string;
    name: string;
    email: string;
    content: string;
    CreatedAt: string;
  }

  const [messageList, setMessageList] = useState<Message[]>([]);

  const getMessagesData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getMessages();
      setMessageList(res.data.data);
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
      getMessagesData();
    }
    return () => {
      isMounted.current = false
    }
  }, [getMessagesData]);

  const calculateTimeDifference = (createdAt: string) => {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate.getTime() - createdDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 1) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      return `${diffHours} hours ago`;
    }
    return `${diffDays} days ago`;
  };

  const confirmDelete = (id: string) => {
    openConfirmDialog();
    setConfirmDialogData({
      ConfirmDialogMessage: { id: 'Apakah anda yakin menghapus data ini?', en: 'Are you sure you want to delete this data??' },
      ConfirmDialogHeader: { id: 'Konfirmasi Hapus', en: 'Confirmation Delete' },
      ConfirmDialogWarning: { id: 'Data yang dihapus tidak dapat dikembalikan, apakah anda yakin menghapus data ini ?', en: 'Deleted data cannot be recovered, are you sure you want to deleting this data?' },
      handleConfirm: () => handleDelete(id),
      TextConfirm: { id: 'Ya, Hapus', en: 'Yes, Delete' },
      TextCancel: { id: 'Batal Hapus', en: 'Cancel Delete' }
    });
  }

  const handleDelete = async (idMessage: string) => {
    disableConfirmDialog();
    dispatch(showLoadingSubmit());
    try {
      await deleteMessage(idMessage);
      setTimeout(() => {
        dispatch(showNotification({ message: { id: 'Selamat, Pesan berhasil dihapus', en: 'Congratulations, Message successfully deleted' }, type: 'success' }));
        getMessagesData();
        dispatch(hideLoadingSubmit());
      }, 1000);
    } catch (error) {
      console.log('cek error', error); // eslint-disable-line
      dispatch(showNotification({ message: { id: 'Maaf, Pesan gagal dihapus', en: 'Sorry, Message failed to deleted' }, type: 'failed' }));
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
          <div className="grid grid-cols-2 gap-6">
            {messageList.length > 0 && messageList.map((message, index) => (
              <DivContent key={index}>
                <div className='flex item-center mb-2 w-full'>
                  <div className='w-[70%]'>
                    <p className='font-bold text-neutral-300 text-[2vh]'>{message.name}</p>
                  </div>
                  <div className='w-[30%]'>
                    <p className='font-bold text-neutral-300 text-[2vh] text-right'>
                      {calculateTimeDifference(message.CreatedAt)}
                    </p>
                  </div>
                </div>
                <p className='text-pink-500 text-[1.8vh] mb-5'>{message.email}</p>
                <div className='text-neutral-300 text-[1.8vh] mb-5 text-justify h-[100px] overflow-y-auto'>
                  {message.content}
                </div>
                <div className='flex items-center justify-end'>
                  <button
                    type="submit"
                    className='text-[2vh] font-extrabold p-2 bg-redCustom-700 rounded-md mr-5'
                    onClick={() => confirmDelete(message.ID)}
                  >
                    Delete
                  </button>
                  <a
                    href={`mailto:${message.email}`}
                    className='text-[2vh] font-extrabold p-2 bg-blueCustom-700 rounded-md'
                  >
                    Reply
                  </a>
                </div>
              </DivContent>
            ))}
          </div>
        </div>
      }
    </div>
  );
};

export default Messages;