import React, { Component, useEffect, useState, useMemo } from 'react';
import { OrgHeader, AtomIcon, AtomText, MlAllHomeElement, OrgSkeleton } from '../../exAllCo';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHomeNotification, fetchMessagesStatus } from '../../../redux/home/HomeSlice';
import notOrderIconL from '../../../assets/images/home/Mask GroupL.svg'
import notOrderIconD from '../../../assets/images/home/Mask GroupD.svg'
import { useNavigate } from 'react-router-dom';

const OrgNotification = () => {
  const theme = localStorage.getItem('theme');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [messageStatus, setMessageStatus] = useState(true);

  const [isAccordion, setIsAccordion] = useState([]);
  const notificationList = useSelector((state) => state.HomeSlice.notificationList);
  const loading = useSelector((state) => state.HomeSlice.notificationListPending);



  //memoization data ---------------
  const MemoizationNotificationList = useMemo(() => {
    return Array.isArray(notificationList)
      ? notificationList.map((item) => {
        return item;
      }) : []
  }, [notificationList])


  // call fetchHomeNotification API---------------------------
  useEffect(() => {
    dispatch(fetchHomeNotification())
  }, [])

  const handlerClickAccordion = (item) => {
    //This part of the code is related to accordion opening and closing of messages
    const newIsAccordion = [...isAccordion];
    newIsAccordion[item.id] = !newIsAccordion[item.id]
    setIsAccordion(newIsAccordion);
    // read or unread messages status fetch--------------------------------------
    dispatch(fetchMessagesStatus(item.id));
    if (item.unread === true) {
      dispatch(fetchHomeNotification())
    }
  }


  return (
    <>
      <OrgHeader HeaderTitle="پیام ها" goBackRout={() => navigate('/home')} />

      {MemoizationNotificationList?.length > 0 && MemoizationNotificationList.map((item, index) =>
      (
        <div key={index}>
          <MlAllHomeElement Element="Accordion"
            handlerClickAccordion={() => handlerClickAccordion(item)}
            AccordionTitle={!MemoizationNotificationList && loading ? <OrgSkeleton width={100} /> : item.title}
            AccordionDate={!MemoizationNotificationList && loading ? <OrgSkeleton width={100} /> : item.eventDateCaption}
            AccordionDescription={!MemoizationNotificationList && loading ? <OrgSkeleton width={100} /> : item.message}
            isAccordion={isAccordion[item.id]}
            isMessageUnRead={item.unread}
            getMessageStatus={messageStatus}
          />
        </div>
      ))}

      {!loading && MemoizationNotificationList?.length <= 0 && (
        <div className='flex items-center justify-center flex-col gap-4 pt-20'>
          <AtomIcon src={theme === " light" ? notOrderIconL : notOrderIconD} />
          <AtomText title="در حال حاضر هیچ پیامی ندارید! " className="text-[#353535] dark:text-[#EDEDED] text-sm font-normal" />
        </div>
      )
      }
      {!MemoizationNotificationList || MemoizationNotificationList.length <= 0 && loading && (
        <div className="relative items-center py-20  flex justify-center">
          <svg aria-hidden="true" className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
        </div>
      )}


    </>
  );
}

export default OrgNotification;