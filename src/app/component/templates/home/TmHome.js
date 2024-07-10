import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPanelInfo, fetchPurchaseRecordsByRange } from '../../../redux/home/HomeSlice';
import { Outlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const TmHome = () => {
 const dispatch = useDispatch();
 const location = window.location.pathname;


 useEffect(() => {
  if (location === '/home') {
   dispatch(fetchPanelInfo());
  }
 }, []);


 return (
  <>
   <AnimatePresence>
    <motion.div
     style={{ width: "100%", height: "100%" }}
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
     exit={{ opacity: 0 }} >
     <Outlet />
    </motion.div>
   </AnimatePresence>
  </>
 );
}

export default TmHome;