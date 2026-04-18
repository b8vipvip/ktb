import { getCurrentSession } from "@/lib/auth/session";

export async function requireUserId() {
  const session = await getCurrentSession();

  if (!session?.user?.id) {
    throw new Error("未登录或会话失效");
  }

  return session.user.id;
}
