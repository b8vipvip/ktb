"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("demo@ktb.local");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    if (result?.error) {
      setError("邮箱或密码错误，请重试");
      return;
    }

    window.location.href = "/dashboard";
  };

  return (
    <section className="mx-auto max-w-md rounded-xl border bg-white p-6 shadow-sm">
      <h1 className="text-xl font-semibold">设计员登录</h1>
      <p className="mt-2 text-sm text-slate-600">演示账号：demo@ktb.local / 123456</p>

      <form onSubmit={submit} className="mt-5 space-y-4">
        <label className="block text-sm">
          <span>邮箱</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-md border px-3 py-2"
          />
        </label>

        <label className="block text-sm">
          <span>密码</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-md border px-3 py-2"
          />
        </label>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <button className="w-full rounded-md bg-brand px-3 py-2 text-white">登录</button>
      </form>

      <p className="mt-4 text-sm text-slate-600">
        还没有账号？
        <Link href="/register" className="text-brand hover:underline">
          立即注册
        </Link>
      </p>
    </section>
  );
}
