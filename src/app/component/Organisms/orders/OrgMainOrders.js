import React, { useDebugValue, useEffect, useRef, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import groceryL from '../../../assets/images/home/groceryL.svg';
import groceryD from '../../../assets/images/home/groceryD.svg';
import PackageL from '../../../assets/images/home/packageL.svg';
import PackageD from '../../../assets/images/home/packageD.svg';
import notOrderIconL from '../../../assets/images/home/Mask Group 2Light.png';
import notOrderIconD from '../../../assets/images/home/Mask Group 2Dark.png';
import currentIconL from '../../../assets/images/orders/icon-CurrentL.svg';
import currentIconD from '../../../assets/images/orders/icon-currentD.svg';
import procIconL from '../../../assets/images/orders/procL.svg';
import procIconD from '../../../assets/images/orders/procD.svg';
import deliveredIconL from '../../../assets/images/orders/icon-51L.svg';
import deliveredIconD from '../../../assets/images/orders/icon-51D.svg';
import ReturnedIconL from '../../../assets/images/orders/RETURNED L.svg';
import ReturnedIconD from '../../../assets/images/orders/RETURNEDD.svg';
import wasteIconL from '../../../assets/images/orders/wasteL.svg';
import wasteIconD from '../../../assets/images/orders/wastD.svg';
import { OrgFooter, MlOrders, OrgCurrentOrders, AtomIcon, AtomText } from '../../exAllCo';
import { fetchOrder, fetchOrderDetails, stateFromValue } from '../../../redux/orders/orderSlice';
import { useNavigate } from 'react-router-dom';
import { stateToTopScroll } from '../../../redux/common/commonRedux';
import toTopIcon from '../../../assets/images/common/Frame 427319986.png';
import toTopIconDark from '../../../assets/images/common/Frame 427319986Dark.png';

export default function OrgMainOrders() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = localStorage.getItem('theme');
  // refs----------------------------------------------------------------------------------------------------
  const intObserver = useRef();
  const lastPostRef = useRef();
  const scrollContainerRef = useRef(null);
  // selectors------------------------------------------------------------------------------------------------
  const purchaseRecordsByRange = useSelector((state) => state.orderSlice.purchaseRecordsByRangeOrders);
  const pendFetchOrder = useSelector((state) => state.orderSlice.pendFetchOrder);
  const purchaseState = useSelector((state) => state.orderSlice.purchaseState);
  const fromPage = useSelector((state) => state.orderSlice.fromValue);
  const toTopButtonShow = useSelector((state) => state.commonRedux.toTopButtonShow);

  // states-------------------------------------------------------------------------------------------------------
  const [isActive, setIsActive] = useState({ name: 'current', id: '0', title: 'جاری' });
  const [noDataMessages, setNoDataMessages] = useState(null);

  const scrollContainerHandler = (e) => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.scrollLeft += e.movementX * 2.5
    }
  };
  const [hasNextPage, setHasNexPage] = useState(false);
  const [newPurchaseData, setNewPurchaseData] = useState([]);



  // append purchase data to new state-------------------------------------------
  useEffect(() => {
    if (purchaseRecordsByRange) {
      setNewPurchaseData((prev) => Array.isArray(prev) ? [...prev, ...purchaseRecordsByRange] : [...purchaseRecordsByRange]);
    }
  }, [purchaseRecordsByRange]);

  useEffect(() => {
    dispatch(stateFromValue(0))
    setNewPurchaseData();
    setNoDataMessages(isActive.title)
    dispatch(fetchOrder({ param: isActive.id, from: fromPage }))
  }, [isActive])

  useEffect(() => {
    stateFromValue(0);
  }, [isActive.id])

  // fetchPurchaseRecordsByRange for displaying current items---------------------
  useEffect(() => {
    dispatch(fetchOrder({ param: isActive.id, from: fromPage }))
  }, [dispatch, fromPage])


  // Observer handler--------------------------------------------------------
  useEffect(() => {
    if (pendFetchOrder) return; // Skip if data is loading
    intObserver.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage) {
        dispatch(stateFromValue(fromPage + 20)); // Update fromValue
      }
    }, { threshold: 0.5 }); // Configure IntersectionObserver

    if (lastPostRef.current) {
      intObserver.current.observe(lastPostRef.current);
    }
    return () => {
      if (intObserver.current) {
        intObserver.current.disconnect(); // Disconnect on unmount
      }
    };
  }, [pendFetchOrder, hasNextPage]); // Dependency array includes loading state

  // Check for next page availability after data fetch
  useEffect(() => {
    if (purchaseRecordsByRange) {
      setHasNexPage(purchaseRecordsByRange?.length >= 20);
      // Set flag based on data length
    }
  }, [purchaseRecordsByRange]); //Dependency array includes purchased records






  return (
    <div  >

      <div dir='rtl'  >
        <AtomText title="از بین دسته بندی های زیر انتخاب کنید" className="mb-6 mt-6 font-medium text-lg text-right" />

        <div onMouseMove={scrollContainerHandler} ref={scrollContainerRef} className='w-full relative h-10 mb-7  left-0 mt-6 no-scrollbar overflow-y-hidden overflow-x-scroll duration-700 '>
          <div dir='rtl' className={`w-full absolute h-10 left-0 duration-700  `}>
            <div className={`w-full lg:w-[366px]   flex   m-auto  gap-3 duration-700`} >
              <MlOrders onClickItem={() => setIsActive({ name: 'current', id: '0', title: "جاری" }) && stateFromValue(0)} isActive={isActive.name === 'current' ? true : false} Element="tabSlide" tabTitleI="جاری" tabTitleII={purchaseState[0] ? purchaseState[0].invoiceCnt : ''} iconI={theme === "light" ? currentIconL : currentIconD} />
              <MlOrders onClickItem={() => setIsActive({ name: 'processing', id: '2', title: "در حال پردازش" })} isActive={isActive.name === 'processing' ? true : false} Element="tabSlide" tabTitleI="در حال پردازش" tabTitleII={purchaseState[1] ? purchaseState[1].invoiceCnt : ''} iconI={theme === "light" ? procIconL : procIconD} />
              <MlOrders onClickItem={() => setIsActive({ name: 'delivered', id: '3', title: "تحویل شده" })} isActive={isActive.name === 'delivered' ? true : false} Element="tabSlide" tabTitleI="تحویل شده" tabTitleII={purchaseState[2] ? purchaseState[2].invoiceCnt : ''} iconI={theme === "light" ? deliveredIconL : deliveredIconD} />
              <MlOrders onClickItem={() => setIsActive({ name: 'returned', id: '4', title: "مرجوعی" })} isActive={isActive.name === 'returned' ? true : false} Element="tabSlide" tabTitleI="مرجوعی" tabTitleII={purchaseState[3] ? purchaseState[3].invoiceCnt : ''} iconI={theme === "light" ? ReturnedIconL : ReturnedIconD} />
              <MlOrders onClickItem={() => setIsActive({ name: 'waste', id: '6', title: "ضایعاتی" })} isActive={isActive.name === 'waste' ? true : false} Element="tabSlide" tabTitleI="ضایعات" tabTitleII={purchaseState[4] ? purchaseState[4].invoiceCnt : ''} iconI={theme === "light" ? wasteIconL : wasteIconD} />
              <MlOrders onClickItem={() => setIsActive({ name: 'other', id: '7', title: 'متفرقه' })} isActive={isActive.name === 'other' ? true : false} Element="tabSlide" tabTitleI="غیره" tabTitleII={purchaseState[5] ? purchaseState[5].invoiceCnt : ''} iconI={theme === "light" ? procIconL : procIconD} />
            </div>
          </div>
        </div>

        {/* title & orderItems---------------------------------------------- */}
        <div dir='ltr' className='w-full flex items-end justify-end flex-col mt-8 mb-4  ' >
          <AtomText title={'سفارش های' + ' ' + isActive.title} className="text-base font-bold mt-8 w-auto mb-1 text-right text-[#353535] dark:text-[#EDEDED]" />
          <div className='w-16 pl-4  border-b-4 rounded-tl-sm rounded-ee-md  border-[#1B96FF]  leading-8 '></div>
        </div>

        {newPurchaseData?.length > 0 && newPurchaseData.map((item, index) => (
          <div dir='ltr' key={index} ref={lastPostRef} >
            <OrgCurrentOrders
              datePickerIcon={theme === 'light' ? groceryL : groceryD}
              productsIcon1={theme === 'light' ? PackageL : PackageD}
              datePickerTitle={item?.orderDate}
              linkTitle="بیشتر"
              productsTitle={item.items?.length >= 4 ? ' 4+ کالا ثبت سفارش شده' : `${item.items?.length || ''} + کالا ثبت سفارش شده`}
              orderNumberTitle=" شماره سفارش"
              orderNumberCode={item?.orderNo}
              onClickDetails={() => {
                dispatch(fetchOrderDetails({ orderNo: item.orderNo, state: item.state })).then((res) => {
                  if (res?.payload?.data) {
                    const data = res.payload.data.purchaseRecordsByID
                    if (data) {
                      { sessionStorage.setItem("orderNo", item.orderNo) }
                      { sessionStorage.setItem("state", item.state) }
                      navigate('details')
                    }
                  }
                })
              }
              }
            />
          </div>
        ))}

        {!pendFetchOrder && newPurchaseData && newPurchaseData.length <= 0 && (
          <div className='flex items-center justify-center flex-col gap-4 pt-6 bg-transparent m-auto'>
            <AtomIcon src={theme === "light" ? notOrderIconL : notOrderIconD} width={150} height={150} alt="notValueIcon" />
            <AtomText title={`در حال حاضر هیچ سفارش ${noDataMessages} ندارید!`} className="text-[#353535] dark:text-[#EDEDED] text-sm font-normal" />
          </div>
        )}
        {pendFetchOrder && (
          <div className="w-full h-full top-10 relative items-center flex justify-center ">
            <svg aria-hidden="true" className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
          </div>
        )}

        {toTopButtonShow && (
          <div onClick={() => dispatch(stateToTopScroll(true))} className='w-10 h-10 absolute top-[80%] left-10 cursor-pointer bg-slate-50 dark:bg-[#353535] flex rounded-full hover:scale-105 duration-500'>
            <AtomIcon src={theme === "light" ? toTopIcon : toTopIconDark} width={32} height={32} alt="toTop" className="m-auto " />
          </div>
        )}

      </div>
      <OrgFooter />
    </div>
  )
}
