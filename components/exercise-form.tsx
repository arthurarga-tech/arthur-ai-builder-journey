"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import type { FormEvent } from "react";
import {
  ArrowRight,
  CheckCircle2,
  CircleHelp,
  LockKeyhole,
  ReceiptText,
} from "lucide-react";
import { EXERCISE_SPEC } from "@/domain/order-exercise";
import type { ExerciseEvaluation } from "@/domain/order-exercise";

type Answer = {
  totalInCents: number;
  validationRule: string;
  sumRule: string;
  rejectedOrder: string;
};
type Submission = { answer: Answer; result: ExerciseEvaluation };
type Options = readonly { value: string; label: string }[];

function Choices({
  name,
  title,
  options,
}: {
  name: string;
  title: string;
  options: Options;
}) {
  return (
    <fieldset className="answer-group">
      <legend>{title}</legend>
      {options.map((option) => (
        <label className="option" key={option.value}>
          <input type="radio" name={name} value={option.value} required />
          <span>{option.label}</span>
        </label>
      ))}
    </fieldset>
  );
}

async function sendAnswer<T>(url: string, answer: Answer): Promise<T> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(answer),
    signal: AbortSignal.timeout(15000),
  });
  const data = await response.json();
  if (!response.ok) {
    const message =
      data &&
      typeof data === "object" &&
      "error" in data &&
      typeof data.error === "string"
        ? data.error
        : "Tente novamente em instantes.";
    throw new Error(message);
  }
  return data as T;
}

export function ExerciseForm({
  signedIn,
  signInUrl,
}: {
  signedIn: boolean;
  signInUrl: string;
}) {
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [pending, setPending] = useState<"grade" | "save" | null>(null);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const feedback = useRef<HTMLElement>(null);

  async function grade(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const total = String(values.get("total") ?? "").trim();
    const match = /^(\d{1,5})(?:[.,](\d{1,2}))?$/.exec(total);
    if (!match) {
      setError("Informe o total em reais, com até duas casas decimais.");
      return;
    }
    const answer = {
      totalInCents:
        Number(match[1]) * 100 + Number((match[2] ?? "").padEnd(2, "0")),
      validationRule: String(values.get("validationRule")),
      sumRule: String(values.get("sumRule")),
      rejectedOrder: String(values.get("rejectedOrder")),
    };
    if (answer.totalInCents > 1000000) {
      setError("O valor máximo desta atividade é R$ 10.000,00.");
      return;
    }
    setError("");
    setPending("grade");
    setSaved(false);
    try {
      const result = await sendAnswer<ExerciseEvaluation>(
        "/api/exercise",
        answer,
      );
      setSubmission({ answer, result });
      requestAnimationFrame(() => feedback.current?.focus());
    } catch (err) {
      setError(
        err instanceof Error && err.name === "Error"
          ? err.message
          : "Falha ao corrigir. Confira a conexão e tente novamente.",
      );
    } finally {
      setPending(null);
    }
  }

  async function save() {
    if (!submission) return;
    setPending("save");
    setError("");
    try {
      await sendAnswer("/api/progress", submission.answer);
      setSaved(true);
    } catch (err) {
      setError(
        err instanceof Error && err.name === "Error"
          ? err.message
          : "Falha ao salvar. Sua correção continua disponível nesta página.",
      );
    } finally {
      setPending(null);
    }
  }

  return (
    <div className="exercise-layout">
      <aside className="receipt">
        <ReceiptText size={29} />
        <h2>Pedido da atividade</h2>
        <p>Loja fictícia · Entrega</p>
        <dl>
          <div>
            <dt>2 × Hambúrguer</dt>
            <dd>R$ 18,90 cada</dd>
          </div>
          <div>
            <dt>1 × Batata</dt>
            <dd>R$ 7,90 cada</dd>
          </div>
          <div>
            <dt>Taxa de entrega</dt>
            <dd>R$ 5,00</dd>
          </div>
        </dl>
        <h3>Regras do catálogo</h3>
        <p>
          Use quantidades inteiras de 1 a 20 por item. Só produtos do catálogo
          são válidos. A taxa entra uma vez no pedido e vale zero na retirada.
        </p>
      </aside>
      <div className="exercise-main">
        <form
          className="exercise-form"
          onSubmit={grade}
          onChange={() => {
            setSubmission(null);
            setSaved(false);
            setError("");
          }}
        >
          <fieldset className="answer-group" disabled={pending !== null}>
            <legend>1. Qual é o total com entrega?</legend>
            <label htmlFor="predicted-total">Total em reais</label>
            <input
              id="predicted-total"
              name="total"
              type="text"
              inputMode="decimal"
              maxLength={8}
              required
              autoComplete="off"
              placeholder="0,00"
              aria-describedby="money-help"
            />
            <small id="money-help">
              Pode usar vírgula ou ponto para os centavos.
            </small>
          </fieldset>
          <fieldset className="answer-set" disabled={pending !== null}>
            <Choices
              title="2. Qual regra valida um item?"
              name="validationRule"
              options={EXERCISE_SPEC.validationOptions}
            />
            <Choices
              title="3. Como calcular o total?"
              name="sumRule"
              options={EXERCISE_SPEC.sumOptions}
            />
            <Choices
              title="4. Qual pedido deve ser rejeitado?"
              name="rejectedOrder"
              options={EXERCISE_SPEC.rejectedOrderOptions}
            />
          </fieldset>
          <button
            type="submit"
            className="button primary"
            disabled={pending !== null}
          >
            {pending === "grade" ? "Corrigindo…" : "Conferir respostas"}
            <ArrowRight size={17} />
          </button>
        </form>
        {error && (
          <p className="notice error" role="alert">
            {error}
          </p>
        )}
        {submission && (
          <section
            className="feedback"
            ref={feedback}
            tabIndex={-1}
            aria-label="Resultado da correção"
          >
            <span className="pill">RESULTADO DO EXERCÍCIO</span>
            <h2>
              {submission.result.score} de {submission.result.maxScore} pontos
            </h2>
            {submission.result.feedback.map((item) => (
              <div className="feedback-item" key={item.id}>
                {item.correct ? (
                  <CheckCircle2 size={20} />
                ) : (
                  <CircleHelp size={20} />
                )}
                <div>
                  <h3>
                    {item.label} · {item.points}/{item.maxPoints}
                  </h3>
                  <p>{item.explanation}</p>
                </div>
              </div>
            ))}
            <h3>{submission.result.nextStep.title}</h3>
            <p>{submission.result.nextStep.description}</p>
            <div className="save-result">
              {signedIn ? (
                saved ? (
                  <p role="status">
                    Tentativa salva.{" "}
                    <Link className="text-link" href="/evolucao">
                      Ver minha jornada <ArrowRight size={16} />
                    </Link>
                  </p>
                ) : (
                  <button
                    className="button secondary"
                    type="button"
                    onClick={save}
                    disabled={pending !== null}
                  >
                    <LockKeyhole size={16} />
                    {pending === "save"
                      ? "Salvando…"
                      : "Salvar no meu histórico privado"}
                  </button>
                )
              ) : (
                <p>
                  Você praticou como visitante.{" "}
                  <a href={signInUrl} target="_top" className="text-link">
                    Entrar para fazer uma tentativa com histórico.
                  </a>
                </p>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
