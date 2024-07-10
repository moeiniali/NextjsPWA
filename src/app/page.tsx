"use client"
import Image from "next/image";
import { useState, useEffect } from "react";
import { AtomButton } from "./component/exAllCo";
export default function Home() {
  const [showSplash, setShowSplash] = useState(true);


  useEffect(() => {
    setTimeout(() => setShowSplash(false), 3000);
  }, []);

  return (
    <main className="max-w-[400px] m-auto flex bg-white min-h-screen flex-col justify-center items-center  p-24">
      {showSplash ? (
        <>
          <Image
            src="/images/Frame 427320335.svg"
            width={157}
            height={37}
            alt="Picture of the author"
          />
          <Image
            className=" bottom-20 absolute "
            src="/images/Group 27467.svg"
            width={81}
            height={17}
            alt="Picture of the author"
          />
        </>
      ) : (
        <>
          <AtomButton elem="fill" >شروع ثبت نام</AtomButton>
          <AtomButton Element="stroke" >شروع ثبت نام</AtomButton>

        </>
      )
      }
    </main >
  );
}
