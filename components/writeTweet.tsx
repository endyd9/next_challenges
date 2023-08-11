import { useForm } from "react-hook-form";
import { useState } from "react";

export default function WriteTweet() {
  const { register, handleSubmit } = useForm();
  const [text, setText] = useState("");

  const onTweet = async (tweet: any) => {
    if (text === "") return;
    try {
      const res = await (
        await fetch("/api/uploadTweet", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tweet),
        })
      ).json();

      if (res.ok === false) throw new Error();

      setText("");
    } catch {
      alert("업로드 실패!!");
    }
  };
  return (
    <div className="w-[100%] bg-blue-100 py-5 flex items-center justify-center rounded-lg">
      <form onSubmit={handleSubmit(onTweet)} className="text-center">
        <h1 className="mb-5 text-xl">트윗</h1>
        <textarea
          className="resize-none mb-5 rounded-lg"
          id=""
          cols={30}
          rows={6}
          {...register("tweet")}
          onChange={(event) => {
            setText(event.target.value);
          }}
          value={text}
        ></textarea>
        <br />
        <input
          className="bg-blue-300 w-1/3 h-10 rounded-2xl hover:bg-blue-400 cursor-pointer"
          type="submit"
          value="트윗하기"
        />
      </form>
    </div>
  );
}
