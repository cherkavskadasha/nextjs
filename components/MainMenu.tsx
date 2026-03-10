"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Menu.module.css";

export default function MainMenu() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <Link 
        href="/articles" 
        className={pathname.startsWith("/articles") ? styles.active : styles.link}
      >
        Articles
      </Link>
      <Link 
        href="/profile/settings" 
        className={pathname === "/profile/settings" ? styles.active : styles.link}
      >
        Settings
      </Link>
      <Link 
        href="/profile/security" 
        className={pathname === "/profile/security" ? styles.active : styles.link}
      >
        Security
      </Link>
    </nav>
  );
}