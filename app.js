/**
 * 渲染逻辑：读取 content.js 中的 window.CONTENT，填充页面。
 * 不需要修改此文件来更新内容 —— 改 content.js 即可。
 */
(function () {
  "use strict";

  var C = window.CONTENT;
  if (!C) {
    console.error("content.js 未加载或缺少 window.CONTENT");
    return;
  }

  // ── 通用文本绑定：data-bind="a.b.c" ──────────────────
  document.querySelectorAll("[data-bind]").forEach(function (el) {
    var value = el.getAttribute("data-bind")
      .split(".")
      .reduce(function (obj, key) { return obj && obj[key]; }, C);
    if (typeof value === "string") el.textContent = value;
  });

  document.title = C.company.name;

  // ── 导航链接 ────────────────────────────────────────
  var navLinks = document.getElementById("nav-links");
  C.nav.forEach(function (item) {
    var a = document.createElement("a");
    a.href = item.href;
    a.textContent = item.label;
    navLinks.appendChild(a);
  });

  // ── 语言切换按钮（导航栏最右）───────────────────────
  var langBtn = document.createElement("button");
  langBtn.type = "button";
  langBtn.className = "nav__lang";
  langBtn.textContent = C.langToggle || "EN";
  langBtn.addEventListener("click", function () {
    var next = window.LANG === "zh" ? "en" : "zh";
    try { localStorage.setItem("whs-lang", next); } catch (e) {}
    location.reload();
  });
  navLinks.appendChild(langBtn);

  // ── Hero 大标题：按行渲染，逐字母入场；第一行反色高亮 ──
  var heroTitle = document.getElementById("hero-title");
  var titleLines = C.hero.titleLines || [C.hero.title || C.company.name];
  var charIndex = 0;
  titleLines.forEach(function (line, li) {
    var lineEl = document.createElement("span");
    lineEl.className = "hero__title-line" + (li === 0 ? " hero__title-line--hl" : "");
    line.split("").forEach(function (ch) {
      var wrap = document.createElement("span");
      wrap.className = "char";
      var inner = document.createElement("span");
      inner.textContent = ch === " " ? " " : ch;
      inner.style.transitionDelay = (0.35 + charIndex++ * 0.04) + "s";
      wrap.appendChild(inner);
      lineEl.appendChild(wrap);
    });
    heroTitle.appendChild(lineEl);
  });

  // ── 业务 Tab / 产品线 / 产品列表 ──────────────────────
  var container = document.getElementById("businesses");
  var tabsBox = document.getElementById("biz-tabs");
  // 产品线星点标记：统一为主色
  var CHIP_COLOR = "var(--accent)";

  // 滚动入场 observer 提前定义，Tab 切换重新渲染时复用
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  function renderBusiness(bi) {
    var b = C.businesses[bi];
    container.innerHTML = "";

    var section = document.createElement("section");
    section.className = "business";

    // 产品线并排放置在同一层等宽分栏中，体现平级关系
    var linesWrap = document.createElement("div");
    linesWrap.className = "business__lines";

    b.lines.forEach(function (line) {
      var lineEl = document.createElement("div");
      lineEl.className = "line";

      var lineHead = document.createElement("header");
      lineHead.className = "line__header reveal";
      lineHead.innerHTML =
        '<span class="line__name">' +
          '<span class="line__chip" style="background:' + CHIP_COLOR + '" aria-hidden="true"></span>' +
          escapeHtml(line.name) + "</span>" +
        '<span class="line__description">' + escapeHtml(line.description || "") + "</span>" +
        '<span class="line__count">(' + String(line.items.length).padStart(2, "0") + ")</span>";
      lineEl.appendChild(lineHead);

      var ul = document.createElement("ul");
      ul.className = "products__list";

      line.items.forEach(function (p) {
        var li = document.createElement("li");
        var card = document.createElement("div");
        card.className = "product reveal";

        var iconHtml = p.icon
          ? '<img class="product__icon" src="' + escapeHtml(p.icon) + '" alt="">'
          : '<span class="product__icon product__icon--placeholder" aria-hidden="true">' +
            escapeHtml((p.name || "?").trim().charAt(0)) + "</span>";

        var linksHtml = (p.links || []).map(function (l) {
          return '<a class="product__link" href="' + escapeHtml(l.href || "#") + '">' +
                 escapeHtml(l.label) + "</a>";
        }).join("");

        card.innerHTML =
          '<div class="product__head">' +
            iconHtml +
            '<span class="product__name">' + escapeHtml(p.name) + "</span>" +
          "</div>" +
          '<p class="product__description">' + escapeHtml(p.description) + "</p>" +
          '<div class="product__links">' + linksHtml + "</div>";

        li.appendChild(card);
        ul.appendChild(li);
      });

      lineEl.appendChild(ul);
      linesWrap.appendChild(lineEl);
    });

    section.appendChild(linesWrap);
    container.appendChild(section);

    section.querySelectorAll(".reveal").forEach(function (el) {
      observer.observe(el);
    });
  }

  function activate(i) {
    tabsBox.querySelectorAll(".biz-tab").forEach(function (t, ti) {
      t.classList.toggle("is-active", ti === i);
      t.setAttribute("aria-selected", ti === i ? "true" : "false");
    });
    // 当前业务的描述显示在 Tab 栏右侧
    tabDesc.textContent = C.businesses[i].description || "";
    renderBusiness(i);
  }

  // Tab 栏右侧的业务描述
  var tabDesc = document.createElement("span");
  tabDesc.className = "biz-tabs__desc";

  C.businesses.forEach(function (b, i) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "biz-tab";
    btn.setAttribute("role", "tab");
    btn.innerHTML =
      '<span class="biz-tab__code">' + escapeHtml(b.code || "") + "</span>" +
      escapeHtml(b.name);
    btn.addEventListener("click", function () { activate(i); });
    tabsBox.appendChild(btn);
  });

  tabsBox.appendChild(tabDesc);
  activate(0);

  // ── 页脚邮箱 ────────────────────────────────────────
  var email = document.getElementById("footer-email");
  email.textContent = C.footer.email;
  email.href = "mailto:" + C.footer.email;

  // ── 入场动画开关 ────────────────────────────────────
  // 等字体与布局就绪后统一触发，避免首帧闪烁
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      document.body.classList.add("is-loaded");
    });
  });

  // ── 整屏滚动：首屏一次滚轮直达第二屏 ────────────────
  // 只劫持“首屏 → 第二屏”与“第二屏顶部 → 首屏”两个边界，
  // 第二屏内部的正常滚动不受影响。
  var hero = document.getElementById("top");
  var products = document.getElementById("products");
  var animating = false;

  function goTo(el) {
    animating = true;
    el.scrollIntoView({ behavior: "smooth" });
    setTimeout(function () { animating = false; }, 900);
  }

  function atHero() {
    return window.scrollY < hero.offsetHeight / 4;
  }
  function atProductsTop() {
    return Math.abs(window.scrollY - products.offsetTop) < 4;
  }

  window.addEventListener("wheel", function (e) {
    if (animating) { e.preventDefault(); return; }
    if (e.deltaY > 0 && atHero()) {
      e.preventDefault();
      goTo(products);
    } else if (e.deltaY < 0 && atProductsTop()) {
      e.preventDefault();
      goTo(hero);
    }
  }, { passive: false });

  // 触屏滑动做同样的整屏跳转
  var touchY = null;
  window.addEventListener("touchstart", function (e) {
    touchY = e.touches[0].clientY;
  }, { passive: true });
  window.addEventListener("touchend", function (e) {
    if (touchY === null || animating) return;
    var delta = touchY - e.changedTouches[0].clientY;
    if (delta > 40 && atHero()) goTo(products);
    else if (delta < -40 && atProductsTop()) goTo(hero);
    touchY = null;
  }, { passive: true });

  // ── 星空底层：生成随机星点 ──────────────────────────
  var starsBox = document.querySelector(".hero__stars");
  if (starsBox) {
    for (var i = 0; i < 130; i++) {
      var s = document.createElement("span");
      s.style.left = Math.random() * 100 + "%";
      s.style.top = Math.random() * 100 + "%";
      var r = Math.random();
      var size = r < 0.72 ? 1 : r < 0.96 ? 2 : 3;
      s.style.width = s.style.height = size + "px";
      s.style.setProperty("--tw", (2.5 + Math.random() * 4) + "s");
      s.style.setProperty("--td", (-Math.random() * 6) + "s");
      starsBox.appendChild(s);
    }
  }

  // ── 主体性：页面感知你的存在 ────────────────────────
  // 鼠标移动时，星点与星座以不同深度轻微移动（视差）；
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;

  if (!reduceMotion && finePointer) {
    var starsEl = document.querySelector(".hero__stars");
    var skyEl = document.querySelector(".hero__sky");

    hero.addEventListener("mousemove", function (e) {
      var r = hero.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      if (starsEl) starsEl.style.translate = (x * 30) + "px " + (y * 20) + "px";
      if (skyEl) skyEl.style.translate = (x * -54) + "px " + (y * -36) + "px";
    });

    // var dot = document.createElement("div");
    // dot.className = "cursor";
    // document.body.appendChild(dot);

    // var tx = -100, ty = -100, cx = tx, cy = ty;
    // window.addEventListener("mousemove", function (e) {
    //   tx = e.clientX;
    //   ty = e.clientY;
    //   dot.classList.add("is-active");
    // });
    // document.addEventListener("mouseover", function (e) {
    //   dot.classList.toggle("is-hover", !!e.target.closest("a, button"));
    // });
    // (function follow() {
    //   cx += (tx - cx) * 0.16;
    //   cy += (ty - cy) * 0.16;
    //   dot.style.transform = "translate(" + cx + "px, " + cy + "px)";
    //   requestAnimationFrame(follow);
    // })();
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
})();
