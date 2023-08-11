import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

interface TweetRes {
  post: {
    creator: {
      email: string;
    };
    content: string;
  };
  isLike: boolean;
}

export default function Home() {
  const router = useRouter();

  const { data, mutate } = useSWR<TweetRes>(
    `../api/tweets/${router?.query.id}`
  );

  const onLikeClick = async () => {
    await fetch(`../api/tweets/${router.query.id}/like`);
    return mutate((priv: any) => ({ ...priv, isLiked: !priv.isLiked }));
  };

  return (
    <div className="mt-[50%] mx-14 flex flex-col items-center justify-center py-5 border-4 border-blue-200 rounded-xl">
      <div className="w-full mb-5 flex text-5xl justify-center">
        <h1>{data?.post?.creator.email.split("@", 1)}</h1>
      </div>
      <hr className="w-full h-1 bg-blue-200" />
      <div className="w-full h-auto">
        <p className="text-2xl my-5 mx-5">{data?.post?.content}</p>
      </div>
      <div className="w-full flex justify-end mr-10">
        <button className="text-3xl text-red-500" onClick={onLikeClick}>
          {data?.isLike ? "♥️" : "♡"}
        </button>
      </div>
    </div>
  );
}
