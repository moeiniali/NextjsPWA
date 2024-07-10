import React, { Component, useMemo, useState } from 'react';
import { OrgGetPhoneNumber } from '../../exAllCo';
import { AnimatePresence, motion } from 'framer-motion';

const TmLogin = () => {

  return (
    <>
      <AnimatePresence>
        <motion.div style={{ width: "100%", height: "100%" }}
          initial={{ opacity: 0, }}
          animate={{ opacity: 1, }}
          exit={{ opacity: 0 }}>
          <OrgGetPhoneNumber />
        </motion.div>
      </AnimatePresence>

    </>);
}

export default TmLogin;