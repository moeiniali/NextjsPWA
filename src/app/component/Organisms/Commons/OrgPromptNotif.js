import '../Organism.css';
import React, { useState, useEffect, useRef } from 'react';
import { AtomText } from '../../exAllCo';
import { useDispatch, useSelector } from 'react-redux';
import { setIsPushNotification } from '../../../redux/persist/publicPersist';



let deferredPrompt = null;


const OrgPromptNotification = () => {
  const dispatch = useDispatch();
  const isPushNotification = useSelector((state) => state.publicPersist.isPushNotification);
  const [isInstalled, setIsInstalled] = useState(null);
  const [supportedBrowser, setSupportedBrowser] = useState(null);
  const [hideAlert, setHideAlert] = useState(false);

  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  const currentDiv = useRef(0);




  // Listen for beforeinstallprompt event-----------------------------------------------------
  useEffect(() => {
    const beforeInstallPromptListener = (e) => {
      e.preventDefault();
      deferredPrompt = e;
    };
    window.addEventListener('beforeinstallprompt', beforeInstallPromptListener);
    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstallPromptListener);
    };
  }, []);

  // supported pwa notification alert in browsers---------------------------------------
  useEffect(() => {
    if ('getInstalledRelatedApps' in navigator) {
      setSupportedBrowser(true);
    } else {
      setSupportedBrowser(false);
    }
  }, []);


  // Check if the app is already installed-----------------------------------------
  useEffect(() => {
    window.addEventListener('appinstalled', (e) => {
      setIsInstalled(true);
    });
  }, []);

  // url checked---------------------------------------------------
  useEffect(() => {
    if (deferredPrompt) {
      const timer = setTimeout(() => {
        dispatch(setIsPushNotification(false))
      }, 10000);
      return () => clearInterval(timer)
    }
  }, []);


  // Handler for install button click
  const handleInstallClick = async () => {

    dispatch(setIsPushNotification(false))
    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === 'accepted') {
      console.log('PWA was installed');
    } else {
      console.log('PWA was not installed');
    }
    deferredPrompt = null;
  };


  const handleDragStart = (event) => {
    setIsDragging(true);
    const clientX = event.type.includes('touch') ? event.touches[0].clientX : event.clientX;
    setDragStartX(clientX);
  };

  const handleDragMove = (event) => {
    if (isDragging) {
      const clientX = event.type.includes('touch') ? event.touches[0].clientX : event.clientX;
      setTranslateX(translateX + (clientX - dragStartX));
      setDragStartX(clientX);
    }
  };

  const handlerLeaveMouse = () => {
    setDragStartX(0)
    setTranslateX(0)
    setIsDragging(false)
  }
  const handleDragEnd = () => {
    setIsDragging(false);
    setTranslateX(0);
    setDragStartX(0)
  };

  useEffect(() => {
    const Division = Math.round(currentDiv.current.clientWidth / 2);
    if (translateX > Division) {
      setHideAlert(true)
      dispatch(setIsPushNotification(false))
    }
    if (translateX < 0) {
      setTranslateX(0)
    }
  }, [translateX])



  return (
    <>
      {
        deferredPrompt &&
        isPushNotification &&
        supportedBrowser &&
        !hideAlert &&
        !isInstalled &&
        (
          <div className={`w-full  left-0 h-14 border-r-2  absolute z-[999]  overflow-hidden flex items-center justify-center m-auto top-6 duration-700 cursor-grab`}>

            <div className='w-full h-full lg:max-w-[360px] m-auto overflow-hidden absolute'>

              <div
                ref={currentDiv}
                onMouseLeave={handlerLeaveMouse}
                onMouseDown={handleDragStart}
                onMouseMove={isDragging ? handleDragMove : null}
                onMouseUp={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchMove={isDragging ? handleDragMove : null}
                onTouchEnd={handleDragEnd}
                style={{
                  transform: `translateX(${translateX}px)`,
                  transition: 'transform 0.2s ease',
                }}
                className={`w-full lg:max-w-[360px] m-auto absolute h-14 rounded-s-md  bg-[#EEF4FF] select-none duration-1000 flex flex-row justify-center items-center gap-2 cursor-${isDragging ? 'grabbing' : 'grab'}`}>
                <button onClick={handleInstallClick} type="button" className="w-auto h-8  relative rounded-full font-medium text-sm hover:scale-95 duration-700 whitespace-nowrap px-4  flex items-center justify-center  text-[#1B96FF] bg-inherit border  border-[#1B96FF]">
                  نصب برنامه
                </button>

                <AtomText
                  title=".برای تجربه کاربری بهتر، برنامه را نصب کنید"
                  className="relative whitespace-nowrap font-normal text-sm text-[#353535] "
                />


              </div>


            </div>
          </div>

        )}




    </>);
}

export default OrgPromptNotification;