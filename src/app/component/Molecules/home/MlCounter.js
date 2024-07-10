import React, { Component } from 'react';
import { AtomIcon, AtomText } from '../../exAllCo';


const MlCounter = ({ counter, src, title, alt, props, width, height }) => {
 const theme = localStorage.getItem('theme')
 return (<>
  <div className='w-full flex-1  flex justify-between items-center  '>
   <div className=' flex  flex-col border-2 border-[#EEF4FF] dark:border-[#03234D] w-full  items-center rounded-md py-1 hover:scale-95 duration-700 cursor-pointer '>
    <AtomIcon src={src}{...props} alt={alt} width={30} height={30} className="mb-2" />
    <AtomText title={counter} {...props} style={theme === 'light' ? { color: '#353535' } : { color: '#EDEDED' }} className=" font-medium text-sm" />
    <AtomText title={title} {...props} style={theme === 'light' ? { color: '#757575' } : { color: '#E1E1E1' }} className=" font-normal text-sm" />
   </div>
  </div>
 </>);
}

export default MlCounter;