import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./AuthProvider";

export const metadata: Metadata = {
  title: "Gift Guide",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
