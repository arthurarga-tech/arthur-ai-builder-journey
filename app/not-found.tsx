import Link from "next/link";
export default function NotFound() {
  return (
    <div className="container page-section empty-page">
      <p className="eyebrow">404 / CAMINHO NÃO ENCONTRADO</p>
      <h1>
        Vamos voltar
        <br />
        ao ponto de partida.
      </h1>
      <p>Esta página não está disponível nesta jornada.</p>
      <Link className="button primary" href="/">
        Conheça Arthur
      </Link>
    </div>
  );
}
