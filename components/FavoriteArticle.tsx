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
    return <div>Помилка завантаження статті {id}</div>;
  }

  const post: Post = await response.json();

  return (
    <div style={{ border: "2px solid #10b981", padding: "1rem", borderRadius: "8px", backgroundColor: "#ecfdf5" }}>
      <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#047857", textTransform: "capitalize" }}>
        Улюблена стаття #{post.id}: {post.title}
      </h3>
      <p style={{ color: "#065f46", marginTop: "0.5rem" }}>{post.body}</p>
    </div>
  );
}