import React, { useState, useEffect, useRef } from 'react';
import DownArrow from '../icons/DownArrow';
import Image from 'next/image';

interface SelectContentProps {
  valueList: Array<{ id: string; name: string }>;
  valueSelected: string;
  setValueSelected: (value: string) => void; // eslint-disable-line
  icont?: any; // eslint-disable-line
  color?: string;
  className?: string;
  colorIcont?: string;
}

const SelectContent: React.FC<SelectContentProps> = ({ valueList, valueSelected, setValueSelected, icont, color, className, colorIcont }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className={`${className} text-[2vh] rounded-lg focus:outline-none font-bold text-black cursor-pointer flex items-center justify-between`}
        style={{ backgroundColor: color || 'transparent' }}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {icont
          ? <Image src={icont} alt="Language Icon" className="w-6 h-6" />
          : (valueList.find((val) => val.id === valueSelected)?.name || "Select an option")
        }
        {!icont && <DownArrow color={colorIcont} style={{ marginLeft: 10 }}/>}
      </button>
      {showDropdown && (
        <ul className="absolute bg-white border rounded-lg mt-1">
          {valueList.map((val) => (
            <li
              key={val.id}
              className="p-2 cursor-pointer text-black hover:bg-gray-200 w-full px-2"
              onClick={() => {
                setValueSelected(val.id);
                setShowDropdown(false);
              }}
            >
              {val.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SelectContent;