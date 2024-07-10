import React, { Component, useState, useMemo } from 'react';
import headphoneIcon from '../../../assets/images/home/headphone.svg';
import notificationIcon from '../../../assets/images/home/notification.svg';
import useIcon from '../../../assets/images/home/useIcon.svg';
import userIconD from '../../../assets/images/home/userIconD.svg';
import { AtomIcon, AtomText, OrgSkeleton } from '../../exAllCo';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { load } from '@neshan-maps-platform/ol/Image';

const MlHomeHeader = () => {
  const supportNumber = "+982188800892";
  const navigate = useNavigate();
  const theme = localStorage.getItem('theme')
  // selectors---------------------------------
  const notificationCount = useSelector(state => state.HomeSlice.notificationCount);
  const panelInfo = useSelector(state => state.HomeSlice.panelInfo);
  const loading = useSelector((state) => state.HomeSlice.panelInfoPending);




  //memoization data ---------------
  const MemoizationPanelInfo = useMemo(() => {
    return panelInfo;
  }, [panelInfo]);

  return (
    <>
      <div className='w-full h-12 flex flex-1 flex-row justify-between items-center py-2 m-8 pr-8 '>
        <div className=' flex flex-row gap-4 ' >
          <div onClick={() => navigate('notification')} className='bg-[#EEF4FF] dark:bg-[#03234D] left-0 w-16 h-10 rounded-tr-2xl cursor-pointer -ml-16  rounded-br-2xl flex items-center justify-end pr-2 ' >
            <AtomIcon src={notificationIcon} alt="notificationIcon" width={24} height={24} />
            {notificationCount ? <span className='bg-[#00BA88] p-3 text-white mb-8 -mr-3 rounded-full w-4 h-4 flex items-center justify-center'>{notificationCount}</span> : null}
          </div>
          <div className='bg-[#EEF4FF] dark:bg-[#03234D] w-10 rounded-full left-0 flex items-center justify-center p-2 '>
            <Link to={"tel://" + supportNumber}>
              <AtomIcon src={headphoneIcon} className="cursor-pointer" alt="headphoneIcon" width={24} height={24} />
            </Link>
          </div>
        </div>
        <div className='items-center text-right flex gap-2  '>
          <div className='text-sm font-medium  '>
            <AtomText title={!panelInfo && loading ? <OrgSkeleton width={100} /> : MemoizationPanelInfo && MemoizationPanelInfo.name && MemoizationPanelInfo.family ? panelInfo.name + ' ' + MemoizationPanelInfo.family : ''} className="text-ellipsis  text-[#353535] dark:text-[#EDEDED]" />
            <AtomText title={!panelInfo && loading ? <OrgSkeleton width={100} /> : '!خوش آمدید '} className=" text-[#757575] dark:text-[#E1E1E1]" />
          </div>
          {!MemoizationPanelInfo && loading ? (
            <OrgSkeleton width={50} height={50} circle={true} />
          ) : (
            <AtomIcon src={MemoizationPanelInfo && MemoizationPanelInfo.avatarBase64 ? MemoizationPanelInfo.avatarBase64 : theme === 'light' ? useIcon : userIconD} alt="avatar" className=" cursor-pointer w-16 border border-[#EEF4FF] rounded-full p-2" width={48} height={48} onClick={() => navigate('/profile')} />
          )}
        </div>
      </div>
    </>);
}

export default MlHomeHeader;