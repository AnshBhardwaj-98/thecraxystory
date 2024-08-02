"use client";

import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";

import LoadingBar from "react-top-loading-bar";
import Article from "../../components/Article";

import { db } from "@/libs/firebase/config";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
const Hackarticles = () => {
  const [progress, setProgress] = useState(0);
  const [accesstkn, setAccesstkn] = useState();
  let decodedToken:
    | (jwt.Jwt & jwt.JwtPayload)
    | ((prevState: undefined) => undefined)
    | null
    | undefined;

  // useEffect(() => {

  // }, []);

  const [Articles, setArticles] = useState([]);

  const storiesCollectionRef = collection(db, "stories");

  //
  //
  useEffect(() => {
    //
    //
    //
    //

    const accessTokenuef = localStorage.getItem("accessToken");

    decodedToken = jwt.decode(accessTokenuef);

    setAccesstkn(decodedToken);

    const getStoriesList = async () => {
      const docref = doc(db, "stories", decodedToken.email);

      const q = query(
        storiesCollectionRef,
        where("author_id", "==", decodedToken.email)
      );

      setProgress(20);
      try {
        const StoriesData = await getDocs(q);
        setProgress(40);

        const filteredData = StoriesData.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProgress(50);

        setArticles(filteredData);
        setProgress(100);
      } catch (error) {
        console.log(error);
        setProgress(100);
      }
    };

    decodedToken && getStoriesList();
  }, []);

  return (
    <>
      {/* <Navbar/> */}
      <div>
        <LoadingBar color="#32de84" height={6} progress={progress} />
      </div>
      {accesstkn ? (
        <div className="flex flex-col items-center overflow-x-hidden overflow-y-scroll  custom-scrollbar mt-6 h-[87vh]">
          {Articles.length != 0 ? (
            Articles.map((e, ind) => {
              return (
                <>
                  <div
                    className="bg-orange-50  mb-2 max-w-[60%] min-w-[60%]  max-h-[30%] min-h-[30%] cursor-pointer"
                    key={ind}
                  >
                    <Article props={e} key={ind} />;
                  </div>
                </>
              );
            })
          ) : (
            <div className="flex items-center justify-center h-[20vh] w-[100vw] mt-6 text-emerald-600 text-2xl">
              <div className="flex items-center justify-center w-[60%] h-full bg-slate-200  border-2 border-black p-4">
                <div className="flex items-center justify-center h-full w-full bg-red-50 ">
                  Your Feed is empty
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[40vh] w-[100vw] mt-6 text-emerald-600 text-2xl">
          <div className="flex items-center justify-center w-[60%] h-full bg-slate-200  border-2 border-black p-4">
            <div className="flex items-center justify-center h-full w-full bg-red-50 ">
              Please Log In to see your personalized feed
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hackarticles;
