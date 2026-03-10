interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default async function ArticlesPage() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  
  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }

  const posts: Post[] = await response.json();

  const displayPosts = posts.slice(0, 5);

  return (
    <div>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "1rem" }}>All Articles</h1>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {displayPosts.map((post) => (
          <div key={post.id} style={{ border: "1px solid #e5e7eb", padding: "1rem", borderRadius: "8px", backgroundColor: "white" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "bold", color: "#1f2937", textTransform: "capitalize" }}>
              {post.id}. {post.title}
            </h2>
            <p style={{ color: "#4b5563", marginTop: "0.5rem" }}>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}