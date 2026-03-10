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
    <div>
      <article style={{ borderBottom: "2px solid #e5e7eb", paddingBottom: "2rem", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "bold", textTransform: "capitalize", marginBottom: "1rem" }}>
          {post.id}. {post.title}
        </h1>
        <p style={{ fontSize: "18px", lineHeight: "1.6", color: "#374151" }}>
          {post.body}
        </p>
      </article>

      <section>
        <h2 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "1rem" }}>
          Коментарі ({comments.length})
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {comments.map((comment) => (
            <div key={comment.id} style={{ padding: "1rem", backgroundColor: "#f9fafb", borderRadius: "8px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "bold" }}>{comment.name}</h3>
              <span style={{ fontSize: "14px", color: "#6b7280", display: "block", marginBottom: "0.5rem" }}>
                {comment.email}
              </span>
              <p style={{ fontSize: "15px", color: "#4b5563" }}>{comment.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}