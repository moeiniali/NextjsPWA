import { AtomButton } from "../../exAllCo"

export const NetWorkErrorMessage = () => {

 return (
  <>
   <div className="w-full  h-full flex justify-center items-center flex-col ">
    <p className="m-auto text-center">خطا در برقرار ارتباط با سرور
     لطفا اتصال اینترنت خود را بررسی کنید
    </p>
    <AtomButton onClick={() => window.location.reload()}>بارگذاری مجدد</AtomButton>

   </div>
  </>
 )
}
