import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/shared";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Arthur Guedes | AI Builder Journey",
    template: "%s · Arthur Guedes",
  },
  description:
    "Engenharia, negócios e tecnologia. Conheça os projetos de Arthur Guedes e acompanhe uma jornada de aprendizado pela prática.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <a className="skip-link" href="#conteudo">
          Pular para o conteúdo
        </a>
        <Navigation />
        <main id="conteudo">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
