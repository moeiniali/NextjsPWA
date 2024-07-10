import React, { Component, useEffect, useMemo, useState } from 'react';
import { AtomInput, AtomIcon, AtomText, AtomButton, AtomForm, MlError, AtomLoading } from '../../exAllCo';
import QuestionIcon from '../../../assets/images/login/Question.png';
import arrowIcon from '../../../assets/images/login/ArrowRight.png';
import InfoIcon from '../../../assets/images/login/Info.png';
import calendarIcon from '../../../assets/images/login/calendar-2.svg';
import '../../Atoms/Inputs/AtomInput.css'
import { useDispatch, useSelector } from 'react-redux';
import { setLayoutController } from '../../../redux/persist/controllerLoginSlice';
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import { useFormik } from 'formik';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { stateAccountFul, stateAccountRej, stateAccountPen, fetchActiveAccount } from '../../../redux/login/ActiveAccountSlice';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MlActiveAccount = () => {

  const keysValidation = useMemo(() => ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '17', '20', 'Enter', 'Backspace', 'Tab'], []);
  const handleValidationKeys = (event) => {
    if (!keysValidation.includes(event.key)) {
      event.preventDefault();
    }
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accountPen = useSelector(stateAccountPen);
  const accountFul = useSelector(stateAccountFul);
  const accountRej = useSelector(stateAccountRej);
  //states------------------------------
  const [dateValue, setDateValue] = useState('');
  const [showButton, setShowButton] = useState(false);
  const [showError, setShowError] = useState(false);
  const [borderError, setBorderError] = useState(false);
  const [nationalCodeValid, setNationalCodeValid] = useState(false);
  const supportNumber = "+982188800892";

  //back to login layout------------------
  const backToLogin = () => {
    localStorage.removeItem('token');
    dispatch(setLayoutController('1'))
  }



  const formik = useFormik({
    initialValues: {
      nationalCode: '',
      IdentificationCode: '',
    },

    validate: (values) => {
      // validation for identityCode -----------------
      const IdentityCode = values.nationalCode;
      if (IdentityCode.length > 9) {
        var code = IdentityCode;
        var L = IdentityCode.length;
        // if (L < 8 || parseInt(code, 10) == 0) return false;
        code = ('0000' + code).substr(L + 4 - 10);
        // if (parseInt(code.substr(3, 6), 10) == 0) return false;
        var c = parseInt(code.substr(9, 1), 10);
        var s = 0;
        for (var i = 0; i < 9; i++)
          s += parseInt(code.substr(i, 1), 10) * (10 - i);
        s = s % 11;

        if (s < 2 && c == s || s >= 2 && c == (11 - s)) {
          setBorderError(false);
          setNationalCodeValid(true);
          return true;
        } else {
          formik.errors.nationalCode = 'فرمت کد ملی صحیح نمیباشد';
          setBorderError(true)
          setNationalCodeValid(false)
          return false
        }
      }
      else {
        formik.errors.nationalCode = null;
        setBorderError(false);
        setNationalCodeValid(false);
      }

    },
    onSubmit: async (values) => {
      dispatch(fetchActiveAccount({ idNumber: values.nationalCode, birthday: dateValue, agent: values.IdentificationCode }))
    }
  });

  useEffect(() => {
    if (accountFul && accountFul.Success) {
      notify();
      setTimeout(() => {
        navigate('/home');
        dispatch(setLayoutController('1'));
      }, 5000);
    } else {
      console.log("error accountFul.Success");
    }
  }, [accountFul])



  const notify = () => {
    toast.success('ثبت نام شما با موفقیت انجام شد.', {
      position: "top-right",
      autoClose: 5000,
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


  return (<>
    {/* show nofif------ */}
    <div>
      <ToastContainer className="max-h-10" />
    </div>

    <header className={`max-w-[306px] justify-between m-auto flex items-center mt-3 ${accountPen && 'blur-sm'}  `}>
      <Link to={"tel://" + supportNumber}>
        <AtomIcon src={QuestionIcon} alt="supportedIcon" className=" cursor-pointer" />
      </Link>
      <AtomText title="فعالسازی حساب کاربری" className="w-full m-auto font-medium text-lg content-center text-center " />
      <AtomIcon src={arrowIcon} alt="backIcon" className=" cursor-pointer" onClick={backToLogin} />
    </header>


    <AtomForm onSubmit={formik.handleSubmit} >
      <div className={`max-w-[306px]  m-auto flex  flex-col mt-6  ${accountPen && 'blur-sm'}`}>

        <AtomInput style={borderError ? { border: '2px solid #C30000' } : null} id='nationalCode' type='text'
          inputMode='numeric' placeholder='کد ملی' {...formik.getFieldProps('nationalCode')} maxLength={10} onKeyDown={handleValidationKeys} />
        {borderError && <MlError children={'فرمت کد ملی صحیح نمیباشد'} />}

        <div style={{ direction: "rtl", width: '100%', height: 'auto', fontSize: '14px', color: '#353535' }}>

          <DatePicker
            placeholder='تاریخ تولد'
            inputClass="datePickerStyle"
            containerStyle={{
              width: '100%',
              outline: "none",
            }}
            style={{
              backgroundImage: `url(${calendarIcon})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: '4% center',
              backgroundSize: '24px',
              outline: "none",
              width: '100%',
              height: '40px',
              color: '#353535',
              border: ' 1px solid #E1E1E1',
              padding: "2px 12px",
              borderRadius: '4px',
              paddingRight: '12px',
              boxSizing: 'border-box',
            }}
            minDate="1300/01/01"
            maxDate="1404/01/01"
            id='datePicker'
            name='datePicker'
            value={dateValue}
            onChange={(date) => date && setDateValue(date.format())}
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-right"
            inputMode='none'
          />
        </div>

        <AtomInput id='IdentificationCode' inputMode="numeric" type='text' placeholder='کد معرف' {...formik.getFieldProps('IdentificationCode')} />

        <div className='w-full flex gap-2 items-center justify-end'>
          <AtomText title="پر کردن این فیلد اختیاری است" className=" font-normal text-xs" />
          <AtomIcon src={InfoIcon} alt="InfoIcon" className=" cursor-pointer w-4 h-4" />
        </div>
      </div>
      <div className='max-w-[202px] m-auto mt-24'>
        <AtomButton children={accountPen ? <AtomLoading /> : ' ورود'} disabled={nationalCodeValid && dateValue ? false : true} />
      </div>
    </AtomForm>

  </>);
}

export default MlActiveAccount;