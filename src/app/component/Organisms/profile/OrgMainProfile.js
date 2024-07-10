import React, { Component, useEffect, useState } from 'react';
import { MlSelectBox, OrgHeader, OrgSkeleton, OrgAlertNotification } from '../../exAllCo';
import userIcon from '../../../assets/images/profile/Frame user.svg';
import accountIconDark from '../../../assets/images/profile/accountIconDark.svg';
import arrowIcon from '../../../assets/images/profile/arrow-left.svg';
import outIcon from '../../../assets/images/profile/Frame 427319844 (1).svg';
import outIconDark from '../../../assets/images/profile/outDark.svg';
import settingIcon from '../../../assets/images/profile/Frame 427319844.svg';
import settingIconDark from '../../../assets/images/profile/settingIconDark.svg';
import addressIconDark from '../../../assets/images/profile/addressIconDark.svg';
import addressIcon from '../../../assets/images/profile/Frame 427319842.svg';
import messagEeditIconL from '../../../assets/images/profile/message-edit.svg';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpdateProfileImage } from '../../../redux/profile/profileSlices';
import { fetchEditProfile } from '../../../redux/profile/profileSlices';
import useIcon from '../../../assets/images/home/useIcon.svg';
import userIconD from '../../../assets/images/home/userIconD.svg';
import { fetchPanelInfo } from '../../../redux/home/HomeSlice';
import { setBlurBack } from '../../../redux/common/commonRedux';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import { setUserAvatar } from '../../../redux/persist/publicPersist';
import { useMainContext } from '../../../context/mainContext';
import { setIsPushNotification } from '../../../redux/persist/publicPersist';


const OrgMainProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector((state) => state.profileSlice.profile);
  const panelInfo = useSelector((state) => state.HomeSlice.panelInfo);
  const userAvatar = useSelector((state) => state.publicPersist.userAvatar)
  const ProfileImagePending = useSelector((state) => state.profileSlice.fetchUpdateProfileImagePending);
  const isPushNotification = useSelector((state) => state.profileSlice.isPushNotification);
  const blurBack = useSelector((state) => state.commonRedux.blurBack)
  // states----------------------------------------------
  const userName = localStorage.getItem('username');
  const [showSelectBox, setShowSelectBox] = useState(false);
  const { changeTheme, mode, theme } = useMainContext();

// show alert--------------------------
  const notify = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      toastId: '',
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

  const notifyError = (message) => {
    toast.error(message, {
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

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const fileSizeInKb = file.size / 1024;
    const fileInValidType = ["image/jpeg", "image/png"];
    setShowSelectBox(!showSelectBox);
    dispatch(setBlurBack(!blurBack));
    if (!file) return;

    if (fileSizeInKb > 2 * 1024) {
      notifyError('حجم فایل بزرگتر از 2 مگابایت میباشد!');
      return;
    }
    if (!fileInValidType.includes(file.type)) {
      notifyError('فرمت فایل صحیح نمیباشد. ');
      return;
    }
    else {
      const formData = new FormData();
      formData.append("formFile", file);
      dispatch(fetchUpdateProfileImage(formData)).then((res) => {
        if (res.payload.Success) {
          const ResultCodeImage = res.payload.ResultCode.toString();
          dispatch(fetchEditProfile({ ResultCodeImage: ResultCodeImage }))
            .then((res) => {
              if (res.payload.status === 200) {
                setShowSelectBox(!showSelectBox);
                dispatch(setBlurBack(!blurBack));
                notify('عکس پروفایل با موفقیت بروزرسانی شد');
              }
            }).catch((err) => {
              notifyError('.خطا در برقراری ارتباط یا سرور');

            });
          dispatch(fetchPanelInfo()).then(async (res) => {
            if (res.payload) {
              dispatch(setUserAvatar(res.payload.panelInfo.avatarBase64))
            }
          })
        }

      }).catch((err) => {
        console.log(err);
      })
    }
  };

  const editProfileOnClick = () => {
    setShowSelectBox(!showSelectBox)
    dispatch(setBlurBack(!blurBack));
  }
  const handleDisabledSelectBox = () => {
    setShowSelectBox(!showSelectBox)
    dispatch(setBlurBack(!blurBack));
  }


  useEffect(() => {
    const mainPro = document.getElementById("mainPro")
    mainPro.addEventListener('click', () => {
      setShowSelectBox(false)
      dispatch(setBlurBack(false));
    })
  }, [])


  const array = [
    {
      titleIcon: theme === "light" ? userIcon : accountIconDark,
      title: "اطلاعات حساب کاربری",
      arrowIcon: arrowIcon,
      onClick: function () {
        navigate('account');
      }
    },
    {
      titleIcon: theme === "light" ? addressIcon : addressIconDark,
      title: "آدرس های من",
      arrowIcon: arrowIcon,
      onClick: function () {
        navigate('address');
      }
    },
    {
      titleIcon: theme === "light" ? settingIcon : settingIconDark,
      title: "تنظیمات برنامه",
      arrowIcon: arrowIcon,
      onClick: function () {
        navigate('setting');
      }
    },
    {
      titleIcon: theme === "light" ? outIcon : outIconDark,
      title: "خروج",
      arrowIcon: arrowIcon,
      onClick: function async() {
        dispatch(setIsPushNotification(true));//To show installation of pwa program for one time
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.setItem('theme', 'light');
        localStorage.setItem('mode', 'light');
        if (mode === 'light') {
          changeTheme('light')
        } else if (mode === 'dark') {
          changeTheme('light')
        } else if (mode === 'auto') {
          const mediaQuery = matchMedia("(prefers-color-scheme: light)");
          if (mediaQuery.matches) {
            changeTheme('light')
          }
          else {
            changeTheme('light')
          }
        }
        navigate('/');
      }
    }
  ]

  return (
    <>

      <div id='mainPro' className={`h-full ${ProfileImagePending ? 'blur-sm' : ''} ${blurBack ? ' blur-[2px]' : ''} `} >

        <ToastContainer className="max-h-10" />

        <OrgHeader HeaderTitle="پروفایل" goBackRout={() => navigate('/home')} />

        <div className='w-full flex flex-col gap-2 items-center justify-center py-4  shadow-sm'>
          <MlSelectBox Element="profileHeader"
            iconI={userAvatar || panelInfo ? userAvatar || panelInfo.avatarBase64 : theme === 'light' ? useIcon : userIconD}
            iconII={messagEeditIconL} widthII={24} heightII={24}
            editProfileOnClick={editProfileOnClick} profileHeaderIconID="profileHeaderIconID"
            altII="profileIcon" width={42} height={42}
            titleI={userName ? userName : 'نام شما'}
            titleII={profile[18] ? profile[16].keyData : 'نام فروشگاه شما'}
          />
        </div>
        {array.map((item, index) => (
          <div key={index}  >
            <MlSelectBox onClickSelectBox={item.onClick} Element="selectBox" iconII={item.titleIcon} titleI={item.title} iconI={item.arrowIcon} altI="arrowIcon" altII="icon" />
          </div>
        ))}
      </div>
      <div >
        {showSelectBox && (
          <MlSelectBox dropDownEditProfileID="dropDownEditProfileID" Element="dropDownEditProfile" showSelectBox={handleDisabledSelectBox}
            onChangeCamera={handleFileUpload}
            onChangeGallery={handleFileUpload}
          />
        )}
      </div>
    </>);
}

export default OrgMainProfile;