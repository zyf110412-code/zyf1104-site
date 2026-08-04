(function () {
  var isPreview = location.search.indexOf("preview") > -1;
  if (isPreview) {
    document.documentElement.classList.add("preview-mode");
  }

  // 页脚年份自动更新
  document.getElementById("year").textContent = new Date().getFullYear();

  // ===== 内容渲染：从 content.json 读取，后台编辑器改的就是这个文件 =====
  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function applyContent(data) {
    if (!data) {
      return;
    }

    var set = function (id, value) {
      var el = document.getElementById(id);
      if (el && value !== undefined && value !== null && value !== "") {
        el.textContent = value;
      }
    };

    var hero = data.hero || {};
    set("brand", "🌱 " + hero.name);
    set("heroBadge", hero.badge);
    var heading = document.getElementById("heroHeading");
    if (heading && hero.greeting && hero.name) {
      heading.innerHTML =
        esc(hero.greeting) + '<span class="gradient-text">' + esc(hero.name) + "</span>";
    }
    set("heroSub", hero.subtitle);
    set("monogram", hero.monogram);
    set("primaryBtn", hero.primaryBtn);
    set("secondaryBtn", hero.secondaryBtn);

    var heroTags = document.getElementById("heroTags");
    if (heroTags && hero.tags && hero.tags.length) {
      heroTags.innerHTML = hero.tags
        .map(function (t) {
          return "<span>" + esc(t) + "</span>";
        })
        .join("");
    }

    var about = data.about || {};
    set("aboutTitle", about.title);
    var paragraphs = document.getElementById("aboutParagraphs");
    if (paragraphs && about.paragraphs && about.paragraphs.length) {
      paragraphs.innerHTML = about.paragraphs
        .map(function (p) {
          return "<p>" + esc(p) + "</p>";
        })
        .join("");
    }

    var stats = document.getElementById("aboutStats");
    if (stats && about.stats && about.stats.length) {
      stats.innerHTML = about.stats
        .map(function (s) {
          return (
            "<li><strong>" +
            esc(s.value) +
            "</strong><span>" +
            esc(s.label) +
            "</span></li>"
          );
        })
        .join("");
    }

    var projects = data.projects || {};
    set("projectsTitle", projects.title);
    set("projectsLead", projects.lead);
    var grid = document.getElementById("projectsGrid");
    if (grid && projects.items && projects.items.length) {
      var covers = ["cover-a", "cover-b", "cover-c"];
      grid.innerHTML = projects.items
        .map(function (item, i) {
          var tags = (item.tags || [])
            .map(function (t) {
              return "<li>" + esc(t) + "</li>";
            })
            .join("");
          return (
            '<article class="project-card reveal visible">' +
            '<div class="project-cover ' +
            covers[i % covers.length] +
            '">' +
            esc(item.emoji || "✨") +
            "</div>" +
            "<h3>" +
            esc(item.title) +
            "</h3>" +
            "<p>" +
            esc(item.description) +
            "</p>" +
            '<ul class="tags">' +
            tags +
            "</ul>" +
            "</article>"
          );
        })
        .join("");
    }

    var contact = data.contact || {};
    set("contactTitle", contact.title);
    set("contactLead", contact.lead);
    var emailLink = document.getElementById("contactEmail");
    if (emailLink && contact.email) {
      emailLink.href = "mailto:" + contact.email;
      emailLink.textContent = "✉️ " + contact.email;
    }

    var socials = document.getElementById("socials");
    if (socials && contact.socials && contact.socials.length) {
      socials.innerHTML = contact.socials
        .map(function (s) {
          return '<a class="chip" href="' + esc(s.url) + '">' + esc(s.name) + "</a>";
        })
        .join("");
    }

    var footer = data.footer || {};
    set("copyrightText", footer.copyright);
  }

  fetch("content.json")
    .then(function (res) {
      return res.ok ? res.json() : null;
    })
    .then(applyContent)
    .catch(function () {
      // 本地直接双击打开时读不到文件，就保留网页自带的内容
    });

  // 深浅色切换
  var themeToggle = document.getElementById("themeToggle");
  themeToggle.addEventListener("click", function () {
    var next =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "light"
        : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });

  // 移动端菜单
  var navToggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");

  navToggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    navToggle.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      nav.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  // 滚动时的导航阴影与回到顶部按钮
  var header = document.querySelector(".site-header");
  var backTop = document.getElementById("backTop");

  window.addEventListener(
    "scroll",
    function () {
      var y = window.scrollY;
      header.classList.toggle("scrolled", y > 8);
      backTop.classList.toggle("show", y > 480);
    },
    { passive: true }
  );

  backTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // 滚动浮现动画
  var revealEls = document.querySelectorAll(".reveal");

  if (isPreview) {
    revealEls.forEach(function (el) {
      el.classList.add("visible");
    });
  } else if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealEls.forEach(function (el, i) {
      el.style.transitionDelay = (i % 3) * 0.08 + "s";
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("visible");
    });
  }
})();
