import Link from "next/link";
import { ArrowRight, FlaskConical, ShieldCheck, BookOpen } from "lucide-react";
import { Eyebrow } from "@/components/shared";
import { profile } from "@/content/profile";
export const metadata = { title: "Laboratório de IA" };
export default function Lab() {
  return (
    <div className="container page-section lab-page">
      <Eyebrow>LABORATÓRIO / EXPERIMENTAR COM CRITÉRIO</Eyebrow>
      <h1>
        IA com propósito.
        <br />
        <span>E com limites claros.</span>
      </h1>
      <p className="page-intro">{profile.aiApproach}</p>
      <div className="lab-status">
        <span className="lab-icon">
          <FlaskConical size={38} />
        </span>
        <div>
          <span className="pill">PRÓXIMA ETAPA · IA DESATIVADA</span>
          <h2>Tutor de fundamentos</h2>
          <p>
            A proposta é explicar conceitos e orientar a revisão do exercício. O
            tutor ainda não está disponível: esta versão não envia perguntas a
            modelos nem consome a API.
          </p>
          <div className="tags">
            <span>Contexto da lição</span>
            <span>Resposta com limites</span>
            <span>Avaliação de qualidade</span>
          </div>
        </div>
      </div>
      <div className="principle-grid">
        <div>
          <ShieldCheck />
          <h3>Validar antes de confiar</h3>
          <p>
            A correção do exercício já funciona por regras explícitas. Uma
            futura resposta de IA não poderá mudar a nota ou declarar
            competências.
          </p>
        </div>
        <div>
          <BookOpen />
          <h3>Aprendizado com evidências</h3>
          <p>{profile.genAiMotivation}</p>
        </div>
      </div>
      <Link className="button primary" href="/academia/logica/exercicio">
        Experimentar a lógica agora <ArrowRight size={17} />
      </Link>
    </div>
  );
}
