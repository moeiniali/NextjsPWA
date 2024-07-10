import React, { Component } from 'react';
import { Link } from 'react-router-dom';


const AtomLink = (props) => {
 return (
  <>
   <Link className={props.className} target={props.target} to={props.to} {...props} > {props.children} </Link>

  </>);
}

export default AtomLink;