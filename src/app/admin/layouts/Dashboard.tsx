import React from 'react'

const Dashboard = () => {
  return (
    <div className='w-full p-10'>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-neutral-800 bg-opacity-40 p-4 rounded-lg border-t-4 border-green-500">
          <p className='font-medium text-neutral-300 text-[2vh]'>Number of Visits</p>
        </div>
        <div className="bg-neutral-800 bg-opacity-40 p-4 rounded-lg border-t-4 border-blue-500">
          <p className='font-medium text-neutral-300 text-[2vh]'>Number of Messages</p>
        </div>
        <div className="bg-neutral-800 bg-opacity-40 p-4 rounded-lg border-t-4 border-yellow-500">
          <p className='font-medium text-neutral-300 text-[2vh]'>Number of Visiting Countries</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;