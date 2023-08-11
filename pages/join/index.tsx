import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

interface JoinForm {
  email: string;
  password: string;
}

export default function join() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter()

  const onJoin: any = async (joinForm: JoinForm) => {
    try {
      const res = await (
        await fetch("/api/join", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(joinForm),
        })
      ).json();

      if (!res.ok) {
        throw new Error();
      }
      alert("회원가입 성공!");
      return router.push("/login");
    } catch (error) {
      alert("회원가입 실패!");
    }
  };
  return (
    <div className="flex flex-col items-center justify-between py-5">
      <form
        onSubmit={handleSubmit(onJoin)}
        className="grid border w-1/2 mt-36 py-5 justify-center"
      >
        <h1 className="text-center">Join</h1>
        E-mail
        <input
          className="shadow-lg border rounded-lg placeholder:text-red-300"
          placeholder={errors.email?.message}
          type="email"
          {...register("email", {
            required: "이메일!",
          })}
        />
        Password
        <input
          className="shadow-lg border rounded-lg placeholder:text-red-300"
          type="password"
          placeholder={errors.password?.message}
          {...register("password", {
            required: "비밀번호!!",
          })}
        />
        <input
          className="mx-10 mt-5 bg-blue-100 w-1/2 rounded-lg hover:bg-blue-300"
          type="submit"
          value="Join"
        />
        <Link href={"/login"}>
          <a className="mx-10 pt-3">이미 계정이 있나용?</a>
        </Link>
      </form>
    </div>
  );
}
