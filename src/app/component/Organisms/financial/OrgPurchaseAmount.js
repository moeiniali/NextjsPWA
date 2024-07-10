import React, { useState, useCallback, useEffect } from 'react'
import { MlFinanCial, AtomText, OrgBarChart } from '../../exAllCo';
import { useSelector } from 'react-redux';

export default function OrgPurchaseAmount() {


 return (
  <div >

   {/* title & orderItems---------------------------------------------- */}
   <div dir='ltr' className='w-full flex items-end justify-end flex-col mt-8 mb-4  ' >
    <AtomText title=" میزان خرید یکسال گذشته" className="text-base font-bold mt-8 w-auto mb-1 text-right text-[#353535] dark:text-[#EDEDED]" />
    <div className='w-16 pl-4  border-b-4 rounded-tl-sm rounded-ee-md  border-[#1B96FF]  leading-8 '></div>
   </div>
   <AtomText title="برای مشاهده میزان خرید در هر ماه روی ستون مربوطه کلیک کنید" className="text-sm font-normal mt-8 w-auto mb-4 text-right text-[#353535] dark:text-[#EDEDED]" />

   <OrgBarChart />
  </div>
 )
}
