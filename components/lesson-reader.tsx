"use client";
import Link from "next/link";
import { useState, useRef } from "react";
import { ArrowLeft, ArrowRight, Check, Lightbulb, Play } from "lucide-react";
import { logicTrack } from "@/content/academy";
export function LessonReader() {
  const [index, setIndex] = useState(0);
  const heading = useRef<HTMLHeadingElement>(null);
  const lesson = logicTrack.lessons[index];
  function select(n: number) {
    setIndex(n);
    requestAnimationFrame(() => heading.current?.focus());
  }
  return (
    <div className="lesson-layout">
      <aside className="lesson-sidebar">
        <p className="eyebrow">NESTA TRILHA</p>
        <nav aria-label="Lições de lógica">
          {logicTrack.lessons.map((l, i) => (
            <button
              key={l.id}
              aria-current={index === i ? "step" : undefined}
              onClick={() => select(i)}
            >
              <span>0{i + 1}</span>
              {l.title.substring(3)}
            </button>
          ))}
        </nav>
        <Link href="/academia/logica/exercicio" className="text-link">
          <Play size={16} /> Ir para o exercício
        </Link>
        <p>Avançar nas lições não registra uma conclusão automática.</p>
      </aside>
      <article className="lesson-content">
        <div className="lesson-kicker">
          <span>
            LIÇÃO {index + 1} DE {logicTrack.lessons.length}
          </span>
          <span>CONCEITO + PRÁTICA</span>
        </div>
        <h2 tabIndex={-1} ref={heading}>
          {lesson.title.substring(3)}
        </h2>
        <p className="lead">{lesson.objective}</p>
        {lesson.theory.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <div className="code-label">PSEUDOCÓDIGO · EXEMPLO DIDÁTICO</div>
        <pre>
          <code>{lesson.example}</code>
        </pre>
        <div className="takeaway">
          <Check size={21} />
          <strong>{lesson.takeaway}</strong>
        </div>
        <div className="reflection">
          <Lightbulb size={21} />
          <div>
            <h3>Pare um instante e pense</h3>
            <p>{lesson.practice}</p>
          </div>
        </div>
        <div className="lesson-pagination">
          <button
            className="button secondary"
            onClick={() => select(index - 1)}
            disabled={index === 0}
          >
            <ArrowLeft size={17} /> Anterior
          </button>
          {index < logicTrack.lessons.length - 1 ? (
            <button
              className="button primary"
              onClick={() => select(index + 1)}
            >
              Próxima lição <ArrowRight size={17} />
            </button>
          ) : (
            <Link href="/academia/logica/exercicio" className="button primary">
              Praticar agora <ArrowRight size={17} />
            </Link>
          )}
        </div>
      </article>
    </div>
  );
}
