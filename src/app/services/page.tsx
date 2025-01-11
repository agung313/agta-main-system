"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTabActive } from "../redux/header";
import { hideLoading, showLoading } from "../redux/components";
import LoadingPage from "../components/LoadingPage";
import ServicesPage from "./ServicesPage";
import { getServices } from "../api/client";

const DashboardServices = () => {
  const dispatch = useDispatch();
  const isMounted = useRef(true);
  
  const isLoading = useSelector(
    (state: { components: { isLoading: boolean } }) => state.components.isLoading
  );

  const [servicesData, setServicesData] = useState({
    title: { id: "", en: "" },
    description: { id: "", en: "" },
    technologyLists: [] as { link: string; title: string, icont: string, descriptionText: { id: string, en: string} }[],
  });

  const getServicesData = useCallback(async () => {
    dispatch(showLoading());
    try {
      const res = await getServices();
      setTimeout(() => {
        setServicesData({ ...res.data.data });
        dispatch(hideLoading());
      }, 1000);
    } catch (err) {
      console.log('cek err', err); // eslint-disable-line
      dispatch(hideLoading());
    }
  }, [dispatch])

  useEffect(() => {
    if (isMounted.current) {
      dispatch(changeTabActive('servicesTab'));
      getServicesData();
    }
    return () => {
      isMounted.current = false;
    };
  }, [getServicesData, dispatch]);


  return (
    <div className="flex justify-center items-center min-h-screen">
      {isLoading
        ?
          <LoadingPage className="fixed inset-0" isLoading={true} />
        :
          <ServicesPage servicesData={servicesData} />
      }
    </div>
  );
};

export default DashboardServices;