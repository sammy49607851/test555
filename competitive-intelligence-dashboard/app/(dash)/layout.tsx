import { TopBar, Foot } from '@/components/Chrome';

export default function DashLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopBar />
      <main className="shell">
        {children}
        <Foot />
      </main>
    </>
  );
}
