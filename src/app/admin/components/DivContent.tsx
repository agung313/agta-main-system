import React from 'react'

interface DivContentProps {
  children: React.ReactNode;
  className?: string;
}
  
const DivContent: React.FC<DivContentProps> = ({ children, className }) => {
  return (
    <div className={`bg-neutral-800 bg-opacity-50 p-5 rounded-lg ${className}`}>
      {children}
    </div>
  );
};

export default DivContent;