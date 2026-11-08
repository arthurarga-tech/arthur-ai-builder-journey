import Link from "next/link";
import { ArrowRight, Braces, BookOpen, Route } from "lucide-react";
import { logicTrack } from "@/content/academy";

export const metadata = { title: "Academia de programação e IA" };

export default function Academy() {
  return (
    <div className="container page-section">
      <h1>
        Academia de <span>programação e IA</span>
      </h1>
      <p className="page-intro">
        Comece pela lógica de programação. Você pode experimentar o exercício
        como visitante e entrar na sua conta para guardar as tentativas em um
        histórico privado.
      </p>
      <div className="track-card">
        <div className="track-art" aria-hidden="true">
          <Braces size={80} strokeWidth={1.1} />
        </div>
        <div className="track-details">
          <h2>{logicTrack.title}</h2>
          <p className="lead">{logicTrack.subtitle}</p>
          <p>
            Acompanhe um pedido fictício desde a escolha dos itens até o cálculo
            da entrega. Depois, preveja o total e escolha as regras que aceitam
            ou rejeitam cada entrada.
          </p>
          <div className="learning-meta">
            <span>
              <BookOpen size={16} aria-hidden="true" />{" "}
              {logicTrack.lessons.length} lições
            </span>
            <span>
              <Route size={16} aria-hidden="true" /> 1 exercício
            </span>
          </div>
          <Link href="/academia/logica" className="button primary">
            Começar a trilha <ArrowRight size={18} />
          </Link>
        </div>
      </div>
      <section className="roadmap" aria-labelledby="trilhas-planejadas">
        <h2 id="trilhas-planejadas">Próximas trilhas planejadas</h2>
        <p>
          Depois da lógica, o roteiro segue para linguagens, integrações e
          aplicações de IA. Cada trilha será disponibilizada com conteúdo,
          prática e avaliação.
        </p>
        <ol start={2}>
          {logicTrack.nextTracks.map((track, index) => (
            <li key={track}>
              <span aria-hidden="true">{index + 2}</span>
              {track}
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
