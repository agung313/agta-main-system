import React from 'react';
import { HashLoader } from 'react-spinners';

interface LoadingPageProps {
  isLoading: boolean;
  color?: string;
  size?: number;
  flex?: boolean;
  className?: string;
  classNameText?: string;
  textLoading?: string;
}

// fixed inset-0

const LoadingPage: React.FC<LoadingPageProps> = ({
  isLoading,
  size = 100,
  flex = false,
  color = '#be185d',
  className,
  classNameText,
  textLoading = 'Loading...',
}) => {
  if (!isLoading) return null;

  return (
    <div className={`${className} flex items-center justify-center`}>
      <div className={flex ? 'flex items-center justify-center' : ''}>
        <HashLoader color={color} size={size} />
        <p className={`${classNameText} text-center font-bold text-white ${flex ? "mt-0 ml-2" : "mt-10 ml-0"} text-[2vh]`}>{textLoading}</p>
      </div>
    </div>
  );
};

export default LoadingPage;