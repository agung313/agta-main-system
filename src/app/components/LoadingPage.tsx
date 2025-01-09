import React from 'react';
import { HashLoader } from 'react-spinners';

interface LoadingPageProps {
  isLoading: boolean;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
      <div>
        <HashLoader color='#ec4899' size={100} />
        <p className="text-center font-bold text-white mt-10 text-[2vh]">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingPage;