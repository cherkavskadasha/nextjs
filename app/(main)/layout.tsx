import MainMenu from "../../components/MainMenu";
import AuthProvider from "../../components/AuthProvider";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <section className="min-h-screen bg-[#E9D0E9]">
        <div className="max-w-7xl mx-auto px-8">
          <MainMenu />
          <main>{children}</main>
        </div>
      </section>
    </AuthProvider>
  );
}