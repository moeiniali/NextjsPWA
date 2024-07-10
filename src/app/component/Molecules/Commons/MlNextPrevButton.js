import React, { Component, useEffect, useState } from 'react';
import prevIcon from '../../../assets/images/login/Frame 427319883.png'
import { AtomIcon, AtomButton } from '../../exAllCo';




const MlNextPrevButton = (props) => {

  return (
    <>
      <div dir='rtl'>
        <AtomIcon src={prevIcon} alt="prevIcon" width={40} height={40} onClick={props.onClickPrevStep} 
          className='p-[2px] mr-[0.5px] cursor-pointer hover:brightness-110 hover:scale-105 duration-100 absolute float-none z-10 ' />
        <AtomButton children={props.children} className='w-full ' onClick={props.onClickNextStep}  />
      </div>

    </>);
}

export default MlNextPrevButton;