"use client";

import React, { useEffect, useState } from "react";
import "../styles/navbar.css";
import Link from "next/link";
import { signInWithGoogle, signOutWithGoogle } from "@/libs/firebase/auth";
import LoadingBar from "react-top-loading-bar";
import jwt from "jsonwebtoken";
// import router, { Router } from "next/router";
import { useRouter } from "next/navigation";
// import Cookies from 'js-cookie';

// import {auth,provider} from "../firebase"

const Navbar = () => {
  const [progress, setProgress] = useState(0);

  const [User, setUser] = useState(false);
  const [accesstkn, setAccesstkn] = useState();
  const [IsActive, setIsActive] = useState("Global");

  const router = useRouter();

  let decodedToken;

  const signin = async () => {
    setProgress(10);
    const UserInfo = await signInWithGoogle();
    UserInfo ? setUser(true) : setUser(false);

    // console.log(UserInfo.stsTokenManager.accessToken);
    const accessToken = UserInfo.stsTokenManager.accessToken;
    const refreshToken = UserInfo.stsTokenManager.refreshToken;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    decodedToken = jwt.decode(accessToken);
    // setAccesstkn(decodedToken)
    // console.log(accesstkn);

    // Cookies.set('myCookie', JSON.stringify(UserData));
    setProgress(100);
    router.push(`/`);
  };
  const signout = async () => {
    console.log("sign out");
    setProgress(30);
    alert("Press OK to Log Out");
    signOutWithGoogle();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setProgress(70);
    setUser(false);
    router.push(`/`);

    // const cookieValue = Cookies.get('myCookie');
    // if (cookieValue) {
    //   console.log(JSON.parse(cookieValue));

    // }

    // User?alert("signed out successfully"):""
    setProgress(100);
  };

  useEffect(() => {
    const accessTokenuef = localStorage.getItem("accessToken");
    if (accessTokenuef) {
      setUser(true);
    }

    decodedToken = jwt.decode(accessTokenuef);

    setAccesstkn(decodedToken);
    setIsActive(localStorage.getItem("Page"));

    // console.log(decodedToken)
  }, []);

  return (
    <>
      <div id="MoreTop">
        <LoadingBar color="#32de84" height={6} progress={progress} />
      </div>
      <div className="navtabs">
        <Link href={"/"}>
          <div
            className="navtab"
            onClick={() => {
              setIsActive("Global");
              localStorage.setItem("Page", "Global");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="30"
              height="30"
              viewBox="0 0 172 172"
              style={{ fill: "#26e07f" }}
            >
              <g
                fill="none"
                fillRule="nonzero"
                stroke="none"
                strokeWidth="1"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeMiterlimit="10"
                strokeDasharray=""
                strokeDashoffset="0"
                fontFamily="none"
                fontWeight="none"
                fontSize="none"
                textAnchor="none"
                style={{ mixBlendMode: "normal" }}
              >
                <path d="M0,172v-172h172v172z" fill="none"></path>
                <g fill="#1fb141">
                  <path d="M21.5,21.5v129h64.5v-32.25v-64.5v-32.25zM86,53.75c0,17.7805 14.4695,32.25 32.25,32.25c17.7805,0 32.25,-14.4695 32.25,-32.25c0,-17.7805 -14.4695,-32.25 -32.25,-32.25c-17.7805,0 -32.25,14.4695 -32.25,32.25zM118.25,86c-17.7805,0 -32.25,14.4695 -32.25,32.25c0,17.7805 14.4695,32.25 32.25,32.25c17.7805,0 32.25,-14.4695 32.25,-32.25c0,-17.7805 -14.4695,-32.25 -32.25,-32.25z"></path>
                </g>
              </g>
            </svg>
          </div>
        </Link>
        <Link href={"/"}>
          <div
            className={`navtab ${IsActive == "Global" ? "active" : ""}`}
            onClick={() => {
              setIsActive("Global");

              localStorage.setItem("Page", "Global");
            }}
          >
            Global
          </div>
        </Link>
        <Link href={"/addarticle"}>
          <div
            className={`navtab ${IsActive == "MyFeed" ? "active" : ""}`}
            onClick={() => {
              setIsActive("AddArticle");
              localStorage.setItem("Page", "AddArticle");
            }}
          >
            <img
              className="h-10 w-10"
              src="https://img.icons8.com/?size=100&id=oqWjYJSQSZAj&format=png&color=36D39A"
              alt=""
            />
          </div>
        </Link>
        <Link href={"/myfeed"}>
          <div
            className={`navtab ${IsActive == "MyFeed" ? "active" : ""}`}
            onClick={() => {
              setIsActive("MyFeed");
              localStorage.setItem("Page", "MyFeed");
            }}
          >
            Your Feed
          </div>
        </Link>
        <Link href={"/about"}>
          <div
            className={`navtab ${IsActive == "About" ? "active" : ""}`}
            onClick={() => {
              setIsActive("About");
              localStorage.setItem("Page", "About");
            }}
          >
            About Us
          </div>
        </Link>
        <div className={`navtab`}>
          {User ? (
            <img
              className="h-6 w-6 rounded-full"
              src={
                accesstkn != null
                  ? accesstkn.picture
                  : "https://img.icons8.com/?size=100&id=xXjlE05o3dcg&format=png&color=000000"
              }
              // src="https://img.icons8.com/?size=100&id=xXjlE05o3dcg&format=png&color=000000"
              // src={accesstkn.picture}
              alt=""
              title={accesstkn != null ? accesstkn.name : "name"}
            />
          ) : (
            <div className="" title="Continue with Google">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0 0 48 48"
                onClick={signin}
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
            </div>
          )}
        </div>
        {User && (
          <div className="" onClick={signout}>
            <button className="bg-red-600 pl-2 pr-2 pt-1 pb-1 rounded-md">
              Logout
            </button>
          </div>
        )}
        {/* <div className="navtab" >
          Page5
        </div>
        <div className="navtab">
          Page6
        </div>
        <div className="navtab" >
          Page7
        </div> */}
        <div className="underline"></div>
      </div>
    </>
  );
};

export default Navbar;
