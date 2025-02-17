import React from 'react';

interface DashboardIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}

const DashboardIcon: React.FC<DashboardIconProps> = ({ color = '#ffffff', size = 24, ...props }) => (
  <svg
    viewBox="0 0 1000 1000"
    data-name="Layer 2"
    id="Layer_2"
    xmlns="http://www.w3.org/2000/svg"
    fill={color}
    stroke={color}
    width={size}
    height={size}
    {...props}
  >
    <defs>
      <style>
        {`.cls-1{fill:none;stroke:${color};stroke-linecap:round;stroke-miterlimit:10;stroke-width:22px;}`}
      </style>
    </defs>
    <path
      className="cls-1"
      d="M540.53,785.06H774.66c7.7,0,14-5.51,14-12.24V465.92c0-6.74-6.3-12.25-14-12.25H540.53c-7.7,0-14,5.51-14,12.25V721.76"
    />
    <rect
      className="cls-1"
      height="191.23"
      rx="12"
      width="262.13"
      x="211.34"
      y="593.84"
    />
    <path
      className="cls-1"
      d="M459.47,546.33H225.34c-7.7,0-14-5.51-14-12.25V227.18c0-6.73,6.3-12.24,14-12.24H459.47c7.7,0,14,5.51,14,12.24V483"
    />
    <rect
      className="cls-1"
      height="191.23"
      rx="12"
      transform="translate(1315.19 621.1) rotate(-180)"
      width="262.13"
      x="526.53"
      y="214.94"
    />
  </svg>
);

export default DashboardIcon;