/**
 * Keep Android Open – Countdown Banner (modified)
 * Licensed under the GNU General Public License v3.0
 * SPDX-License-Identifier: GPL-3.0-only
 *
 * Changes: the banner is now fixed to the top of the viewport and the
 * page content is shifted downward (by adjusting body padding) so the banner
 * does not overlap existing content. No external CSS files are modified.
 *
 */
(function () {
  "use strict";

  // ── Localized banner strings ──────────────────────────────────────────
  var messages = {
    fa: "اندروید، یک سکّوی بسته خواهد شد!",
    ar: "سيصبح نظام أندرويد منصة مغلقة في",
    he: "אנדרואיד תהפוך לפלטפורמה נעולה בעוד",
    en: "Android will become a locked-down platform in",
    ca: "Android es convertir\u00E0 en una plataforma tancada",
    cs: "Android se stane uzamčenou platformou za",
    de: "Android wird eine geschlossene Plattform werden.",
    da: "Android vil blive en lukket platform om",
    nl: "Android zal een gesloten platform worden over",
    el: "\u03A4\u03BF Android \u03B8\u03B1 \u03B3\u03AF\u03BD\u03B5\u03B9 \u03BC\u03AF\u03B1 \u03BA\u03BB\u03B5\u03B9\u03C3\u03C4\u03AE \u03C0\u03BB\u03B1\u03C4\u03C6\u03CC\u03C1\u03BC\u03B1",
    es: "Android se convertir\u00E1 en una plataforma cerrada en",
    fr: "Android va devenir une plateforme ferm\u00E9e dans",
    id: "Android akan menjadi platform yang terkunci.",
    it: "Android diventer\u00E0 una piattaforma bloccata",
    ko: "Android\uAC00 \uD3D0\uC1C4\uB41C \uD50C\uB7AB\uD3FC\uC774 \uB418\uAE30\uAE4C\uC9C0 \uB0A8\uC740 \uC2DC\uAC04:",
    pl: "Android stanie si\u0119 platform\u0105 zamkni\u0119t\u0105 za",
    "pt-BR": "O Android se tornar\u00E1 uma plataforma fechada em",
    ru: "Android \u0441\u0442\u0430\u043d\u0435\u0442 \u0437\u0430\u043a\u0440\u044b\u0442\u043e\u0439 \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u043e\u0439 \u0447\u0435\u0440\u0435\u0437",
    sk: "Android sa stane uzamknutou platformou",
    th: "Android\u0E08\u0E30\u0E40\u0E1B\u0E47\u0E19\u0E41\u0E1E\u0E25\u0E15\u0E1F\u0E2D\u0E23\u0E4C\u0E21\u0E17\u0E35\u0E48\u0E16\u0E39\u0E01\u0E25\u0E47\u0E2D\u0E01",
    tr: "Android k\u0131s\u0131tl\u0131 bir platform haline gelecek.",
    uk: "Android \u0441\u0442\u0430\u043d\u0435 \u0437\u0430\u043a\u0440\u0438\u0442\u043e\u044e \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u043e\u044e",
    "zh-CN":
      "\u5B89\u5353\u5C06\u6210\u4E3A\u4E00\u4E2A\u5C01\u95ED\u5E73\u53F0",
    "zh-TW": "Android \u5C07\u6210\u70BA\u4E00\u500B\u5C01\u9589\u5E73\u53F0",
    ja: "Androidは閉鎖的なプラットフォームになろうとしています",
    fi: "Androidista tulee suljettu alusta",
    hu: "Az Android egy lezárt platform lesz",
    vi: "Android sẽ trở thành một hệ điều hành đóng",
    bg: "Android ще стане заключена платформа след",
    be: "Android \u0441\u0442\u0430\u043d\u0435 \u0437\u0430\u043a\u0440\u044b\u0442\u0430\u0439 \u043f\u043b\u0430\u0444\u0442\u043e\u0440\u043c\u0430\u0439 \u0020 \u0020",
  };

  // ── Determine locale ──────────────────────────────────────────────────
  function resolveLocale(tag) {
    if (!tag) return "en";
    // Exact match
    if (messages[tag]) return tag;
    // Case-insensitive exact match (e.g. "pt-br" → "pt-BR")
    var lower = tag.toLowerCase();
    for (var key in messages) {
      if (key.toLowerCase() === lower) return key;
    }
    // Fallback to base language (e.g. "de-CH" → "de", "zh-Hans" → "zh")
    var base = lower.split("-")[0];
    for (var key2 in messages) {
      if (key2.toLowerCase() === base) return key2;
    }
    // Fallback to any regional variant of the base language (e.g. "pt" → "pt-BR")
    for (var key3 in messages) {
      if (key3.toLowerCase().split("-")[0] === base) return key3;
    }
    return "en";
  }

  var locale = resolveLocale(
    document.documentElement.lang ||
      navigator.language ||
      navigator.userLanguage,
  );

  // ── Size variant ──────────────────────────────────────────────────────
  var size = "minimal";

  // ── Link ────────────────────────────────────────────────────────────
  var defaultLink =
    "https://keepandroidopen.org" + (locale === "en" ? "" : "/" + locale + "/");
  var linkUrl = defaultLink;

  // ── Close button ────────────────────────────────────────────────────
  var showClose = true;
  var storageKey = "kao-banner-hidden";
  var dismissDays = 30;

  // ── Inject CSS ───────────────────────────────────────────────────────
  // Note: position is fixed so banner is anchored to the top of the viewport.
  // We keep the rest of the styling local to the inserted <style> element.
  var cssNormal =
    ".kao-banner{" +
    "position:fixed;top:0;left:0;right:0;z-index:2147483647;" +
    "font-variant-numeric:tabular-nums;" +
    "background:linear-gradient(180deg,#d32f2f 0%,#b71c1c 100%);" +
    "border-bottom:4px solid #801313;" +
    "color:#fff;" +
    "font-family:'Arial Black',sans-serif;" +
    "font-weight:900;" +
    "text-transform:uppercase;" +
    "letter-spacing:2px;" +
    "font-size:1.5rem;" +
    "text-align:center;" +
    "text-shadow:" +
    "0px 1px 0px #9e1a1a," +
    "0px 2px 0px #8a1515," +
    "0px 3px 0px #751111," +
    "0px 4px 0px #5e0d0d," +
    "0px 6px 10px rgba(0,0,0,0.5);" +
    "padding:0.5rem 2.5rem;" +
    "line-height:1.6;" +
    "box-sizing:border-box;" +
    "}";

  var cssMini =
    ".kao-banner{" +
    "position:fixed;top:0;left:0;right:0;z-index:2147483647;" +
    "font-variant-numeric:tabular-nums;" +
    "background:linear-gradient(180deg,#d32f2f 0%,#b71c1c 100%);" +
    "border-bottom:2px solid #801313;" +
    "color:#fff;" +
    "font-family:'Arial Black',sans-serif;" +
    "font-weight:900;" +
    "text-transform:uppercase;" +
    "letter-spacing:1px;" +
    "font-size:0.75rem;" +
    "text-align:center;" +
    "text-shadow:" +
    "0px 1px 0px #9e1a1a," +
    "0px 2px 0px #8a1515," +
    "0px 3px 5px rgba(0,0,0,0.4);" +
    "padding:0.25rem 1.5rem;" +
    "line-height:1.4;" +
    "box-sizing:border-box;" +
    "}";

  var cssMinimal =
    ".kao-banner{" +
    "position:fixed;top:0;left:0;right:0;z-index:2147483647;" +
    "font-variant-numeric:tabular-nums;" +
    "background:linear-gradient(180deg,#d32f2f 0%,#b71c1c 100%);" +
    "border-bottom:2px solid #801313;" +
    "color:#fff;" +
    "font-family:'Arial Black',sans-serif;" +
    "font-weight:900;" +
    "text-transform:uppercase;" +
    "letter-spacing:1px;" +
    "font-size:0.75rem;" +
    "text-align:center;" +
    "text-shadow:" +
    "0px 1px 0px #9e1a1a," +
    "0px 2px 0px #8a1515," +
    "0px 3px 5px rgba(0,0,0,0.4);" +
    "padding:0.25rem 1.5rem;" +
    "line-height:1.4;" +
    "box-sizing:border-box;" +
    "}";

  var cssCommon =
    ".kao-banner a{color:#fff;text-decoration:none;}" +
    ".kao-banner a:hover{text-decoration:underline;}" +
    ".kao-banner-close{" +
    "position:absolute;" +
    "right:0.5rem;" +
    "top:50%;" +
    "transform:translateY(-50%);" +
    "background:none;" +
    "border:none;" +
    "color:#fff;" +
    "font-size:0.8em;" +
    "cursor:pointer;" +
    "opacity:0.7;" +
    "padding:0.25rem 0.5rem;" +
    "line-height:1;" +
    "text-shadow:none;" +
    "}" +
    ".kao-banner-close:hover{opacity:1;}" +
    // Ensure the banner doesn't cause horizontal overflow on small viewports
    ".kao-banner{max-width:100%;overflow:hidden;}";

  var cssKaoPulse =
    ".kao-banner:not(.no-animation) { animation:kao-pulse 2s infinite; }" +
    "@keyframes kao-pulse{" +
    "0%{box-shadow:0 0 0 0 rgba(211,47,47,0.7)}" +
    "70%{box-shadow:0 0 0 15px rgba(211,47,47,0)}" +
    "100%{box-shadow:0 0 0 0 rgba(211,47,47,0)}" +
    "}";

  var style = document.createElement("style");
  style.textContent =
    (size === "mini" ? cssMini : size === "minimal" ? cssMinimal : cssNormal) +
    cssKaoPulse +
    cssCommon;
  document.head.appendChild(style);

  // ── Check if previously dismissed (reappears after dismissDays) ─────
  if (showClose) {
    try {
      var dismissed = localStorage.getItem(storageKey);
      if (dismissed) {
        var elapsed = Date.now() - Number(dismissed);
        if (elapsed < dismissDays * 24 * 60 * 60 * 1000) return;
        localStorage.removeItem(storageKey);
      }
    } catch (e) {}
  }

  // ── Wait for document.body to exist, then initialize banner ──────────
  function initBanner() {
    // Safety check: if body still doesn't exist, try again
    if (!document.body) {
      setTimeout(initBanner, 50);
      return;
    }

    // ── Create banner DOM ────────────────────────────────────────────────
    var banner = document.createElement("div");
    banner.className = "kao-banner";

    var messageText = messages[locale] || messages.en;

    var link = document.createElement("a");
    link.href = linkUrl;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = messageText;
    banner.appendChild(link);

    banner.appendChild(document.createElement("br"));

    var countdownSpan = document.createElement("span");
    countdownSpan.textContent = "\u00A0";
    banner.appendChild(countdownSpan);

    // Close button
    var closeBtn = document.createElement("button");
    closeBtn.className = "kao-banner-close";
    closeBtn.setAttribute("aria-label", "Close");
    closeBtn.textContent = "\u2715";
    banner.appendChild(closeBtn);

    // Insert the banner into the DOM (as the first child).
    // Since it's fixed-positioned, its visual placement is controlled by CSS.
    document.body.insertBefore(banner, document.body.firstChild);

    // ── Ensure banner doesn't overlap page content ──────────────────────
    var body = document.body;

    // Keep track of original inline padding-top so we can restore it when banner is removed.
    var originalInlinePaddingTop = body.style.paddingTop || "";
    // Computed original padding-top in pixels (number)
    var originalComputedPaddingTopPx = (function () {
      try {
        var cs = window.getComputedStyle(body);
        return parseFloat(cs.paddingTop) || 0;
      } catch (e) {
        return 0;
      }
    })();

    // Apply paddingTop = originalComputedPaddingTopPx + bannerHeight
    function updateBodyPadding() {
      try {
        var rect = banner.getBoundingClientRect();
        var bannerHeight = Math.ceil(rect.height);
        // If banner is not displayed, do nothing.
        if (banner.style.display === "none" || rect.height === 0) {
          return;
        }
        var newPadding = originalComputedPaddingTopPx + bannerHeight;
        // Only set inline style — do not overwrite other CSS rules.
        body.style.paddingTop = newPadding + "px";
      } catch (e) {
        // ignore
      }
    }

    // Restore original inline padding when banner is removed/hidden.
    function restoreBodyPadding() {
      try {
        body.style.paddingTop = originalInlinePaddingTop;
      } catch (e) {}
    }

    // Close button behavior (also store dismissal)
    closeBtn.addEventListener("click", function () {
      banner.style.display = "none";
      restoreBodyPadding();
      try {
        localStorage.setItem(storageKey, String(Date.now()));
      } catch (e) {}
    });

    // Recompute padding on resize and when fonts/layout may change.
    var resizeTimer = null;
    function scheduleUpdatePadding() {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        updateBodyPadding();
        resizeTimer = null;
      }, 50);
    }
    window.addEventListener("resize", scheduleUpdatePadding);
    // Also observe DOM changes inside the banner which may affect its height.
    if (window.MutationObserver) {
      var mo = new MutationObserver(scheduleUpdatePadding);
      mo.observe(banner, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    }

    // ── Countdown logic ──────────────────────────────────────────────────
    var countDownDate = new Date("Sep 1, 2026 00:00:00").getTime();

    var unitFormatters = {
      day: new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "day",
        unitDisplay: "narrow",
      }),
      hour: new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "hour",
        unitDisplay: "narrow",
      }),
      minute: new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "minute",
        unitDisplay: "narrow",
      }),
      second: new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "second",
        unitDisplay: "narrow",
      }),
    };

    function formatUnit(value, unit) {
      return unitFormatters[unit].format(value);
    }

    var remaining = new Array(7);
    var separator = " ";
    var timer = null;
    var lastBannerHeight = 0;

    function updateBanner() {
      var now = new Date().getTime();
      var distance = countDownDate - now;

      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      var parts = 0;
      remaining[0] = days > 0 ? formatUnit(days, "day") : null;
      if (remaining[0]) parts++;
      remaining[1] = parts ? separator : null;
      remaining[2] = parts || hours > 0 ? formatUnit(hours, "hour") : null;
      if (remaining[2]) parts++;
      remaining[3] = parts ? separator : null;
      remaining[4] =
        parts || minutes > 0 ? formatUnit(minutes, "minute") : null;
      if (remaining[4]) parts++;
      remaining[5] = parts ? separator : null;
      remaining[6] = formatUnit(seconds, "second");

      countdownSpan.textContent = remaining.join("");

      // If banner height changes (e.g., because the countdown text length changed),
      // update the body's padding so the page content stays below the banner.
      try {
        var rect = banner.getBoundingClientRect();
        var h = Math.ceil(rect.height);
        if (h !== lastBannerHeight) {
          lastBannerHeight = h;
          updateBodyPadding();
        }
      } catch (e) {}

      if (distance < 0) {
        clearInterval(timer);
      }
    }

    // Do an initial padding update after the banner is laid out.
    // Use requestAnimationFrame to ensure styles are applied and measurements are accurate.
    function initLayout() {
      requestAnimationFrame(function () {
        updateBanner();
        updateBodyPadding();
      });
    }

    timer = setInterval(updateBanner, 1000);
    initLayout();
  }

  // Start initialization
  initBanner();
})();
