import { returnOrUpdate } from '@neshan-maps-platform/ol/extent';
import React, { useState, useEffect, useRef } from 'react';
import { stateToTopButtonShow,stateToTopScroll} from '../../../redux/common/commonRedux';
import { useDispatch, useSelector } from 'react-redux';
import { current } from '@reduxjs/toolkit';

const AtomMainLayout = ({ children, style }) => {
 const dispatch = useDispatch();
 const scrollRef = useRef();
 const toTopScroll = useSelector((state) => state.commonRedux.toTopScroll)
const [toTopButtonShow , setToTopButtonShow] = useState(false);


useEffect(() => {
  const scrollHandler = () => {
   if (scrollRef && scrollRef.current && scrollRef.current.scrollTop > 3000) {
    setToTopButtonShow(true);
   }else{
    setToTopButtonShow(false);   
   }
  };
  
  if(scrollRef && scrollRef.current) {
    scrollRef.current.addEventListener('scroll', scrollHandler);
  }
  return () => {
   if(scrollRef.current){
    scrollRef.current.removeEventListener('scroll', scrollHandler);
   }
  };
}, [dispatch ]); // [] ensures that the effect runs once after the initial render

useEffect(()=>{
 dispatch(stateToTopButtonShow(toTopButtonShow))
},[toTopButtonShow]);

useEffect(()=>{
if(toTopScroll){
 scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
 }
 dispatch(stateToTopScroll(false));
},[toTopScroll]);

 return (
  <>
   <main ref={scrollRef}   style={style} className={` dark:bg-[#001639] w-full h-full overflow-auto  px-8  shadow-lg z-0  rounded-lg   bg-white `}>
    {children}
   </main >
  </>
 );
}
export default AtomMainLayout;








































  //\\       ||        **
  //  \\      ||        ||        ____      ____
  //    \\     ||        ||       //\\      //\\
  //      \\    ||        ||     //  \\    //  \\
  //||||||||\\   ||        ||   //    \\  //    \\
  //          \\  ||||||||  || //      \\//      \\ 
  // 

