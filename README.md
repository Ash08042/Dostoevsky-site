# 陀思妥耶夫斯基 · 数字文学档案馆

一个基于 Next.js、React、TypeScript、Tailwind CSS 与 Framer Motion 的个人文学网站原型。

## 开发环境

- Node.js 24 LTS 与 npm
- pnpm（可选；本项目默认使用 npm）
- Git
- VS Code，推荐安装项目提示的 ESLint、Prettier、Tailwind CSS IntelliSense 扩展

## 已完成的第一期

1. 信息架构：见 `docs/information-architecture.md`
2. 数据库草图：见 `docs/database-schema.md`
3. 首页页面原型：见 `docs/page-prototype.md`
4. 可运行的首页：`app/page.tsx`

## 如何在自己的电脑查看

在本项目文件夹打开终端，依次运行：

```bash
npm install
npm run dev
```

随后在浏览器打开 `http://localhost:3000`。

开发服务器会在保存文件后自动刷新页面。常用命令：

```bash
npm run dev       # 本地开发与自动刷新
npm run lint      # 检查代码问题
npm run format    # 自动整理代码格式
npm run build     # 生成上线版本并检查构建
```

## 项目结构

```text
src/app/       页面与布局（Next.js App Router）
components/    可复用的界面组件
styles/        全局样式
public/        图片等公开静态资源
docs/          网站策划与数据库设计文档
```

## 环境变量

复制 `.env.example` 为 `.env.local` 后填写本机需要的配置。`.env.local` 已被 Git 忽略，不能提交到远程仓库。

## Git

项目已初始化 Git；首次提交前请先设置自己的姓名与邮箱：

```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
git add .
git commit -m "chore: initialize literary archive"
```

## 后续建议

下一步应先制作《罪与罚》作品展厅，并把当前文案移入 `data/` 中的静态内容文件；内容结构稳定后，再接入 Supabase 数据库。
