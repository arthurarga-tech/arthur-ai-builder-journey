import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { projects } from "@/content/projects";
import { Eyebrow } from "@/components/shared";
export default async function Case({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((project) => project.slug === slug);
  if (!p) notFound();
  return (
    <article className="container page-section case-page">
      <Link href="/projetos" className="back-link">
        <ArrowLeft size={16} /> Todos os projetos
      </Link>
      <Eyebrow>{p.category}</Eyebrow>
      <h1>{p.title}</h1>
      <p className="page-intro">{p.subtitle}</p>
      <div className="tags">
        {p.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <div className="case-layout">
        <div className="case-main">
          <section>
            <span className="section-number">01</span>
            <h2>O problema</h2>
            <p>{p.problem}</p>
          </section>
          <section>
            <span className="section-number">02</span>
            <h2>A solução</h2>
            <p>{p.solution}</p>
          </section>
          <section>
            <span className="section-number">03</span>
            <h2>Minha participação</h2>
            <p>{p.contribution}</p>
          </section>
          <section>
            <span className="section-number">04</span>
            <h2>Como o sistema foi organizado</h2>
            <ul className="editorial-list">
              {p.decisions.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </section>
          <section>
            <span className="section-number">05</span>
            <h2>Aprendizados que levo adiante</h2>
            <ul className="editorial-list">
              {p.learnings.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </section>
        </div>
        <aside className="case-aside">
          <div className="aside-card">
            <CheckCircle2 size={23} />
            <h3>Evidências disponíveis</h3>
            <ul>
              {p.evidence.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            {p.links.map((l) => (
              <a
                className="button primary full"
                href={l.url}
                key={l.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {l.label}
                <ArrowUpRight size={16} />
              </a>
            ))}
          </div>
          <div className="scope-note">
            <h3>Escopo e limites</h3>
            <p>{p.limits}</p>
          </div>
        </aside>
      </div>
      <div className="case-next">
        <h2>Da experiência à próxima pergunta.</h2>
        <Link className="button primary" href="/academia">
          Explore a jornada de aprendizado <ArrowRightIcon />
        </Link>
      </div>
    </article>
  );
}
function ArrowRightIcon() {
  return <ArrowUpRight size={17} />;
}
