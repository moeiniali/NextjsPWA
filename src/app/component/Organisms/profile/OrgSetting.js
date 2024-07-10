import React, { Component, useEffect, useState } from 'react';
import OrgHeader from '../Commons/OrgHeader';
import { AtomButton, MlSelectBox } from '../../exAllCo';
import modeIcon from '../../../assets/images/profile/Frame dark and light mode.svg'
import modeIconDark from '../../../assets/images/profile/Frame 427319843 (1).svg'
import arrowIcon from '../../../assets/images/profile/arrow-left.svg';
import arrowDownIcon from '../../../assets/images/profile/arrow-down.svg';
import { useMainContext } from '../../../context/mainContext';
import { useNavigate } from 'react-router-dom';
import { setBlurBack } from '../../../redux/common/commonRedux';
import { useDispatch, useSelector } from 'react-redux';

const OrgSetting = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const blurBack = useSelector((state) => state.commonRedux.blurBack)
  const [showSelectBox, setShowSelectBox] = useState(false);
  const { changeTheme, changeMode, mode, theme } = useMainContext();
  const localMode = localStorage.getItem('mode');



  const handlerClickChangeMode = async () => {
    if (mode === 'light') {
      changeTheme('light')
    } else if (mode === 'dark') {
      changeTheme('dark')
    } else if (mode === 'auto') {
      const mediaQuery = matchMedia("(prefers-color-scheme: dark)");
      if (mediaQuery.matches) {
        changeTheme('dark')
      }
      else {
        changeTheme('light')
      }
    }
    setShowSelectBox(!showSelectBox);
    dispatch(setBlurBack(!blurBack));
  }

  // handler show and disabled selectBox------------------------------
  const handleShowSelectBox = () => {
    setShowSelectBox(!showSelectBox)
    dispatch(setBlurBack(!blurBack));
  }
  const handleDisabledSelectBox = () => {
    setShowSelectBox(!showSelectBox)
    dispatch(setBlurBack(!blurBack));
  }
  useEffect(() => {
    const forBlur = document.getElementById("forBlur")
    forBlur.addEventListener('click', () => {
      setShowSelectBox(false)
      dispatch(setBlurBack(false));
    })
  }, [])


  return (
    <>

      <OrgHeader HeaderTitle="تنظیمات برنامه" goBackRout={() => navigate('/profile')} />


      <div id='forBlur' className={`h-full  ${blurBack ? 'blur-sm' : ''}`} >
        <MlSelectBox onClickSelectBox={handleShowSelectBox} Element="selectBox" iconII={theme === 'light' ? modeIcon : modeIconDark} iconI={showSelectBox ? arrowDownIcon : arrowIcon} altI="arrowIcon" altII="modeIcon"
          titleI="تنظیمات برنامه"
          widthI='16' heightI='16' widthII='32' heightII='32' />
      </div>

      {showSelectBox && (
        <MlSelectBox Element="dropDownSelect" showSelectBox={handleDisabledSelectBox}
          defaultCheckedLight={localMode && localMode === 'light' && true} lightLabel="روز" onChangeLight={(e) => changeMode(e.target.value)}
          defaultCheckedDark={localMode && localMode === 'dark' && true} darkLabel="شب" onChangeDark={(e) => changeMode(e.target.value)}
          defaultCheckedAuto={localMode && localMode === 'auto' && true} autoLabel="متناسب با سیستم " onChangeAuto={(e) => changeMode(e.target.value)}
          modeButtonChildren="تایید" modeButtonOnClick={handlerClickChangeMode} />
      )}


    </>
  );
}

export default OrgSetting;