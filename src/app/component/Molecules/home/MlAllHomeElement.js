import React from 'react'
import { AtomIcon, AtomText } from '../../exAllCo';
import { useDispatch, useSelector } from 'react-redux';
import CaretDownLight from '../../../assets/images/home/CaretDown.svg';
import CaretDownDark from '../../../assets/images/home/CaretDownDark.svg';
import CaretUpDark from '../../../assets/images/home/CaretUp (1)Dark.svg';
import CaretUpLight from '../../../assets/images/home/CaretUpLight.svg';



export default function MlAllHomeElement({ Element, handlerClickAccordion, icon, isMessageUnRead, AccordionDescription,
  AccordionTitle, AccordionDate, getMessageStatus, titleI, titleII, isAccordion }) {

  const theme = localStorage.getItem('theme')
  const loading = useSelector(state => state.HomeSlice.notificationListPending)
  const dispatch = useDispatch();

  const allElements = (Element) => {
    switch (Element) {
      case "TTI":
        return (
          <>
            <AtomIcon src={icon} alt="icon" />
            <div>
              <AtomText title={titleI} />
              <AtomText title={titleII} />
            </div>
          </>
        )
      case "Accordion":
        return (
          <>

            <div dir='rtl' onClick={handlerClickAccordion} className='w-full h-auto overflow-x-hidden overflow-y-scroll cursor-pointer  flex  flex-col gap-2 pb-4 mt-4 border-b border-[#ECEBEA] dark:border-[#757575] no-scrollbar'>
              <div className={`relative w-full flex justify-between flex-row items-center `}>

                <div className='flex h-auto flex-row items-center gap-2 w-auto'>
                  {isMessageUnRead && (<div className='w-[6px] h-[6px] bg-[#00BA88] rounded-full'></div>)}
                  <AtomText title={AccordionTitle} className={`${isMessageUnRead ? 'text-[#080707] dark:text-[#FFFFFF]' : 'text-[#757575] dark:text-[#ADADAD]'} text-ellipsis overflow-auto  text-sm font-medium`} />
                </div>

                <div className='flex items-center gap-2 w-auto h-auto justify-end'>
                  <AtomText title={AccordionDate} className={`text-ellipsis overflow-auto text-[#ADADAD] dark:text-[#CBCBCB] text-xs font-normal`} />
                  <AtomIcon src={isAccordion && theme === "light" ? CaretDownLight : isAccordion && theme === "dark" ? CaretDownDark : !isAccordion && theme === "light" ? CaretUpLight : CaretUpDark} width={16} height={16} alt="icon" />

                </div>

              </div>
              <div dir='rtl' className={`h-auto  overflow-scroll no-scrollbar ${isAccordion ? 'max-w-[100%] h-auto ' : 'max-w-[70%]'}`}>
                <AtomText title={AccordionDescription}
                  className={`${isAccordion ? 'break-words h-auto' : 'overflow-hidden whitespace-nowrap text-ellipsis'} 
                  ${isMessageUnRead ? 'text-[#080707] dark:text-[#FFFFFF]' : 'text-[#757575] dark:text-[#ADADAD]'} text-xs font-normal  `} />
              </div>
            </div>

          </>
        )

      default:
        break;
    }
  }


  return (
    <>
      {allElements(Element)}
    </>
  )
}
