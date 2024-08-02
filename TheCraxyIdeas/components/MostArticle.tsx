import React from "react";

const MostArticle = () => {
  return (
    <div className="h-full min-w-[32%] max-w-[33%] bg-slate-200 text-black  p-4 mr-2 ml-2 overflow-hidden cursor-pointer">
      <div className="max-h-[80%] min-h-[80%]">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt minus
        enim nam repellendus in vero iusto veniam laboriosam ea tempore!
      </div>
      <div className="flex justify-between items-center mt-2 max-h-[20%] min-h-[20%]  w-full text-black">
        <div className="flex justify-center items-center" title="Anonymous">
          <img
            className="h-6 w-6 mr-2"
            src="https://img.icons8.com/?size=100&id=xXjlE05o3dcg&format=png&color=000000"
            alt=""
          />{" "}
        </div>
        <div className=" w-full flex justify-end">
          <button
            className="flex flex-col justify-center items-center p-2 ml-4 rounded h-8 w-8 border-b-4 border-emerald-400"
            title="Read: 24M"
          >
            <img
              src="https://img.icons8.com/?size=100&id=100240&format=png&color=000000"
              alt="read"
            />
            {/* <div className="mb-2">24</div> */}
          </button>
          <button
            className="flex flex-col justify-center items-center p-2 ml-4 rounded h-8 w-8 border-b-4 border-emerald-400"
            title="Like: 498K"
          >
            <img
              src="https://img.icons8.com/?size=100&id=85597&format=png&color=000000"
              alt="Like"
            />
            {/* <div className="mb-2">21</div> */}
          </button>
          <button
            className="flex flex-col justify-center items-center p-2 ml-4 rounded h-8 w-8 border-b-4 border-emerald-400"
            title="Dislike: 150K"
          >
            <img
              src="https://img.icons8.com/?size=100&id=6226&format=png&color=000000"
              alt=""
            />
            {/* <div className="mb-2">3</div> */}
          </button>
          <button
            className="flex flex-col justify-center items-center p-2 ml-4 rounded h-8 w-8 border-b-4 border-emerald-400"
            title="Comments: 894K"
          >
            <img
              src="https://img.icons8.com/?size=100&id=11223&format=png&color=000000"
              alt=""
            />
            {/* <div className="mb-2">3</div> */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MostArticle;
