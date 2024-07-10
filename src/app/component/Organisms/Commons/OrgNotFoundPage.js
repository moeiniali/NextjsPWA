import React from 'react'
import { Link } from 'react-router-dom'
export default function OrgNotFoundPage() {
 return (
  <div className='w-full flex-col h-full bg-slate-300 text-black flex justify-center items-center font-medium' >
   <p> صفحه مورد نظر شما یافت نشد</p>

   <Link to={'/'}>بازگشت</Link>

  </div>
 )
}
