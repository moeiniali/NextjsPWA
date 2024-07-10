import React, { Component, useEffect, useState } from 'react';
import '../Organism.css';
import { AtomText, AtomIcon } from '../../exAllCo';
import ArrowRight from '../../../assets/images/footer&&header/ArrowRight.svg'
import ArrowRightDark from '../../../assets/images/footer&&header/ArrowRightdark.svg'
import { useMainContext } from '../../../context/mainContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { all } from 'axios';
import { getPixelIndexArray } from '@neshan-maps-platform/ol/render/canvas/ExecutorGroup';


const OrgHeader = ({ HeaderIcon, HeaderTitle, goBackRout }) => {


  const { theme } = useMainContext();




  return (
    <>

      <div className="containerHeader duration-500 mb-2">
        <div className="Header duration-500 " >
          <div className='contentHeader duration-500 shadow-sm dark:shadow-lg'>
            <div className='w-full h-full bg-white dark:bg-[#001639] px-8 flex flex-row-reverse justify-between  items-center '>
              <AtomIcon src={theme && theme === 'dark' ? ArrowRightDark : ArrowRight} onClick={goBackRout} width={24} height={24} className="cursor-pointer " alt="back" />
              <AtomText title={HeaderTitle} className="m-auto pl-5 text-lg font-medium text-[#353535] dark:text-[#EDEDED]" />
            </div>
          </div>
        </div>
      </div>

    </>);
}

export default OrgHeader;