import ArticlesMenu from "../../../components/ArticlesMenu";

export default function ArticlesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ArticlesMenu />
      <div style={{ marginTop: "1rem" }}>
        {children}
      </div>
    </div>
  );
}