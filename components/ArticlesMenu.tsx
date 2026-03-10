"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Menu.module.css";

export default function ArticlesMenu() {
  const pathname = usePathname();

  return (
    <nav style={{ display: "flex", gap: "1rem", marginBottom: "1rem", padding: "0.5rem", backgroundColor: "#e2e8f0", borderRadius: "8px" }}>
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