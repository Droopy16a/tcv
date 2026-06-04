const { test } = require("@playwright/test");
const path = require("path");
const fs = require("fs");

test.use({ channel: "chrome", ignoreHTTPSErrors: true });

async function dismissOverlays(page) {
  await page.waitForTimeout(2500);
  const closeSelectors = [
    "button[aria-label*='Close']",
    "button[aria-label*='close']",
    ".modal-close",
    ".info-banner-close",
    "button:has-text('Continue without consent')",
    "button:has-text('Let me choose')",
    "button:has-text('OK!')",
  ];
  for (const selector of closeSelectors) {
    const locator = page.locator(selector).first();
    if (await locator.isVisible().catch(() => false)) {
      await locator.click({ timeout: 1500 }).catch(() => {});
      await page.waitForTimeout(400);
    }
  }
  await page.keyboard.press("Escape").catch(() => {});
  await page.waitForTimeout(400);
  await page.evaluate(() => {
    for (const element of document.querySelectorAll(
      "[id*='axeptio'], .needsclick, .modal, [role='dialog']"
    )) {
      if ((element.textContent || "").toLowerCase().includes("cookies")) {
        element.remove();
      }
    }
  });
}

async function collect(page, name) {
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
          position: style.position,
          font: style.fontFamily,
          fontSize: style.fontSize,
          weight: style.fontWeight,
          color: style.color,
          bg: style.backgroundColor,
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
      header: pick(".info-banner, .header, .menu-link, .header-actions"),
      hero: pick(".hero, .hero-inner, .hero-title, .hero-kicker, .hero-text, .hero-nav, .hero-guide"),
      sections: pick("main > section, .section"),
      headings: pick("h1,h2,h3,.h100,.h200,.h250,.h300"),
      cards: pick(".camp-type-card,.mixed,.key-info-item,.pro-card,.post-card,.center-card,.footer"),
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
  fs.writeFileSync(path.join("audit", `${name}.json`), JSON.stringify(data, null, 2));
}

for (const [name, url] of [
  ["home", "https://www.mouratoglou.com/en/"],
  ["stages", "https://www.mouratoglou.com/en/stages/"],
  ["tennis-school", "https://www.mouratoglou.com/en/tennis-and-school/"],
  ["academy", "https://www.mouratoglou.com/en/academy/"],
  ["international", "https://www.mouratoglou.com/en/international/"],
  ["patrick", "https://www.mouratoglou.com/en/academy/patrick-mouratoglou/"],
]) {
  test(`${name} desktop audit`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 950 });
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await dismissOverlays(page);
    await collect(page, `${name}-audit`);
    await page.screenshot({ path: path.join("audit", `${name}-clean-1440.png`) });
    if (name === "home") {
      const firstMenu = page.locator(".menu-link").first();
      if (await firstMenu.isVisible().catch(() => false)) {
        await firstMenu.hover();
        await page.waitForTimeout(700);
        await page.screenshot({ path: path.join("audit", "home-menu-hover-1440.png") });
      }
    }
  });
}

test("home mobile audit", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("https://www.mouratoglou.com/en/", {
    waitUntil: "domcontentloaded",
  });
  await dismissOverlays(page);
  await collect(page, "home-mobile-audit");
  await page.screenshot({ path: path.join("audit", "home-clean-390.png") });
  const menu = page.locator(".menu-toggle").first();
  if (await menu.isVisible().catch(() => false)) {
    await menu.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join("audit", "home-menu-open-390.png") });
  }
});
