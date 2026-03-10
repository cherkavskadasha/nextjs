"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Menu.module.css";

export default function ArticlesMenu() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <Link 
        href="/articles/favorite" 
        className={pathname === "/articles/favorite" ? styles.active : styles.link}
      >
        Favorite Articles
      </Link>
      <Link 
        href="/articles/create" 
        className={pathname === "/articles/create" ? styles.active : styles.link}
      >
        Create Article
      </Link>
    </nav>
  );
}