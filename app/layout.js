import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="cupcake" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
