import React, { Component, useState, useRef, useEffect, } from 'react';
import { AtomLink } from '../../exAllCo';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserLogin } from '../../../redux/login/ConfirmationSlice';
import { statePhoneNumber } from '../../../redux/login/LoginSlice';


const MlTimer = ({ clicked, disabledOtp }) => {

  const dispatch = useDispatch()

  //Selectors-------------------------------------
  const phoneNumber = useSelector(statePhoneNumber);
  // states--------------------------------------------------------
  const [minutes, setMinuets] = useState(1);
  const [seconds, setSeconds] = useState(30);


  // set Timer otp-------------------------------------
  useEffect(() => {
    const interVal = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interVal);
        } else {
          setSeconds(59);
          setMinuets(minutes - 1)
        }
      }
    }, 1000);
    return () => {
      clearInterval(interVal)
    }
  }, [seconds])

  const resendOtp = () => {
    dispatch(fetchUserLogin(phoneNumber))
    setMinuets(1)
    setSeconds(30)
    //this code is to remove the otp value------------------
    clicked(true);
    setTimeout(() => {
      clicked(false);
    }, 1500);
  }


  //when the timer  reaches Zero > DISABLED OTP INPUT
  useEffect(() => {
    if (seconds === 0 && minutes === 0) {
      disabledOtp(true)
    } else {
      disabledOtp(false)
    }
  }, [seconds, minutes])

  return (
    <>

      <div className='  w-full mt-6 flex justify-center items-center  '>

        {seconds > 0 || minutes > 0 ? (<>
          {minutes < 10 ? ` 0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds + "   "}
        </>) : (<>
          <AtomLink className='text-sm font-medium mr-1 text-blue-500 animate-pulse ' onClick={resendOtp}> ارسال مجدد کد تایید</AtomLink>
        </>)}
      </div>
    </>);
}

export default MlTimer;