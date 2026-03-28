import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthGuard } from "@/components/auth/auth-guard";
import { AppProvider } from "@/providers/app-provider";
import { AuthProvider } from "@/providers/auth-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "ClientPulse",
  description:
    "ClientPulse is a premium client reporting and performance platform for agencies, consultants, and service businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <AppProvider>
          <AuthProvider>
            <AuthGuard>{children}</AuthGuard>
          </AuthProvider>
        </AppProvider>
      </body>
    </html>
  );
}