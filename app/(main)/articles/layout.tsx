import ArticlesMenu from "../../../components/ArticlesMenu";

export default function ArticlesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <ArticlesMenu />
      
      <div className="mt-8">
        {children}
      </div>
    </div>
  );
}