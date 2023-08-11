import Link from "next/link";
import useSWR from "swr";

export interface TweetsType {
  id: number;
  content: string;
  creator: {
    email: string;
  };
}

export default function Tweets() {
  const { data } = useSWR("api/tweets");
  const tweets: TweetsType[] = data?.posts;

  return (
    <>
      {tweets?.length > 0 ? (
        <ul>
          {tweets.map((tweet) => (
            <Link href={`/tweet/${tweet.id}`} key={tweet.id}>
              <a>
                <li className="my-10">
                  <div className="h-auto w-96 border border-blue-200 rounded-xl flex flex-col">
                    <div className="flex justify-start mt-3 mx-5">
                      <p>{tweet.creator.email.split("@", 1)}</p>
                    </div>
                    <div className="flex justify-center my-5 mx-5">
                      <p>{tweet.content}</p>
                    </div>
                  </div>
                </li>
              </a>
            </Link>
          ))}
        </ul>
      ) : (
        <span className="text-xl">트윗이 없어용</span>
      )}
    </>
  );
}
