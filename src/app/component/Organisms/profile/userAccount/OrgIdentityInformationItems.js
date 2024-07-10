import React, { useEffect, useState, useMemo } from 'react'
import { OrgHeader, AtomInput, AtomButton } from '../../../exAllCo';
import { useNavigate } from 'react-router-dom';
import { fetchEditProfile } from '../../../../redux/profile/profileSlices';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import DatePicker from 'react-multi-date-picker';
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa";

export default function OrgIdentityInformationItems() {
 // for nationalCode------------------------
 const keysValidation = useMemo(() => ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '17', '20', '17', '67', '86', 'Enter', 'Backspace', 'Tab'], []);
 const handleValidationKeys = (event) => {
  if (!keysValidation.includes(event.key)) {
   event.preventDefault();
  }
 };
 const theme = localStorage.getItem('theme');
 const location = window.location.pathname;
 const profile = useSelector((state) => state.profileSlice.profile);
 const fetchProfilePending = useSelector((state) => state.profileSlice.fetchProfilePending);
 // states----------------------------
 const [dateValue, setDateValue] = useState();
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const [fetchParams, setFetchParams] = useState([]);
 const [name, setName] = useState();
 const [lastName, setLastName] = useState();
 const [nationalCodeValue, setNationalCodeValue] = useState();
 const [legalNameValue, setLegalNameValue] = useState();
 const [economicCode, setEconomicCode] = useState();


 useEffect(() => {
  if (location === '/profile/account/IdentityInformation') {
   setFetchParams({ nationalCode: nationalCodeValue ? nationalCodeValue : profile[6] ? profile[6].keyData : '', name: name, lastName: lastName })
  } else if (location === '/profile/account/legalName') {
   setFetchParams({ legalName: legalNameValue ? legalNameValue : profile[3] ? profile[3].keyData : '' });
  } else if (location === "/profile/account/datePicker") {
   setFetchParams({ datePicker: dateValue ? dateValue : profile[20] ? profile[20].keyData : '' });
  } else if (location === '/profile/account/economicCode') {
   setFetchParams({ economicCode: economicCode ? economicCode : profile[5] ? profile[5].keyData : '' });
  } else {
   setFetchParams(null)
  }
 }, [nationalCodeValue, legalNameValue, profile, dateValue, economicCode, name, lastName, location]);

 //fetchEditProfile API--------------------------------------------------------------
 const handleIdentityInformation = () => {
  dispatch(fetchEditProfile(fetchParams)).then((res) => {
   const response = res.payload.data.Success;
   const mess = res.payload.data.Message;
   if (response === true) {
    notify();
   } else {
    toast.error(mess, {
     style: {
      boxShadow: "1px 1px 4px white",
      backgroundColor: theme === "light" ? "white" : "#001639", direction: 'rtl'
     }
    });
   }
  }).catch((err) => { console.log(err) })
 }

 // Notification ----------------------------------------------------------------
 const notify = () => {
  toast.success('اطلاعات شما با موفقیت به روز رسانی شد', {
   position: "top-right",
   autoClose: 5000, toastId: '',
   hideProgressBar: false,
   closeOnClick: true,
   pauseOnHover: true,
   draggable: true,
   progress: undefined,
   style: {
    boxShadow: "1px 1px 4px white",
    backgroundColor: theme === "light" ? "white" : "#001639", direction: 'rtl'
   }
  });
 };

 return (
  <div className='h-[90%] '>
   <div style={{ height: "100%" }} className={fetchProfilePending ? 'blur-sm' : ''} >
    <div>
     <ToastContainer className="max-h-10" />
    </div>
    {/* identityInformation--------------------------------------------------------------------- */}
    {location === "/profile/account/IdentityInformation" && (
     <div className='h-full'>
      <div className='max-lg:max-w-sm h-full m-auto '>
       <OrgHeader HeaderTitle="اطلاعات هویتی" goBackRout={() => navigate('/profile/account')} />
       <div dir='rtl' >
        <AtomInput placeholder="نام" defaultValue={profile[1] ? profile[1].keyData : ''} className="text-right" onChange={(e) => setName(e.target.value)} />
        <AtomInput placeholder="نام خانوادگی" defaultValue={profile[2] ? profile[2].keyData : ''} className="text-right" onChange={(e) => setLastName(e.target.value)} />
        <AtomInput placeholder="کد ملی" maxLength={10} onKeyDown={handleValidationKeys} defaultValue={profile[6] ? profile[6].keyData : ''} className="text-right" onChange={(e) => setNationalCodeValue(e.target.value)} />
       </div>
      </div>
      <div className='max-lg:max-w-[383px] m-auto '>
       <AtomButton children="ذخیره" onClick={handleIdentityInformation} />
      </div>
     </div>
    )}
    {/* legalName----------------------------------------------------------------------------------- */}
    {location === "/profile/account/legalName" && (

     <div className='h-full'>
      <div className='max-lg:max-w-sm h-full m-auto '>
       <OrgHeader HeaderTitle="نام حقوقی" goBackRout={() => navigate('/profile/account')} />

       <div dir='rtl' >
        <AtomInput placeholder="نام" defaultValue={profile[3] ? profile[3].keyData : ''} className="text-right" onChange={(e) => setLegalNameValue(e.target.value)} />
       </div>

      </div>
      <div className=' max-lg:max-w-[383px] m-auto'>
       <AtomButton children="ذخیره" onClick={handleIdentityInformation} />
      </div>
     </div>
    )}
    {/* datePicker-------------------------------------------------------------------------------------------------- */}
    {location === "/profile/account/datePicker" && (

     <div className='h-full'>
      <div className='max-lg:max-w-sm h-full m-auto '>
       <OrgHeader HeaderTitle="تاریخ تولد" goBackRout={() => navigate('/profile/account')} />
       <DatePicker
        placeholder='تاریخ تولد'
        inputClass="datePickerStyle"
        containerStyle={{
         width: '100%',
         outline: "none",
         direction: "rtl",
        }}
        style={{
         background: theme === "light" ? 'white' : '#001639',
         outline: "none",
         width: '100%',
         height: '40px',
         color: theme === "light" ? '#353535' : "#E1E1E1",
         border: theme === "light" ? ' 2px solid #E1E1E1' : ' 2px solid #757575',
         padding: "2px 4px"
        }}
        minDate="1300/01/01"
        maxDate="1404/01/01"
        id='datePicker'
        name='datePicker'
        value={profile[20] ? profile[20].keyData : ''}
        onChange={(date) => date && setDateValue(date.format())}
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
        inputMode='none'
       />
      </div>
      <div className=' max-lg:max-w-[383px] m-auto'>
       <AtomButton children="ذخیره" onClick={handleIdentityInformation} />
      </div>
     </div>
    )}
    {/* econimicCode------------------------------------------------------------------------ */}
    {location === "/profile/account/economicCode" && (
     <div className='h-full'>
      <div className='max-lg:max-w-sm h-full m-auto '>
       <OrgHeader HeaderTitle="کد اقتصادی" goBackRout={() => navigate('/profile/account')} />
       <div dir='rtl' >
        <AtomInput placeholder="کد اقتصادی" defaultValue={profile[5] ? profile[5].keyData : ''} className="text-right" onChange={(e) => setEconomicCode(e.target.value)} />
       </div>
      </div>
      <div className=' max-lg:max-w-[383px] m-auto '>
       <AtomButton children="ذخیره" onClick={handleIdentityInformation} />
      </div>
     </div>
    )}

   </div>
  </div >
 )
}
