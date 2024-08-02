import React, { useEffect, useState } from "react";

import LoadingBar from "react-top-loading-bar";
import Article from "./Article";
import { db } from "@/libs/firebase/config";
import { collection, getDocs } from "firebase/firestore";

const Hackarticles = () => {
  const [progress, setProgress] = useState(0);
  const [Articles, setArticles] = useState<string[]>([]);

  const storiesCollectionRef = collection(db, "stories");
  useEffect(() => {
    const getStoriesList = async () => {
      setProgress(20);
      try {
        const StoriesData = await getDocs(storiesCollectionRef);
        setProgress(40);

        const filteredData = StoriesData.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProgress(50);

        // console.log(filteredData);
        setArticles(filteredData);
        setProgress(100);
      } catch (error) {
        console.log(error);
        setProgress(100);
      }
    };

    getStoriesList();
  }, []);

  return (
    <div className="flex flex-col items-center h-full overflow-x-hidden overflow-y-scroll  custom-scrollbar">
      <div id="MoreTop">
        <LoadingBar color="#32de84" height={6} progress={progress} />
      </div>
      <div
        // className="flex items-center justify-center p-4 mb-2 mt-6 bg-red-50 border-2 border-black max-w-[64%] max-h-[45%] ml-6 mr-6 "
        className="mb-2"
        id="Top"
      >
        {/* <div
          className="flex items-center  bg-inherit h-full w-full overflow-y-hidden overflow-x-scroll no-scrollbar"
          id="Top"
        >
          <MostArticle />
          <MostArticle />
          <MostArticle />
          <MostArticle />
          <MostArticle />
          <MostArticle />
        </div> */}
      </div>

      {Articles.map((e, ind) => {
        return (
          <div
            className="bg-orange-50  mb-2 max-w-[60%] min-w-[60%]  max-h-[30%] min-h-[30%] cursor-pointer"
            key={ind}
          >
            <Article props={e} key={ind} />;
          </div>
        );
      })}
    </div>
  );
};

export default Hackarticles;
