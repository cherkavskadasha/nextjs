import { Suspense } from "react";
import FavoriteArticle from "../../../../components/FavoriteArticle";

export default function FavoriteArticlesPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Улюблені статті</h1>
      
      <div className="flex flex-col gap-6">
        <Suspense fallback={<div className="p-6 border-2 border-dashed border-purple-200 rounded-2xl text-[#832C96] font-medium text-center bg-purple-50/50">⏳ Завантаження статті 1...</div>}>
          <FavoriteArticle id="1" />
        </Suspense>

        <Suspense fallback={<div className="p-6 border-2 border-dashed border-purple-200 rounded-2xl text-[#832C96] font-medium text-center bg-purple-50/50">⏳ Завантаження статті 2...</div>}>
          <FavoriteArticle id="2" />
        </Suspense>

        <Suspense fallback={<div className="p-6 border-2 border-dashed border-purple-200 rounded-2xl text-[#832C96] font-medium text-center bg-purple-50/50">⏳ Завантаження статті 3...</div>}>
          <FavoriteArticle id="3" />
        </Suspense>
      </div>
    </div>
  );
}