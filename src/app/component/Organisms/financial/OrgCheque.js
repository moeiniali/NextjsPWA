import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react'
import '../Organism.css';
import { AtomText, AtomIcon, MlFinanCial, OrgSkeleton } from '../../exAllCo';
import { useDispatch, useSelector } from 'react-redux';
import notCheckItem from '../../../assets/images/financial/notCheckItem.svg';
import notCheckItemDark from '../../../assets/images/financial/notCheckItemDark.svg';
import notBankIcon from '../../../assets/images/financial/Bank (1).svg';
import notChequeIcon from '../../../assets//images/financial/notCheque.svg';
import notChequeDarkIcon from '../../../assets//images/financial/notChequeDark.svg';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Sector } from 'recharts';
import toTopIcon from '../../../assets/images/common/Frame 427319986.png';
import toTopIconDark from '../../../assets/images/common/Frame 427319986Dark.png';
import { stateToTopScroll } from '../../../redux/common/commonRedux';

export default function OrgCheque() {
  const theme = localStorage.getItem('theme');
  const baseImageUrl = 'https://club.sayesaman.com/img/Bank_logo/';
  const dispatch = useDispatch();
  const chequeData = useSelector((state) => state.financialSlice.chequeData);//api server result
  const chequeDataPending = useSelector((state) => state.financialSlice.chequeDataPending);
  const chequeStatusData = useSelector((state) => state.financialSlice.chequeStatusData);
  const toTopButtonShow = useSelector((state) => state.commonRedux.toTopButtonShow);
  const [isActive, setIsActive] = useState('0');
  const [filteredChequeData, setFilteredChequeData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [statusCode1, setStatusCode1] = useState(0);
  const [statusCode2, setStatusCode2] = useState(1);
  const [statusCode3, setStatusCode3] = useState(2);
  const [statusCode4, setStatusCode4] = useState(3);
  const [statusCode5, setStatusCode5] = useState(4);
  const [statusCode6, setStatusCode6] = useState(5);
  const tabSlideRef = useRef(null);
  const [keyValue, setKeyValue] = useState();
  const [set0, setSet0] = useState(0);
  const [set1, setSet1] = useState(0);
  const [set2, setSet2] = useState(0);
  const [set3, setSet3] = useState(0);
  const [set4, setSet4] = useState(0);
  const [set5, setSet5] = useState(0);
  const [set6, setSet6] = useState(0);




  //memoization data----------------------------------------
  const MemoizationChequeData = useMemo(() => {
    return Array.isArray(chequeData)
      ? chequeData.map((item) => {
        return item;
      }) : []
  }, [chequeData]);







  // Determine the color of each item to display the chart----------------------------

  const getColorChart = (colorStatus) => {
    const COLORS = [
      '#F87F06',//زرد
      '#1B96FF', //ابی
      '#00BA88', //سبز
      '#E09126', // نارنجی
      '#DF2040',//قرمز
      '#7F0DF1',//بنفش
    ]
    return COLORS[colorStatus];
  }

  // Number of each item to display in tabs-----------------------------------------------------------
  useEffect(() => {
    if (chequeStatusData) {
      chequeStatusData.find((e) => {
        if (e.chequeStatusName === "وصول بانک") { setSet1(e.chq_Status_Cnt) }
        if (e.chequeStatusName === "وصول برگشتی") { setSet2(e.chq_Status_Cnt) }
        if (e.chequeStatusName === "واگذاري بانک") { setSet3(e.chq_Status_Cnt) }
        if (e.chequeStatusName === "وصول قسمتی") { setSet4(e.chq_Status_Cnt) }
        if (e.chequeStatusName === "وصول برگشتی") { setSet5(e.chq_Status_Cnt) }
        if (e.chequeStatusName === " صندوق شعبه") { setSet6(e.chq_Status_Cnt) }

        setSet0(e.totalChq_Cnt);
      }, {});
    }
  }, [chequeStatusData])


  // pichart-----------------------------------------
  useEffect(() => {
    const a = [];
    const b = [];
    const c = [];
    const d = [];
    const e = [];
    const f = [];
    if (Array.isArray(MemoizationChequeData) && MemoizationChequeData.length > 0) {
      MemoizationChequeData.forEach((item) => {
        if (item.status === 1) {
          a.push(item);
        } else if (item.status === 2) {
          b.push(item);
        }
        else if (item.status === 3) {
          c.push(item);
        }
        else if (item.status === 4) {
          d.push(item);
        }
        else if (item.status === 5) {
          e.push(item);
        }
        else if (item.status === 6) {
          f.push(item);
        }
      });
    }

    function calcValues(a, b, c, d, e, f) {
      // setStatusCode1----------------------
      let statusCode1Reduce = a.reduce((accumulator, obj) => {
        const stringWithoutCommas = obj.amount.replace(/,/g, '');
        const toNum = parseInt(stringWithoutCommas, 10);
        return accumulator + toNum;
      }, 0);
      setStatusCode1(statusCode1Reduce);
      // setStatusCode2----------------------
      let statusCode2 = b.reduce((accumulator, obj) => {
        const stringWithoutCommas = obj.amount.replace(/,/g, '');
        const toNum = parseInt(stringWithoutCommas, 10);
        return accumulator + toNum;
      }, 0);
      setStatusCode2(statusCode2);
      // setStatusCode3----------------------
      let statusCode3 = c.reduce((accumulator, obj) => {
        const stringWithoutCommas = obj.amount.replace(/,/g, '');
        const toNum = parseInt(stringWithoutCommas, 10);
        return accumulator + toNum;
      }, 0);
      setStatusCode3(statusCode3);
      // setStatusCode5----------------------
      let statusCode4 = d.reduce((accumulator, obj) => {
        const stringWithoutCommas = obj.amount.replace(/,/g, '');
        const toNum = parseInt(stringWithoutCommas, 10);
        return accumulator + toNum;
      }, 0);
      setStatusCode4(statusCode4);
      // setStatusCode5----------------------
      let statusCode5 = e.reduce((accumulator, obj) => {
        const stringWithoutCommas = obj.amount.replace(/,/g, '');
        const toNum = parseInt(stringWithoutCommas, 10);
        return accumulator + toNum;
      }, 0);
      setStatusCode5(statusCode5);
      // setStatusCode6----------------------
      let statusCode6 = f.reduce((accumulator, obj) => {
        const stringWithoutCommas = obj.amount.replace(/,/g, '');
        const toNum = parseInt(stringWithoutCommas, 10);
        return accumulator + toNum;
      }, 0);
      setStatusCode6(statusCode6);
    }
    calcValues(a, b, c, d, e, f)
  }, [MemoizationChequeData]);

  const data = [
    { id: '0', name: 'وصول برگشتی', value: statusCode1 === 0 ? 1 : statusCode1 },
    { id: '1', name: 'واگذاري بانک', value: statusCode2 === 0 ? 2 : statusCode2 },
    { id: '2', name: 'وصول بانک', value: statusCode3 === 0 ? 3 : statusCode3 },
    { id: '3', name: 'وصول قسمتی ', value: statusCode4 === 0 ? 4 : statusCode4 },
    { id: '4', name: 'برگشتی ', value: statusCode5 === 0 ? 5 : statusCode5 },
    { id: '5', name: "صندوق شعبه", value: statusCode6 === 0 ? 6 : statusCode6 },
  ];

  useEffect(() => {
    setKeyValue(data.name)
  }, []);


  //tab generate items-----------------------------
  useEffect(() => {
    if (!MemoizationChequeData) return;

    const filteredCheque = MemoizationChequeData.filter((item, index) => {
      if (isActive === '0') {
        return true;
      } else if (isActive === '1' && item.status === 3) {
        return true;
      } else if (isActive === '2' && item.status === 1) {
        return true;
      }
      else if (isActive === '3' && item.status === 2) {
        return true;
      }
      else if (isActive === '4' && item.status === 4) {
        return true;
      }
      else if (isActive === '5' && item.status === 5) {
        return true;
      }
      else if (isActive === '6' && item.status === 6) {
        return true;
      }
      return false;
    });
    setFilteredChequeData(filteredCheque);
  }, [MemoizationChequeData, isActive]);

  const onMouseOver = useCallback((data, index) => {
    setActiveIndex(index);
  }, []);
  const onMouseLeave = useCallback((data, index) => {
    setActiveIndex(null);
  }, []);


  // chart onClicked-----------------------
  const onClickCapture = (event) => {
  }

  //بزرگنمایی چارت--------------------
  const renderActiveShape = (props, index) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, percent, midAngle } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius - 75) * cos;
    const sy = cy + (outerRadius - 75) * sin;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <>
        <text x={cx} y={cy} dy={8} className='text-base bg-red-400' textAnchor="middle" fill={fill}>
          {`${(percent * 100).toFixed(0)}%`}
        </text>

        <Sector
          cx={sx}
          cy={sy}
          cursor="pointer"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={activeIndex === 0 ? '#e49f41' : activeIndex === 1 ? '#60a6ff' : activeIndex === 2 ? '#00a090' : activeIndex === 3 ? '#ff8230' : activeIndex === 4 ? '#e53b4f' : activeIndex === 5 && '#870bf4'} />
      </>
    );
  };

  // customization piChart tooltip section---------------------------------------
  const customTooltipContent = ({ active, payload, label, index }) => {
    if (active && payload && payload.length) {
      return (
        <div className="w-auto h-auto " key={index}>
          {payload.map((pld, index) => (
            <div key={index} className='w-full h-full dark:bg-gray-700  bg-gray-500 rounded-xl opacity-80  flex justify-center items-center py-1 px-2 whitespace-nowrap'>
              <div className='dark:text-[#EDEDED] text-white'>{pld.name}</div>
            </div>
          ))}
        </div>
      );
    }

    return null;
  }
  // in this section, the color of the chequePrise text was determined
  const getTextColor = (current) => {
    if (current === 'واگذاري بانک') {
      return '#1B96FF';
    }
    if (current === 'وصول بانک') {
      return '#00BA88';
    }
    if (current === 'وصول برگشتی') {
      return '#E09126';
    }
    if (current === 'وصول قسمتی') {
      return '#F87F06';
    }
    if (current === "صندوق شعبه") {
      return '#DF2040';
    }
    if (current === 'برگشتی') {
      return '#DF2040';
    }
  }


  //scrolling for cheque tabs------------------------------------
  const onMouseMoveSlideTab = (e) => {
    const scrollContainer = tabSlideRef.current;
    if (scrollContainer) {
      scrollContainer.scrollLeft += e.movementX * 1.1;

    }
  }


  return (
    <>
      <div dir='ltr' className='w-full flex items-end justify-end flex-col mt-8 mb-4  ' >
        <AtomText title="چک ها" className="text-base font-bold  w-auto mb-1 text-right text-[#353535] dark:text-[#EDEDED]" />
        <div className='w-16 pl-4  border-b-4 rounded-tl-sm rounded-ee-md  border-[#1B96FF]  leading-8 '></div>
      </div>

      <AtomText title=".برای مشاهده جزئیات بیشتر روی نمودار کلیک کنید" className="text-sm font-normal mt-8 w-auto mb-1 text-right text-[#353535] dark:text-[#EDEDED]" />

      {MemoizationChequeData?.length > 0 && (
        <>
          <div className='w-full h-[240px] bg-white dark:bg-[#001639]'   >
            <ResponsiveContainer width="100%" height="100%"   >
              <PieChart style={{ width: '100%', height: '100%' }}  >
                <Pie
                  className='PieChart'
                  activeIndex={activeIndex}
                  data={data}
                  dataKey="value"
                  cursor="pointer"
                  isAnimationActive={true}
                  innerRadius={50}
                  outerRadius={80}
                  labelLine={false}
                  fill="#8884d8"
                  stroke={0}
                  activeShape={renderActiveShape}
                  onMouseOver={onMouseOver}
                  onMouseLeave={onMouseLeave}
                  onClickCapture={onClickCapture}
                >
                  {data.map((entry, index) => (
                    <Cell key={`call-${index}`} fill={`${getColorChart(entry.id)}`} />
                  ))}
                </Pie>
                <Tooltip
                  content={customTooltipContent}
                  isAnimationActive={true}
                  separator={": "}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Display the names of check items in two rows-------------------------------------- */}
          <div className='w-full h-auto inline-flex flex-row gap-3 justify-between items-center'>
            <div className='w-1/3 h-full  flex justify-start items-center'>
              <div className='w-auto flex flex-col  gap-2'>
                <div className='inline-flex justify-end items-center gap-1'>
                  <AtomText title=" واگذاری بانک" className="text-sm font-medium whitespace-nowrap" />
                  <div className="w-4 h-4 bg-[#1B96FF] rounded-full" />
                </div>
                <div className='inline-flex justify-end items-center gap-1'>
                  <AtomText title="برگشتی" className="text-sm font-medium whitespace-nowrap" />
                  <div className="w-4 h-4 bg-[#DF2040] rounded-full" />
                </div>
              </div>
            </div>
            <div className='w-1/3 h-full flex justify-center items-center'>
              <div className='w-1/3 h-full  flex justify-center items-center'>
                <div className='w-auto flex flex-col  gap-2'>
                  <div className='inline-flex justify-end items-center gap-1'>
                    <AtomText title="وصول بانک" className="text-sm font-medium whitespace-nowrap" />
                    <div className="w-4 h-4 bg-[#00966D] rounded-full" />
                  </div>
                  <div className='inline-flex justify-end items-center gap-1'>
                    <AtomText title=" وصول قسمتی" className="text-sm font-medium whitespace-nowrap" />
                    <div className="w-4 h-4 bg-[#F87F06] rounded-full" />
                  </div>
                </div>
              </div>
            </div>
            <div className='w-1/3 h-full  flex justify-end items-center'>
              <div className='w-auto flex flex-col  gap-2'>
                <div className='inline-flex justify-end items-center gap-1'>
                  <AtomText title="وصول برگشتی" className="text-sm font-medium whitespace-nowrap" />
                  <div className="w-4 h-4 bg-[#E09126] rounded-full" />
                </div>
                <div className='inline-flex justify-end items-center gap-1'>
                  <AtomText title="صندوق شبعه " className="text-sm font-medium whitespace-nowrap" />
                  <div className="w-4 h-4 bg-[#7F0DF1] rounded-full" />
                </div>
              </div>
            </div>
            <div>
            </div>
          </div>

          <div onMouseMove={onMouseMoveSlideTab} ref={tabSlideRef} dir='rtl' className='w-full relative h-10 mb-7 mt-6  pl-1 no-scrollbar overflow-y-hidden overflow-x-scroll duration-700 '>
            <div className={`w-full absolute h-10  left-0 duration-700 `}>
              <div className={`max-w-full lg:w-[366px] pr-1 flex m-auto gap-3 duration-700  }`} >
                <MlFinanCial slideTabOnClickItem={() => setIsActive('0')} tabIsActive={isActive === '0' ? true : false} Element="slideTab" slideTabTitleI="همه" slideTabTitleII={set0} />
                <MlFinanCial slideTabOnClickItem={() => setIsActive('1')} tabIsActive={isActive === '1' ? true : false} Element="slideTab" slideTabTitleI="وصول بانک" slideTabTitleII={set1} />
                <MlFinanCial slideTabOnClickItem={() => setIsActive('2')} tabIsActive={isActive === '2' ? true : false} Element="slideTab" slideTabTitleI="وصول برگشتی" slideTabTitleII={set2} />
                <MlFinanCial slideTabOnClickItem={() => setIsActive('3')} tabIsActive={isActive === '3' ? true : false} Element="slideTab" slideTabTitleI="واگذاری بانک" slideTabTitleII={set3} />
                <MlFinanCial slideTabOnClickItem={() => setIsActive('4')} tabIsActive={isActive === '4' ? true : false} Element="slideTab" slideTabTitleI="وصول قسمتی " slideTabTitleII={set4} />
                <MlFinanCial slideTabOnClickItem={() => setIsActive('5')} tabIsActive={isActive === '5' ? true : false} Element="slideTab" slideTabTitleI="برگشتی " slideTabTitleII={set5} />
                <MlFinanCial slideTabOnClickItem={() => setIsActive('6')} tabIsActive={isActive === '6' ? true : false} Element="slideTab" slideTabTitleI="صندوق شعبه " slideTabTitleII={set6} />
              </div>
            </div>
          </div>

          <table className='w-full inline-flex flex-row '>
            <thead className='w-full flex flex-row text-base font-normal  dark:text-[#EDEDED] text-[#353535] justify-between items-center'>
              <tr className='w-full  h-full inline-flex justify-between items-center'>
                <th className='w-[30%] max-lg:w-[20%] max-sm:w-[25%] h-full  inline-flex justify-start items-center'>  مبلغ (ریال)</th>
                <th className='w-[30%] h-full inline-flex justify-center items-center'>تاریخ</th>
                <th className='w-[30%] h-full inline-flex justify-center items-center'>شماره چک</th>
                <th className='w-[15%] h-full inline-flex justify-end items-center'>بانک</th>
              </tr>
            </thead>
          </table>
          {
            filteredChequeData && filteredChequeData.length > 0 && filteredChequeData.map((item, index) => (
              <div key={index} >
                <MlFinanCial Element="tableItem"
                  titlePrice={item.amount}
                  titleDescription={item.chequeCurrentStatus}
                  dateValue={item.dueDate}
                  checkNumber={item.chequeNo}
                  bankIcon={baseImageUrl + item.bank + ".png"}
                  chequeColorsText={getTextColor(item.chequeCurrentStatus)}
                />
              </div>
            ))
          }
          {
            !chequeDataPending && filteredChequeData && filteredChequeData.length <= 0 && (
              <div className='w-full h-full flex justify-center text-center whitespace-nowrap items-center mt-10 flex-col gap-2 duration-700'>
                <AtomIcon src={theme === "light" ? notCheckItem : notCheckItemDark} width={160} height={180} alt="icon" />
                <AtomText title={isActive === "0" ? '!در حال حاضر اطلاعاتی  موجود نمی باشد ' : isActive === '1' ? '!در حال حاضر وصول بانک موجود نمی باشد' : isActive === '2' ? '!در حال حاضر وصول برگشتی موجود نمی باشد' : isActive === '3' ? '!در حال حاضر  واگذاری بانکی  موجود نمی باشد' : isActive === '4' ? '!در حال حاضر وصول قسمتی موجود نمیباشد' : isActive === '5' ? 'در حال حاضر  چک های برگشتی موجود نمیباشد!' : 'در حال حاضر  چک های صندوق شعبه موجود نمیباشد!'} />
              </div>
            )
          }
        </>
      )
      }

      {
        !chequeDataPending && MemoizationChequeData && MemoizationChequeData.length <= 0 && (
          <div className='w-full h-full flex justify-center text-center  whitespace-nowrap items-center mt-10 flex-col gap-2'>
            <AtomIcon src={theme === "light" ? notChequeIcon : notChequeDarkIcon} width={160} height={180} alt="icon" />
          </div>
        )
      }
      {
        chequeDataPending && (
          <div className="relative items-center  mt-40 flex justify-center ">
            <svg aria-hidden="true" className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
          </div>
        )
      }

      {
        toTopButtonShow && (
          <div onClick={() => dispatch(stateToTopScroll(true))} className='w-10 h-10 absolute top-3/4 cursor-pointer bg-slate-50 dark:bg-[#353535] flex rounded-full hover:scale-105 duration-500 '>
            <AtomIcon src={theme === "light" ? toTopIcon : toTopIconDark} width={32} height={32} alt="toTop" className="m-auto " />
          </div>
        )
      }
    </ >
  )

}
