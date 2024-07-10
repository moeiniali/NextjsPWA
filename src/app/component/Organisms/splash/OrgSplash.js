import React, { Component, useState } from 'react';
import { MlSplashStepOne, MlSplashStepTwo, MlSplashStepThree, MlGetPhoneNumber } from '../../exAllCo';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectedStep } from '../../../redux/splash/MlRectangleSlice';
const OrgSplash = () => {
  const step = useSelector(selectedStep)

  return (
    <>
      {
        step === '1' ? (<MlSplashStepOne />) :
          step === '2' ? (<MlSplashStepTwo />) :
            step === '3' ? (<MlSplashStepThree />) : null
      }
    </>);
}

export default OrgSplash;