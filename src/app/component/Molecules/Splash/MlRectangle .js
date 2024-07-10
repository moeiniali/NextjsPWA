import React, { Component } from 'react';
import { useSelector } from 'react-redux';
import { MlRectangleSlice } from '../../../redux/splash/MlRectangleSlice';

const MlRectangle = () => {
  const step = useSelector((state) => state.MlRectangleSlice.step);

  return (
    <>

      <div dir='rtl' className='flex flex-row gap-2 '>
        <div className={` ${step === '1' ? 'w-6 ' : 'w-1'} bg-blue-500 h-1 rounded-full `}></div>
        <div className={` ${step === '2' ? 'w-6 ' : 'w-1'} bg-blue-500 h-1 rounded-full `}></div>
        <div className={` ${step === '3' ? 'w-6 ' : 'w-1'} bg-blue-500 h-1 rounded-full `}></div>
      </div>

    </>);
}

export default MlRectangle;