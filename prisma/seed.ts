import { PrismaClient } from "@prisma/client";
import { createHash } from "crypto";

const prisma = new PrismaClient();
const hash = (text: string) => createHash("sha256").update(text).digest("hex");

async function main() {
  const plan = await prisma.subscriptionPlan.upsert({
    where: { planCode: "standard" },
    update: {},
    create: {
      planCode: "standard",
      name: "标准版",
      monthlyQuota: 200,
      monthlyPrice: 99,
      description: "适合单门店日常出图",
    },
  });

  const user = await prisma.user.upsert({
    where: { email: "demo@ktb.local" },
    update: { name: "演示设计员" },
    create: {
      email: "demo@ktb.local",
      name: "演示设计员",
      passwordHash: hash("123456"),
    },
  });

  const templateSeeds = [
    {
      name: "奶茶活动海报",
      category: "海报",
      description: "清新活力风，适合奶茶新品活动",
    },
    {
      name: "餐馆促销海报",
      category: "海报",
      description: "醒目价格区，适合饭店限时优惠",
    },
    {
      name: "招聘海报",
      category: "招聘",
      description: "岗位信息突出，适合门店招聘",
    },
  ];

  for (const item of templateSeeds) {
    await prisma.template.upsert({
      where: { id: `${item.name}-seed` },
      update: item,
      create: {
        id: `${item.name}-seed`,
        ...item,
      },
    });
  }

  await prisma.userQuota.upsert({
    where: { id: "seed-quota-standard" },
    update: { userId: user.id, planId: plan.id },
    create: {
      id: "seed-quota-standard",
      userId: user.id,
      planId: plan.id,
      totalQuota: 200,
      usedQuota: 24,
      startDate: new Date("2026-04-01T00:00:00Z"),
      endDate: new Date("2026-05-01T00:00:00Z"),
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
