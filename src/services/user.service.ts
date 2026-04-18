import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth/password";

export class UserService {
  async createUser(name: string, email: string, password: string) {
    const existed = await prisma.user.findUnique({ where: { email } });
    if (existed) {
      throw new Error("该邮箱已被注册");
    }

    return prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashPassword(password),
      },
    });
  }

  async verifyUser(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordHash) {
      return null;
    }

    if (user.passwordHash !== hashPassword(password)) {
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}

export const userService = new UserService();
