import { notFound } from "next/navigation";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

export async function generateStaticParams() {
  const params = Array.from({ length: 10 }).map((_, index) => ({
    id: (index + 1).toString(),
  }));
  return params;
}

export default async function SingleArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const postRes = fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const commentsRes = fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);

  const [postResponse, commentsResponse] = await Promise.all([postRes, commentsRes]);

  if (!postResponse.ok) {
    return notFound();
  }

  const post: Post = await postResponse.json();
  const comments: Comment[] = await commentsResponse.json();

  return (
    <div className="w-full bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 mb-20">
      <article className="border-b-2 border-slate-100 pb-8 mb-8">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-purple-50 text-[#832C96] text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
          Стаття №{post.id}
        </div>
        <h1 className="text-4xl font-bold text-slate-900 capitalize mb-6 leading-tight">
          {post.title}
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          {post.body}
        </p>
      </article>

      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Коментарі ({comments.length})
        </h2>
        <div className="flex flex-col gap-5">
          {comments.map((comment) => (
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