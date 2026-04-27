"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import styles from "./Menu.module.css";

export default function MainMenu() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-between w-full">
      <nav className={styles.nav}>
        <Link 
          href="/articles" 
          className={pathname.startsWith("/articles") ? styles.active : styles.link}
        >
          Articles
        </Link>
        <Link 
          href="/profile" 
          className={pathname === "/profile" ? styles.active : styles.link}
        >
          Profile
        </Link>
        <Link 
          href="/profile/security" 
          className={pathname === "/profile/security" ? styles.active : styles.link}
        >
          Security
        </Link>
      </nav>

      <div className="flex items-center gap-5">
        {session ? (
          <>
            <span className="text-sm font-bold text-[#832C96]">
              Привіт, {session.user?.name || "Користувач"}!
            </span>
            <button 
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-rose-500 transition-all"
            >
              Вийти
            </button>
          </>
        ) : (
          <Link 
            href="/login" 
            className="text-xs font-bold uppercase tracking-wider text-[#832C96] bg-purple-50 px-4 py-2 rounded-xl hover:bg-purple-100 transition-all"
          >
            Увійти
          </Link>
        )}
      </div>
    </div>
  );
}