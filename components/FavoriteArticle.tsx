interface Post {
  id: number;
  title: string;
  body: string;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default async function FavoriteArticle({ id }: { id: string }) {
  await delay(Math.random() * 2000 + 1000);

  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  
  if (!response.ok) {
    return <div className="p-6 border border-rose-200 bg-rose-50 text-rose-600 rounded-2xl">Помилка завантаження статті {id}</div>;
  }

  const post: Post = await response.json();

  return (
    <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm hover:shadow-md hover:border-purple-200 transition-all">
      <h3 className="text-xl font-semibold text-slate-800 capitalize mb-3">
        <span className="text-[#832C96] mr-2">#{post.id}</span>
        {post.title}
      </h3>
      <p className="text-slate-600 leading-relaxed">{post.body}</p>
    </div>
  );
}