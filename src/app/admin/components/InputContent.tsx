import React from 'react';
import Image from 'next/image';

interface InputContentProps {
  id?: string;
  type?: string;
  label?: string;
  value?: any; // eslint-disable-line
  setValue?: (value: any) => void; // eslint-disable-line
  classNameLabel?: string;
  classNameInput?: string;
  classNameImage?: string;
  rows?: number;
  disabled?: boolean;
  accept?: string;
  widthImage?: number;
  heightImage?: number;
}

const InputContent: React.FC<InputContentProps> = ({ id, type = 'text', label = '', value, setValue, classNameLabel, classNameInput, classNameImage, rows, disabled, accept, widthImage, heightImage}) => {
  const previewUrl = value instanceof File ? URL.createObjectURL(value) : value;
  return (
    <div className='flex flex-col justify-center'>
      {label && <label htmlFor={id} className={`${classNameLabel} mb-2`}>{label}</label>}
      {type === 'fileImage' ? (
        <div>
          <Image
            src={previewUrl}
            alt="Logo"
            width={widthImage || 50}
            height={heightImage || 50}
            className={`${classNameImage} cursor-pointer`}
            onClick={() => id && document.getElementById(id)?.click()}
          />
          <input
            type="file"
            name={id}
            id={id}
            onChange={e => setValue && setValue(e.target.files?.[0])}
            disabled={disabled}
            accept={accept}
            className="hidden"
          />
        </div>
      ) : rows ? (
        <textarea
          name={id}
          id={id}
          value={value}
          onChange={e => setValue && setValue(e.target.value)}
          rows={rows}
          disabled={disabled}
          className={`${classNameInput} mb-5 bg-transparent border border-white text-white rounded-lg p-2 focus:outline-none`}
        />
      ) : (
        <input
          type={type}
          name={id}
          id={id}
          value={value}
          onChange={e => setValue && setValue(e.target.value)}
          disabled={disabled}
          className={`${classNameInput} mb-5 bg-transparent border border-white text-white rounded-lg p-2 focus:outline-none`}
        />
      )}
    </div>
  );
};

export default InputContent;