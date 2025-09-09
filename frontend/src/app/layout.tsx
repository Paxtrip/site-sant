import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import Sidebar from "@/app/components/layout/Sidebar";
import Content from "@/app/components/layout/Content";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Корпоративный портал",
  description: "Платформа для внутреннего использования",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.className} bg-gray-50`}>
        {/* Шапка остается на всех экранах */}
        <Header />
        
        <div className="flex flex-1 container mx-auto px-4">
          {/* Сайдбар */}
          <aside className="hidden md:block md:w-64 lg:w-72 flex-shrink-0">
            {/* Делаем сайдбар "липким" */}
            <div className="sticky top-4 h-[calc(100vh-2rem)] overflow-y-auto bg-white p-4 rounded-lg shadow-sm">
              <Sidebar />
            </div>
          </aside>
          
          {/* Основной контент */}
          <main className="flex-1 p-4">
            <Content>{children}</Content>
          </main>
        </div>

        <Footer />
      </body>
    </html>
  );
}
