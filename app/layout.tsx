// app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Ou a fonte que você estiver usando
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// --- AQUI É A MUDANÇA ---
export const metadata: Metadata = {
  title: {
    default: "Almeida MM | Moda Masculina & Streetwear",
    template: "%s | Almeida MM" // Isso permite que páginas internas fiquem "Camisetas | Almeida MM"
  },
  description: "A melhor seleção de roupas masculinas. Camisetas, times, acessórios e muito mais. Enviamos para todo o Brasil.",
  keywords: ["moda masculina", "streetwear", "roupas", "camisetas", "almeida mm"],
  icons: {
    icon: "/icon.png", // Vamos usar um PNG que é mais moderno
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}