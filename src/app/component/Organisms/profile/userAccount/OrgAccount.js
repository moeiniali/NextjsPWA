import React, { useEffect, Component, useState } from 'react';
import { MlSelectBox, AtomText, OrgHeader } from '../../../exAllCo';
import iconSharp from '../../../../assets/images/profile/hashtagL.svg';
import profileIcon from '../../../../assets/images/profile/profile-circleL.svg';
import simcardIcon from '../../../../assets/images/profile/simcard.svg';
import calendarIcon from '../../../../assets/images/profile/calendar-2.svg';
import subtitleIcon from '../../../../assets/images/profile/subtitle.svg';
import mobileIcon from '../../../../assets/images/profile/mobile.svg';
import callIcon from '../../../../assets/images/profile/call.svg';
import arrowIcon from '../../../../assets/images/profile/arrow-left.svg';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const OrgAccount = () => {
  const navigate = useNavigate();
  const profile = useSelector((state) => state.profileSlice.profile)


  return (
    <div className='h-full  '>
      {window.location.pathname === '/profile/account' ? (
        <>
          <OrgHeader HeaderTitle="اطلاعات حساب کاربری" goBackRout={() => navigate('/profile')} />
          <AtomText title="لطفا چنانچه هر بخش از اطلاعات حساب کاربری شما نادرست است با تصحیح آن ما را در ارائه خدمات شایسته یاری نمایید."
            className="text-right text-gray-500 mb-6 mt-5 font-medium text-sm" />

          <div>
            <MlSelectBox Element="selectBox" altII="icon" iconII={iconSharp}
              titleI="کد مشتری"
              titleII={profile[0] ? profile[0].keyData : ''}
              widthI='16' heightI='16' widthII='32' heightII='32' />
          </div>
          <div>
            <MlSelectBox onClickSelectBox={() => navigate('IdentityInformation')} Element="selectBox" altII="icon" altI="arrowIcon" iconI={arrowIcon} iconII={profileIcon}
              titleI="اطلاعات هویتی"
              titleII={profile[1] && profile[2] ? profile[1].keyData + " " + profile[2].keyData : ''}
              titleIII={profile[6] ? profile[6].keyData : ''}
              widthI='16' heightI='16' widthII='32' heightII='32' />
          </div>
          <div>
            <MlSelectBox onClickSelectBox={() => navigate('legalName')} Element="selectBox" altII="icon" altI="arrowIcon" iconI={arrowIcon} iconII={simcardIcon}
              titleI="نام حقوقی"
              titleII={profile[3] ? profile[3].keyData : ''}
              widthI='16' heightI='16' widthII='32' heightII='32' />
          </div>
          <div>
            <MlSelectBox onClickSelectBox={() => navigate('datePicker')}
              titleII={profile[20] ? profile[20].keyData : ''}
              Element="selectBox" altII="icon" altI="arrowIcon" iconI={arrowIcon} iconII={calendarIcon}
              titleI="تاریخ تولد" widthI='16' heightI='16' widthII='32' heightII='32' />
          </div>
          <div>
            <MlSelectBox onClickSelectBox={() => navigate('economicCode')}
              titleII={profile[5] ? profile[5].keyData : ''}
              Element="selectBox" altII="icon" altI="arrowIcon" iconI={arrowIcon} iconII={subtitleIcon}
              titleI="کد اقتصادی" widthI='16' heightI='16' widthII='32' heightII='32' />
          </div>
          <div>
            <MlSelectBox Element="selectBox" altII="icon" altI="arrowIcon" iconII={mobileIcon}
              titleII={profile[8] ? profile[8].keyData : ''}
              titleI=" شماره موبایل" widthI='16' heightI='16' widthII='32' heightII='32' />
          </div>
          <div>
            <MlSelectBox Element="selectBox" altII="icon" altI="arrowIcon" iconII={callIcon}
              titleII={profile[7] ? profile[7].keyData : ''}
              titleI="  شماره ثابت" widthI='16' heightI='16' widthII='32' heightII='32' />
          </div>
        </>
      ) : (
        <div className='h-full '>
          <Outlet />
        </div>
      )}

    </div>);
}
export default OrgAccount;