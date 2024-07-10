import React, { useEffect, useState, useMemo } from 'react';
import { AtomText, AtomForm, AtomIcon, MlTimer, MlError, AtomLoading } from '../../exAllCo';
import numberIcon from '../../../assets/images/login/edit-2.png';
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { statePhoneNumber } from '../../../redux/login/LoginSlice';
import { fetchOtp } from '../../../redux/login/OtpSlice';
import { setLayoutController } from '../../../redux/persist/controllerLoginSlice';
import { statePen, stateFulOtp, stateRej } from '../../../redux/login/OtpSlice';
import browserSignature from 'browser-signature';
import platform from 'platform';
import { toast } from 'react-toastify';


const MlOtp = () => {
  const keysValidation = useMemo(() => ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '17', '20', 'Enter', 'Backspace', 'Tab'], []);

  const notify = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 10000,
      toastId: '',
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      style: { direction: 'rtl' },
    });
  };





  const signature = browserSignature();
  const dispatch = useDispatch();
  //states----------------------------------
  const [otp, setOtp] = useState();
  const [showError, setShowError] = useState(false)
  const [reClick, setReClick] = useState('') // this is for remove input otp value
  const [disabledOtp, setDisabledOtp] = useState('') // this is for disabledOtp input 
  //selectors------------------------------
  const phoneNumber = useSelector(statePhoneNumber);
  const pen = useSelector(statePen);
  const fulOtp = useSelector(stateFulOtp);


  // this is for remove input otp value
  useEffect(() => {
    if (reClick) {
      setOtp('')
    }
  }, [reClick]);


  //fetch otp api --------------------------------
  useEffect(() => {

    if (otp && otp.length > 4) {
      dispatch(fetchOtp({ Mobile: phoneNumber, ConfirmCode: otp, Signature: signature, Platform: platform.description }))
        .then((res) => {
          if (res.payload) {
            const pay = res.payload;
            if (pay.token) {
              localStorage.setItem('token', pay.token)
              localStorage.setItem('username', pay.username)
              dispatch(setLayoutController('3'));
            } else if (pay.Success === false) {
              setShowError(true)
            }
          } else {
            notify(' خطا در دیافت اطلاعات از سرور لطفا دوباره تلاش نمایید.');
          }

        })
        .catch((err) => console.log(err, 'errrrr'))
    } else {
      setShowError(false)
    }
  }, [otp])




  const inputStyleOtp = {
    width: '100%',
    height: '32px',
    backgroundColor: '#fff',
    padding: '0 8px 0 8px',
    outline: 'none',
    margin: '0 auto',

  }

  const containerStyleOtp = {
    maxWidth: '306px',
    backgroundColor: '#fff',
    border: '1px solid #E1E1E1',
    borderRadius: '8px',
    marginTop: '24px',
    padding: '4px',
    outline: 'none',


  }

  return (
    <>

      <div className={`w-full  m-auto flex flex-col justify-start  items-center ${pen && 'blur-[1.5px]'}`} >
        < AtomText className='font-medium text-sm mt-16 text-center' title="کد ارسال شده را وارد نمایید " />
        <AtomText style={{ color: '#757575' }} className={`font-medium text-sm mt-2 text-center ${reClick && 'animate-bounce'}`} title="  کد 5 رقمی به شماره شما پیامک شد" />
        <div className='w-[144px]   flex flex-row items-center justify-center gap-3 bg-[#EEF4FF] rounded-3xl py-1 mt-6'>
          <AtomIcon onClick={() => dispatch(setLayoutController('1'))} src={numberIcon} className='cursor-pointer' />
          <AtomText style={{ color: '#757575' }} className='font-medium text-sm pt-1 text-center' title={phoneNumber} />
        </div>

        <OtpInput
          containerStyle={containerStyleOtp}
          inputStyle={inputStyleOtp}
          value={otp}
          onChange={setOtp}
          shouldAutoFocus={true}
          numInputs={5}
          inputType={'number'}

          renderSeparator={<span>-</span>}
          renderInput={(props) => <input type='number'  disabled={disabledOtp ? true : false} {...props} />}
        />
        <div className='mt-4 w-[306px]'>
          {showError && fulOtp && fulOtp.Success === false ? (<MlError children={fulOtp.Message} />
          ) : null}
        </div>
        {/* show Timer ------------------------------- */}
        < MlTimer clicked={setReClick} disabledOtp={setDisabledOtp} />
      </div >

    </>);
}

export default MlOtp;