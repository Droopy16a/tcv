# Mouratoglou Reference Audit

Reference audited: `https://www.mouratoglou.com/en/`

## Crawl Scope

- Crawled the home page, `robots.txt`, Yoast sitemap index, page sitemaps, camp sitemap, professionals sitemap, and coaching-advice sitemap.
- Inspected major navigation destinations: home, camps, tennis & school, academy, international, and Patrick Mouratoglou pages.
- Captured clean desktop and mobile screenshots after suppressing consent/promo overlays with browser storage.
- Downloaded and inspected the bundled WordPress theme stylesheet: `wp-content/themes/solanum/public/build/frontend/css/app.css`.

## Color Palette

- `#000000` — primary dark theme background and CTA fill.
- `#FFFFFF` — primary light theme background and dark-theme text.
- `#DF6436` — signature orange accent used for banners, active nav, decorative outlines, and primary booking CTA.
- `#F5F5F5` — light secondary background for inputs, guide search, cards, and mobile menu panels.
- `#333333` — dark secondary background for dark-theme surfaces.
- `#C4C4C4` — light-theme borders and divider lines.
- `#5C5C5C` — dark-theme borders.
- `rgba(0,0,0,.3)` — hero media overlay.
- `rgba(0,0,0,.75)` — modal and submenu scrim.

## Typography Scale

- Body font: `Din Pro`, sans-serif, `16px`, `1.5` line-height.
- Display font: `Geometria`, sans-serif, uppercase, heavy weights.
- `--h100`: `clamp(1.75rem, 6vw, 5.5rem)` for home hero and major display titles.
- `--h200`: `clamp(1.75rem, 6vw, 5.5rem)` for large section headings.
- `--h250`: `clamp(1.75rem, 4vw, 3.75rem)` for inner-page hero titles.
- `--h300`: `clamp(1.5rem, 2.25vw, 1.75rem)` for card and subsection headings.
- Navigation and buttons: uppercase, `0.875rem`, medium weight.

## Layout System

- Root variables: `--viewport-h: 100dvh`, `--header-h: 86px` desktop and `72px` tablet/mobile.
- Section padding: `--spc-y: clamp(4rem, 8.5vw, 7.5rem)`, `--spc-x: clamp(1rem, 2.5vw, 2rem)`.
- Containers: default max width `88rem`, medium `73.1875rem`, small `58.3125rem`.
- Main breakpoint families: `78.755rem` header/menu switch, `63.96875rem` desktop section layouts, `47.96875rem` mobile card/slider switch, `31.21875rem` single-column camp cards.
- Core section rhythm alternates light and dark blocks, with same-theme adjacent sections pulled upward by negative section spacing.
- Recurring decorative geometry: orange skewed outlined rectangles behind key content blocks.

## Page Structure Map

- Home: top promo banner, sticky header, video hero with search guide CTA, tagline/editorial intro, camps matrix, tennis & school mixed block, key info strip, academy mixed block, ambassadors slider, coaching corner slider, international centers slider/tabs, contact push, partners, newsletter/footer.
- Camps page: media hero, breadcrumb, large title, pill location tag, sticky anchor nav, camp listing/filter components, WhatsApp/contact affordances.
- Tennis & School page: media hero and anchor nav, selection/admission-oriented conversion blocks, floating contact rail.
- Academy page: aerial media hero, anchor nav, environment/methodology/founder/pro-base/camps/tennis-school/history sections.
- International page: wide destination hero, anchor nav, centers grid/tab structure, project/job/contact content.
- Patrick page: profile/editorial hero and biography/story content tied to academy methodology and players.

## Component Inventory

- `InfoBanner` — orange top announcement with booking link and close affordance.
- `Header` — transparent over desktop hero at scroll start, white sticky state after scroll, mobile split header with menu toggle.
- `MegaMenu` — desktop hover/click submenus with scrim; mobile full-height accordion panel.
- `Hero` — full viewport media background, centered uppercase title, kicker, optional tag/pill, mobile search bar above media.
- `SearchGuide` — modal-like guided selector with stepped choices and sliding panels.
- `Button` — uppercase bordered/fill CTA with vertical fill hover transition.
- `SecondaryButton` — compact “Discover” style with icon block sliding in from the left.
- `CampTypeCard` — square layered image card with background, foreground cutout, title reveal, and link.
- `MixedSection` — two-column editorial image/content block with optional reversed layout and skew decoration.
- `KeyInfo` — compact statistic row with skewed tile backgrounds.
- `Slider` — horizontal track with scrollbar handle and circular arrow controls.
- `TabbedCenters` — category tabs plus horizontal card slider for international locations.
- `PushContact` — compact white CTA block on dark background with skew decoration.
- `Footer` — newsletter form, multi-column accordion nav on mobile, social links, language/legal row.

## Motion Inventory

- Smooth scrolling enabled when motion is allowed; Lenis can reproduce the premium easing.
- Header theme transition: `border-color`, `background-color` over `0.2s`.
- Page overlay/scrim transition: opacity `0.3s`.
- Button fill hover: scale Y `0 → 1`, `0.2s`.
- Secondary button hover: label translates from partially hidden to visible, `0.2s`.
- Slider track transition: translate `0.35s ease`; scrollbar scale/translate `0.2s`.
- Accordions: opacity and grid row expansion `0.4s`.
- Modal/guide: clip-path reveal and opacity/translate around `0.2–0.3s`.
- Camp cards: title fades/translates into place on in-view state.
- Decorative skew rectangles subtly parallax via a CSS custom scroll delta.

## Responsive Behavior

- Desktop header is horizontal with mega submenus and transparent overlay on media heroes.
- Tablet/mobile header becomes white, compact, and menu-driven; search guide appears above the hero media.
- Desktop camps section uses a sticky left heading and two-column card matrix; mobile stacks heading then cards.
- Mixed sections become stacked image-first content blocks below `63.96875rem`.
- Sliders show roughly `3.5` cards desktop, `2.5` tablet, `1.15` mobile.
- Footer columns become accordion-style groups on smaller screens.

## Asset Strategy

- Prefer extracted reference media for hero/video/cards/logos/fonts where practical.
- Use CSS-created icons and UI primitives for simple controls.
- Use neutral gradient placeholders only if a reference asset cannot be fetched automatically.
