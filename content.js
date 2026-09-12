/**
 * 网站内容配置文件
 * ==================
 * 修改此文件即可更新网页内容，无需改动任何源码。
 * 保存后刷新浏览器即可生效。
 *
 * 内容结构：业务 (business) → 产品线 (line) → 产品 (item)
 * 未来新增业务时，在 businesses 数组中再加一个对象即可。
 *
 * 产品字段说明：
 *   name        产品名
 *   icon        图标图片路径（如 "icons/app001.png"）；
 *               留空 "" 则用产品名首字母生成占位图标
 *   description 一句话介绍
 *   links       任意数量的链接（应用商店、官网等）
 */

window.CONTENT = {

  // ── 公司信息 ──────────────────────────────────────
  company: {
    name: "WE,HOMO SAPIENS",
    tagline: "我左手 AI ，右手石块，抬头望向星空。", // 首页标语（placeholder）
    // description: "一家专注于 App 开发的公司。", // placeholder
  },

  // ── 导航 ─────────────────────────────────────────
  nav: [
    { label: "业务", href: "#products" },
    { label: "关于", href: "#about" },
    { label: "联系", href: "#contact" },
  ],

  // ── 首页第一屏 (Hero) ─────────────────────────────
  hero: {
    // 大标题，按行渲染；第一行带"选中反色"高亮
    titleLines: ["WE,", "Homo sapiens"],
    subtitle: "我们，晚期智人",          // placeholder
    scrollHint: "↓↓↓",
  },

  // ── 第二屏：业务与产品 ─────────────────────────────
  sectionTitle: "业务范围",
  businesses: [
    {
      code: "01",                           // 业务编号，显示在标题旁
      name: "Apps",
      description: "每天都能用到",
      lines: [
        {
          name: "让每天变好",
          // description: "产品线描述占位符。",
          items: [
            {
              name: "APP 001",
              icon: "",
              description: "一句话介绍占位符，说明这个 App 是做什么的。",
              links: [
                { label: "App Store", href: "#" },
                { label: "官网", href: "#" },
              ],
            },
            {
              name: "APP 002",
              icon: "",
              description: "一句话介绍占位符，说明这个 App 是做什么的。",
              links: [
                { label: "App Store", href: "#" },
                { label: "Google Play", href: "#" },
              ],
            },
          ],
        },
        {
          name: "学习，学习，学习",
          // description: "产品线描述占位符。",
          items: [
            {
              name: "APP 003",
              icon: "",
              description: "一句话介绍占位符，说明这个 App 是做什么的。",
              links: [
                { label: "官网", href: "#" },
              ],
            },
          ],
        },
      ],
    },
    // 未来新业务示例（取消注释即可显示）：
    // {
    //   code: "02",
    //   name: "新业务",
    //   description: "业务描述占位符。",
    //   lines: [],
    // },
  ],

  // ── 页脚 / 联系 ───────────────────────────────────
  footer: {
    contactLabel: "联系我们",
    email: "hello@example.com",             // placeholder
    copyright: "© WEHOMOSAPIENS",
  },
};
