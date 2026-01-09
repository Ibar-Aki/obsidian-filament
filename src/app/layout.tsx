import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Portfolio | クリエイティブソリューション",
    template: "%s | Portfolio",
  },
  description: "クリエイティブなソリューションであなたのビジネスを成功へ導きます。Web制作、デザイン、コンサルティングなど幅広いサービスを提供。",
  keywords: ["ポートフォリオ", "Web制作", "デザイン", "コンサルティング"],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.variable} font-sans antialiased bg-white text-gray-900`}>
        <Header />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
