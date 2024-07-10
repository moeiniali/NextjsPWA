import React, { useMemo, useEffect, useState, useRef } from 'react';
import { OrgFooter, MlHomeHeader, OrgSkeleton, MlBannerSlider, OrgCurrentOrders, OrgCounter, AtomText, AtomIcon } from '../../exAllCo';
import starsIconL from '../../../assets/images/home/starL.svg';
import starsIconD from '../../../assets/images/home/starD.svg';
import bagIconL from '../../../assets/images/home/bagL.svg';
import bagIconD from '../../../assets/images/home/bagD.svg';
import likeIconL from '../../../assets/images/home/like-shapes-l.svg';
import likeIconD from '../../../assets/images/home/like-shapes-d.svg';
import PackageL from '../../../assets/images/home/packageL.svg';
import PackageD from '../../../assets/images/home/packageD.svg';
import groceryL from '../../../assets/images/home/groceryL.svg';
import groceryD from '../../../assets/images/home/groceryD.svg';
import notOrderIconL from '../../../assets/images/home/Mask GroupL.svg';
import notOrderIconD from '../../../assets/images/home/Mask GroupD.svg'
import { fetchOrderDetails } from '../../../redux/orders/orderSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserAvatar } from '../../../redux/persist/publicPersist';
import { fetchPurchaseRecordsByRange } from '../../../redux/home/HomeSlice';
import { stateFromValue } from '../../../redux/home/HomeSlice';

const OrgHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = localStorage.getItem('theme');
  const panelInfo = useSelector((state) => state.HomeSlice.panelInfo);
  const panelInfoPending = useSelector((state) => state.HomeSlice.panelInfoPending);
  const purchaseRecordsByRangeRes = useSelector((state) => state.HomeSlice.purchaseRecordsByRange);
  const purchaseLoading = useSelector((state) => state.HomeSlice.purchaseRecordsByRangePending);
  const fromPage = useSelector((state) => state.HomeSlice.fromValue);

  const intObserver = useRef();
  const lastPostRef = useRef();
  const scrollWindow = useRef();
  const [hasNextPage, setHasNexPage] = useState(false);
  const [newPurchaseData, setNewPurchaseData] = useState([]);


  //memoization data ---------------
  const MemoizationPanelInfo = useMemo(() => {
    return panelInfo;
  }, [panelInfo]);



  const MemoizationPurchaseData = useMemo(() => {
    return Array.isArray(purchaseRecordsByRangeRes)
      ? purchaseRecordsByRangeRes.map((item) => {
        return item;
      }) : []
  }, [purchaseRecordsByRangeRes]);






  //fetchPurchaseRecordsByRange for displaying current items--------------------------------------------------------------
  useEffect(() => {
    dispatch(fetchPurchaseRecordsByRange(fromPage)); //true
  }, [dispatch, fromPage]); // Dependency array includes dispatch


  // append purchase data to new state---------------\
  useEffect(() => {
    if (MemoizationPurchaseData) {
      setNewPurchaseData((prev) =>
        Array.isArray(prev) ? [...prev, ...MemoizationPurchaseData] : [...MemoizationPurchaseData]);
    }
  }, [MemoizationPurchaseData]);




  // Observer handler--------------------------------------------------------
  useEffect(() => {
    if (purchaseLoading) return; // Skip if data is loading
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
  }, [purchaseLoading, hasNextPage]); // Dependency array includes loading state

  // Check for next page availability after data fetch
  useEffect(() => {
    if (purchaseRecordsByRangeRes) {
      setHasNexPage(purchaseRecordsByRangeRes.length >= 20);
      // Set flag based on data length
    }
  }, [purchaseRecordsByRangeRes]); // Dependency array includes purchased records





  // Send the profile picture to the profile page so that the profile picture is not deleted every time it is refreshed
  useEffect(() => {
    if (MemoizationPanelInfo) {
      dispatch(setUserAvatar(MemoizationPanelInfo.avatarBase64))
    }
  }, []);



  return (
    <div ref={scrollWindow} className=''>
      <>



        <MlHomeHeader />

        <OrgCounter
          icon_III={theme === 'light' ? starsIconL : starsIconD}
          icon_II={theme === 'light' ? bagIconL : bagIconD}
          icon_I={theme === 'light' ? likeIconL : likeIconD}

          // counter_III={panelInfo && panelInfo.score ? panelInfo.score : <OrgSkeleton width={50} height={10} />}
          counter_III={!MemoizationPanelInfo || MemoizationPanelInfo.length <= 0 && panelInfoPending ? <OrgSkeleton width={50} /> : MemoizationPanelInfo?.score >= 0 ? MemoizationPanelInfo.score : ''}
          counter_II={!MemoizationPanelInfo || MemoizationPanelInfo.length <= 0 && panelInfoPending ? <OrgSkeleton width={50} /> : MemoizationPanelInfo?.saleCount ? MemoizationPanelInfo.saleCount + ' ' + ' دفعه' : ''}
          counter_I={!MemoizationPanelInfo || MemoizationPanelInfo.length <= 0 && panelInfoPending ? <OrgSkeleton width={50} /> : MemoizationPanelInfo?.daysFromRegister ? MemoizationPanelInfo.daysFromRegister + " " + 'روز' : ''}
          title_III="امتیازات" title_II='خرید' title_I='وفاداری' alt_I="likeIcon" alt_II="bagIcon" alt_III="starsIcon"
        />

        <MlBannerSlider />
        {/* title--------------- */}
        <div className='w-full flex items-end justify-end flex-col mt-4  ' >
          <p className='w-auto mb-1 text-right font-bold text-[#353535] dark:text-[#EDEDED]'>سفارش های جاری</p>
          <div className='w-16 pl-4  border-b-4 rounded-tl-sm rounded-ee-md  border-[#1B96FF]  leading-8 '></div>
        </div>



        {newPurchaseData?.length > 0 && newPurchaseData.map((item, index) =>
        (
          <div key={index} ref={lastPostRef}>
            <OrgCurrentOrders
              datePickerIcon={theme === 'light' ? groceryL : groceryD}
              productsIcon1={theme === 'light' ? PackageL : PackageD}
              datePickerTitle={item && item.orderDate}
              linkTitle="بیشتر"
              productsTitle={item.items?.length >= 4 ? ' 4+ کالا ثبت سفارش شده' : `${item.items?.length || '4'} + کالا ثبت سفارش شده`}
              orderNumberTitle={' شماره سفارش'}
              orderNumberCode={item.orderNo}
              onClickDetails={() => {
                dispatch(fetchOrderDetails({ orderNo: item.orderNo, state: item.state })).then((res) => {
                  if (res.payload && res.payload.data) {
                    const data = res.payload.data.purchaseRecordsByID
                    if (data) {
                      { sessionStorage.setItem("orderNo", item.orderNo) }
                      { sessionStorage.setItem("state", item.state) }
                      navigate('/orders/details')
                    }
                  }
                })
              }
              } />
          </div>
        ))}

        {!purchaseLoading && newPurchaseData?.length <= 0 && (
          <div className='flex items-center justify-center flex-col gap-4 pt-6 '>
            <AtomIcon src={theme === "light" ? notOrderIconL : notOrderIconD} width={150} height={150} alt="notValueIcon" />
            <AtomText title="در حال حاضر هیچ سفارش جاری ندارید" className="text-[#353535] dark:text-[#EDEDED] text-sm font-normal" />
          </div>
        )}

        {!newPurchaseData || newPurchaseData.length <= 0 && purchaseLoading && (
          <div className="relative items-center py-20  flex justify-center">
            <svg aria-hidden="true" className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
          </div>
        )}

      </>

      <OrgFooter />
    </div>
  );
}

export default OrgHome;



