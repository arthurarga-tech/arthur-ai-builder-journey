import Link from "next/link";
import { ArrowRight, LockKeyhole } from "lucide-react";
import {
  getChatGPTUser,
  chatGPTSignInPath,
  chatGPTSignOutPath,
} from "@/app/chatgpt-auth";
import { Eyebrow } from "@/components/shared";
import { ProgressPanel } from "@/components/progress-panel";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Minha jornada",
  robots: { index: false, follow: false },
};

export default async function Progress() {
  const user = await getChatGPTUser();
  return (
    <div className="container page-section">
      <Eyebrow>Área privada</Eyebrow>
      <h1>
        Minha jornada<span>.</span>
      </h1>
      {user ? (
        <>
          <p className="page-intro">
            Confira as tentativas que você escolheu salvar e o próximo passo da
            sua prática.
          </p>
          <ProgressPanel />
          <a className="back-link" href={chatGPTSignOutPath("/")} target="_top">
            Sair da conta
          </a>
        </>
      ) : (
        <div className="aside-card">
          <LockKeyhole size={26} />
          <h2>Seu histórico de aprendizado</h2>
          <p>
            Entre com sua conta para acessar suas tentativas. Você também pode
            explorar as lições e praticar como visitante.
          </p>
          <div className="hero-actions">
            <a
              className="button primary"
              href={chatGPTSignInPath("/evolucao")}
              target="_top"
            >
              Entrar com ChatGPT <ArrowRight size={17} />
            </a>
            <Link className="button secondary" href="/academia">
              Explorar a academia
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
