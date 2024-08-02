"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { db } from "@/libs/firebase/config";
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  deleteDoc,
} from "firebase/firestore";
import Comments from "@/components/Comments";
import jwt from "jsonwebtoken";

const ReadnComm = () => {
  const postid = localStorage.getItem("ClickedStoryID");
  const docref = doc(db, "stories", postid);
  const router = useRouter();

  // const router = useRouter();
  // const data = router.query;

  const [Document, setDocument] = useState({});
  const [IsDisable, setIsDisable] = useState(false);
  const [LikeCount, setLikeCount] = useState(0);
  const [DislikeCount, setDislikeCount] = useState(0);
  const [CommentCount, setCommentCount] = useState([]);
  const [CanDelete, setCanDelete] = useState(false);
  const [TypedComment, setTypedComment] = useState({
    commenterName: "",
    commenterProfileURL: "",
    comment: "",
  });

  useEffect(() => {
    // Your code here
    /*
      Query logic
      */

    let author = "";
    let authorProfileUrl = "";
    const token = localStorage.getItem("accessToken");
    const decodedToken = jwt.decode(token);
    if (decodedToken) {
      author = decodedToken.name;
      authorProfileUrl = decodedToken.picture;
    }

    setTypedComment({
      ...TypedComment,
      commenterName: author,
      commenterProfileURL: authorProfileUrl,
    });

    // postid = localStorage.getItem("ClickedStoryID");
    const docref = doc(db, "stories", postid);

    const getStoriesList = async () => {
      try {
        const docSnap = await getDoc(docref);

        if (docSnap.exists()) {
          setDocument(docSnap.data());
          setDislikeCount(docSnap.data().dislikes);
          setLikeCount(docSnap.data().likes);
          setCommentCount(docSnap.data().comments);
          setCanDelete(docSnap.data().author_id === decodedToken.email);
        } else {
          console.log("Document does not exist");
        }
        // setArticles(filteredData);
      } catch (error) {
        console.log(error);
      }
    };

    getStoriesList();
  }, []);

  const updatedislike = async () => {
    // const postid = localStorage.getItem("ClickedStoryID");

    const storiesCollectionRef = collection(db, "stories");
    let dislikeCount;

    try {
      const docSnap = await getDoc(docref);

      if (docSnap.exists()) {
        dislikeCount = docSnap.data().dislikes + 1;
        setDislikeCount(dislikeCount);
        updateDoc(docref, { dislikes: dislikeCount });
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updatelike = async () => {
    // const postid = localStorage.getItem("ClickedStoryID");

    const storiesCollectionRef = collection(db, "stories");
    let likeCount;

    try {
      const docSnap = await getDoc(docref);

      if (docSnap.exists()) {
        likeCount = docSnap.data().likes + 1;
        setLikeCount(likeCount);
        updateDoc(docref, { likes: likeCount });
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const AddComment = async () => {
    // const postid = localStorage.getItem("ClickedStoryID");

    // const storiesCollectionRef = collection(db, "stories");

    try {
      const docSnap = await getDoc(docref);

      if (docSnap.exists()) {
        updateDoc(docref, { comments: arrayUnion(TypedComment) });
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteThisPost = async () => {
    const storiesCollectionRef = collection(db, "stories");
    // console.log("delete");

    const res = await deleteDoc(docref);
    router.push("/myfeed");
    if (res) {
      console.log("Post deleted successfully");
    }
  };

  const [Content, setContent] = useState("");

  return (
    <div className=" h-max w-full flex justify-center ">
      <div className="w-[74%]  h-[85%] bg-green-300 border-2 border-black absolute mt-4 p-2 rounded-md  text-black flex">
        <div className="h-futll w-full bg-white flex-1 border-2 border-black rounded-tl-md rounded-bl-md overflow-y-scroll overflow-x-hidden no-scrollbar">
          <div className="w-full h-[8%] flex p-4 items-center justify-between border-b-[1px] border-black ">
            <div className="flex  items-center ">
              <img
                className="h-8 w-8 rounded-full mr-2"
                src={
                  Document.authorProfileUrl
                    ? Document.authorProfileUrl
                    : "https://img.icons8.com/?size=100&id=xXjlE05o3dcg&format=png&color=000000"
                }
                alt=""
              />
              {Document.author ? Document.author : "Anonymous"}{" "}
              <div className="">---- {Document.dateCreated}</div>
            </div>

            {CanDelete && (
              <button
                type="button"
                className="bg-red-500 rounded-md h-8 w-8 flex items-center justify-center"
                onClick={() => {
                  DeleteThisPost();
                }}
              >
                {" "}
                <img
                  className="h-6 w-6"
                  src="https://img.icons8.com/?size=100&id=UXGrKssCNlJd&format=png&color=000000"
                  alt=""
                />
              </button>
            )}
          </div>
          <div className=" p-2  flex items-center  font-bold border-b-orange-500 border-2 whitespace-pre-wrap ">
            {Document.title}
          </div>
          <div className=" p-4 pt-2  text-sm whitespace-pre-wrap ">
            {Document.content}
          </div>
        </div>
        <div className="h-full w-full bg-green-50 flex-[0.5] border-r-2 border-b-2 border-t-2 border-black rounded-tr-md rounded-br-md flex flex-col">
          <div className="w-full h-[8%] flex p-4 items-center justify-between border-b-[1px] border-black ">
            <div className="">Comments: {CommentCount.length}</div>
            <div className="flex items-center justify-between ">
              <div className="">
                <button
                  type="button"
                  disabled={IsDisable}
                  title="Like"
                  onClick={() => {
                    setIsDisable(true);
                    updatelike();
                  }}
                  className={`flex justify-center items-center p-2 mr-4 rounded h-8 w-fit border-2 ${
                    IsDisable ? "bg-emerald-200" : ""
                  }`}
                >
                  <img
                    className="h-4 w-4"
                    src="https://img.icons8.com/?size=100&id=85597&format=png&color=000000"
                    alt="Like"
                  />
                  <div className="ml-1">
                    {LikeCount > 1000
                      ? `${
                          LikeCount >= 10000
                            ? `${
                                LikeCount >= 1000000
                                  ? `${(LikeCount / 100000).toFixed(1)}M`
                                  : `${(LikeCount / 1000).toFixed(1)}K`
                              }`
                            : `${LikeCount}`
                        }`
                      : `${LikeCount}`}
                  </div>
                </button>
              </div>
              <div className="">
                <button
                  type="button"
                  disabled={IsDisable}
                  title="Dislike"
                  onClick={() => {
                    setIsDisable(true);
                    updatedislike();
                  }}
                  className={`flex justify-center items-center p-2  rounded h-8 w-fit border-2 ${
                    IsDisable ? "bg-red-200" : ""
                  }`}
                >
                  <img
                    className="h-4 w-4"
                    src="https://img.icons8.com/?size=100&id=6226&format=png&color=000000"
                    alt=""
                  />
                  <div className="ml-1">
                    {DislikeCount > 1000
                      ? `${
                          DislikeCount >= 10000
                            ? `${
                                DislikeCount >= 1000000
                                  ? `${(DislikeCount / 100000).toFixed(1)}M`
                                  : `${(DislikeCount / 1000).toFixed(1)}K`
                              }`
                            : `${DislikeCount}`
                        }`
                      : `${DislikeCount}`}
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1 p-2 overflow-y-scroll no-scrollbar">
            {CommentCount.map((e, index) => {
              return (
                <>
                  <div>
                    <Comments props={e} key={index} />
                  </div>
                </>
              );
            })}
          </div>
          <div className="w-full h-[10%] flex p-2 items-center justify-between  border-t-[1px] border-black  text-xs">
            <input
              type="text"
              className="h-full w-full pl-2 border-2 border-black"
              placeholder="Enter Comment"
              onChange={(e) => {
                setTypedComment({ ...TypedComment, comment: e.target.value });
              }}
            />
            <button
              type="button"
              className={`p-2 flex justify-center  rounded-sm h-full items-center border-2 border-black border-l-0 cursor-pointer ${
                TypedComment.comment.length == 0
                  ? "bg-red-200"
                  : "bg-emerald-200"
              }`}
              disabled={TypedComment.comment.length == 0 ? true : false}
              onClick={() => {
                TypedComment.comment &&
                  AddComment().then(() => {
                    setTypedComment({ ...TypedComment, comment: "" });
                  });
              }}
            >
              <img
                className="h-4 w-4  "
                src="https://img.icons8.com/?size=100&id=12628&format=png&color=000000"
                alt=""
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadnComm;
