import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { AtomIcon, AtomText } from '../../exAllCo';
import '../../Molecules/Molecules.css';
import card1Icon from '../../../assets/images/financial/card1.svg';
import card2Icon from '../../../assets/images/financial/card.svg';
import receipt1Icon from '../../../assets/images/financial/receipt1.svg';
import receipt2Icon from '../../../assets/images/financial/receipt2.svg';
import receiptText1Icon from '../../../assets/images/financial/receipt-text1.svg';
import receiptText2Icon from '../../../assets/images/financial/receipt-text2.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setSumSaleAmountValue } from '../../../redux/financial/financialSlice';

import notBankIcon from '../../../assets/images/financial/Bank (1).svg';


export default function MlFinanCial({ Element, isActive, onClickItemI, onClickItemII, onClickItemIII, slideTabTitleII, slideTabOnClickItem, slideTabTitleI, tabIsActive,
  titlePrice, dateValue, checkNumber, bankIcon, datePickerTitle, props, datePickerIcon, invoicePrice, invoiceNoTitle, invoiceNoI,
  titleDescription, chequeColorsText, tableItemKey }) {
  const theme = localStorage.getItem('theme');
  const monthlySaleData = useSelector((state) => state.financialSlice.monthlySaleData)
  const dispatch = useDispatch();
  //states--------------------------------






  const allType = (Element) => {
    switch (Element) {

      case "tableItem":
        return (
          <div className='w-full' key={tableItemKey} >
            <table className='w-full h-auto flex flex-col justify-between ' >
              <tbody >
                <tr className=' w-full h-[60px] text-sm font-medium mt-2 flex justify-between items-center flex-row  border-b border-[#F9F9F9] dark:border-[#0C0C0C]' >
                  <th className='w-[30%] max-lg:w-[20%] max-sm:w-[25%] h-full flex flex-col justify-center  items-start '>
                    <AtomText title={titlePrice} className=" dark:text-[#EDEDED] overflow-hidden text-ellipsis " />
                    <AtomText title={titleDescription} className={`overflow-hidden text-ellipsis text-[${chequeColorsText}]`} />
                  </th>
                  <th className='w-[30%] h-full inline-flex justify-center items-center'>
                    <AtomText title={dateValue} className=" dark:text-[#EDEDED] text-[#757575] " />
                  </th>
                  <th className='w-[30%] h-full flex justify-center items-center  '>
                    <AtomText title={checkNumber} className="dark:text-[#EDEDED] text-[#353535] " />
                  </th>
                  <th className='w-[15%] h-full inline-flex justify-end items-center'>
                    <AtomIcon src={bankIcon ? bankIcon : notBankIcon} width={32} height={28} alt="bankIcon" />
                  </th>
                </tr >
              </tbody>
            </table>
          </div>
        )
      case "tabHeader":
        return (
          <>
            <div className={`w-full h-9 p-0.5 mt-8 bg-indigo-50 dark:bg-[#03234D] rounded-[50px] justify-between items-center  inline-flex `}>

              <div onClick={onClickItemIII} className={`lg:w-auto  max-lg:w-1/3 duration-700 px-4  py-4  ${isActive === '3' && theme === "light" ? ' bg-white text-sky-500' : isActive === '3' && theme === 'dark' && '  bg-[#001639] text-[#1B96FF]'} cursor-pointer rounded-[50px] max-h-4  justify-center items-center gap-1 flex `}>
                <div className="text-right  text-sm font-medium  leading-normal whitespace-nowrap ">فاکتورهای باز </div>
                <AtomIcon src={isActive === "3" ? receiptText2Icon : receiptText1Icon} alt="tabIcon" width={16} height={16} />
              </div>

              <div onClick={onClickItemII} className={`lg:w-auto  max-lg:w-1/3 duration-700 px-4  py-4  ${isActive === '2' && theme === "light" ? ' bg-white text-sky-500' : isActive === '2' && theme === 'dark' && ' bg-[#001639] text-[#1B96FF]'} cursor-pointer rounded-[50px] max-h-4  justify-center items-center gap-1 flex`}>
                <div className="text-right  text-sm font-medium  leading-normal whitespace-nowrap ">   چک ها  </div>
                <AtomIcon src={isActive === "2" ? receipt1Icon : receipt2Icon} alt="tabIcon" width={16} height={16} />
              </div>

              <div onClick={onClickItemI} className={`lg:w-auto  max-lg:w-1/3 duration-700  px-4  py-4 ${isActive === '1' && theme === "light" ? ' bg-white  text-sky-500' : isActive === '1' && theme === "dark" && '  bg-[#001639] text-[#1B96FF]'} cursor-pointer rounded-[50px] max-h-4  justify-center items-center gap-1 flex`}>
                <div className="text-right  text-sm font-medium  leading-normal whitespace-nowrap ">میزان خرید</div>
                <AtomIcon src={isActive === "1" ? card1Icon : card2Icon} alt="tabIcon" width={16} height={16} />
              </div>
            </div>
          </>
        )
      case 'slideTab':
        return (
          <div onClick={slideTabOnClickItem} className={`w-auto h-8 px-3  py-0.5 cursor-pointer  duration-700   rounded-[40px] border dark:border-[#757575] ${tabIsActive ? 'bg-[#00BA88] dark:bg-[#00966D] ' : 'bg-[#F9F9F9] dark:bg-[#03234D]'} 
            justify-center items-center flex-nowrap gap-2 inline-flex`}>

            <div className="  text-right   ">
              <AtomText title={slideTabTitleI} className={`${tabIsActive && 'text-[#EDEDED]'}  whitespace-nowrap leading-7   text-sm font-medium `} />
            </div>
            <div className={`w-auto h-auto px-2  ${tabIsActive ? 'bg-[#F3FDFA]' : 'bg-emerald-500 '} rounded-[50px] flex-col justify-center items-center gap-2.5 inline-flex`}>
              <div className="text-right text-white text-sm font-normal  leading-7  whitespace-nowrap">
                <AtomText title={slideTabTitleII} className={`${tabIsActive ? 'text-[#00BA88]' : 'text-white'}`} />
              </div>
            </div>
          </div>
        )
      case 'openInvoiceCurrent':
        return (
          <>

            <div className='w-full flex-1 mb-4'>
              <div className='min-w-[290px]  flex flex-col gap-2 border border-[#E1E1E1] h-auto  rounded-2xl py-2 px-4  duration-700 hover:scale-95'>
                <div className='w-full flex  flex-row justify-end cursor-pointer hover:brightness-105'>
                  <div className='flex items-center gap-3'>
                    <AtomText title={datePickerTitle} {...props} className="text-[#353535] dark:text-[#EDEDED] font-medium text-sm" />
                    <AtomIcon src={datePickerIcon} alt="datePickerIcon" {...props} className="" width={16} height={16} />
                  </div>
                </div>
                <div className='flex flex-row justify-end items-center gap-2'>
                  <AtomText dir="rtl" title={invoiceNoI} {...props} className="text-[#353535] dark:text-[#EDEDED] font-medium text-sm" />
                  <AtomText dir="rtl" title={invoiceNoTitle} {...props} className="text-[#353535] dark:text-[#EDEDED] font-medium text-sm" />
                </div>
                <div dir='rtl' className='flex justify-end items-center gap-2 px-2 '>
                  <AtomText title={invoicePrice} {...props} className=" text-[#1B96FF]  font-bold text-base" />
                </div>
              </div>
            </div>
          </>
        )
      default:
        break;
    }
  }

  return (
    <>
      {allType(Element)}

    </>
  )
}
