'use client';

import useSWR from 'swr';
import { useParams } from 'next/navigation';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SingleArticlePage() {
  const params = useParams();
  const id = params.id;

  const { data: article } = useSWR(`/api/articles/${id}`, fetcher);
  const { data: comments } = useSWR(`https://jsonplaceholder.typicode.com/posts/${id}/comments`, fetcher);

  if (!article || !comments) {
    return (
      <div className="w-full bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 mb-20">
        <p className="text-center text-slate-500 animate-pulse">Завантаження...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 mb-20">
      <article className="border-b-2 border-slate-100 pb-8 mb-8">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-purple-50 text-[#832C96] text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
          Стаття №{article.id}
        </div>
        <h1 className="text-4xl font-bold text-slate-900 capitalize mb-6 leading-tight">
          {article.title}
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          {article.content}
        </p>
      </article>

      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Коментарі ({comments.length})
        </h2>
        <div className="flex flex-col gap-5">
          {comments.map((comment: any) => (
            <div key={comment.id} className="p-6 bg-slate-100 rounded-2xl border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800">{comment.name}</h3>
              <span className="text-sm text-[#832C96] block mb-3 font-medium">
                {comment.email}
              </span>
              <p className="text-slate-600 leading-relaxed">{comment.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}