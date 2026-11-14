import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/content/projects";
import { Eyebrow } from "@/components/shared";
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  return { title: project?.title ?? "Projeto não encontrado", description: project?.subtitle };
}
export default async function Case({ params }: Props) {
  const { slug } = await params;
  const p = projects.find(project => project.slug === slug);
  if (!p) notFound();
  return <article className="container page-section case-page">
    <Link className="back-link" href="/projetos"><ArrowLeft size={16} /> Todos os projetos</Link>
    <Eyebrow>{p.category}</Eyebrow><h1>{p.title}</h1><p className="page-intro">{p.subtitle}</p>
    <div className="tags case-tags">{p.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
    <div className="case-layout"><div className="case-main">
      <section><span className="section-number">01 / CONTEXTO</span><h2>O problema</h2><p>{p.problem}</p></section>
      <section><span className="section-number">02 / PRODUTO</span><h2>A solução</h2><p>{p.solution}</p></section>
      <section><span className="section-number">03 / CONTRIBUIÇÃO</span><h2>Minha participação</h2><p>{p.contribution}</p>{p.decisions.length > 0 && <ul className="editorial-list">{p.decisions.map(item => <li key={item}>{item}</li>)}</ul>}</section>
      {p.learnings.length > 0 && <details className="case-learning"><summary>O que aprendi com o projeto</summary><ul className="editorial-list">{p.learnings.map(item => <li key={item}>{item}</li>)}</ul></details>}
    </div><aside className="case-aside"><div className="aside-card"><p className="aside-label">EM RESUMO</p><h2>O que desenvolvi</h2><ul className="editorial-list">{p.evidence.map(item => <li key={item}>{item}</li>)}</ul>{p.links.map(link => <a key={link.url} className="button primary full" href={link.url} target="_blank" rel="noopener noreferrer">{link.label}<ArrowUpRight size={16} /></a>)}</div><div className="scope-note"><p>{p.limits}</p></div></aside></div>
    <div className="case-next"><div><h2>Conheça a trajetória por trás dos projetos.</h2><p>Experiência profissional, formação e contato em um só lugar.</p></div><Link className="button secondary" href="/#curriculo">Ver currículo e formação <ArrowUpRight size={17} /></Link></div>
  </article>;
}
