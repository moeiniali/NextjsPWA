import React, { Component, useEffect, useState } from 'react';
import { MlOtp, MlGetPhoneNumber, MlActiveAccount } from '../../exAllCo';
import { useDispatch, useSelector } from 'react-redux';
import { stateFul } from '../../../redux/login/LoginSlice';
import { stateFulOtp } from '../../../redux/login/OtpSlice';



const OrgLogin = () => {
  const layoutController = useSelector((state) => state.controllerLoginSlice.layoutController);
  const ful = useSelector(stateFul);
  return (
    <>
      {
        layoutController === "3" ? <MlActiveAccount /> :
          ful && ful.Success && layoutController === '2' ? <MlOtp /> :
            <MlGetPhoneNumber />
      }
    </>);
}

export default OrgLogin;