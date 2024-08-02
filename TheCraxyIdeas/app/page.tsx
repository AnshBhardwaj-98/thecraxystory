"use client";


import Footer from "@/components/Footer";
import Hackarticles from "@/components/Hackarticles";
import Navbar from "@/components/Navbar";
import Link from "next/link";



export default function Home() {

 
  
  return (
    < >
    <div className="h-[87vh]">

      {/* <Navbar/> */}
      <Hackarticles/>
      <Link href={"#Top"} >
      <button  className="absolute bottom-0 right-0 h-[50px] w-[50px] mb-10 mr-10 p-1 rounded-full bg-emerald-500" title="scroll to top"><img src="https://img.icons8.com/?size=100&id=2775&format=png&color=000000" alt="go to top"  className="bg-white p-2 rounded-full"/></button>
      </Link>
      {/* <Footer/> */}
    </div>
    </>
    // <div>hellow</div>
  );
}
