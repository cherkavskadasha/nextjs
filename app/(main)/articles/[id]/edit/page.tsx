'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import useSWR, { mutate } from 'swr';
import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  content: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const articleId = Number(params.id);

  const { data: articles, isLoading } = useSWR<Post[]>('/api/articles', fetcher);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (articles) {
      const articleToEdit = articles.find((a) => a.id === articleId);
      if (articleToEdit) {
        setTitle(articleToEdit.title);
        setContent(articleToEdit.content);
      }
    }
  }, [articles, articleId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/articles/${articleId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        mutate('/api/articles'); 
        router.push('/articles');
      } else {
        setIsSubmitting(false);
      }
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="p-20 text-center font-bold text-[#832C96] animate-pulse">Завантаження...</div>;

  return (
    <div className="max-w-2xl mx-auto px-8 mb-20">
      <div className="bg-white p-12 rounded-[2.5rem] shadow-xl shadow-purple-200/50 border border-white">
        <header className="mb-10 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-800">Редагувати</h1>
          <Link href="/articles" className="text-sm font-bold text-[#832C96]">← Назад</Link>
        </header>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <label className="text-xs font-bold uppercase tracking-wider text-[#832C96] mb-2 block">Назва</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#832C96] focus:ring-4 focus:ring-purple-50 transition-all text-slate-700 font-medium"
              required
            />
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <label className="text-xs font-bold uppercase tracking-wider text-[#832C96] mb-2 block">Зміст</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#832C96] focus:ring-4 focus:ring-purple-50 transition-all text-slate-700 resize-none leading-relaxed"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-10 py-4.5 bg-[#832C96] hover:bg-[#A73BBF] text-white font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-purple-300/50 disabled:opacity-70"
          >
            {isSubmitting ? 'Збереження...' : 'Зберегти зміни'}
          </button>
        </form>
      </div>
    </div>
  );
}