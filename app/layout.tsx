import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/shared";
import "./globals.css";
export const metadata: Metadata = {
  title: { default: "Arthur Alves | Desenvolvimento de Sistemas e Portfólio", template: "%s · Arthur Alves" },
  description: "Conheça Arthur Alves: estudante de ADS, engenheiro e empreendedor. Projetos de software, integrações, qualidade, currículo e contato profissional.",
  icons: { icon: "/favicon.svg" },
  openGraph: { title: "Arthur Alves | Portfólio", description: "Desenvolvimento de sistemas com visão de negócio. Projetos reais, trajetória e currículo.", locale: "pt_BR", type: "website" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><Navigation /><main id="conteudo">{children}</main><Footer /></body></html>;
}
