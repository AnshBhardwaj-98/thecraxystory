import React from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";



const about = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <div className="h-full w-full flex justify-center items-center mt-6">
        <div className=" bg-orange-50 border-2 border-black mb-2 max-w-[60%] p-4 max-h-[30%] ">
          <div className="  text-black w-full h-[80%] overflow-hidden">
            Welcome to our cozy corner of the internet where incredible stories
            unfold and laughter is always welcome! Here at{" "}
            <Link href={"/"}><span className="text-emerald-400 cursor-pointer underline underline-offset-4 font-semibold">
              TheCraxyStory
            </span></Link>
            , we're all about sharing the wild and wonderful experiences that
            make life so exciting.
            <br />
            <br />
            Imagine a place where you can swap tales of daring escapades,
            unexpected twists, and heartwarming moments with a community of
            fellow adventurers. Whether you've survived a wild adventure abroad,
            stumbled upon a hidden gem in your hometown, or had a hilarious
            mishap that's too good not to share, you'll find kindred spirits
            here.
            <br />
            <br />
            What makes us special? It's the genuine, firsthand stories shared by
            people just like you. Each story is a peek into someone else's
            world, filled with joy, surprise, and sometimes a little bit of
            disbelief. It's a celebration of life's quirks and the moments that
            make us all human.
            <br />
            <br />
            So, grab a cup of coffee, settle in, and get ready to be
            entertained, inspired, and maybe even a little bit moved by the
            stories on{" "}
            <Link href={"/"}><span className="text-emerald-400 cursor-pointer underline underline-offset-4 font-semibold">
              TheCraxyStory
            </span></Link>
            . Whether you're here to share your own adventures or simply to
            enjoy a good read, you're always welcome in our friendly community
            of storytellers. Let's make some memories together!
          </div>
        </div>
      </div>
    </div>
  );
};

export default about;
