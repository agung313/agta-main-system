import React from 'react';
import { useSelector } from 'react-redux';
import useAnimateElements from './useAnimateElements';
import Warning from '../icons/warning.svg';
import Image from 'next/image';

interface ConfirmDialogProps {
  isOpen: boolean,
  handleCancel: () => void,
  dialogConfirmData: {
    handleConfirm: () => void;
    ConfirmDialogHeader: { id: string; en: string };
    ConfirmDialogMessage: { id: string; en: string };
    ConfirmDialogWarning: { id: string; en: string };
    TextCancel: { id: string; en: string };
    TextConfirm: { id: string; en: string };
  },
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ isOpen, handleCancel, dialogConfirmData }) => {
  const { containerRef } = useAnimateElements();
  const codeLanguage = useSelector(
    (state: { header: { codeLanguage: "id" | "en" } }) => state.header.codeLanguage
  );

  if (!isOpen) return null;

  return (
    <div className="bg-black bg-opacity-60 fixed inset-0 z-50 flex justify-center items-center">
      <div
        ref={containerRef}
        className="shadow-md rounded-md p-4 w-[90vw] sm:w-[35vw] min-h-[20vh] bg-white"
      >
        <p className="text-center font-bold text-black text-[2.5vh] sm:text-[3vh] mb-2">
          {dialogConfirmData.ConfirmDialogHeader[codeLanguage]}
        </p>
        <p className="text-center text-black text-[2vh] mb-4">
          {dialogConfirmData.ConfirmDialogMessage[codeLanguage]}
        </p>
        <div className='w-full h-full flex justify-center'>
          <div className='w-[100%] sm:w-[95%] bg-redCustom-100 border-l-8 border-redCustom-700 p-2'>
            <div className='flex items-center mb-4'>
              <Image src={Warning} alt="warning" className="w-6 h-6" />
              <p className="font-bold text-redCustom-900 text-[2vh] ml-2">
                Warning
              </p>
            </div>
            <p className="text-justify text-redCustom-500 text-[1.8vh] mb-2">
              {dialogConfirmData.ConfirmDialogWarning[codeLanguage]}
            </p>
          </div>
        </div>
        <div className='w-full h-full flex justify-end mt-4'>
          <button
            type="submit"
            className='text-[1.8] sm:text-[2vh] font-extrabold p-2 bg-neutral-200 rounded-md text-black hover:bg-neutral-300'
            onClick={handleCancel}
          >
            {dialogConfirmData.TextCancel[codeLanguage]}
          </button>
          <button
            type="submit"
            className='text-[1.8] sm:text-[2vh] font-extrabold p-2 bg-green-700 rounded-md ml-4 hover:bg-green-800'
            onClick={dialogConfirmData.handleConfirm}
          >
            {dialogConfirmData.TextConfirm[codeLanguage]}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog