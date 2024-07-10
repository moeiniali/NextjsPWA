import React, { Component, useMemo, useState } from 'react';
import { OrgSplash } from '../../exAllCo';
import { AnimatePresence, motion } from 'framer-motion';

const TmSplash = () => {



  return (
    <>

      <AnimatePresence>
        <motion.div style={{ width: "100%", height: "100%" }}
          initial={{ opacity: 0, }}
          animate={{ opacity: 1, }}
          exit={{ opacity: 0 }}>
          <OrgSplash />
        </motion.div>
      </AnimatePresence>

    </>);
}

export default TmSplash;