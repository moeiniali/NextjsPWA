import React, { Component, useState } from 'react';
import { AtomButton, AtomIcon, AtomText, MlRectangle } from '../../exAllCo';
import step1Image from '../../../assets/images/login/Frame 427319880.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectedStep, setStep } from '../../../redux/splash/MlRectangleSlice';



const MlSplashStepOne = () => {
  const dispatch = useDispatch();





  return (
    <>
      <div className='flex flex-col w-full h-full bg-white'>
        <div className=' w-full h-full m-auto flex justify-center items-end duration-700'>
          <AtomIcon src={step1Image} alt="logo" width="360" height="100%" />
        </div>
        <div className=' gap-2 h-full flex flex-col justify-start items-center'>
          <div className='mt-4'>
            <MlRectangle />
          </div>
          <AtomText title="وضعیت سفارشات" className="font-medium text-base mt-5" />
          <AtomText title="مشاهده و پیگیری لحظه ایی سفارشات شما همراه فاکتور" className="font-normal text-sm text-center" />
          <div className='w-[195px] mt-10 '>
            <AtomButton children="بعدی" onClick={() => dispatch(setStep('2'))} />
          </div>
        </div>
      </div>
    </>);
}

export default MlSplashStepOne;