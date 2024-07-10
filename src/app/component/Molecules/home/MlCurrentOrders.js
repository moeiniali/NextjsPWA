import React, { Component, useEffect, useState } from 'react';
import { AtomIcon, AtomText, AtomLink, AtomButton } from '../../exAllCo';
import { date, number, ref, string } from 'yup';
import PropTypes from 'prop-types';
import chevronLeft from '../../../assets/images/home/chevron-left.png'
import Line from '../../../assets/images/home/Line 92.svg'
import { OrgSkeleton } from '../../exAllCo';
import { useDispatch, useSelector } from 'react-redux';
import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory';
import { returnOrUpdate } from '@neshan-maps-platform/ol/extent';
import { set } from '@neshan-maps-platform/ol/transform';

const MlCurrentOrders = ({ onClickDetails, linkTitle, datePickerTitle, datePickerIcon, productsIcon1, orderNumberCode, orderNumberTitle, productsTitle, props }) => {

 const loading = useSelector((state) => state.HomeSlice.panelInfoPending);
 const purchaseLoading = useSelector((state) => state.HomeSlice.purchaseRecordsByRangePending);
 const purchaseData = useSelector((state) => state.HomeSlice.purchaseRecordsByRange);
 const pendFetchOrder = useSelector((state) => state.orderSlice.pendFetchOrder);
 const purchaseRecordsByRangeOrders = useSelector((state) => state.orderSlice.purchaseRecordsByRangeOrders);
 const [skeletonController, setSkeletonController] = useState(false);




 useEffect(() => {
  if (purchaseLoading && purchaseData?.length <= 0 || pendFetchOrder && purchaseRecordsByRangeOrders?.length <= 0) {
   setSkeletonController(!skeletonController)
  }
 }, [purchaseLoading])

 return (<>

  <div className='w-full flex-1 m-0 cursor-pointer'onClick={onClickDetails}  >

   <div className='min-w-[290px] flex flex-col gap-2 border border-[#E1E1E1] h-auto  rounded-2xl py-2 px-4  duration-700   hover:scale-95'>

    <div className='w-full flex flex-row  justify-between items-start cursor-pointer hover:brightness-105 '>
     <div className='flex items-center '>
      {skeletonController ? (<OrgSkeleton circle={true} width={16} height={16} />) : (
       <AtomIcon src={chevronLeft} alt="backIcon" className="" width={16} height={16} />
      )}
      <AtomText  title={skeletonController ? <OrgSkeleton width={100} /> : linkTitle} style={{ color: '#1B96FF' }} className="text-sm font-medium bg-none" />
     </div>
     <div className='flex items-center gap-3 '>
      <AtomText title={skeletonController ? (<OrgSkeleton width={100} />) : datePickerTitle} {...props} className="text-[#353535] dark:text-[#EDEDED] font-medium text-sm" />
      {skeletonController ? (<OrgSkeleton circle={true} width={32} height={32} />) : (
       <AtomIcon src={datePickerIcon} alt="datePickerIcon" {...props} className="" width={32} height={32} />
      )}
     </div>
    </div>
    <div className=' flex flex-row justify-end items-center gap-2 '>
     <AtomText dir="rtl" title={skeletonController ? <OrgSkeleton width={100} /> : productsTitle} {...props} className="text-[#353535] dark:text-[#EDEDED] font-medium text-sm" />
     {skeletonController ? (<OrgSkeleton circle={true} width={32} height={32} />) : (
      <AtomIcon src={productsIcon1} alt="productsIcon1" width={32} height={32} className='rounded-full'{...props} />
     )}
    </div>
    {skeletonController ? (<OrgSkeleton width={100} />) : (
     <div className='flex h-10 items-center justify-between gap-2 px-2' >
      {skeletonController ? (<OrgSkeleton width={100} />) : (
       <>
        <AtomText title={orderNumberCode} {...props} className=" text-[#757575] dark:text-[#EDEDED] font-medium text-sm" />
        <div style={{ width: '100%', height: '0%', transform: 'rotate(180deg)', transformOrigin: '50%', border: '2px #ADADAD  dotted' }}></div>
        <AtomText title={orderNumberTitle}  {...props} className="whitespace-nowrap  text-right text-[#353535] dark:text-[#EDEDED] font-normal text-sm" />
       </>
      )}
     </div>
    )}

   </div>
  </div>
 </>);
}

MlCurrentOrders.propTypes = {
 datePickerIcon: PropTypes.string,
 datePickerTitle: PropTypes.string,
 orderNumberTitle: PropTypes.string,
 orderNumberCode: PropTypes.string,
 productsIcon1: PropTypes.string,
 productsTitle: PropTypes.string,
}
export default MlCurrentOrders;