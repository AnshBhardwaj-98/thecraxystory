"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/libs/firebase/config";
import { collection, addDoc } from "firebase/firestore";
import jwt from "jsonwebtoken";

const AddArticle = () => {
  const [Story, setStory] = useState({
    author: "Anonymous",
    authorProfileUrl: "",
    author_id: "",
    comments: [],
    content: "",
    dateCreated: "",
    dislikes: 0,
    likes: 0,
    reads: 0,
    title: "",
  });
  const storiesCollectionRef = collection(db, "stories");

  // let decodedToken;

  async function storysubmit() {
    const res = await addDoc(storiesCollectionRef, Story);
    if (res.id) {
      setStory({ ...Story, title: "", content: "" });
      alert("Story submitted successfully");
    }
    console.log(res.id);
    console.log(Story);
  }
  useEffect(() => {
    let author = "";
    let authorProfileUrl = "";
    let author_id = "";
    const token = localStorage.getItem("accessToken");
    const decodedToken = jwt.decode(token);
    if (decodedToken) {
      // console.log(decodedToken);
      author = decodedToken.name;
      authorProfileUrl = decodedToken.picture;
      author_id = decodedToken.email;
    }

    let date = new Date().toDateString();
    let Time = new Date().toLocaleTimeString();

    // console.log(author, authorProfileUrl, author_id);

    const newDate = date + " / " + Time;
    setStory({
      ...Story,
      dateCreated: newDate,
      author: author,
      authorProfileUrl: authorProfileUrl,
      author_id: author_id,
    });
  }, []);

  return (
    <div className="flex  justify-center  h-[80vh] w-[100vw] mt-6 text-black">
      <div className="flex items-center justify-center w-[60%] h-full bg-slate-200  border-2 border-black p-2">
        <div className="flex flex-col   h-full w-full bg-red-50 p-2">
          <label htmlFor="AddName" className="text-emerald-600 mb-2">
            Your name
          </label>
          <input
            type="text"
            id="AddName"
            className="p-2 text-sm"
            onChange={(e) => {
              setStory({ ...Story, author: e.target.value });
              // console.log(Story);
            }}
            placeholder="Name is not required if logged in, if not logged in it will be anonymous by default"
          />
          <label
            htmlFor="Title"
            className="text-emerald-600 mb-2 flex  items-center"
          >
            Story Title{" "}
            {
              <div className="text-gray-500 text-[60%] ml-2">
                Total words:{Story.title.length}
              </div>
            }
          </label>
          <input
            type="text"
            id="Title"
            className="p-2 text-sm"
            placeholder="Give your story a nice Title (less than 100 words recommended)"
            onChange={(e) => {
              setStory({ ...Story, title: e.target.value });
              // console.log(Story);
            }}
            required
          />
          <label
            htmlFor="YourStory"
            className="text-emerald-600 mb-2 mt-2 flex items-center"
          >
            Your Story{" "}
            {
              <div className="text-gray-500 text-[60%] ml-2">
                Total words:{Story.content.length}
              </div>
            }
          </label>
          <textarea
            required
            name="YourStory"
            rows={20}
            cols={80}
            className="p-2 text-sm"
            placeholder="Share your story with us"
            onChange={(e) => {
              setStory({ ...Story, content: e.target.value });
              // console.log(Story);
            }}
          ></textarea>
          <button
            type="button"
            className={` p-1 ${
              (Story.content.length && Story.title.length) == 0
                ? "bg-red-300"
                : "bg-emerald-500"
            } bg-emerald-500 cursor-pointer`}
            onClick={() => {
              if (
                (Story.content.length && Story.title.length) == 0 ? true : false
              ) {
                alert("Please enter your story");
                return;
              }
              storysubmit();
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddArticle;
