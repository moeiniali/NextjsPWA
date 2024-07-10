import React, { Component } from 'react';
import { AtomButton } from '../../exAllCo';
import { useMainContext } from '../../../context/mainContext';
const OrgChangeTheme = () => {

  const { theme, changeTheme } = useMainContext();


  const changeThemeHandler = () => {
    changeTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    <>
      <AtomButton onClick={changeThemeHandler }  Children="تغییر تم" />


    </>);
}

export default OrgChangeTheme;