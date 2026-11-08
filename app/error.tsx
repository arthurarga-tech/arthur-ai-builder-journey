"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="container page-section empty-page" role="alert">
      <h1>Este passo não carregou.</h1>
      <p>Ocorreu uma falha ao abrir a página. Tente novamente em instantes.</p>
      <button className="button primary" onClick={reset}>
        Tentar novamente
      </button>
    </div>
  );
}
