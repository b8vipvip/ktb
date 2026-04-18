"use client";

import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const onRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setMessage("");

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error || "注册失败");
      return;
    }

    setMessage("注册成功，请前往登录");
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <section className="mx-auto max-w-md rounded-xl border bg-white p-6 shadow-sm">
      <h1 className="text-xl font-semibold">新用户注册</h1>
      <p className="mt-2 text-sm text-slate-600">用于门店设计员账号开通。</p>

      <form onSubmit={onRegister} className="mt-5 space-y-4">
        <label className="block text-sm">
          <span>姓名</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-md border px-3 py-2"
          />
        </label>
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
        {message ? <p className="text-sm text-green-600">{message}</p> : null}

        <button className="w-full rounded-md bg-brand px-3 py-2 text-white">注册账号</button>
      </form>

      <p className="mt-4 text-sm text-slate-600">
        已有账号？
        <Link href="/login" className="text-brand hover:underline">
          去登录
        </Link>
      </p>
    </section>
  );
}
