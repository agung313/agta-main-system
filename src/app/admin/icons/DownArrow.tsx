import React from 'react';

interface DownArrowProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}

const DownArrow: React.FC<DownArrowProps> = ({ color =  '000000', size = 14, ...props }) => (
  <svg
    fill={color}
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 24 24"
    enableBackground="new 0 0 24 24"
    xmlSpace="preserve"
    stroke={color}
    width={size}
    {...props}
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"></path>
    </g>
  </svg>
);

export default DownArrow;