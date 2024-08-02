import React, { ReactNode } from "react";
import "../data/article.json";
import Link from "next/link";
import { ParsedUrlQueryInput } from "querystring";
import { db } from "@/libs/firebase/config";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";

const Article = (props: {
  props: {
    dateCreated: ReactNode;
    title: ReactNode;
    id: string | ParsedUrlQueryInput | null | undefined;
    content:
      | string
      | number
      | bigint
      | boolean
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | Iterable<React.ReactNode>
      | React.ReactPortal
      | Promise<React.AwaitedReactNode>
      | null
      | undefined;
    authorProfileUrl: string | undefined;
    author:
      | string
      | number
      | bigint
      | boolean
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | Iterable<React.ReactNode>
      | React.ReactPortal
      | Promise<React.AwaitedReactNode>
      | null
      | undefined;
    reads: number;
    likes: number;
    dislikes: number;
    comments: number;
  };
}) => {
  let decodedToken;
  // useEffect(() => {}, []);

  const read = async (id: undefined) => {
    // return <ReadnComm show="true" />;
    // console.log(id);
    id && localStorage.setItem("ClickedStoryID", id);

    const postid = localStorage.getItem("ClickedStoryID");

    const storiesCollectionRef = collection(db, "stories");
    const docref = doc(db, "stories", postid);
    let readCount;

    try {
      const docSnap = await getDoc(docref);

      if (docSnap.exists()) {
        readCount = docSnap.data().reads + 1;
        // console.log(readCount);
        updateDoc(docref, { reads: readCount });
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className=" bg-orange-50 border-2 border-black mb-2 w-full p-4 h-full cursor-pointer text-black">
        <div className=" w-full h-6 flex justify-between items-center  text-sm font-semibold mb-2">
          <div className="">
            {props.props.title.length > 100
              ? props.props.title.slice(0, 100) + " ..."
              : props.props.title}
          </div>
          <div className="">{props.props.dateCreated}</div>
        </div>
        <Link
          href={{
            pathname: "/readStory",
            query: props.props.id,
          }}
        >
          <div
            className="  text-black w-full h-[60%] overflow-hidden text-xs"
            onClick={() => {
              read(props.props.id);
            }}
          >
            {props.props.content.length > 780
              ? props.props.content.slice(0, 780) + " ..."
              : props.props.content}
          </div>
        </Link>
        <div className="flex justify-between items-center mt-2 max-h-[20%] text-black  border-t-2">
          <div
            className="flex justify-between items-center "
            onClick={() => {
              console.log("Profile");
            }}
          >
            <img
              className="h-6 w-6 mr-2 rounded-full"
              src={
                props.props.authorProfileUrl
                  ? props.props.authorProfileUrl
                  : "https://img.icons8.com/?size=100&id=xXjlE05o3dcg&format=png&color=000000"
              }
              alt=""
            />{" "}
            {props.props.author ? props.props.author : "Anonymous"}
          </div>
          <div className=" flex ">
            <Link
              href={{
                pathname: "/readStory",
                query: props.props.id,
              }}
            >
              <button
                title="Read"
                onClick={() => {
                  read(props.props.id);
                }}
                className="flex justify-center items-center p-2 mr-12 rounded h-8 w-8 border-b-4 border-emerald-400"
              >
                <img
                  src="https://img.icons8.com/?size=100&id=100240&format=png&color=000000"
                  alt="read"
                />
                <div className="ml-1">
                  {props.props.reads > 1000
                    ? `${
                        props.props.reads >= 10000
                          ? `${
                              props.props.reads >= 1000000
                                ? `${(props.props.reads / 100000).toFixed(1)}M`
                                : `${(props.props.reads / 1000).toFixed(1)}K`
                            }`
                          : `${props.props.reads}`
                      }`
                    : `${props.props.reads}`}
                </div>
              </button>
            </Link>
            <button
              title="Like"
              onClick={() => {
                console.log("Like");
              }}
              className="flex justify-center items-center p-2 mr-12 rounded h-8 w-8 border-b-4 border-emerald-400"
            >
              <img
                src="https://img.icons8.com/?size=100&id=85597&format=png&color=000000"
                alt="Like"
              />
              <div className="ml-1">
                {props.props.likes > 1000
                  ? `${
                      props.props.likes >= 10000
                        ? `${
                            props.props.likes >= 1000000
                              ? `${(props.props.likes / 100000).toFixed(1)}M`
                              : `${(props.props.likes / 1000).toFixed(1)}K`
                          }`
                        : `${props.props.likes}`
                    }`
                  : `${props.props.likes}`}
              </div>
            </button>
            <button
              title="Dislike"
              onClick={() => {
                console.log("Dislike");
              }}
              className="flex justify-center items-center p-2 mr-12 rounded h-8 w-8 border-b-4 border-emerald-400"
            >
              <img
                src="https://img.icons8.com/?size=100&id=6226&format=png&color=000000"
                alt=""
              />
              <div className="ml-1">
                {props.props.dislikes > 1000
                  ? `${
                      props.props.dislikes >= 10000
                        ? `${
                            props.props.dislikes >= 1000000
                              ? `${(props.props.dislikes / 100000).toFixed(1)}M`
                              : `${(props.props.dislikes / 1000).toFixed(1)}K`
                          }`
                        : `${props.props.dislikes}`
                    }`
                  : `${props.props.dislikes}`}
              </div>
            </button>
            <button
              title="Comments"
              onClick={() => {
                console.log("Comments");
              }}
              className="flex justify-center items-center p-2 mr-8 rounded h-8 w-8 border-b-4 border-emerald-400"
            >
              <img
                src="https://img.icons8.com/?size=100&id=11223&format=png&color=000000"
                alt=""
              />
              <div className="ml-1">
                {props.props.comments.length > 1000
                  ? `${
                      props.props.comments.length >= 10000
                        ? `${
                            props.props.comments.length >= 1000000
                              ? `${(
                                  props.props.comments.length / 100000
                                ).toFixed(1)}M`
                              : `${(props.props.comments.length / 1000).toFixed(
                                  1
                                )}K`
                          }`
                        : `${props.props.comments.length}`
                    }`
                  : `${props.props.comments.length}`}
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className=""></div>
    </>
  );
};

export default Article;
