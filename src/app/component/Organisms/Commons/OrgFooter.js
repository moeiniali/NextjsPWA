import React, { useEffect } from 'react';
import { AtomIcon, AtomText } from '../../exAllCo';
import '../Organism.css';
import homeBIcon from '../../../assets/images/footer&&header/home-2-b.svg';
import homeWIcon from '../../../assets/images/footer&&header/home-2-w.svg';
import homeD from '../../../assets/images/footer&&header/homeD.svg';
import StarBIcon from '../../../assets/images/footer&&header/Starb.svg';
import StarWIcon from '../../../assets/images/footer&&header/Starw.svg';
import moneysBIcon from '../../../assets/images/footer&&header/moneysbD.svg';
import moneysWIcon from '../../../assets/images/footer&&header/moneysw.svg';
import moneysbD from '../../../assets/images/footer&&header/moneysD.svg';
import truckBIcon from '../../../assets/images/footer&&header/truckb.svg';
import truckWIcon from '../../../assets/images/footer&&header/truckw.svg';
import truckD from '../../../assets/images/footer&&header/truckD.svg';
import UnionIcon from '../../../assets/images/footer&&header/Union.svg';
import starD from '../../../assets/images/footer&&header/StarD.svg';
import { useNavigate } from 'react-router-dom';
import { stateFooterController, setFooterController } from '../../../redux/persist/publicPersist';
import { useDispatch, useSelector } from 'react-redux';



const OrgFooter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const footerController = useSelector(stateFooterController)
  const theme = localStorage.getItem('theme')

  useEffect(() => {
    if (footerController && footerController === 'tab1') {
      navigate('/home')
    } else if (footerController && footerController === 'tab2') {
      navigate('/orders')
    } else if (footerController && footerController === 'tab3') {
      navigate('/financial ')
    } else if (footerController && footerController === 'tab4') {
      navigate('/points')
    }
  }, [footerController])




  return (
    <>
      <div className="containerFooter">
        <div className="footer">
          <div className='contentFooter dark:bg-[#001639]'>

            <div className='w-full h-20 relative flex justify-evenly items-center shadow-[0px_-1px_20px_rgba(0,0,0,0.2)] '>


              <div
                className='w-full h-full flex flex-col items-center justify-center gap-1 cursor-pointer duration-1000' onClick={() => dispatch(setFooterController('tab4'))} >
                <AtomIcon src={`${footerController === "tab4" ? StarBIcon : theme === 'light' ? StarWIcon : starD}`} alt="pointsIcon" width={24} height={24} />
                <AtomText title="امتیازات" className={`${footerController === "tab4" ? 'text-[#1B96FF] ' : 'text-[#353535] dark:text-[#EDEDED]'}`} />
                {footerController === 'tab4' && (
                  <img src={UnionIcon} alt="UnionIcon" width={100} height={100} className='bottom-0 absolute   ' />
                )}
              </div>


              <div
                className='w-full h-full flex flex-col items-center justify-center gap-1 cursor-pointer duration-1000' onClick={() => dispatch(setFooterController('tab3'))} >

                <AtomIcon src={`${footerController === "tab3" ? moneysBIcon : theme === 'light' ? moneysWIcon : moneysbD}`} alt="moneysIcon" width={24} height={24} />
                <AtomText title="مالی" className={`${footerController === "tab3" ? 'text-[#1B96FF] ' : 'text-[#353535] dark:text-[#EDEDED]'}`} />
                {footerController === 'tab3' && (
                  <img src={UnionIcon} alt="UnionIcon " width={100} height={100} className=' bottom-[2px] absolute  ' />
                )}
              </div>

              <div
                className='w-full h-full flex flex-col items-center justify-center gap-1 cursor-pointer duration-1000' onClick={() => dispatch(setFooterController('tab2'))} >
                <AtomIcon src={`${footerController === "tab2" ? truckBIcon : theme === 'light' ? truckWIcon : truckD}`} alt="truckIcon" width={24} height={24} />
                <AtomText title="سفارشات" className={`${footerController === "tab2" ? 'text-[#1B96FF] ' : 'text-[#353535] dark:text-[#EDEDED]'}`} />
                {footerController === 'tab2' && (
                  <img src={UnionIcon} alt="UnionIcon" width={100} height={100} className=' bottom-[2px] absolute  ' />
                )}</div>

              <div

                className='w-full h-full flex flex-col items-center justify-center gap-1 cursor-pointer duration-1000' onClick={() => dispatch(setFooterController('tab1'))} >
                <AtomIcon src={`${footerController === "tab1" ? homeBIcon : theme === 'light' ? homeWIcon : homeD}`} alt="homeIcon" width={24} height={24} />
                <AtomText title="خانه" className={`${footerController === "tab1" ? 'text-[#1B96FF] ' : 'text-[#353535] dark:text-[#EDEDED]'}`} />
                {footerController === 'tab1' && (
                  <AtomIcon src={UnionIcon} alt="UnionIcon" width={100} height={100} className='bottom-[2px] absolute  ' />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>



    </>);
}

export default OrgFooter;