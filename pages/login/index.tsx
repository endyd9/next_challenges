import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

interface LoginForm {
  email: string;
  password: string;
}

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onLogin: any = async (loginForm: LoginForm) => {
    try {
      const res = await (
        await fetch("api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginForm),
        })
      ).json();
      if (!res.ok) {
        throw new Error();
      }

      alert("로그인 성공!");
      return router.push("/");
    } catch {
      alert("로그인 실패!");
    }
  };

  return (
    <div className="mx-auto max-w-xl h-screen flex flex-col items-center justify-between py-5">
      <form
        onSubmit={handleSubmit(onLogin)}
        className="grid border w-1/2 mt-36 py-5 justify-center"
      >
        <h1 className="text-center">Login</h1>
        E-mail
        <input
          className="shadow-lg border rounded-lg placeholder:text-red-300"
          placeholder={errors.email?.message}
          type="email"
          {...register("email", {
            required: "이메일을 입력하시오",
          })}
        />
        Password
        <input
          className="shadow-lg border rounded-lg placeholder:text-red-300"
          type="password"
          placeholder={errors.password?.message}
          {...register("password", {
            required: "비밀번호를 입력하시오",
          })}
        />
        <input
          className="mx-10 mt-5 bg-blue-100 w-1/2 rounded-lg hover:bg-blue-300"
          type="submit"
          value="Login"
        />
        <Link href={"/join"}>
          <a className="mx-10 pt-3">아직 계정이 없나용?</a>
        </Link>
      </form>
    </div>
  );
}
