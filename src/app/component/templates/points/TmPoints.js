import React, { Component, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';
export default function TmPoints() {
 return (
  <div>
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
  </div>
 )
}
