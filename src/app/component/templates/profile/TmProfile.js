import React, { Component, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchProfile } from '../../../redux/profile/profileSlices';
const TmProfile = () => {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchProfile());
  }, [])



  return (
    <>
      <AnimatePresence>
        <motion.div
          style={{ width: "100%", height: "100%" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default TmProfile;