import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useSWR from "swr";

import Tweets from "../components/tweets";
import WriteTweet from "../components/writeTweet";

export default function Home() {
  const { data } = useSWR("api/isLoggedIn");
  const router = useRouter();

  useEffect(() => {
    if (data?.ok === false) {
      router.push("/join");
    }
  }, []);

  return (
    <div className="mt-16 mx-14 flex flex-col items-center justify-center py-5">
      <button
        className="text-red-500 my-5"
        onClick={() => {
          fetch("api/logout", {
            method: "POST",
          }).then(() => location.reload());
        }}
      >
        logout
      </button>
      <WriteTweet />
      <Tweets />
    </div>
  );
}
