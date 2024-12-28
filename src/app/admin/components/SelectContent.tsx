import React from 'react';

interface SelectContentProps {
  valueList: Array<{ id: string; name: string }>;
  valueSelected: string;
  setValueSelected: (value: string) => void; // eslint-disable-line
}

const SelectContent: React.FC<SelectContentProps> = ({ valueList, valueSelected, setValueSelected }) => {
  return (
    <div>
      <select
        className="text-[2vh] p-3 mr-3 rounded-lg focus:outline-none font-bold bg-transparent text-black cursor-pointer"
        value={valueSelected}
        onChange={(e) => setValueSelected(e.target.value as string)}
      >
        {valueList.map((val) => (
          <option key={val.id} value={val.id}>
            {val.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectContent;