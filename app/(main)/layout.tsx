import MainMenu from "../../components/MainMenu";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen bg-[#E9D0E9]">
      <div className="max-w-7xl mx-auto px-8">
        <MainMenu />
        <main>{children}</main>
      </div>
    </section>
  );
}