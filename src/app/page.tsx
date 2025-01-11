"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboard } from "./api/client";
import LoadingPage from "./components/LoadingPage";
import { hideLoading, showLoading } from "./redux/components";
import DashboardPage from "./DashboardPage";

const DashboardHome = () => {
  const dispatch = useDispatch();
  const isMounted = useRef(true);
  const isLoading = useSelector(
    (state: { components: { isLoading: boolean } }) => state.components.isLoading
  );

  const [dashboardData, setDashboardData] = useState({ // eslint-disable-line
    firstText: "",
    secondText: "",
    thirdText: "",
    description: { id: "", en: ""},
    technologyLists: [] as { link: string; title: string, icont: string, description: { id: string, en: string} }[],
  });

  const getDashboardData = useCallback(async () => {
    dispatch(showLoading());
    try {
      const res = await getDashboard();
      setTimeout(() => {
        setDashboardData({ ...res.data.data });
        dispatch(hideLoading());
      }, 1000);
    } catch (err) {
      console.log('cek err', err); // eslint-disable-line
      dispatch(hideLoading());
    }
  }, [dispatch]);

  useEffect(() => {
    if (isMounted.current) {
      getDashboardData();
    }
    return () => {
      isMounted.current = false;
    };
  }, [getDashboardData]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      {isLoading
        ?
          <LoadingPage className="fixed inset-0" isLoading={true} />
        :
          <DashboardPage dashboardData={dashboardData} />
      }
    </div>
  );
};

export default DashboardHome;
