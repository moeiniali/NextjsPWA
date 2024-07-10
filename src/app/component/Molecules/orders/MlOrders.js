import React, { useEffect, useState } from 'react'
import { AtomText, AtomIcon, AtomButton, AtomLoading } from '../../exAllCo';
import bagTrueIcon from '../../../assets/images/orders/bagTrue.svg';
import bagFalseIcon from '../../../assets/images/orders/bagFalse.svg';
import bagD from '../../../assets/images/orders/bag.svg';
import cardNotIcon from '../../../assets/images/orders/cardfasle.svg';
import cardTrueIcon from '../../../assets/images/orders/cardtrue.svg';
import recFalse from '../../../assets/images/orders/3-fasle.svg';
import recTrue from '../../../assets/images/orders/3true.svg';
import rec4False from '../../../assets/images/orders/4false.svg';
import rec4True from '../../../assets/images/orders/4true.svg';
import callDIcon from '../../../assets/images/orders/call.svg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';



export default function MlOrders({ Element, tabTitleI, id, sellerName, supervisorName, sellerNumber, supervisorNumber, tabTitleII,
  itemTitleI, itemTextI, itemTextII, itemTextIII, itemTextIIII,
  iconI, onClickItem, isActive, delTitleI, delTitleII, ordTitleI, ordTitleII, invTitleI, invTitleII, preInvTitleI, preInvTitleII, orderItemsIconI,
  productNumber, orderStatus, deliveryStatus, preInvStatus, invoiceStatus, sellerNumberLink, supervisorNumberLink, invoiceOnClick, preInvoiceOnClick }) {
  const theme = localStorage.getItem('theme');
  const [slideMoveRight, setSlideMoveRight] = useState(false);
  const [slideMoveLeft, setSlideMoveLeft] = useState(false);
  const pendingPdfFile = useSelector((state) => state.orderSlice.pendingPdfFile)



  const allType = (Element) => {
    switch (Element) {

      case 'tabSlide':
        return (
          <>
            <div id={id} onClick={onClickItem} className={`w-auto h-8 px-2  py-0.5 cursor-pointer  duration-700   rounded-[40px] border  ${isActive ? 'border border-[#00966D] bg-[#F3FDFA] dark:bg-[#00966D] dark:border-none' : 'bg-[#F9F9F9] dark:bg-[#03234D]'} 
            justify-center items-center flex-nowrap gap-2 inline-flex `}>
              <div className="w-[18px] h-[18px] flex-nowrap relative overflow-hidden flex items-center rounded-full " >
                <AtomIcon src={iconI} width={18} height={18} alt="tabIcon" />
              </div>
              <div className="  text-right   ">
                <AtomText title={tabTitleI} className="text-[#353535]  whitespace-nowrap leading-7 dark:text-[#EDEDED]  text-sm font-medium" />
              </div>
              <div className="w-auto h-auto px-2 bg-[#00BA88] rounded-[50px] flex-col justify-center items-center gap-2.5 inline-flex">
                <div className="text-right text-white text-sm font-normal  leading-7  whitespace-nowrap">
                  <AtomText title={tabTitleII} className="text-[#fff7f7] " />
                </div>
              </div>
            </div>
          </>
        );

      case 'orderStatusBox':
        return (<>
          <div className=' w-full h-auto flex flex-col bg-inherit justify-start items-start top-0 relative '>
            <div className="w-[1px] bg-[#ADADAD] h-[280px] right-[5px] top-[28px]   absolute origin-center border border-zinc-400"></div>
            <div className={`w-[11px] h-[11px]  top-[28px]  absolute ${orderStatus ? 'bg-emerald-500 ' : 'bg-stone-300'} rounded-full`} />
            <div className={`w-[11px] h-[11px]  top-[120px] absolute ${deliveryStatus ? 'bg-emerald-500 ' : 'bg-stone-300'} rounded-full`} />
            <div className={`w-[11px] h-[11px]  top-[210px] absolute ${preInvStatus ? 'bg-emerald-500 ' : 'bg-stone-300'} rounded-full`} />
            <div className={`w-[11px] h-[11px]  top-[304px] absolute ${invoiceStatus ? 'bg-emerald-500 ' : 'bg-stone-300'} rounded-full`} />

            <div className='flex flex-col w-full justify-start items-end gap-8  bg-transparent'>
              {/* orderStatus------------------------------------------------------------------------ */}
              <div dir='rtl' className={`max-sm:w-[93%] max-md:w-[96%] max-lg:w-[96%] w-[92%] h-[60px] duration-700 border rounded-2xl pr-2 pl-4 py-2 flex justify-between items-center
                      ${orderStatus && theme === "light" ? 'border-[#00BA88] ' : !orderStatus && theme === "light" ? 'border-none bg-[#F9F9F9]' : !orderStatus && theme !== "light" ? 'border-none bg-[#03234D]' : 'border-[#00BA88]'} 
                        `}>
                <div className='flex  gap-2  '>
                  <AtomIcon src={orderStatus ? bagTrueIcon : bagFalseIcon} width={24} height={24} alt="icon"
                    className={` ${orderStatus && theme === 'light' ? 'bg-[#F3FDFA]' : theme === "light" && !orderStatus ? 'bg-[#EDEDED]' : theme !== "light" && orderStatus ? 'bg-[#F3FDFA]' : 'bg-[#032D60]'} w-11 h-11 rounded-full p-[10px] `} />
                  <div className={` ${!orderStatus && 'flex items-center'} `}>
                    <AtomText title="سفارش" className={`text-sm font-bold  ${orderStatus && theme === 'light' ? 'text-[#353535]' : !orderStatus && theme === 'light' ? 'text-[#ADADAD]' : ''}`} />
                    <AtomText title={`${orderStatus ? ordTitleI : ''}`} className={`text-sm font-normal ss01  ${theme === 'light' ? 'text-[#353535]' : 'text-[#EDEDED]'}`} />
                  </div>
                </div>
                <div className='flex items-center  '>
                  <AtomText title={`${orderStatus ? ordTitleII : ''}`} className={`text-sm font-normal ss01  ${theme === 'light' ? 'text-[#757575]' : 'text-[#E1E1E1]'}`} />
                </div>
              </div>

              {/* deliveryStatus------------------------------------------------------------------------ */}
              <div dir='rtl' className={`max-sm:w-[93%] max-md:w-[96%] max-lg:w-[96%] w-[92%] h-[60px] duration-700 border rounded-2xl pr-2 pl-4 py-2 flex justify-between items-center
    ${deliveryStatus && theme === "light" ? 'border-[#00BA88] ' : !deliveryStatus && theme === "light" ? 'border-none bg-[#F9F9F9]' : !deliveryStatus && theme !== "light" ? 'border-none bg-[#03234D]' : 'border-[#00BA88]'} 
  `}>
                <div className='flex  gap-2 '>
                  <AtomIcon src={deliveryStatus ? cardTrueIcon : cardNotIcon} width={24} height={24} alt="icon"
                    className={`  ${deliveryStatus && theme === 'light' ? 'bg-[#F3FDFA]' : theme === "light" && !deliveryStatus ? 'bg-[#EDEDED]' : theme !== "light" && deliveryStatus ? 'bg-[#F3FDFA]' : 'bg-[#032D60]'} w-11 h-11 rounded-full p-[10px] `} />
                  <div className={` ${!deliveryStatus && 'flex items-center'}  `}>
                    <AtomText title="حواله" className={`text-sm font-bold  ${deliveryStatus && theme === 'light' ? 'text-[#353535]' : !deliveryStatus && theme === 'light' ? 'text-[#ADADAD]' : ''}`} />
                    <AtomText title={`${deliveryStatus ? delTitleI : ''}`} className={`text-sm font-normal ss01 ${theme === 'light' ? 'text-[#353535]' : 'text-[#EDEDED]'}`} />
                  </div>
                </div>
                <div className='flex items-center'>
                  <AtomText title={`${deliveryStatus ? delTitleII : ''}`} className={`text-sm font-normal ss01 ${theme === 'light' ? 'text-[#757575]' : 'text-[#E1E1E1]'}`} />
                </div>
              </div>

              {/* preInvStatus------------------------------------------------------------------------ */}
              <div dir='rtl' className={`max-sm:w-[93%] max-md:w-[96%] max-lg:w-[96%] w-[92%] h-[60px] duration-700 border rounded-2xl pr-2 pl-4 py-2 flex justify-between items-center ${preInvStatus && theme === "light" ? 'border-[#00BA88] ' : !preInvStatus && theme === "light" ? 'border-none bg-[#F9F9F9]' : !preInvStatus && theme !== "light" ? 'border-none bg-[#03234D]' : 'border-[#00BA88]'} `}>
                <div className='flex  gap-2'>
                  <AtomIcon src={preInvStatus ? recTrue : recFalse} width={24} height={24} alt="icon"
                    className={`${preInvStatus && theme === 'light' ? 'bg-[#F3FDFA]' : theme === "light" && !preInvStatus ? 'bg-[#EDEDED]' : theme !== "light" && preInvStatus ? 'bg-[#F3FDFA]' : 'bg-[#032D60]'} w-11 h-11 rounded-full p-[10px] `} />
                  <div className={` ${!preInvStatus && 'flex items-center'}`}>
                    <AtomText title="پیش فاکتور" className={`text-sm font-bold  ${preInvStatus && theme === 'light' ? 'text-[#353535]' : !preInvStatus && theme === 'light' ? 'text-[#ADADAD]' : ''}`} />
                    <AtomText title={`${preInvStatus ? preInvTitleI : ''}`} className={`text-sm font-normal ss01 ${theme === 'light' ? 'text-[#353535]' : 'text-[#EDEDED]'}`} />
                  </div>
                </div>
                {!invoiceStatus && preInvStatus ? (
                  <div className='w-[110px] h-[32px] lg:w-[100px] text-center flex  left-0 '>
                    <button className='w-[110px] lg:w-[106px] h-[32px] py-1 px-4 flex items-center justify-center whitespace-nowrap 
                    rounded-full text-[#1B96FF] text-xs font-medium border border-[#1B96FF]'
                      onClick={preInvoiceOnClick} >
                      {pendingPdfFile ? <AtomLoading style={{ width: '26px', height: '26px' }} /> : "دریافت پیش فاکتور"}</button>
                  </div>
                ) : (
                  <>
                    <AtomText title={`${preInvStatus ? preInvTitleII : ''}`} className={`text-sm font-normal ss01  ${theme === 'light' ? 'text-[#757575]' : 'text-[#E1E1E1]'}`} />
                  </>
                )}
              </div>

              {/* invoiceStatus------------------------------------------------------------------------ */}
              <div dir='rtl' className={`max-sm:w-[93%] max-md:w-[96%] max-lg:w-[96%] w-[92%] h-[60px] duration-700 border rounded-2xl pr-2 pl-4 py-2 flex justify-between items-center ${invoiceStatus && theme === "light" ? 'border-[#00BA88] ' : !invoiceStatus && theme === "light" ? 'border-none bg-[#F9F9F9]' : !invoiceStatus && theme !== "light" ? 'border-none bg-[#03234D]' : 'border-[#00BA88]'} `}>
                <div className='flex  gap-2'>
                  <AtomIcon src={invoiceStatus ? rec4True : rec4False} width={24} height={24} alt="icon"
                    className={`${invoiceStatus && theme === 'light' ? 'bg-[#F3FDFA]' : theme === "light" && !invoiceStatus ? 'bg-[#EDEDED]' : theme !== "light" && invoiceStatus ? 'bg-[#F3FDFA]' : 'bg-[#032D60]'} w-11 h-11 rounded-full p-[10px] `} />
                  <div className={` ${!invoiceStatus && 'flex items-center'}`}>
                    <AtomText title="فاکتور" className={`text-sm font-bold  ${invoiceStatus && theme === 'light' ? 'text-[#353535]' : !invoiceStatus && theme === 'light' ? 'text-[#ADADAD]' : ''}`} />
                    <AtomText title={`${invoiceStatus ? invTitleI : ''}`} className={`text-sm font-normal ss01 ${theme === 'light' ? 'text-[#353535]' : 'text-[#EDEDED]'}`} />
                  </div>
                </div>
                {preInvStatus && invoiceStatus ? (
                  <div className='w-[110px] h-[32px] lg:w-[100px] text-center flex  left-0 '>
                    <button className='w-[110px] lg:w-[100px] h-[32px] py-1 px-4 flex items-center justify-center whitespace-nowrap 
                    rounded-full text-[#1B96FF] text-xs font-medium border border-[#1B96FF]'
                      onClick={invoiceOnClick} >
                      {pendingPdfFile ? <AtomLoading style={{ width: '26px', height: '26px' }} /> : "دریافت فاکتور"}</button>
                  </div>
                ) : (
                  <>
                    <AtomText title={`${invoiceStatus ? invTitleII : ''}`} className={`text-sm font-normal ss01  ${theme === 'light' ? 'text-[#757575]' : 'text-[#E1E1E1]'}`} />
                  </>
                )}
              </div>
            </div>
          </div >
        </>)

      case 'callInformationBox':
        return (
          <>
            <div className='flex w-full flex-col mb-4 gap-1 '>
              <div className='w-full h-[44px] bg-transparent flex flex-col mb-6'>
                <AtomText title="فروشنده" className={`${theme === "light" ? 'text-[#757575]' : 'text-[#E1E1E1]'} text-sm font-medium  `} />
                <div className='flex flex-row justify-between bg-transparent' >
                  <AtomText title={sellerName} className={`${theme === "light" ? 'text-[#353535]' : 'text-[#EDEDED]'} text-sm font-medium  `} />
                  <div >
                    <Link to={"tel://" + sellerNumberLink} className='flex flex-row gap-2 bg-transparent border-b w-auto px-1 border-dotted  border-[#0176D3]'>
                      <AtomText title={sellerNumber} className="text-[#0176D3] font-medium text-sm cursor-pointer ss01" />
                      <AtomIcon src={callDIcon} width={16} height={16} alt="callIcon" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className='w-full h-[44px] bg-transparent flex flex-col  '>
                <AtomText title="سرپرست" className={`${theme === "light" ? 'text-[#757575]' : 'text-[#E1E1E1]'} text-sm font-medium  `} />
                <div className='flex flex-row justify-between'>
                  <AtomText title={supervisorName} className={`${theme === "light" ? 'text-[#353535]' : 'text-[#EDEDED]'} text-sm font-medium `} />
                  <div  >
                    <Link to={"tel://" + supervisorNumberLink} className='flex flex-row gap-2 bg-transparent  border-b w-auto px-1 border-dotted  border-[#0176D3]'>
                      <AtomText title={supervisorNumber} className="text-[#0176D3] font-medium text-sm  cursor-pointer ss01" />
                      <AtomIcon src={callDIcon} width={16} height={16} alt="callIcon" />
                    </Link>
                  </div>
                </div>
              </div>
            </div >
          </>
        )
      case "orderItems":
        return (
          <>
            <div className='w-full h-auto   border-b border-[#E1E1E1] dark:border-[#757575] overflow-hidden mb-4 py-4'>
              <div className='w-full h-auto  flex flex-row justify-between '>

                <div className='max-w-[20%] h-full flex flex-col gap-4 items-center justify-start'>
                  <AtomIcon src={orderItemsIconI} width={80} height={80} alt="icon" className="rounded-lg " />
                  <div dir='ltr' className="w-[48px] z flex h-[26px] px-2  bg-[#1B96FF] rounded-lg justify-center items-center gap-2 flex-row">
                    <AtomText title={productNumber} className="text-sm font-medium text-center w-4 h-4 text-white" />
                    <AtomIcon src={bagD} width={16} height={16} alt="productIcon" />
                  </div>
                </div>

                <div className='max-w-[80%]  flex flex-col justify-between items-start '>
                  <AtomText title={itemTitleI} className={`text-sm font-bold mb-4 pr-2 w-full text-ellipsis whitespace-pre${theme === "light" ? 'text-[#353535]' : 'text-[#EDEDED]'}`} />
                  <div className='w-full h-full flex flex-row justify-between items-baseline '>
                    <div className={`flex flex-col gap-2 justify-start items-start pr-2 text-sm font-medium whitespace-nowrap ${theme === "light" ? 'text-[#353535]' : 'text-[#EDEDED]'}`}>
                      <AtomText title="قیمت هر عدد" />
                      <AtomText title="تعداد عدد در کارتن" />
                      <AtomText title="تعداد سفارش" />
                      <AtomText title="قیمت کل" />
                    </div>
                    <div className={`flex flex-col gap-2 items-end  justify-start whitespace-nowrap text-sm font-medium ${theme === "light" ? 'text-[#353535]' : 'text-[#EDEDED]'}`} >
                      <AtomText title={itemTextI} />
                      <AtomText title={itemTextII} />
                      <AtomText title={itemTextIII} />
                      <AtomText title={itemTextIIII} className='ss01 text-base font-bold text-[#1B96FF]' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      default:
        return '';
    }
  }

  return (
    <>
      {allType(Element)}

    </>
  )
}
