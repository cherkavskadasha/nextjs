'use client';

import useSWR from 'swr';
import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  content: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ArticlesPage() {
  const { data: articles, error, isLoading, mutate } = useSWR('/api/articles', fetcher);

  const handleDelete = async (id: number) => {
    if (!confirm('Ви впевнені, що хочете видалити цю статтю?')) return;
    
    try {
      await fetch(`/api/articles/${id}`, { method: 'DELETE' });
      mutate();
    } catch (error) {
      console.error('Помилка видалення:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-8 mb-20">
      <header className="mb-12 flex items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Останні публікації
          </h1>
          <p className="text-slate-500 mt-4 text-lg max-w-2xl leading-relaxed">
            Актуальні новини та корисні матеріали нашої спільноти, зібрані в одному місці.
          </p>
        </div>
        <Link 
          href="/articles/create" 
          className="flex-shrink-0 px-10 py-4 bg-[#832C96] text-white font-bold rounded-2xl hover:bg-[#A73BBF] transition-all duration-300 shadow-lg shadow-purple-300/50"
        >
          + Написати статтю
        </Link>
      </header>

      {isLoading && <p className="text-slate-500 animate-pulse font-medium mb-8">Завантаження бази даних...</p>}
      {error && <p className="text-rose-500 font-medium mb-8">Помилка завантаження даних.</p>}
      {articles?.length === 0 && !isLoading && (
        <p className="text-slate-500 bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-sm text-center">Немає жодної статті. Створіть першу!</p>
      )}

      <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-10">
        {articles?.map((post: Post) => (
          <article 
            key={post.id} 
            className="group flex flex-col h-full bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-purple-200/40 hover:-translate-y-2"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-purple-50 text-[#832C96] text-[10px] font-bold uppercase tracking-[0.2em]">
                Стаття №{post.id}
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link 
                  href={`/articles/${post.id}/edit`}
                  className="px-2.5 py-1 text-sm font-bold text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                  title="Редагувати статтю"
                >
                  ✎
                </Link>
                <button 
                  onClick={() => handleDelete(post.id)}
                  className="px-2.5 py-1 text-sm font-bold text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Видалити статтю"
                >
                  ✕
                </button>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-slate-800 group-hover:text-[#A73BBF] transition-colors duration-300 capitalize leading-tight">
              {post.title}
            </h2>

            <p className="text-slate-500 mt-5 leading-relaxed line-clamp-3 font-normal flex-grow whitespace-pre-wrap">
              {post.content}
            </p>

            <div className="mt-8 flex items-center justify-between border-t border-slate-50 pt-6">
              <Link 
                href={`/articles/${post.id}`}
                className="text-sm font-bold text-[#832C96] flex items-center group/link"
              >
                Читати далі 
                <span className="ml-2 transform group-hover/link:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}