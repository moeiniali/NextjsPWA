import React, { Component } from 'react';
import { AtomButton, AtomIcon, AtomInput, MlNextPrevButton, MlRectangle, AtomText } from '../../exAllCo';
import step3Image from '../../../assets/images/login/Frame 427319879.svg';
import { setStep } from '../../../redux/splash/MlRectangleSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MlSplashStepThree = () => {
 const navigate = useNavigate()
 const dispatch = useDispatch();

 return (<>
  <div className='flex flex-col w-full h-full bg-white'>
   <div className=' w-full h-full m-auto flex justify-center items-end duration-700'>
    <AtomIcon src={step3Image} alt="logo" width="360" height="100%" />
   </div>
   <div className=' gap-2 h-full flex flex-col justify-start items-center'>
    <div className='mt-4'>
     <MlRectangle />
    </div>
    <AtomText title="نمودار درآمدی" className="font-medium text-base mt-5" />
    <AtomText title=" مشاهده هزینه و سود شما به صورت نموداری " className="font-normal text-sm text-center" />
    <div className='w-[195px] mt-10 '>
     <MlNextPrevButton children="ورود"
      onClickPrevStep={() => dispatch(setStep('2'))}
      onClickNextStep={() => navigate('/login')}
     />
    </div>
   </div>
  </div>
 </>);
}

export default MlSplashStepThree;