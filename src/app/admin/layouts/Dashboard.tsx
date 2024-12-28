import React, { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import DivContent from '../components/DivContent';
import SelectContent from '../components/SelectContent';

const Dashboard = () => {
  const [yearActive, setYearActive] = useState('2024');

  const yearList = [{ id: '2024', name:'2024' }, { id: '2025', name:'2025' }];

  const data = [
    { name: 'Jan', Visits: 30, Messages: 15, Countries: 5 },
    { name: 'Feb', Visits: 20, Messages: 10, Countries: 4 },
    { name: 'Mar', Visits: 27, Messages: 12, Countries: 6 },
    { name: 'Apr', Visits: 18, Messages: 8, Countries: 3 },
    { name: 'May', Visits: 23, Messages: 11, Countries: 5 },
    { name: 'Jun', Visits: 34, Messages: 17, Countries: 7 },
    { name: 'Jul', Visits: 45, Messages: 22, Countries: 9 },
    { name: 'Aug', Visits: 40, Messages: 20, Countries: 8 },
    { name: 'Sep', Visits: 32, Messages: 16, Countries: 6 },
    { name: 'Oct', Visits: 25, Messages: 13, Countries: 5 },
    { name: 'Nov', Visits: 28, Messages: 14, Countries: 6 },
    { name: 'Dec', Visits: 35, Messages: 18, Countries: 7 },
  ];

  return (
    <div className='w-full p-5'>
      <div className="grid grid-cols-3 gap-6">
        <DivContent className="border-t-4 border-green-500">
          <p className='font-medium text-neutral-300 text-[3vh]'>Visits</p>
          <p className='font-extrabold text-neutral-300 text-[8vh] my-3 text-center'>89</p>
          <p className='text-neutral-300 text-[2vh]'>The entire number of visits from start to present
          </p>
        </DivContent>
        <DivContent className="border-t-4 border-blue-500">
          <p className='font-medium text-neutral-300 text-[3vh]'>Messages</p>
          <p className='font-extrabold text-neutral-300 text-[8vh] my-3 text-center'>89</p>
          <p className='text-neutral-300 text-[2vh]'>The entire number of messages from start to present
          </p>
        </DivContent>
        <DivContent className="border-t-4 border-yellow-500">
          <p className='font-medium text-neutral-300 text-[3vh]'>Countries</p>
          <p className='font-extrabold text-neutral-300 text-[8vh] my-3 text-center'>89</p>
          <p className='text-neutral-300 text-[2vh]'>The entire number of countries that visited the system from the beginning until now
          </p>
        </DivContent>
      </div>
      <DivContent className='mt-10'>
        <div className='flex justify-between items-center'>
          <p className='font-extrabold text-neutral-300 text-[3vh]'>Diagram</p>
          <div className='bg-white rounded-lg'>
            <SelectContent
              valueList={yearList}
              valueSelected={yearActive}
              setValueSelected={setYearActive}
            />
          </div>
        </div>
        <div className='mt-8'>
          <LineChart
            width={1050}
            height={300}
            data={data}
            margin={{
              top: 15, left: 0, right: 15, bottom: 15,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke='#fff' />
            <YAxis stroke='#fff' />
            <Tooltip contentStyle={{ color: 'black' }} />
            <Legend />
            <Line type="monotone" dataKey="Visits" stroke="#22c55e" />
            <Line type="monotone" dataKey="Messages" stroke="#3b82f6" />
            <Line type="monotone" dataKey="Countries" stroke="#eab308" />
          </LineChart>
        </div>
      </DivContent>
    </div>
  );
};

export default Dashboard;