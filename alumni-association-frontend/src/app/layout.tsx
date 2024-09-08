import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";



export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}