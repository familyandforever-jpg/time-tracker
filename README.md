# 每日时间记录 · 安装说明

一共 4 步，大约 20 分钟。全程免费。

## 第 1 步：建数据库（Supabase）

1. 打开 https://supabase.com ，用 GitHub 或邮箱注册，点 **New project**。名字随便填，数据库密码自己记好，地区选 **Sydney**。
2. 等项目建好（1–2 分钟），左边菜单点 **SQL Editor**，把 `setup.sql` 里的内容整段粘贴进去，点 **Run**。看到 Success 就好。
3. 左边菜单 **Authentication → Sign In / Providers → Email**，把 **Confirm email** 关掉并保存。这样注册后不用去邮箱点确认。
4. 左边菜单 **Project Settings → API**（或 Data API / API Keys），复制两样东西：**Project URL** 和 **anon public key**。

## 第 2 步：填设置

用记事本打开 `config.js`，把上一步复制的两样东西粘贴到引号里，保存：

```js
window.TT_CONFIG = {
  supabaseUrl: 'https://xxxx.supabase.co',
  supabaseKey: 'eyJhbGciOi...'
};
```

anon key 是公开用的，放在网页里没问题；数据库已经设置成每个人只能读写自己的记录。

## 第 3 步：放到网上（GitHub Pages）

1. 打开 https://github.com 注册账号，右上角 **+ → New repository**，名字填 `time-tracker`，选 **Public**，点 Create。
2. 在新仓库页面点 **uploading an existing file**，把这个文件夹里的**所有文件和 icons 文件夹**一起拖进去，点 **Commit changes**。
3. 仓库上方 **Settings → Pages**，Source 选 **Deploy from a branch**，Branch 选 **main** 和 **/(root)**，点 Save。
4. 等 1–2 分钟，页面顶部会出现网址，类似 `https://你的用户名.github.io/time-tracker/`。

## 第 4 步：装到桌面并登录

- **iPhone**：用 Safari 打开网址 → 分享按钮 → **添加到主屏幕**。
- **安卓**：用 Chrome 打开 → 右上角菜单 → **安装应用 / 添加到主屏幕**。
- **电脑**：用 Chrome 或 Edge 打开 → 地址栏右边的安装图标（或菜单 → 安装）。

打开 App，点右上角「未登录」→ 第一次点 **注册**，之后在其他设备用同一个邮箱和密码 **登录**。右上角变成绿点「已同步」就好了。

## 把旧记录搬过来

1. 打开旧的记录页面，最下面点「备份 / 恢复数据」→ **复制备份**。
2. 打开新 App →「记录」页最下面「备份 / 恢复数据」→ 粘贴到「导入数据」→ **合并导入**。

## 以后要改 App

改好的文件在 GitHub 仓库里重新上传覆盖即可，手机上的 App 下次打开会自动更新。

## 手机自动切换（iPhone 快捷指令，可选）

App 支持这样的链接：`你的网址?start=刷手机`（打开就切到「刷手机」），`你的网址?stop=1`（结束当前活动）。
在「快捷指令 → 自动化 → 新建 → App → 选小红书/抖音 → 已打开」，动作选「打开 URL」填上面的链接，就能在打开这些 App 时自动记录。注意：快捷指令会在 Safari 里打开链接，所以 Safari 里也要登录一次同步账号。

## 到点提醒（写作业、看代码时也能看到）

开始学习类活动时会选「预计多久」。到点后，就算你在 VS Code 或别的软件里，屏幕角落也会弹系统通知，可以直接点「还在做，继续」或「做完了，结束」；最多做到 2 倍会自动结束。其他活动（睡觉除外）超过 2 小时没确认，也会问一句「还在做吗」。

- 第一次点活动时浏览器会问能不能发通知，选**允许**。
- Mac 上还要在 **系统设置 → 通知 → Google Chrome（或 Edge）** 里允许通知，并且没开专注模式/勿扰。
- App 要开着（最小化、在后台都行），电脑不能睡眠。
- iPhone 上只有 App 开在前台时才会提醒（iOS 不让网页在后台运行），所以写作业时以电脑上的 App 为准。
