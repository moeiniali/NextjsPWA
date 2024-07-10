import React, { useMemo, useState } from 'react';
import { AtomText, AtomButton, AtomInput, AtomForm, MlError, AtomLoading, OrgPromptNotification } from '../../exAllCo';
import '../../Atoms/Inputs/AtomInput.css'
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin, setPhoneNumber, statePen } from '../../../redux/login/LoginSlice';
import { fetchUserLogin } from '../../../redux/login/ConfirmationSlice';
import { setLayoutController } from '../../../redux/persist/controllerLoginSlice';
import { ToastContainer, Zoom, toast } from 'react-toastify';


const MlGetPhoneNumber = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch()
  const keysValidation = useMemo(() => ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '17', '20', 'Enter', 'Backspace', 'Tab'], []);
  const handleValidationKeys = (event) => {
    if (!keysValidation.includes(event.key)) {
      event.preventDefault();
    }
  };

  //states--------------------------------------
  const [errorMessage, setErrorMessage] = useState();
  const [borderError, setBorderError] = useState(false);
  const [responseMessageError, setResponseMessageError] = useState('');
  const [showButton, setShowButton] = useState(false);
  //selectors----------------------------------
  const pen = useSelector(statePen);
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
  //validation input-------------------------
  const formik = useFormik({
    initialValues: {
      phoneNumber: '',
    },
    validate: (values) => {
      if (values.phoneNumber.length === 11) {
        if (!/^09[0-9]{9}$/.test(values.phoneNumber)) {
          setBorderError(true)
          setErrorMessage('فرمت شماره موبایل صحیح نمیباشد');
        } else {
          setShowButton(true);
          return true
        }
      } else {
        setShowButton(false);
        setErrorMessage(null)
        setBorderError(false)
      }
    },
    onSubmit: async (values) => {
      const phoneNumber = values.phoneNumber;
      dispatch(setPhoneNumber(phoneNumber)) //برای اینکه در ریسپانس لاگین شماره برگردانده نمیشود.اینجا ارسال میکنبم.
      //fetch Login Api--------------------------
      dispatch(fetchLogin(phoneNumber)).then((res) => {
        if (res.payload) {
          if (res.payload.Success) {
            dispatch(setLayoutController('2'));   //for next page to otp
          } else if (res.payload.Success === false) {
            setErrorMessage(res.payload.Message);
            setBorderError(true);
            setTimeout(() => {
              setErrorMessage(null);
              setBorderError(false);
            }, 3000);
          }
        } else {
          notify(' خطا در دیافت اطلاعات از سرور لطفا دوباره تلاش نمایید.');
        }
      })
      dispatch(fetchUserLogin(phoneNumber)); //Getting a mobile number to display it in otp
    },
  });

  return (
    <>
      <div className='w-full h-full m-auto flex flex-col justify-start  items-center ' >
        <AtomForm onSubmit={formik.handleSubmit}>
          <AtomText className='font-medium text-sm mt-16 text-right text-[#353535]' title="لطفا شماره موبایل خود را وارد کنید و کلید دریافت کد را بزنید" />
          <AtomInput style={borderError ? { border: '2px solid #C30000' } : null}
            className='mt-6' id='phoneNumber' type='text' inputMode='numeric' placeholder='شماره موبایل'
            maxLength={11} onKeyDown={handleValidationKeys} {...formik.getFieldProps('phoneNumber')} />
          <div className='w-full '>
            {errorMessage && <MlError children={errorMessage} />}
          </div>

          <div className='max-w-[202px]  m-auto mt-24'>
            <AtomButton children={pen ? <AtomLoading /> : 'دریافت کد'} disabled={showButton === true ? false : true} />
          </div>
        </AtomForm>
      </div>
    </>
  );
}

export default MlGetPhoneNumber;





