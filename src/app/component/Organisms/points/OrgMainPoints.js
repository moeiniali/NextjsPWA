import React, { useEffect, useMemo, useState } from 'react'
import { MlPoints, AtomText, AtomIcon } from '../../exAllCo';
import sayeBanIcon from '../../../assets/images/points/default-dark 1.svg';
import { fetchScoreRules, fetchScoreList } from '../../../redux/points/pointSlice';
import noScoreListIcon from '../../../assets/images/points/Charco Notifications.png';
import { useDispatch, useSelector } from 'react-redux';


export default function OrgMainPoints() {
  const [isActiveTab, setIsActiveTab] = useState('1');
  const theme = localStorage.getItem('theme');
  const dispatch = useDispatch();
  const scoreRules = useSelector((state) => state.pointSlice.scoreRulesData?.scoreRules);
  const totalPoints = useSelector((state) => state.pointSlice.scoreRulesData?.panelInfo?.score);
  const scoreList = useSelector((state) => state.pointSlice.scoreListData);
  const scoreRulesPending = useSelector((state) => state.pointSlice.scoreRulesPending);
  const scoreListPending = useSelector((state) => state.pointSlice.scoreListPending);




  //memoization data ---------------
  const MemoizationScoreRules = useMemo(() => {
    return Array.isArray(scoreRules)
      ? scoreRules.map((item) => {
        return item;
      }) : []
  }, [scoreRules])


  const MemoizationScoreList = useMemo(() => {
    return Array.isArray(scoreList)
      ? scoreList.map((item) => {
        return item;
      }) : []
  }, [scoreList])


  useEffect(() => {
    if (isActiveTab === '1') {
      dispatch(fetchScoreRules())
    } else if (isActiveTab === '2') {
      dispatch(fetchScoreList())
    }
  }, [isActiveTab])


  // in this section, the color of the scorePoint text was determined
  const getTextColor = (point) => {
    const isNegative = point.toString().charAt(0) === '-';
    return isNegative ? '#C30000' : '#00BA88';
  };






  return (
    <div className={`w-full h-full overflow-auto  `}>

      <MlPoints Element="pointHeader" isActiveTab={isActiveTab} onClickIsActiveTab1={() => setIsActiveTab('1')} onClickIsActiveTab2={() => setIsActiveTab('2')} totalPoint={totalPoints ? totalPoints : ''} />
      <div className='w-full h-full mt-20 px-8 '>
        {isActiveTab === '1' ? (
          <>
            <div className={``}>
              <MlPoints Element="navTitle" />
            </div>
            <div className='flex w-full  h-full rounded-xl mt-6 flex-col  gap-6 justify-end items-center'>


              {MemoizationScoreRules && MemoizationScoreRules.length > 0 && MemoizationScoreRules.map((item, index) => (
                <div key={item.id} className='w-full h-full'>
                  <MlPoints Element="devResources" devIconI={sayeBanIcon} devTitleI={item.title} devTitleII={item.memo} devTitleIII={`${item.point} امتیاز دریافت شد`} />
                </div>
              ))}
              {!scoreRulesPending && MemoizationScoreRules && MemoizationScoreRules.length <= 0 && (
                <div className='w-full h-full mt-10 m-auto flex flex-col gap-2 justify-center items-center'>
                  <AtomIcon src={noScoreListIcon} width={192} height={208} alt="notDataIcon" />
                  <AtomText title=" !در حال حاضر ماموریت فعال ندارید " className="text-[#353535] dark:text-[#EDEDED] text-sm font-normal" />
                </div>
              )}
              {!MemoizationScoreRules || MemoizationScoreRules.length <= 0 && scoreRulesPending && (
                <div className="w-full h-full p-20 relative items-center  flex justify-center">
                  <svg aria-hidden="true" className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className={``}>
            <table className='w-full h-10 inline-flex flex-row  mt-10 '>
              <thead className='w-full flex flex-row text-base font-normal   dark:text-[#EDEDED] text-[#353535] justify-between items-center'>
                <tr className='w-full  h-full inline-flex justify-between items-center'>
                  <th className='w-[30%] h-full inline-flex justify-center items-center'>تاریخ</th>
                  <th className='w-[50%] h-full inline-flex justify-center items-center'> نوع فعالیت</th>
                  <th className='w-[20%] h-full inline-flex justify-center items-center'>امتیاز</th>
                </tr>
              </thead>
            </table>
            <div>
              {MemoizationScoreList?.length > 0 && MemoizationScoreList.map((item, index) => (
                <div key={index} >
                  <MlPoints Element="tableItem"
                    dateCol={item.shamsiDate}
                    activityTypeCol={item.title}
                    pointsCol={item.point}
                    pointsColColor={getTextColor(item.point)}
                  />
                </div>
              )
              )}

              {!scoreListPending && MemoizationScoreList?.length <= 0 &&
                (
                  <div className='w-full h-full mt-10 m-auto flex flex-col gap-2 justify-center items-center'>
                    <AtomIcon src={noScoreListIcon} width={192} height={208} alt="notDataIcon" />
                    <AtomText title="!تاکنون تاریخچه امتیازی نداشته اید" className="text-sm font-normal text-[#353535] dark:text-[#EDEDED]" />
                  </div>
                )
              }

              {!MemoizationScoreList || MemoizationScoreList.length <= 0 && scoreListPending && (
                <div className="w-full h-full p-20 relative items-center  flex justify-center">
                  <svg aria-hidden="true" className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                </div>
              )}


            </div>
          </div>
        )}
      </div>
    </div >
  )
}
