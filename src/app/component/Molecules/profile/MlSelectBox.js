import React, { Component, useRef, useState } from 'react';
import { AtomText, AtomIcon, AtomButton, AtomInput } from '../../exAllCo';
import cameraIcon from '../../../assets/images/profile/camera.svg';
import galleryIcon from '../../../assets/images/profile/gallery.svg';
import { translate } from '@neshan-maps-platform/ol/transform';
import '../../Molecules/Molecules.css'

const MlSelectBox = ({ Element, onClickSelectBox, titleII, titleIII, iconI, iconII, altI, altII, titleI, heightI, widthI, widthII, heightII, props,
  defaultCheckedLight, defaultCheckedDark, defaultCheckedAuto, lightLabel, darkLabel, autoLabel, modeButtonChildren, modeButtonOnClick, showSelectBox,
  onChangeLight, onChangeDark, onChangeAuto, editProfileOnClick, onChangeGallery, onChangeCamera, dropDownEditProfileID, profileHeaderIconID }) => {

  const theme = localStorage.getItem('theme');
  const [clickCamera, setClickCamera] = useState(false);



  const handlerCameraInput = (e) => {
    document.getElementById('camera').click();
  }
  const handlerGalleryInput = (e) => {
    document.getElementById('gallery').click();
  }





  const allType = (Element) => {
    switch (Element) {
      case 'selectBox':
        return (
          <>
            <div dir='rtl' onClick={onClickSelectBox} className='w-full  flex flex-row hover:scale-95 duration-700  items-center justify-between dark:border-[#757575] border-b-2 pb-4 my-4 cursor-pointer'>

              <div onClick={onClickSelectBox} className='flex w-full   flex-row items-center gap-4 duration-700 text-right '>
                {iconII && (
                  <AtomIcon src={iconII} alt={altII} {...props} width={widthII} height={heightII} className="bg-[#EEF4FF] dark:bg-[#03234D] rounded-full p-1" />
                )}
                <div className='flex flex-col '>
                  <AtomText title={titleI} className="text-[#353535] dark:text-[#EDEDED] font-medium text-sm" />
                  <AtomText title={titleII} className="text-[#353535] dark:text-[#EDEDED] font-normal text-sm" />
                  <AtomText title={titleIII} className="text-[#353535] dark:text-[#EDEDED] font-normal text-sm" />
                </div>
              </div>
              {iconI && (
                <AtomIcon src={iconI} alt={altI}{...props} width={widthI} height={heightI} />
              )}
            </div>
          </>
        );
      case 'profileHeader':
        return (
          <div className='w-full h-full flex flex-col items-center justify-center '>
            <div className='flex'>
              <AtomIcon onClick={editProfileOnClick} src={iconI} alt={altI} {...props} width={80} height={80} className="w-16 border border-[#EEF4FF] rounded-full p-2 cursor-pointer" />
              <AtomIcon onClick={editProfileOnClick} id={profileHeaderIconID} src={iconII} alt={altII} {...props} width={24} height={24} className="absolute mt-12 ml-12 cursor-pointer dark:bg-[#001639] rounded-lg"  />
            </div>
            <AtomText title={titleI} className="pt-2" />
            <AtomText title={titleII} />

          </div>)
      case 'dropDownSelect':
        return (<>

          <div className='w-full relative duration-700'>
            <div className=" w-full h-[298px]  fixed bottom-0  left-0 z-50  m-aut" >
              <div dir='rtl' className='w-full lg:max-w-[360px]  h-full rounded-t-[32px]  bottom-0 left-0 py-2   dark:dark:bg-[#001639]  m-auto  
            shadow-[0px_-10px_10px_0px_#e6e6e6] dark:shadow-none dark:border-t dark:border-[#757575]' >

                <div onClick={showSelectBox} className='m-auto w-[80%]  dark:bg-[#001639] flex items-center justify-center  h-5 cursor-pointer  '>
                  <svg xmlns="http://www.w3.org/2000/svg" width="58" height="2" viewBox="0 0 58 2" fill="none">
                    <path d="M1 1H57" stroke="#C9C7C5" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>

                <div className='w-full h-full bg-white  dark:bg-[#001639]  px-8 pt-6  flex flex-col justify-start items-start  '>
                  <div className='border-b-2 border-[#EDEDED] dark:border-[#353535] w-full p-2 flex items-center gap-2  hover:border-blue-100 '>
                    <input id='light' name="flexRadioDefault" defaultChecked={defaultCheckedLight} type="radio" value="light" className='cursor-pointer' onChange={onChangeLight} />
                    <label htmlFor="light" className='cursor-pointer'>{lightLabel}</label>
                  </div>

                  <div className='border-b-2 border-[#EDEDED] dark:border-[#353535] w-full p-2 flex items-center gap-2 hover:border-blue-100'>
                    <input id='dark' type="radio" name="flexRadioDefault" defaultChecked={defaultCheckedDark} value="dark" className='cursor-pointer' onChange={onChangeDark} />
                    <label htmlFor="dark" className='cursor-pointer'>{darkLabel}</label>
                  </div>

                  <div className='  dark:border-[#353535] w-full p-2 flex items-center gap-2 hover:border-blue-100'>
                    <input id='auto' type="radio" name="flexRadioDefault" defaultChecked={defaultCheckedAuto} value="auto" className='cursor-pointer' onChange={onChangeAuto} />
                    <label htmlFor="auto" className='cursor-pointer'> {autoLabel} </label>
                  </div>

                  <div className='w-[202px] h-[48px] m-auto  '>
                    <AtomButton children={modeButtonChildren} onClick={modeButtonOnClick} />
                  </div>

                </div>
              </div>
            </div>
          </div >

        </>)

      case 'dropDownEditProfile':
        return (<>
          <div className='dropDownEditProfile w-full relative duration-700 bg-white dark:bg-[#001639]'>
            <div className="dropDownEditProfileID w-full h-[298px]  fixed bottom-0  left-0 z-50  m-auto bg-white dark:bg-[#001639] " >
              <div id={dropDownEditProfileID} dir='rtl' className='dropDownEditProfileID w-full lg:max-w-[360px]  h-full rounded-t-[32px]  bottom-0 left-0 py-2   dark:bg-[#001639]  m-auto bg-white    
                  shadow-[-3px_4px_20px_0px_#0000001a]  dark:border-t dark:border-[#757575]' >
                <div onClick={showSelectBox} className='dropDownEditProfileID m-auto w-[80%]  dark:bg-[#001639] flex items-center justify-center  h-5 cursor-pointer bg-white '>
                  <svg xmlns="http://www.w3.org/2000/svg" width="58" height="2" viewBox="0 0 58 2" fill="none">
                    <path d="M1 1H57" stroke="#C9C7C5" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div className='dropDownEditProfileID w-full h-full  dark:bg-[#001639]  px-8 pt-6  flex flex-col justify-start items-start  '>
                  <div onClick={handlerGalleryInput} className='border-b-2 border-[#EDEDED] dark:border-[#353535] w-full p-2 flex items-center gap-2  hover:border-blue-100 cursor-pointer hover:scale-95 duration-700'>
                    <AtomInput onChange={onChangeGallery} id="gallery" type='file' accept="image/JPEG , image/png " className=" hidden" />
                    <AtomIcon src={theme === 'light' ? cameraIcon : cameraIcon} />
                    <AtomText title="از گالری" />
                  </div>

                  <div onClick={handlerCameraInput} className=' dark:border-[#353535] w-full p-2 flex items-center gap-2  cursor-pointer hover:scale-95 duration-700'>
                    <AtomInput onChange={onChangeCamera} id="camera" type='file' accept="image/JPEG ,image/png " capture className=" hidden" />
                    <AtomIcon src={theme === 'light' ? galleryIcon : galleryIcon} />
                    <AtomText title="از دوربین" />
                  </div>

                </div>
              </div>
            </div>
          </div >


        </>)


      default:
        return '';
    }
  }


  return (<>


    {allType(Element)}



  </>);
}

export default MlSelectBox;