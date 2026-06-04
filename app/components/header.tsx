"use client";

import { useEffect, useState } from "react";
import { navItems } from "../data";

type HeaderProps = {
  onGuideOpen?: () => void;
};

export function Header({ onGuideOpen }: HeaderProps) {
  const [bannerVisible, setBannerVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {bannerVisible ? (
        <div className="info-banner" data-theme="orange">
          <div className="info-banner-content">
            <p>Inscription Ouverte</p>
            <a href="#camps">S'INSCRIRE</a>
          </div>
          <button
            className="info-banner-close"
            aria-label="Close announcement"
            onClick={() => setBannerVisible(false)}
          />
        </div>
      ) : null}

      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="header-wrapper">
          <a className="header-logo" href="#" aria-label="T.C. VERNOUILLET">
            <span className="logo-text">T.C. VERNOUILLET</span>
            {/* <Image
              src="/assets/logo-30-years.svg"
              alt="Mouratoglou 30 years"
              width={299}
              height={28}
              priority
            /> */}
          </a>

          <nav className="desktop-menu" aria-label="Main menu">
            {navItems.map((item) => (
              <div
                className="desktop-menu-item"
                key={item.label}
                onMouseEnter={() => setActiveMenu(item.label)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <a className="menu-link" href={item.href}>
                  {item.label}
                </a>
                {item.links.length ? (
                  <div className="submenu" data-open={activeMenu === item.label}>
                    <div className="submenu-copy">
                      <p className="submenu-title">{item.label}</p>
                      <p>{item.description}</p>
                    </div>
                    <div className="submenu-links">
                      {item.links.map((link) => (
                        <a href={item.href} key={link}>
                          {link}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </nav>

          <div className="header-actions">
            {/* <button className="gift-button" aria-label="Gift card" onClick={onGuideOpen}>
              <GiftIcon />
            </button> */}
            <a className="button button--accent" href="#fil-infos">
              Fil Infos
            </a>
            <a className="button button--fill" href="#contact">
              Contact
            </a>
            <button
              className="mobile-menu-toggle"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((value) => !value)}
            >
              <span>{menuOpen ? "Close" : "Menu"}</span>
              <span className="burger" />
            </button>
            {/* <button className="language-switcher" aria-label="Change language">
              EN
            </button> */}
          </div>
        </div>

        <div className="mobile-menu" data-open={menuOpen}>
          {navItems.map((item) => (
            <a href={item.href} key={item.label} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
          <div className="mobile-menu-footer">
            <a href="#camps">Book a camp</a>
            <a href="#contact">Contact the academy</a>
          </div>
        </div>
      </header>
    </>
  );
}
