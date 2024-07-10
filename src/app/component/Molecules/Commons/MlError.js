import React, { Component, Children, useEffect, useState } from 'react';
import { AtomIcon } from '../../exAllCo';
import errorIcon from '../../../assets/images/login/info-circle.png';

const MlError = (props) => {
 return (
  <>
   <div className='w-full h-6 flex flex-row float-left justify-end items-center   gap-1  -mt-4'>
    <span className='text-[#C30000] font-normal text-sm float-right duration-1000 '>
     {Children.map(props.children, (child) => child)}
    </span>
    <AtomIcon src={errorIcon} alt="errorIcon" />
   </div>
  </>
 );
}

export default MlError;