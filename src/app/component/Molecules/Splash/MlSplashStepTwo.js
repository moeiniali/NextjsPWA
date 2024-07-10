import React, { Component } from 'react';
import { AtomButton, AtomIcon, AtomInput, MlNextPrevButton, MlRectangle, AtomText } from '../../exAllCo';
import step2Image from '../../../assets/images/login/Frame 427319878.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../../redux/splash/MlRectangleSlice';


const MlSplashStepTwo = () => {
 const dispatch = useDispatch()

 return (<>

  <div className='flex flex-col w-full h-full bg-white'>
   <div className=' w-full h-full m-auto flex justify-center items-end duration-700'>
    <AtomIcon src={step2Image} alt="logo" width="360" height="100%" />
   </div>
   <div className=' gap-2 h-full flex flex-col justify-start items-center'>
    <div className='mt-4'>
     <MlRectangle />
    </div>
    <AtomText title="ازامتیاز تا دریافت جایزه" className="font-medium text-base mt-5" />
    <AtomText title="  از انجام فعالیت های ساده تا دریافت جایزه راهی نیست" className="font-normal text-sm text-center" />
    <div className='w-[195px] mt-10 '>
     <MlNextPrevButton children="بعدی"
      onClickPrevStep={() => dispatch(setStep('1'))}
      onClickNextStep={() => dispatch(setStep('3'))}
     />
    </div>
   </div>
  </div>
 </>);
}

export default MlSplashStepTwo;