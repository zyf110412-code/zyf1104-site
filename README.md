# 我的个人网站

这是一个从零搭建的纯静态个人主页。不需要安装任何软件，双击就能打开。

## 文件说明

- `index.html` — 页面内容（文字、作品、联系方式都在这里改）
- `css/style.css` — 样式与配色（想换颜色就改这里）
- `js/main.js` — 交互效果（菜单、深浅色、动画）
- `content.json` — 网站的全部文字内容（后台编辑器改的就是它）
- `admin/` — 内容管理后台（登录后可视化编辑内容）

## 怎么改内容

网站上线后，推荐用「内容管理后台」改内容（见下面一节），在网页上点几下就行，完全不用碰代码。

如果暂时还没上线，也可以直接改 `content.json` 文件——网站的所有文字都集中在里面，改完保存、重新上传覆盖即可。

想换配色的话，打开 `css/style.css` 最上方 `:root` 部分，修改 `--accent`（主色）、`--accent-2`（点缀色）等变量。

头像放在 `images/avatar.png`，想换头像时直接替换这个文件（正方形图片效果最好）；`content.json` 里的 `avatar` 字段记录图片路径。

背景轮播图放在 `images/bg-1.jpg`、`images/bg-2.jpg`、`images/bg-3.jpg`，想换背景就直接替换这几个文件（宽图效果最好）；`content.json` 里的 `backgrounds` 字段记录图片顺序，后台编辑器里也能改。

## 如何免费发布到网上

### 方式一：GitHub Pages

1. 注册一个 GitHub 账号（免费）。
2. 新建一个仓库，把上面三个文件上传进去。
3. 打开仓库的 Settings → Pages，选择 main 分支并保存。
4. 几分钟后，就能通过 `https://你的用户名.github.io/仓库名/` 访问你的网站。

### 方式二：Netlify Drop

打开 https://app.netlify.com/drop ，把整个文件夹拖进网页，它就会自动帮你生成一个网址，最省事。

## 把你的网站发布到 zyf1104.icu

你已经拥有了自己的域名 zyf1104.icu。下面两种方式都能把网站挂上去，都免费，而且会自动配上 HTTPS 小锁。选一种喜欢的即可。

### 方式一：Netlify（最省事，推荐）

1. 注册一个 GitHub 账号（免费），新建一个仓库，名字随意（比如 `zyf1104-site`）。
2. 在仓库页面点 Upload files，把 `index.html`、`css`、`js`、`content.json`、`admin` 这些文件/文件夹全部拖进去上传。
3. 打开 https://app.netlify.com ，点 Add new site → Import an existing project → GitHub，选刚才的仓库，等它自动部署完成。
4. 在 Netlify 后台点 Domain settings → Add custom domain，输入 `zyf1104.icu`。
5. 回到阿里云域名控制台，找到 zyf1104.icu 的「解析设置」，添加一条记录：
   - 记录类型：CNAME
   - 主机记录：@
   - 记录值：你的 `xxx.netlify.app` 网址
6. 等几分钟到几小时生效后，访问 zyf1104.icu 就是你的网站了。

> 只想最快看到效果、暂时不用后台编辑器的话，也可以把「网站打包.zip」拖到 https://app.netlify.com/drop ；但这样之后要用后台编辑器，还得重新走一遍上面的仓库流程。

### 方式二：GitHub Pages

1. 注册一个 GitHub 账号，新建一个仓库，名字必须是「你的用户名.github.io」。
2. 把 `index.html`、`css`、`js` 三个文件上传到仓库。
3. 仓库 Settings → Pages → Branch 选 main → Save。
4. 在 Pages 设置的 Custom domain 一栏填 `zyf1104.icu`。
5. 去阿里云域名控制台 → 解析设置，添加四条 A 记录，主机记录都填 `@`：
   - 185.199.108.153
   - 185.199.109.153
   - 185.199.110.153
   - 185.199.111.153
6. 等生效后，回到 Pages 设置里勾选 Enforce HTTPS。

> 注意：用 GitHub Pages 发布也能正常浏览网站，但后台编辑器需要额外的 GitHub 授权配置，操作比较繁琐。想用后台编辑器的话，建议选方式一。

## 内容管理后台（CMS）

网站部署到 Netlify 后，打开 https://zyf1104.icu/admin/ 就能进入你的专属编辑后台，像填表一样修改网站内容，改完保存，网站自动更新。

### 第一次开启后台（只需要做一次，约 10 分钟）

1. 确保网站已经按「方式一」部署在 Netlify 上。
2. Netlify 后台 → Integrations → Identity → 点 Enable 开启身份服务；Registration 选 Invite only（只允许收到邀请的人登录）。
3. 在 Identity → Invite users 输入你自己的邮箱，会收到一封邀请邮件，按邮件里的链接设置密码。
4. 在 Identity → Services → Git Gateway，点 Enable，并授权你的 GitHub 账号。
5. 打开 https://zyf1104.icu/admin/ ，用刚才的邮箱和密码登录，就能开始编辑了。

### 以后怎么用

- 打开 https://zyf1104.icu/admin/ 登录。
- 左侧选「主页内容」，直接修改首屏、关于我、作品卡片、邮箱、社交链接等。
- 想增加或删减作品，在「作品列表」里添加或删除条目即可。
- 改完点右上角「保存/发布」，网站自动更新，什么都不用重新上传。

小提示：如果哪天后台打不开，多半是身份服务设置问题；实在不行，也可以直接改 GitHub 仓库里的 `content.json`，网站同样会自动更新。
