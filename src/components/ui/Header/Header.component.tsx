"use client";

import clsx from "clsx";

import GLOBALS from "$/config/globals";

import styles from "./Header.module.scss";
import useScrollPosition from "$/hooks/useScrollPosition";

const navItems = [
  { label: "home", path: "/" },
  { label: "about", path: "/about" },
  { label: "blog", path: "/blog" },
] as const;

export function HeaderNav() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navItems}>
        {navItems.map((i) => (
          <li className={styles.navItem} key={i.path}>
            {i.label}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Header() {
  const scrollY = useScrollPosition();

  return (
    <header
      className={clsx(styles.header, { [styles.headerBlurred]: scrollY > 0 })}
    >
      <h1 className={styles.title}>{GLOBALS.APP_HEADER_TITLE}</h1>
      <HeaderNav />
    </header>
  );
}

export default Header;
