import React, { useState } from "react";

const ReadnComm = (show: boolean) => {
  const [IsRead, setIsRead] = useState(show);

  return (
    IsRead && (
      <div className="w-[74%]  h-[85%] bg-green-300 border-2 border-black absolute mt-4 p-2 rounded-md  text-black flex">
        <div className="h-futll w-full bg-slate-200 flex-1 border-2 border-black rounded-tl-md rounded-bl-md overflow-y-scroll overflow-x-hidden no-scrollbar">
          <div className="w-full h-[8%] flex p-4 items-center justify-between border-b-[1px] border-black ">
            <div className="flex  items-center ">
              <img
                className="h-6 w-6 mr-2"
                src={
                  "https://img.icons8.com/?size=100&id=xXjlE05o3dcg&format=png&color=000000"
                }
                alt=""
              />{" "}
              Anonymous
            </div>
            <div className="">time</div>
          </div>
          <div className=" p-4 pt-2  text-sm ">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore
            explicabo officia, voluptatibus quod laboriosam neque alias
            accusantium odit iste quae quidem quas aliquid exercitationem, quos
            iusto voluptatum facilis adipisci maiores, tempora doloremque magnam
            dolore! Dolores, quasi nemo adipisci, quidem esse voluptatem sint
            corporis eius nisi facere quis tempora delectus tenetur. Labore
            earum necessitatibus minus, incidunt consectetur, beatae dolores
            ipsam repellat vitae saepe quam! Cum in minus vel, magnam laudantium
            veritatis voluptas suscipit incidunt maiores amet obcaecati animi
            enim rerum quos at dolor autem qui adipisci pariatur et modi aperiam
            dolorum? Magnam facilis molestiae esse aliquid ad vel dicta,
            delectus quam amet modi quasi molestias officia quo assumenda
            sapiente cupiditate laudantium eos nisi. Enim eum nihil maxime ea
            dicta fuga modi? Necessitatibus eius ullam corporis culpa nisi
            facere labore odio, commodi accusamus illo unde corrupti sed sint
            laborum voluptatem hic veniam placeat maxime ipsam perspiciatis
            explicabo cum voluptas repellat. Ea a omnis consequatur aperiam
            reiciendis, ab aliquam ut quasi neque sunt itaque maiores rem
            asperiores, saepe facilis distinctio, nobis sapiente illum tempora
            ducimus. Nesciunt pariatur quidem sequi vero dicta consequatur
            adipisci consectetur? Distinctio quibusdam nesciunt nihil dolores,
            voluptate corrupti aut vero delectus fugiat minima ratione,
            blanditiis magnam accusamus et neque obcaecati, officia cupiditate
            nihil dignissimos, nam magni facilis.
          </div>
        </div>
        <div className="h-full w-full bg-red-200 flex-[0.5] border-r-2 border-b-2 border-t-2 border-black rounded-tr-md rounded-br-md ">
          <div className="w-full h-[8%] flex p-4 items-center justify-between border-b-[1px] border-black ">
            <div className="">Comments</div>
            <div className=" h-6 w-6 " onClick={setIsRead(!IsRead)}>
              <img
                src="https://img.icons8.com/?size=100&id=1510&format=png&color=ffffff"
                alt="close"
              />
            </div>
          </div>
          <div className=""></div>
        </div>
      </div>
    )
  );
};

export default ReadnComm;
