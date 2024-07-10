"use client"
import Image from "next/image";
import { useSelector } from "react-redux";

export default function Home() {
  const data = useSelector((state: any) => state.loginSlice);


  console.log(data);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
      login
    </main>
  );
}
