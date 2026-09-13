/**
 * 网站内容配置文件（多语言）
 * ==========================
 * 修改此文件即可更新网页内容，无需改动任何源码。
 * 保存后刷新浏览器即可生效。
 *
 * 多语言：
 *   1. 手动切换过 → 记住选择（localStorage）
 *   2. 否则按浏览器语言偏好列表自动选择：含中文 → zh，否则 → en
 *   注意：navigator.language 反映的是"浏览器界面语言"，
 *   不是系统地区——英文版浏览器在中文系统上也会报 en-US。
 */
function detectLang() {
  var list = navigator.languages || [navigator.language || "zh"];
  // 列表中任意位置有中文就用中文，否则一律英文
  for (var i = 0; i < list.length; i++) {
    if (String(list[i]).toLowerCase().indexOf("zh") === 0) return "zh";
  }
  return "en";
}

var storedLang = null;
try { storedLang = localStorage.getItem("whs-lang"); } catch (e) {}

var LANG = (storedLang === "zh" || storedLang === "en") ? storedLang : detectLang();

/*
 * 内容结构：业务 (business) → 产品线 (line) → 产品 (item)
 * 未来新增业务时，在 businesses 数组中再加一个对象即可（每种语言各加一份）。
 *
 * 产品字段说明：
 *   name        产品名
 *   icon        图标图片路径（如 "icons/app001.png"）；
 *               留空 "" 则用产品名首字母生成占位图标
 *   description 一句话介绍
 *   links       任意数量的链接（应用商店、官网等）
 */

var STRINGS = {

  // ── 中文 ─────────────────────────────────────────
  zh: {
    company: {
      name: "WE, HOMO SAPIENS",
      tagline: "我左手 AI ，右手石块，抬头望向星空。", // 首页标语（placeholder）
      // description: "一家专注于 App 开发的公司。", // placeholder
    },

    nav: [
      { label: "业务", href: "#products" },
      { label: "关于", href: "#about" },
      { label: "联系", href: "#contact" },
    ],

    hero: {
      // 大标题，按行渲染；第一行带"选中反色"高亮
      titleLines: ["WE,", "Homo sapiens"],
      subtitle: "我们，晚期智人",          // placeholder
      scrollHint: "↓↓↓",
    },

    sectionTitle: "业务范围",
    businesses: [
      {
        code: "01",
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
      {
        code: "02",
        name: "新业务",
        description: "业务描述占位符。",
        lines: [
          {
            name: "产品线 X",
            description: "产品线描述占位符。",
            items: [
              {
                name: "PRODUCT 001",
                icon: "",
                description: "一句话介绍占位符。",
                links: [
                  { label: "官网", href: "#" },
                ],
              },
            ],
          },
        ],
      },
    ],

    footer: {
      contactLabel: "联系我们",
      email: "hello@example.com",             // placeholder
      copyright: "© WEHOMOSAPIENS",
    },
    langToggle: "EN",                          // 语言切换按钮上显示的文字
  },

  // ── English ──────────────────────────────────────
  en: {
    company: {
      name: "WE, HOMO SAPIENS",
      tagline: "With AI in my left hand and a stone in my right, I look up at the stars.", // placeholder
      // description: "An app development studio.",           // placeholder
    },

    nav: [
      { label: "Work", href: "#products" },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" },
    ],

    hero: {
      // Rendered line by line; the first line gets the inverted highlight
      titleLines: ["WE,", "Homo sapiens"],
      subtitle: "We, the late Homo sapiens",          // placeholder
      scrollHint: "↓↓↓",
    },

    sectionTitle: "What We Do",
    businesses: [
      {
        code: "01",
        name: "Apps",
        description: "For every day",
        lines: [
          {
            name: "Make every day better",
            // description: "Product line description placeholder.",
            items: [
              {
                name: "APP 001",
                icon: "",
                description: "One-line placeholder describing what this app does.",
                links: [
                  { label: "App Store", href: "#" },
                  { label: "Website", href: "#" },
                ],
              },
              {
                name: "APP 002",
                icon: "",
                description: "One-line placeholder describing what this app does.",
                links: [
                  { label: "App Store", href: "#" },
                  { label: "Google Play", href: "#" },
                ],
              },
            ],
          },
          {
            name: "Learn, learn, learn",
            // description: "Product line description placeholder.",
            items: [
              {
                name: "APP 003",
                icon: "",
                description: "One-line placeholder describing what this app does.",
                links: [
                  { label: "Website", href: "#" },
                ],
              },
            ],
          },
        ],
      },
      {
        code: "02",
        name: "New Business",
        description: "Business description placeholder.",
        lines: [
          {
            name: "Product Line X",
            description: "Product line description placeholder.",
            items: [
              {
                name: "PRODUCT 001",
                icon: "",
                description: "One-line placeholder description.",
                links: [
                  { label: "Website", href: "#" },
                ],
              },
            ],
          },
        ],
      },
    ],

    footer: {
      contactLabel: "Contact",
      email: "hello@example.com",             // placeholder
      copyright: "© WEHOMOSAPIENS",
    },
    langToggle: "中文",                        // label shown on the language toggle
  },
};

window.CONTENT = STRINGS[LANG];
window.LANG = LANG;
document.documentElement.lang = LANG === "zh" ? "zh-CN" : "en";
