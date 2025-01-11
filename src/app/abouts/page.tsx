"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTabActive } from "../redux/header";
import { getAbouts } from "../api/client";
import LoadingPage from "../components/LoadingPage";
import AboutsPage from "./AboutsPage";
import { hideLoading, showLoading } from "../redux/components";

const DashboardAbout = () => {
  const dispatch = useDispatch();
  const isMounted = useRef(true);

  const isLoading = useSelector(
    (state: { components: { isLoading: boolean } }) => state.components.isLoading
  );

  const [aboutData, setAboutData] = useState({
    title: "",
    openingText: { id: "", en: "" },
    closingText: { id: "", en: "" },
    comitmentLists: [] as { titleText: { id: string, en: string }, descriptionText: { id: string, en: string } }[],
  });

  const getAboutData = useCallback(async () => {
    dispatch(showLoading());
    try{
      const res = await getAbouts();
      setTimeout(() => {
        setAboutData({ ...res.data.data });
        dispatch(hideLoading());
      }, 1000);
    } catch (err) {
      console.log('cek err', err); // eslint-disable-line
      dispatch(hideLoading());
    }
  }, [dispatch]);

  useEffect(() => {
    if (isMounted.current) {
      dispatch(changeTabActive('aboutTab'));
      getAboutData();
    }
    return () => {
      isMounted.current = false;
    };
  }, [getAboutData, dispatch]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      {isLoading
        ?
          <LoadingPage className="fixed inset-0" isLoading={true} />
        :
          <AboutsPage aboutData={aboutData} />
      }
    </div>
  );
};

export default DashboardAbout;