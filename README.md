# 快图帮 SaaS（阶段 2）

> 阶段目标：实现“生成海报”的 MVP 闭环（任务创建 → Mock 生成 → 结果选择 → 编辑器 → 保存项目）。

## 一、技术栈

- Next.js（App Router）+ TypeScript + Tailwind
- Prisma + PostgreSQL
- NextAuth（Credentials）
- ESLint + Prettier

## 二、阶段 2 已实现能力

1. **生成海报页面** `/dashboard/poster/create`
   - 支持字段：行业、标题、副标题、店名、电话、地址、活动内容、风格、主色调、输出数量。
2. **任务闭环**
   - 创建 `GenerateTask` 并写库（`PENDING/PROCESSING/SUCCESS/FAILED`）。
   - 结果页自动轮询任务状态。
3. **Mock 海报生成服务**
   - `PosterGenerationService.generatePoster()` + provider 抽象。
   - `MockPosterProvider` 支持返回多张候选图 URL。
4. **结果页** `/dashboard/poster/tasks/[id]`
   - 展示候选图、重新生成、进入编辑器。
5. **基础编辑器**
   - 编辑标题/副标题/电话/地址。
   - 文本拖拽定位。
   - 更换背景图。
   - 导出 PNG。
6. **模板映射逻辑（3 个模板）**
   - 奶茶活动海报、餐馆促销海报、招聘海报。
   - 模板字段映射到编辑器初始状态。
7. **项目保存与恢复**
   - 从任务结果保存为项目。
   - 通过项目页再次打开恢复编辑状态。

## 三、数据库模型（已扩展）

- `User`
- `Project`
- `Template`
- `GenerateTask`
- `SubscriptionPlan`
- `UserQuota`

## 四、本地运行

### 1) 安装依赖

```bash
npm install
```

### 2) 环境变量

```bash
cp .env.example .env
```

### 3) 初始化数据库

```bash
npm run prisma:generate
npm run prisma:migrate -- --name stage2
npm run db:seed
```

### 4) 启动

```bash
npm run dev
```

访问：`http://localhost:3000`

演示账号：

- 邮箱：`demo@ktb.local`
- 密码：`123456`

## 五、体验流程（阶段 2）

1. 登录后进入工作台。
2. 点击“生成海报”填写参数并提交。
3. 在结果页等待任务完成并查看候选图。
4. 选择一张“进入编辑器”。
5. 修改文字、拖动位置、换背景、导出 PNG。
6. 点击保存后生成项目。
7. 在“我的项目”再次打开继续编辑。

## 六、目录变化（阶段 2 关键）

```text
src/
  app/
    api/poster/tasks/...               # 海报任务 API（创建/查询/重生成）
    dashboard/poster/create            # 海报生成表单页
    dashboard/poster/tasks/[id]        # 结果页（轮询）
    dashboard/poster/editor/task/[id]  # 从任务进入编辑器
    dashboard/poster/editor/project/[projectId] # 从项目恢复编辑
  components/poster/poster-editor.tsx  # 轻量编辑器
  services/poster/
    poster-generation.service.ts
    poster-task.service.ts
    template-mapper.service.ts
    providers/mock-poster.provider.ts
    providers/poster-provider.types.ts
    mock-catalog.ts
```

## 七、进入阶段 3（接真实能力）前还缺什么

1. 异步任务队列（BullMQ/Redis）替换当前“请求触发处理”机制。
2. 真正接入模型 Provider（鉴权、超时、重试、限流、审计日志）。
3. 模板、任务、项目全量去 mock 化并完善管理后台。
4. 编辑器增强：字体、字号、对齐、图层管理、贴图。
5. 对象存储（OSS/S3）替代 dummyimage URL，支持正式素材资产。
6. 权限与计费联动：按套餐扣减额度，任务失败回滚。
