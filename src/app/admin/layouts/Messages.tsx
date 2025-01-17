import React, { useCallback, useEffect, useRef, useState } from 'react';
import DivContent from '../components/DivContent';
import { useDispatch } from 'react-redux';
import { deleteMessage, getMessages } from '@/app/api/admin';
import LoadingPage from '@/app/components/LoadingPage';
import { hideLoadingSubmit, showLoadingSubmit } from '@/app/redux/admin';
import { showNotification } from '@/app/redux/components';

const Messages = () => {
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

  const handleDelete = async (idMessage: string) => {
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
                    onClick={() => handleDelete(message.ID)}
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