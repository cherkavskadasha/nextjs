import Link from "next/link";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default async function ArticlesPage() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  
  if (!response.ok) {
    throw new Error("Не вдалося завантажити статті");
  }

  const posts: Post[] = await response.json();
  const displayPosts = posts.slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-8 mb-20">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Останні публікації
        </h1>
        <p className="text-slate-500 mt-4 text-lg max-w-2xl leading-relaxed">
          Актуальні новини та корисні матеріали нашої спільноти, зібрані в одному місці.
        </p>
      </header>

      <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-10">
        {displayPosts.map((post) => (
          <Link 
            key={post.id} 
            href={`/articles/${post.id}`}
            className="group block"
          >
            <article className="h-full bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-purple-200/40 hover:-translate-y-2">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-purple-50 text-[#832C96] text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                Стаття №{post.id}
              </div>

              <h2 className="text-2xl font-semibold text-slate-800 group-hover:text-[#A73BBF] transition-colors duration-300 capitalize leading-tight">
                {post.title}
              </h2>

              <p className="text-slate-500 mt-5 leading-relaxed line-clamp-3 font-normal">
                {post.body}
              </p>

              <div className="mt-8 flex items-center text-sm font-bold text-[#832C96] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                Читати далі <span className="ml-2">→</span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}