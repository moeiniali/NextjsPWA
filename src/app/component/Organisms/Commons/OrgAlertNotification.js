import React, { useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, Zoom, toast } from 'react-toastify';

export default function OrgAlertNotification() {
  const theme = localStorage.getItem('theme')


  useEffect(() => {
    notify()
  }, [])

  const notify = () => {
    toast.success("ثبت شد", {
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
  return (
    <>

      {/* <div>
        <ToastContainer className="max-h-10" />
      </div> */}

    </>
  )
}
