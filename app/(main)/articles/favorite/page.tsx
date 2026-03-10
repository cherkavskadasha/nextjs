import { Suspense } from "react";
import FavoriteArticle from "../../../../components/FavoriteArticle";

export default function FavoriteArticlesPage() {
  return (
    <div>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "1.5rem" }}>Улюблені статті</h1>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <Suspense fallback={<div style={{ padding: "1rem", border: "2px dashed #9ca3af", borderRadius: "8px", color: "#6b7280" }}>⏳ Завантаження статті 1...</div>}>
          <FavoriteArticle id="1" />
        </Suspense>

        <Suspense fallback={<div style={{ padding: "1rem", border: "2px dashed #9ca3af", borderRadius: "8px", color: "#6b7280" }}>⏳ Завантаження статті 2...</div>}>
          <FavoriteArticle id="2" />
        </Suspense>

        <Suspense fallback={<div style={{ padding: "1rem", border: "2px dashed #9ca3af", borderRadius: "8px", color: "#6b7280" }}>⏳ Завантаження статті 3...</div>}>
          <FavoriteArticle id="3" />
        </Suspense>
      </div>
    </div>
  );
}