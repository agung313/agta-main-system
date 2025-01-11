"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTabActive } from "../redux/header";
import { hideLoading, showLoading } from "../redux/components";
import { getContacts } from "../api/client";
import LoadingPage from "../components/LoadingPage";
import ContactPage from "./ContactPage";

const DashboardContact = () => {
  const dispatch = useDispatch();
  const isMounted = useRef(true);
  
  const isLoading = useSelector(
    (state: { components: { isLoading: boolean } }) => state.components.isLoading
  );

  const [contactData, setContactData] = useState({
    title: { id: "", en: ""},
    email: "",
    instagram: "",
    linkedinLink: "",
    address: "",
    addressLink: "",
    phone: "",
  });

  const getServicesData = useCallback(async () => {
    dispatch(showLoading())
    try {
      const res = await getContacts();
      setTimeout(() => {
        setContactData({ ...res.data.data });
        dispatch(hideLoading());
      }, 1000);
    } catch (err) {
      console.log('cek err', err); // eslint-disable-line
    }
  }, [dispatch])

  useEffect(() => {
    if (isMounted.current) {
      dispatch(changeTabActive('contactTab'));
      getServicesData();
    }
    return () => {
      isMounted.current = false
    }
  }, [getServicesData, dispatch])

  return (
    <div className="flex justify-center items-center min-h-screen">
      {isLoading
        ?
          <LoadingPage className="fixed inset-0" isLoading={isLoading} />
        :
          <ContactPage contactData={contactData} />
      }
    </div>
  );
};

export default DashboardContact;