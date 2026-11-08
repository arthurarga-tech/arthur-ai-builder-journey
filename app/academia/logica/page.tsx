import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Eyebrow } from "@/components/shared";
import { LessonReader } from "@/components/lesson-reader";
export const metadata = { title: "Lógica aplicada" };
export default function Logic() {
  return (
    <div className="container page-section">
      <Link className="back-link" href="/academia">
        <ArrowLeft size={16} /> Todas as trilhas
      </Link>
      <Eyebrow>TRILHA 01 / FUNDAMENTOS</Eyebrow>
      <h1>
        Lógica aplicada<span>.</span>
      </h1>
      <p className="page-intro">
        Do pedido à decisão. Uma primeira trilha para conectar dados, regras e
        resultados.
      </p>
      <LessonReader />
    </div>
  );
}
