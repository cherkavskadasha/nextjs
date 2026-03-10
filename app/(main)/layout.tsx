import MainMenu from "../../components/MainMenu";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <MainMenu />
      <div style={{ padding: "1rem" }}>
        {children}
      </div>
    </section>
  );
}