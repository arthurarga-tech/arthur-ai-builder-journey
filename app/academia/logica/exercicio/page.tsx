import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getChatGPTUser, chatGPTSignInPath } from "@/app/chatgpt-auth";
import { Eyebrow } from "@/components/shared";
import { ExerciseForm } from "@/components/exercise-form";

export const dynamic = "force-dynamic";
export const metadata = { title: "Exercício de lógica" };

export default async function Exercise() {
  const user = await getChatGPTUser();
  return (
    <div className="page-section container">
      <Link className="back-link" href="/academia/logica">
        <ArrowLeft size={16} /> Voltar às lições
      </Link>
      <Eyebrow>Prática de lógica</Eyebrow>
      <h1>
        Calcule um pedido<span>.</span>
      </h1>
      <p className="page-intro">
        Use o pedido fictício e as regras do catálogo para responder. Cada um
        dos quatro critérios vale 25 pontos.
      </p>
      <ExerciseForm
        signedIn={Boolean(user)}
        signInUrl={chatGPTSignInPath("/academia/logica/exercicio")}
      />
    </div>
  );
}
