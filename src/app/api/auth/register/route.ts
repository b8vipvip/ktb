import { NextResponse } from "next/server";
import { z } from "zod";
import { userService } from "@/services/user.service";

const registerSchema = z.object({
  name: z.string().min(2, "姓名至少 2 个字"),
  email: z.string().email("邮箱格式错误"),
  password: z.string().min(6, "密码至少 6 位"),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const payload = registerSchema.parse(json);
    const user = await userService.createUser(payload.name, payload.email, payload.password);
    return NextResponse.json({ data: { id: user.id, email: user.email } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "注册失败";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
