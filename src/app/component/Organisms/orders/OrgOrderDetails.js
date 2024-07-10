import React, { useContext, useEffect, useState } from 'react'
import { OrgHeader, OrgSkeleton, AtomIcon } from '../../exAllCo';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AtomText, MlOrders } from '../../exAllCo';
import icon from '../../../assets/images/home/bagD.svg';
import notOrderIconL from '../../../assets/images/home/Mask Group 2Light.png';
import notOrderIconD from '../../../assets/images/home/Mask Group 2Dark.png';
import { fetchOrderDetails, fetchOrderVisitor, fetchInvoiceAndPreInvoicePdf } from '../../../redux/orders/orderSlice';





export default function OrgOrderDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = localStorage.getItem('theme')
  const orderNo = sessionStorage.getItem('orderNo')
  const orderState = sessionStorage.getItem('state')
  const baseImageUrl = 'https://club.sayesaman.com/img/catalog/';
  // selectors---------------------------------------------------
  const purchaseRecordsByID = useSelector((state) => state.orderSlice.purchaseRecordsByID);
  const VisitorInformation = useSelector((state) => state.orderSlice.orderVisitorInformation);
  const pendCallInformation = useSelector((state) => state.orderSlice.pendFetchOrderVisitor);
  const pendFetchOrderDetails = useSelector((state) => state.orderSlice.pendFetchOrderDetails);

  // states--------------------------------------------
  const [purchaseItems, setPurchaseItems] = useState([]);
  const [orderStatus, setOrderStatus] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState(false);
  const [preInvStatus, setPreInvStatus] = useState(false);
  const [invoiceStatus, setInvoiceStatus] = useState(false);


  useEffect(() => {
    dispatch(fetchOrderDetails({ orderNo: orderNo, state: orderState }))
    dispatch(fetchOrderVisitor())
  }, []);


  useEffect(() => {
    if (purchaseRecordsByID) {
      purchaseRecordsByID.map((item) => {
        setPurchaseItems(item)
        if (item.orderNo && item.orderDate) {
          setOrderStatus(true)
          if (item.preInvoiceNo && item.preInvoiceDate) {
            setPreInvStatus(true)
          }
          if (item.invoiceNo && item.invoiceDate) {
            setInvoiceStatus(true)
          }
          if (item.deliveryCode) {
            setDeliveryStatus(true)
          }
        } else {
          setOrderStatus(false);
          setDeliveryStatus(false)
          setPreInvStatus(false)
          setInvoiceStatus(false)
        }
      }
      )
    } else {
      console.log("not purchaseRecordsByID data");
    }
  }, [purchaseRecordsByID])


  console.log('purchaseRecordsByID', purchaseRecordsByID);
  console.log('purchaseItems', purchaseItems);
  console.log(pendFetchOrderDetails);


  return (
    <>


      <OrgHeader HeaderTitle="جزئیات سفارش" goBackRout={() => navigate('/orders')} />
      <div dir='rtl'>

        {/* title & OrderStatus---------------------------------------------- */}
        <div dir='ltr' className='w-full flex items-end justify-end flex-col mt-8 mb-4  ' >
          <AtomText title="وضعیت سفارش" className="text-base font-bold mt-8 w-auto mb-1 text-right text-[#353535] dark:text-[#EDEDED]" />
          <div className='w-16 pl-4  border-b-4 rounded-tl-sm rounded-ee-md  border-[#1B96FF]  leading-8 '></div>
        </div>
        {pendFetchOrderDetails ? <OrgSkeleton className='h-[60px] w-full p-4 my-2' count={4} /> : (
          <MlOrders Element="orderStatusBox" orderStatus={orderStatus} preInvStatus={preInvStatus} deliveryStatus={deliveryStatus} invoiceStatus={invoiceStatus} iconI={icon}
            ordTitleI={purchaseItems ? purchaseItems.orderNo : ''} ordTitleII={purchaseItems ? purchaseItems.orderDate : ''}
            delTitleI={purchaseItems ? purchaseItems.voucherNo : ''} delTitleII={purchaseItems ? purchaseItems.voucherDate : ''}
            invTitleI={purchaseItems ? purchaseItems.invoiceNo : ''} invTitleII={purchaseItems ? purchaseItems.invoiceDate : ''}
            preInvTitleI={purchaseItems && purchaseItems.preInvoiceNo !== "0" ? purchaseItems.preInvoiceNo : ''} preInvTitleII={purchaseItems ? purchaseItems.preInvoiceDate : ''}
            preInvoiceOnClick={() => dispatch((fetchInvoiceAndPreInvoicePdf({ type: 1, orderNo: orderNo })))}
            invoiceOnClick={() => dispatch((fetchInvoiceAndPreInvoicePdf({ type: 2, orderNo: orderNo })))} />
        )}

        {invoiceStatus ? (
          <div className='w-full  border flex flex-col items-start py-4 px-2 mt-6 justify-center rounded-2xl gap-4 dark:border-[#757575] border-[#E1E1E1] '>
            <AtomText title={` شناسه تحویل ${purchaseItems.orderNo}`} className="text-sm font-medium text-[#757575] ss01" />
            <AtomText title="پس از تحویل سفارش، شناسه تحویل را به موزع اعلام کنید." className="text-sm font-normal text-[#353535] dark:text-[#EDEDED] " />
          </div>
        ) : ''}

        {/* title & callInformationBox---------------------------------------------- */}
        <div dir='ltr' className='w-full flex items-end justify-end flex-col mt-8 mb-4'>
          <AtomText title="اطلاعات تماس" className="text-base font-bold mt-8 w-auto mb-1 text-right text-[#353535] dark:text-[#EDEDED]" />
          <div className='w-16 pl-4  border-b-4 rounded-tl-sm rounded-ee-md  border-[#1B96FF]  leading-8 '></div>
        </div>

        {pendCallInformation ? <OrgSkeleton className='h-[44px] my-2' count={2} /> : VisitorInformation?.length > 0 ? (
          <MlOrders Element="callInformationBox" sellerName={VisitorInformation[0].visitorName} supervisorName={VisitorInformation[0].supervisorName}
            supervisorNumberLink={VisitorInformation[0].supervisorPhone} sellerNumberLink={VisitorInformation[0].visitorPhone}
            supervisorNumber={VisitorInformation[0].supervisorPhone} sellerNumber={VisitorInformation[0].visitorPhone}
            iconI={icon} />
        ) : (
          <>
            <div className='flex items-center justify-center flex-col gap-4 '>
              <AtomText title="در حال حاضر اطلاعات تماس موجود نمیباشد." className="text-[#353535] dark:text-[#EDEDED] text-sm font-normal" />
            </div>
          </>
        )}

        {/* title & orderItems ---------------------------------------------- */}
        <div dir='ltr' className='w-full flex items-end justify-end flex-col mt-8 mb-4  ' >
          <AtomText title="اقلام سفارش" className="text-base font-bold mt-8 w-auto mb-1 text-right text-[#353535] dark:text-[#EDEDED]" />
          <div className='w-16 pl-4  border-b-4 rounded-tl-sm rounded-ee-md  border-[#1B96FF]  leading-8 '></div>
        </div>


        {pendFetchOrderDetails ? <OrgSkeleton className='h-[30px] my-1' count={5} /> : purchaseItems?.items?.length > 0 ? (
          purchaseItems.items.map((item, index) => (
            <div key={index}>
              <MlOrders Element="orderItems"
                orderItemsIconI={baseImageUrl + item.materialNumber + '.png'}
                productNumber={item.saleQty}
                itemTitleI={item.materialName}
                itemTextI={item.amountUnit + ' ' + 'ریال'}
                itemTextII={item.cartonQty + ' ' + 'عدد'}
                itemTextIII={item.smallUnitSaleQty + ' ' + 'عدد'}
                itemTextIIII={item.amount + ' ' + 'ریال'} />
            </div>
          ))
        )
          : (
            <>
              <div className='w-full  flex items-center justify-center flex-col py-20 gap-4'>
                <AtomIcon src={theme === "light" ? notOrderIconL : notOrderIconD} width={150} height={150} alt="notValueIcon" />
                <AtomText title="در حال حاضر هیچ محصولی موجود نیست" className="text-[#353535] dark:text-[#EDEDED] text-sm font-normal" />
              </div>
            </>
          )}

      </div >

    </>
  )
}

