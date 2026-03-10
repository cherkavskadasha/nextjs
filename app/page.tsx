import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Головна сторінка</h1>
      <Link href="/articles" style={{ color: "blue", textDecoration: "underline" }}>
        Перейти до статей
      </Link>
    </main>
  );
}