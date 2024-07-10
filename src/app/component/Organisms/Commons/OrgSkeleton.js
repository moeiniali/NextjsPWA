import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';


export default function OrgSkeleton({ Element,circle, props, width, height, count, className }) {
  const theme = localStorage.getItem('theme')


  // const skeltonTypes = (Element) => {
  //   switch (Element) {
  //     case 'homeNoTif':
  //       return (
  //         <div dir='rtl' className='w-full h-16  overflow-x-hidden overflow-y-scroll cursor-pointer  flex  flex-col gap-2 pb-4 mt-4 border-b border-[#ECEBEA] no-scrollbar'>
  //           <div className='w-full flex flex-row justify-between'>
  //             <div className="w-[40%] grid grid-flow-row ">
  //               <Skeleton count={1} baseColor={theme === 'light' ? '#f8f9fa' : '#001639'} highlightColor={theme === 'light' ? '#EDEDED' : '#03234D'} />
  //             </div>
  //             <div className="w-[20%] grid grid-flow-row ">
  //               <Skeleton count={1} baseColor={theme === 'light' ? '#f8f9fa' : '#001639'} highlightColor={theme === 'light' ? '#EDEDED' : '#03234D'} />
  //             </div>
  //           </div>
  //           <div dir='rtl' className="w-[100%]">
  //             <Skeleton count={1} baseColor={theme === 'light' ? '#f8f9fa' : '#001639'} highlightColor={theme === 'light' ? '#EDEDED' : '#03234D'} />
  //           </div>
  //         </div>
  //       )
  //     default:
  //       break;
  //   }
  // }
  return (
    <>
      {/* {skeltonTypes(Element)} */}



      <Skeleton baseColor={theme === 'light' ? '#fff' : '#001639'} highlightColor={theme === 'light' ? '#EDEDED' : '#03234D'} style={{ backgroundColor: theme === 'light' ? '#fff' : '#001639',}}
        {...props} circle={circle}   count={count} width={width} height={height} className={className} />
    </>
  )
}
