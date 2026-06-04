const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const outDir = path.resolve("audit");
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function inspect(browser, url, name, width, height) {
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 1,
  });

  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.waitForTimeout(3500);
  await page.evaluate(() => {
    const candidates = Array.from(
      document.querySelectorAll('button, [role="button"]')
    );
    for (const element of candidates) {
      const text = (element.textContent || "").toLowerCase();
      if (
        text.includes("accept") ||
        text.includes("refuse") ||
        text.includes("continue") ||
        text.includes("ok")
      ) {
        try {
          element.click();
        } catch {}
        break;
      }
    }
  });
  await page.waitForTimeout(1000);

  await page.screenshot({
    path: path.join(outDir, `${name}-${width}.png`),
    fullPage: false,
  });
  await page.screenshot({
    path: path.join(outDir, `${name}-${width}-full.png`),
    fullPage: true,
  });

  const data = await page.evaluate(() => {
    const rootStyle = getComputedStyle(document.documentElement);
    const bodyStyle = getComputedStyle(document.body);
    const pick = (selector) =>
      Array.from(document.querySelectorAll(selector)).map((element) => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return {
          tag: element.tagName.toLowerCase(),
          cls: element.className?.toString().slice(0, 160),
          text: (element.textContent || "")
            .replace(/\s+/g, " ")
            .trim()
            .slice(0, 180),
          x: Math.round(rect.x),
          y: Math.round(rect.y),
          w: Math.round(rect.width),
          h: Math.round(rect.height),
          display: style.display,
          pos: style.position,
          font: style.fontFamily,
          fontSize: style.fontSize,
          weight: style.fontWeight,
          color: style.color,
          bg: style.backgroundColor,
          gap: style.gap,
          padding: style.padding,
          margin: style.margin,
        };
      });

    return {
      url: location.href,
      title: document.title,
      vars: {
        headerH: rootStyle.getPropertyValue("--header-h").trim(),
        spcY: rootStyle.getPropertyValue("--spc-y").trim(),
        spcX: rootStyle.getPropertyValue("--spc-x").trim(),
        ctrW: rootStyle.getPropertyValue("--ctr-w").trim(),
        h100: rootStyle.getPropertyValue("--h100").trim(),
        h200: rootStyle.getPropertyValue("--h200").trim(),
        h300: rootStyle.getPropertyValue("--h300").trim(),
        themeBg: rootStyle.getPropertyValue("--theme-bg").trim(),
        themeTxt: rootStyle.getPropertyValue("--theme-txt").trim(),
        themeAccent: rootStyle.getPropertyValue("--theme-accent").trim(),
      },
      body: {
        font: bodyStyle.fontFamily,
        fontSize: bodyStyle.fontSize,
        lineHeight: bodyStyle.lineHeight,
        color: bodyStyle.color,
        bg: bodyStyle.backgroundColor,
      },
      header: pick(
        ".info-banner, .header, .header-wrapper, .header-logo-inner, .menu, .menu-list, .menu-link, .header-actions"
      ),
      hero: pick(
        ".hero, .hero-inner, .hero-content, .hero-title, .hero-kicker, .hero-text, .hero-nav, .hero-guide"
      ),
      sections: pick("main > section, .section"),
      headings: pick("h1,h2,h3,.h100,.h200,.h250,.h300"),
      cards: pick(
        ".camp-type-card,.mixed,.key-info-item,.pro-card,.post-card,.center-card,.footer"
      ),
      assets: {
        imgs: Array.from(document.images)
          .map((img) => ({
            src: img.currentSrc || img.src,
            alt: img.alt,
            w: img.naturalWidth,
            h: img.naturalHeight,
            cls: img.className?.toString(),
          }))
          .slice(0, 140),
        videos: Array.from(document.querySelectorAll("video source, video"))
          .map((video) => video.src || video.currentSrc)
          .filter(Boolean),
        links: Array.from(document.querySelectorAll("a[href]"))
          .map((anchor) => ({
            text: (anchor.textContent || "").replace(/\s+/g, " ").trim(),
            href: anchor.href,
          }))
          .slice(0, 220),
      },
    };
  });

  fs.writeFileSync(
    path.join(outDir, `${name}-${width}.json`),
    JSON.stringify(data, null, 2)
  );

  if (name.startsWith("home")) {
    const buttons = await page.locator("button").evaluateAll((buttons) =>
      buttons.map((button, index) => ({
        index,
        text: (button.textContent || "").trim(),
        aria: button.getAttribute("aria-expanded"),
        cls: button.className?.toString(),
      }))
    );
    fs.writeFileSync(
      path.join(outDir, `buttons-${width}.json`),
      JSON.stringify(buttons, null, 2)
    );

    const menuButton = page.locator('.menu-toggle, button:has-text("Menu")').first();
    if ((await menuButton.count()) > 0) {
      await menuButton.click({ timeout: 5000 }).catch(() => {});
      await page.waitForTimeout(500);
      await page.screenshot({
        path: path.join(outDir, `menu-open-${width}.png`),
        fullPage: false,
      });
    }
  }

  await page.close();
}

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: chromePath,
  });

  await inspect(browser, "https://www.mouratoglou.com/en/", "home", 1440, 950);
  await inspect(
    browser,
    "https://www.mouratoglou.com/en/",
    "home-mobile",
    390,
    844
  );

  const pages = [
    ["stages", "https://www.mouratoglou.com/en/stages/"],
    ["tennis-school", "https://www.mouratoglou.com/en/tennis-and-school/"],
    ["academy", "https://www.mouratoglou.com/en/academy/"],
    ["international", "https://www.mouratoglou.com/en/international/"],
    [
      "patrick",
      "https://www.mouratoglou.com/en/academy/patrick-mouratoglou/",
    ],
  ];

  for (const [name, url] of pages) {
    await inspect(browser, url, name, 1440, 950);
  }

  await browser.close();
})();
