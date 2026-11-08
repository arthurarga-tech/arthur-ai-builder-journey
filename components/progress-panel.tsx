"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ProgressSummary } from "@/services/progress";
export function ProgressPanel() {
  const [progress, setProgress] = useState<ProgressSummary | null>(null);
  const [error, setError] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [pending, setPending] = useState(false);
  const [reload, setReload] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setError("");
      try {
        const response = await fetch("/api/progress", {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) throw new Error();
        const data = (await response.json()) as ProgressSummary;
        if (!controller.signal.aborted) setProgress(data);
      } catch {
        if (!controller.signal.aborted)
          setError("O histórico não carregou. Você pode tentar novamente.");
      }
    }
    void load();
    return () => controller.abort();
  }, [reload]);

  async function clear() {
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/progress", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: "{}",
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) throw new Error();
      const result = (await response.json()) as { progress: ProgressSummary };
      setProgress(result.progress);
      setConfirmDelete(false);
    } catch {
      setError("Não foi possível apagar seu histórico. Tente novamente.");
    } finally {
      setPending(false);
    }
  }
  return (
    <section aria-label="Progresso privado">
      {error && (
        <div className="notice error" role="alert">
          {error}{" "}
          <button className="text-link" onClick={() => setReload(reload + 1)}>
            Atualizar
          </button>
        </div>
      )}
      {!progress && !error && <p role="status">Carregando seu histórico…</p>}
      {progress && (
        <>
          <div className="metrics">
            <div>
              <strong>{progress.count}</strong>
              <span>Tentativas distintas</span>
            </div>
            <div>
              <strong>{progress.bestScore}/100</strong>
              <span>Melhor pontuação</span>
            </div>
            <div>
              <strong>{progress.completed ? "1/1" : "0/1"}</strong>
              <span>Exercício concluído</span>
            </div>
          </div>
          <h2>Histórico de prática</h2>
          {progress.count === 0 ? (
            <div className="aside-card">
              <h3>Sua primeira tentativa começa na Academia</h3>
              <p>
                Após conferir as respostas, use “Salvar no meu histórico
                privado” para registrar seu resultado aqui.
              </p>
            </div>
          ) : (
            <ul className="progress-list">
              {progress.attempts.map((attempt) => (
                <li key={attempt.id}>
                  <div>
                    <strong>Do pedido à decisão</strong>
                    <small>
                      {new Intl.DateTimeFormat("pt-BR", {
                        dateStyle: "short",
                        timeStyle: "short",
                      }).format(new Date(attempt.createdAt))}
                    </small>
                  </div>
                  <span>
                    {attempt.score}/100 ·{" "}
                    {attempt.completed ? "Concluído" : "Em prática"}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <Link href="/academia/logica/exercicio" className="button primary">
            Abrir o exercício <ArrowRight size={17} />
          </Link>
          {progress.count > 0 && (
            <div className="delete-controls">
              {confirmDelete ? (
                <>
                  <p>
                    Apagar todas as suas tentativas salvas? Esta ação é
                    definitiva.
                  </p>
                  <button
                    className="button secondary"
                    onClick={() => setConfirmDelete(false)}
                    disabled={pending}
                  >
                    Manter histórico
                  </button>{" "}
                  <button
                    className="button primary"
                    onClick={clear}
                    disabled={pending}
                  >
                    {pending ? "Apagando…" : "Apagar minhas tentativas"}
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="text-link"
                  onClick={() => setConfirmDelete(true)}
                >
                  Apagar meu histórico
                </button>
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
}
