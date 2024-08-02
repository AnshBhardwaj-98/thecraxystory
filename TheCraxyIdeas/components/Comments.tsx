import React from "react";

const Comments = ({ props }) => {
  return (
    <div
      className="text-xs mb-4 border-b-2
      pb-2"
    >
      <div className="flex ">
        <img
          className="h-6 w-6 mr-2 rounded-full bg-white p-1"
          src={
            props.commenterProfileURL
              ? props.commenterProfileURL
              : "https://img.icons8.com/?size=100&id=xXjlE05o3dcg&format=png&color=000000"
          }
          alt="img"
        />
        <div className="">
          <span className="mr-2 font-bold">
            {props.commenterName ? props.commenterName : "Anonymous"}
          </span>
          {props.comment}
        </div>
      </div>
    </div>
  );
};

export default Comments;
