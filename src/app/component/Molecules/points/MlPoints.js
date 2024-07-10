import React, { useState } from 'react'
import { AtomIcon, AtomText } from '../../exAllCo';
import starIcon from '../../../assets/images/points/starHeader.svg';
import chevronLeft from '../../../assets/images/home/chevron-left.png';

export default function MlPoints({ Element, devIconI, devTitleI, devTitleII, devTitleIII, onClickIsActiveTab1, onClickIsActiveTab2, isActiveTab,
  pointsCol, dateCol, activityTypeCol, totalPoint, pointsColColor }) {
  const theme = localStorage.getItem('theme')
  const allMolecules = (Element) => {
    switch (Element) {
      case "pointHeader":
        return (
          <>
            <div className="w-full h-[260px] px-8 flex-col  items-center  flex  bg-gradient-to-b from-[#0176D3]  to-[#1B96FF]">
              <div className='w-full h-9  rounded-full bg-white bg-opacity-20 mt-14 flex items-center  flex-row '>
                <div className='w-full h-full py-[2px] px-1 ' onClick={onClickIsActiveTab2}>
                  <AtomText title="تاریخچه امتیازات" className={`w-full h-full px-3 py-1 flex items-center justify-center ${isActiveTab === '2' ? 'bg-white text-[#353535]' : 'text-[#FFFFFF]'} text-center whitespace-nowrap rounded-full font-bold text-base  cursor-pointer`} />
                </div>
                <div className='w-full h-full  py-[2px] px-1' onClick={onClickIsActiveTab1}>
                  <AtomText title="ماموریت ها" className={`w-full h-full px-3 py-1 flex items-center justify-center ${isActiveTab === '1' ? 'bg-white text-[#353535]' : 'text-[#FFFFFF]'} text-center whitespace-nowrap  rounded-full font-bold text-base text-[#353535] cursor-pointer`} />
                </div>
              </div>
              <AtomIcon className="mt-6" src={starIcon} width={142} height={56} alt="starIcon" />

              <div className="w-full h-[128px] relative ">
                <div className={`w-full h-[128px]  top-[32px] rounded-2xl ${theme === "light" ? 'bg-white ' : 'bg-[#03234D]'} absolute shadow-xl flex-col justify-center items-center gap-6 inline-flex`}>
                  <div className={`${theme === "light" ? 'text-[#353535] ' : 'text-[#EDEDED]'} text-center  text-base font-medium `}>امتیازات شما در باشگاه مشتریان</div>
                  <div dir='rtl' className={`text-center text-[#1B96FF] text-xl font-bold `}>{totalPoint + ' ' + 'امتیاز'}</div>
                </div>
              </div>
            </div>
          </>
        )
      case 'devResources':
        return (
          <div className='w-full h-auto  flex relative flex-col  pb-2 dark:bg-[#001639] border  border-[#AACBFF] rounded-xl dark:border-[#014486]  gap-4'>
            <div className='w-full h-24 flex items-center justify-center py-[22px]  bg-gradient-to-b rounded-t-lg  from-[#0176D3] via-sky-600 to-sky-500 '>
              <AtomIcon src={devIconI} alt="sayeban" width={40} height={40} />
            </div>
            <div className='w-full h-auto rounded-xl bg-white dark:bg-[#001639] px-4 text-right whitespace-nowrap flex flex-col justify-center gap-2 items-end'>
              <AtomText title={devTitleI} className="text-sm font-medium text-[#353535] dark:text-[#EDEDED]" />
              <AtomText title={devTitleII} className="text-sm font-normal text-[#353535] dark:text-[#EDEDED] whitespace-normal" />
              <AtomText title={devTitleIII} className="text-sm font-bold text-[#00BA88]" />
            </div>
          </div>
        )
      case 'navTitle':
        return (
          <div className='w-full flex items-center justify-between  h-9  '>
            <div className=' flex items-center cursor-pointer hover:animate-pulse '>
              <AtomIcon src={chevronLeft} alt="backIcon" className="" width={16} height={16} />
              <AtomText  title="مشاهده قوانین"  className="text-sm font-medium bg-transparent text-[#1B96FF]" />
            </div>
            {/* title & orderItems---------------------------------------------- */}
            <div dir='ltr' className='w-auto flex items-end justify-end flex-col mt-8 mb-4  ' >
              <AtomText title="ماموریت ها" className="text-base font-bold  w-auto mb-1 text-right text-[#353535] dark:text-[#EDEDED]" />
              <div className='w-16 pl-4  border-b-4 rounded-tl-sm rounded-ee-md  border-[#1B96FF]  leading-8 '></div>
            </div>
          </div>
        )
      case "tableItem":
        return (
          <div className='w-full'>
            <table className='w-full h-auto flex flex-col justify-between ' >
              <tbody >
                <tr className=' w-full h-[60px] text-sm font-medium mt-2 flex justify-between items-center flex-row  border-b border-[#F9F9F9] dark:border-[#0C0C0C]' >

                  <th className='w-[30%] h-full inline-flex justify-center items-center'>
                    <AtomText title={dateCol} className=" dark:text-[#E1E1E1] text-[#757575] " />
                  </th>
                  <th className='w-[50%] h-full flex justify-center items-center  '>
                    <AtomText title={activityTypeCol} className="dark:text-[#EDEDED] text-[#353535] " />
                  </th>
                  <th className='w-[20%] h-full inline-flex justify-center items-center'>
                    <AtomText title={pointsCol} className={`text-[${pointsColColor}] `} />
                  </th>
                </tr >
              </tbody>
            </table>
          </div>
        )
      default:
        break;
    }
  }
  return (
    <>
      {allMolecules(Element)}
    </>
  )
}
