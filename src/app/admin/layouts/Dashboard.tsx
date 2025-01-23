import React, { useCallback, useEffect, useRef, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DivContent from '../components/DivContent';
import SelectContent from '../components/SelectContent';
import { getDashboard } from '@/app/api/admin';
import LoadingPage from '@/app/components/LoadingPage';
import { useSelector } from 'react-redux';
/* eslint-disable */
const Dashboard = () => {
  const isMounted = useRef(true);
  const codeLanguage = useSelector(
    (state: { header: { codeLanguage: "id" | "en" } }) => state.header.codeLanguage
  );
  const currentYear = new Date().getFullYear();
  const [isLoading, setIsLoading] = useState(false);
  const [dataVisits, setDataVisits] = useState({ Visits: 0, Messages: 0, Countries: 0 });
  const [yearList, setYearList] = useState([
    {
      id: currentYear.toString(),
      name: currentYear.toString(),
    }
  ]);
  const [yearActive, setYearActive] = useState(currentYear.toString());

  const defaultDiagram = [
    { name: 'Jan', Visits: 0, Messages: 0, Countries: 0 },
    { name: 'Feb', Visits: 0, Messages: 0, Countries: 0 },
    { name: 'Mar', Visits: 0, Messages: 0, Countries: 0 },
    { name: 'Apr', Visits: 0, Messages: 0, Countries: 0 },
    { name: 'May', Visits: 0, Messages: 0, Countries: 0 },
    { name: 'Jun', Visits: 0, Messages: 0, Countries: 0 },
    { name: 'Jul', Visits: 0, Messages: 0, Countries: 0 },
    { name: 'Aug', Visits: 0, Messages: 0, Countries: 0 },
    { name: 'Sep', Visits: 0, Messages: 0, Countries: 0 },
    { name: 'Oct', Visits: 0, Messages: 0, Countries: 0 },
    { name: 'Nov', Visits: 0, Messages: 0, Countries: 0 },
    { name: 'Dec', Visits: 0, Messages: 0, Countries: 0 },
  ];
  const [dataDiagram, setDataDiagram] = useState([...defaultDiagram]);

  const [allDataDiagram, setAllDataDiagram] = useState<{ [key: string]: any }>({});

  const getDashboardData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getDashboard();
      setDataVisits({
        Visits: res.data.totalVisitors,
        Messages: res.data.totalMessages,
        Countries: res.data.totalCountries,
      });

      const years = Object.keys(res.data.data).map(year => ({
        id: year,
        name: year,
      }));
      setYearList(years);

      const latestYear = years[years.length - 1].id;
      setDataDiagram(res.data.data[latestYear] || dataDiagram);

      setAllDataDiagram(res.data.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.log('cek error', error); // eslint-disable-line
      setIsLoading(false);
    }
  }, [setIsLoading]);

  useEffect(() => {
    if (isMounted.current) {
      getDashboardData();
    }
    return () => {
      isMounted.current = false
    }
  }, [getDashboardData]);

  const handleYearChange = (year: string) => {
    setDataDiagram(allDataDiagram[year] || defaultDiagram);
    setYearActive(year);
  };

  return (
    <div>
      {isLoading
        ?
          <div className='flex w-full h-[90vh] justify-center items-center'>
            <LoadingPage color='#fff' size={70} isLoading={isLoading} />
          </div>
        :
          <div className='w-full p-5'>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <DivContent className="border-t-4 border-green-500">
                <p className='font-medium text-neutral-300 text-[2vh] sm:text-[3vh]'>{codeLanguage === 'id' ? 'Kunjungan' : 'Visits'}</p>
                <p className='font-extrabold text-neutral-300 text-[5vh] sm:text-[8vh] my-3 text-center'>{dataVisits.Visits}</p>
                <p className='text-neutral-300 text-[2vh]'>
                  {codeLanguage === 'id' ? 'Jumlah keseluruhan kunjungan dari awal hingga sekarang' : 'The entire number of visits from start to present'}
                </p>
              </DivContent>
              <DivContent className="border-t-4 border-blue-500">
                <p className='font-medium text-neutral-300 text-[2vh] sm:text-[3vh]'>{codeLanguage === 'id' ? 'Pesan' : 'Messages'}</p>
                <p className='font-extrabold text-neutral-300 text-[5vh] sm:text-[8vh] my-3 text-center'>{dataVisits.Messages}</p>
                <p className='text-neutral-300 text-[2vh]'>
                  {codeLanguage === 'id' ? 'Seluruh jumlah pesan dari awal hingga sekarang' : 'The entire number of messages from start to present'}
                </p>
              </DivContent>
              <DivContent className="border-t-4 border-yellow-500">
                <p className='font-medium text-neutral-300 text-[2vh] sm:text-[3vh]'>{codeLanguage === 'id' ? 'Negara' : 'Countries'}</p>
                <p className='font-extrabold text-neutral-300 text-[5vh] sm:text-[8vh] my-3 text-center'>{dataVisits.Countries}</p>
                <p className='text-neutral-300 text-[2vh]'>
                  {codeLanguage === 'id' ? 'Jumlah seluruh negara yang mengunjungi sistem dari awal hingga sekarang' : 'The entire number of countries that visited the system from the beginning until now'}
                </p>
              </DivContent>
            </div>
            <DivContent className='hidden sm:block mt-10'>
              <div className='flex justify-between items-center'>
                <p className='font-extrabold text-neutral-300 text-[2vh] sm:text-[3vh]'>Diagram</p>
                <div className='bg-white rounded-lg'>
                  <SelectContent
                    valueList={yearList}
                    valueSelected={yearActive}
                    setValueSelected={handleYearChange}
                    className='py-2 px-3'
                    color='#fff'
                  />
                </div>
              </div>
              <div className='mt-8'>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={dataDiagram}
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
                </ResponsiveContainer>
              </div>
            </DivContent>
          </div>
      }
    </div>
  );
};

export default Dashboard;