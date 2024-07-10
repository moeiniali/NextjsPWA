import { RSC_PREFETCH_SUFFIX } from 'next/dist/lib/constants';
import React, { Children } from 'react';

type Props = {
  type?: string,
  props?: React.HTMLAttributes<HTMLButtonElement>,
  children: React.ReactNode | React.ReactNode[],
  Element?: string | undefined
}
const AtomButton = ({ type, props, children, Element }: Props) => {


  const handlerElement = (elem: string) => {
    switch (elem) {
      case "fill":
        return (
          <>
            <button style={{
              width: '100%',
              height: '40px',
              textAlign: 'center',
              borderRadius: '50px',

              // backgroundColor:'transparent'
            }}

              {...props} type="button"
              className="text-white bg-[#61259E]   hover:bg-[#4C1D7C] disabled:bg-[#969492]  disabled:cursor-not-allowed  disabled:text-[#969492] hover:scale-95 duration-1000">
              {Children.map(children, (child) => child)}
            </button>
          </>
        )
      case "stroke":
        return (
          <>
            <button style={{
              width: '100%',
              height: '40px',
              textAlign: 'center',
              borderRadius: '50px',

              // backgroundColor:'transparent'
            }}

              {...props} type="button"
              className="text-white bg-[#FFFFFF]    disabled:bg-[#FFFFFF]  disabled:cursor-not-allowed  disabled:text-[#969492] hover:scale-95 duration-1000">
              {Children.map(children, (child) => child)}
            </button>
          </>
        )
      case "text":
        return (
          <>
            <button style={{
              width: '100%',
              height: '40px',
              textAlign: 'center',
              borderRadius: '50px',

              // backgroundColor:'transparent'
            }}

              {...props} type="button"
              className="text-white bg-[#61259E]   hover:bg-[#4C1D7C] disabled:bg-[#969492]  disabled:cursor-not-allowed  disabled:text-[#969492] hover:scale-95 duration-1000">
              {Children.map(children, (child) => child)}
            </button></>
        )

      default:
        break;
    }
    // add your logic here
    console.log('Button clicked');
  }



  return (
    <>
      {handlerElement(Element || 'fill')}

    </>
  )
}
export default AtomButton;





