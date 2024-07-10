import React, { Component } from 'react';
import './AtomInput.css';

const AtomInput = (props) => {

 return (
  <>
   <input  {...props}  className={`inputStyle my-4  dark:bg-[#001639] dark:border-[#757575] ${props.className} `} />
  </>
 );
};

export default AtomInput;
