import React from 'react';
import '../../../assets/globalStyles/App.css';
import '../../../resources/IRANSansX.css'

const AtomText = (props) => {
  return (
    <>
      <p

        style={{
          ...props.style,
          width: "auto",
          lineHeight: '22px',
          fontFamily: "IRANSansX",
        }}
        className={`${props.className} ss01 dark:text-[#EDEDED] text-[#353535]  `}
        {...props} >
        {props.title}{props.desc}
      </p >
    </>);
}

export default AtomText;