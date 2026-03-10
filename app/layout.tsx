import type { Metadata } from "next";
import "./globals.scss";
import { AntdRegistry } from '@ant-design/nextjs-registry';

export const metadata: Metadata = {
  title: "Next.js Lab 1",
  description: "Modern UI Project",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}