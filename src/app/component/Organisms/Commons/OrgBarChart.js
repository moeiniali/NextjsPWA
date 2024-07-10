
import '../Organism.css';
import { AtomText } from '../../exAllCo';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { number, string } from 'prop-types';

const OrgBarChart = () => {
  const theme = localStorage.getItem('theme');
  const dispatch = useDispatch();
  const monthlySaleData = useSelector((state) => state.financialSlice.monthlySaleData);
  const monthlySalePending = useSelector((state) => state.financialSlice.monthlySaleDataPending);

  const [AmountValue, setAmountValue] = useState('');
  const [dateNameTitle, setDateNameTitle] = useState('');
  const [totalSaleAmount, setTotalSaleAmount] = useState(null);
  const dateName = [{ id: '01', name: 'فروردین', }, { id: '02', name: 'اردیبهشت', }, { id: '03', name: 'خرداد', }, { id: '04', name: 'تیر', }, { id: '05', name: 'مرداد', }, { id: '06', name: 'شهریور', }, { id: '07', name: 'مهر', }, { id: '08', name: 'آبان', }, { id: '09', name: 'آذر', }, { id: '10', name: 'دی', }, { id: '11', name: 'بهمن', }, { id: '12', name: 'اسفند', }]


  const MemoizationMonthlySaleData = useMemo(() => {
    return Array.isArray(monthlySaleData)
      ? monthlySaleData.map((item) => {
        return item;
      }) : []
  }, [monthlySaleData])



  // This code is to get the first value of saleAmount to display on the page
  const firstSaleAmountValue = useMemo(() => {
    if (Array.isArray(MemoizationMonthlySaleData) && MemoizationMonthlySaleData.length > 0) {
      let sum = MemoizationMonthlySaleData.reduce((accumulator, object) => {
        return accumulator + object.saleAmount;
      }, 0);

      let str = sum.toString();
      let rial_to_ToMan = str.length > 1 && str.slice(0, -1);
      rial_to_ToMan += '';
      rial_to_ToMan = rial_to_ToMan.replace(',', '');
      let x = rial_to_ToMan.split('.');
      let y = x[0];
      let z = x.length > 1 ? '.' + x[1] : '';
      let rgx = /(\d+)(\d{3})/;
      while (rgx.test(y)) {
        y = y.replace(rgx, '$1' + ',' + '$2');
      }
      return y + z
    } else {
      console.log("not  MemoizationMonthlySaleData.reduce");
      return 0;
    }
  }, [MemoizationMonthlySaleData])


  // extractDay And ConvertRialToToman----------------------------------------
  const extractDayAndConvertToToMan = useMemo(() => {
    const newDataArray = [];
    if (Array.isArray(MemoizationMonthlySaleData) && MemoizationMonthlySaleData.length > 0) {
      MemoizationMonthlySaleData.map((item) => {
        if (item) {
          const sliceDateItem = item.month.slice(item.month.indexOf('/') + 1);
          const convertSaleAmount = Math.round(item.saleAmount / 1000000);
          newDataArray.push({ month: sliceDateItem, saleAmount: convertSaleAmount });
        }
      })
      return { data: newDataArray };
    }
  }, [MemoizationMonthlySaleData])


  //This section is for showing the amount of money every month as soon as you click
  const barChartItemClick = (e) => {
    const pay = e.activePayload;
    let payDate;
    if (pay) {
      pay.map((item) => {
        payDate = item.payload.month;
      })
    }
    const checkedValues = MemoizationMonthlySaleData.find((item) => item.month.slice(item.month.indexOf('/') + 1) === payDate);

    const showDateName = dateName.find((item) => item.id === payDate);

    if (showDateName) {
      setDateNameTitle(showDateName.name)
    }

    if (checkedValues) {
      const strAmount = checkedValues.saleAmount.toString();
      const rial_to_ToMan = strAmount.length > 1 && strAmount.slice(0, -1);

      const separate = (rial_to_ToMan) => {
        rial_to_ToMan += '';
        rial_to_ToMan = rial_to_ToMan.replace(',', '');
        let x = rial_to_ToMan.split('.');
        let y = x[0];
        let z = x.length > 1 ? '.' + x[1] : '';
        let rgx = /(\d+)(\d{3})/;
        while (rgx.test(y)) {
          y = y.replace(rgx, '$1' + ',' + '$2');
          setAmountValue(y + z);
        }
      }
      separate(rial_to_ToMan)

      if (!rial_to_ToMan) {
        setAmountValue('0');
      }

    } else {
      console.log("مقادیر همسان نیستند");
    }
  };



  // customization barChart tooltip section---------------------------------------
  const customTooltipContent = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="w-auto h-auto ">
          {payload.map((pld, index) => (
            <div key={index} className='w-full h-full dark:bg-gray-700  bg-gray-500 rounded-xl opacity-80  flex justify-center items-center py-1 px-2 whitespace-nowrap' >
              <div className='dark:text-[#EDEDED] text-white'>
                {/* {showDateName + ' ' + 'ماه'} */}
                {dateName.find((item) => item.id === pld.payload.month)?.name + ' ' + 'ماه'}
              </div>
            </div>
          ))
          }
        </div >
      );
    }
    return null;
  }



  return (
    <>


      {MemoizationMonthlySaleData && MemoizationMonthlySaleData.length > 0 && (
        <>


          <ResponsiveContainer width="100%" height={210} className={'select-none'} >


            <BarChart
              data={extractDayAndConvertToToMan?.data}
              className={`${theme === "light" ? 'bg-[white] ' : 'bg-[#001639] text-[#353535] '} select-none`}
              margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 5,
              }}
              onClick={barChartItemClick}
              cursor="pointer"
            >
              <XAxis
                label={{ value: 'ماه', position: 'insideBottomRight', offset: -1 }}
                dataKey="month"
                type="category"
                allowDuplicatedCategory={true}
                tickLine={false}
                axisLine={false}
                fontSize={12}
                fontWeight={500}
                className='ss01'
              />

              <YAxis
                dataKey={extractDayAndConvertToToMan?.data?.saleAmount}
                label={{ value: 'میلیون', angle: -90, position: 'insideLeft', }}
                tickLine={false}
                axisLine={false}
                orientation="left"
                scale="pow"
                fontSize={12}
                fontWeight={500}
                className='ss01'
              />

              <Tooltip
                content={customTooltipContent}
                cursor={{ fill: theme === "light" ? '#F0F0F0' : '#3D4C65' }}
                labelStyle={{ color: 'gray' }}
                isAnimationActive={false}
                separator={": "}
              />

              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar
                dataKey="saleAmount"
                isAnimationActive={true}
                fill="#1B96FF"
                cursor="pointer"
                background={{ fill: theme === "light" ? '#E4E4E4' : '#657081' }}
                activeBar={<Rectangle fill="#1B96FF" />}
                radius={[100, 100, 100, 100]} barSize={10} />
            </BarChart>

          </ResponsiveContainer>


          <div className="w-full h-[88px] flex-col justify-center items-center gap-4 inline-flex top-4">
            <div className="px-3 bg-[#F9F9F9] dark:bg-[#0C0C0C] rounded-[50px] justify-center items-center gap-2 inline-flex">
              <div className="text-right text-neutral-500 text-xs font-medium leading-7"></div>
              <AtomText title={`خالص عملکرد  ${!dateNameTitle ? 'یکسال' : dateNameTitle + ' ' + 'ماه'}`} className="text-right py-2 text-#E1E1E1 dark:text-[#E1E1E1] text-xs font-medium  leading-7 ss01 " />
            </div>
            <div className="px-3 py-1 bg-[#78B0FD] dark:bg-[#0B5CAB] rounded-2xl flex-col justify-start items-center flex">
              <div className="p-1 justify-center items-center gap-2.5 inline-flex">
                <div className="text-right text-white text-sm font-medium  leading-7">تومان</div>
                <AtomText title={AmountValue ? AmountValue : firstSaleAmountValue} className="text-right py-2 text-white text-[32px] font-medium  leading-7 ss01 " />
              </div>
            </div>
          </div>
        </>
      )}
      {!MemoizationMonthlySaleData || MemoizationMonthlySaleData.length <= 0 && monthlySalePending && (
        <div className="w-full h-full p-20 relative items-center  flex justify-center">
          <svg aria-hidden="true" className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
        </div>
      )}









    </>);
}

export default OrgBarChart;
