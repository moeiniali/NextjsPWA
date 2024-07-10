import React, { Component, useEffect, useState } from 'react';
import aImg from '../../../assets/images/home/Slide1.svg';
import bImg from '../../../assets/images/home/Slide2.svg';

const MlBannerSlider = () => {

 const [currentImageIndex, setCurrentImageIndex] = useState(0);

 useEffect(() => {
  const interval = setInterval(() => setCurrentImageIndex((currentImageIndex + 1) % 3), 4000);
  return () => clearInterval(interval);
 }, [currentImageIndex]);

 const images = [
  {
   src: aImg,
   width: "296px",
   height: '100%'
  },
  {
   src: bImg,
   width: "296px",
   height: '100%'
  },
  {
   src: aImg,
   width: "296px",
   height: '100%'
  },
  {
   src: bImg,
   width: "296px",
   height: '100%'
  },
  {
   src: aImg,
   width: "296px",
   height: '100%'
  },
  {
   src: bImg,
   width: "296px",
   height: '100%'
  },

 ];
 // const currentImage = images[currentImageIndex];

 return (
  <div className="w-full  h-[168px] bg-cover flex relative flex-nowrap   flex-1  justify-center items-center overflow-hidden">

   <div className='w-full  flex flex-1  justify-between '>
    {images.map((image, index) => (
     <img
      alt='imageSlide'
      key={index}
      src={image.src}
      className='duration-1000  '
      style={{
       position: "absolute",
       right: (index - currentImageIndex) * 260,
       top: 0,
       width: "240px",
       height: "100%",
      }}
     />
    ))}


   </div>

  </div>
 );
}


export default MlBannerSlider;