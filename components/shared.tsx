
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { profile } from "@/content/profile";
import type { Project } from "@/content/projects";
export const resumeUrl = "/curriculo/Arthur_Alves_Curriculo.pdf";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow"><span aria-hidden="true" />{children}</p>;
}
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return <a className="project-card" href={`/projetos/${project.slug}`}>
    <div className="card-top"><span className="project-number">{String(index + 1).padStart(2, "0")}</span><span className="category">{project.category}</span><ArrowUpRight size={21} aria-hidden="true" /></div>
    <h3>{project.title}</h3><p>{project.subtitle}</p>
    <div className="tags">{project.tags.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}</div>
    <span className="text-link">Ler resumo do projeto <ArrowRight size={16} /></span>
  </a>;
}
export function Footer() {
  return <footer className="site-footer"><div className="container footer-inner"><div><a className="footer-brand" href="/">arthur alves<span>.</span></a><p>{profile.name}</p></div><div className="footer-links"><a href={resumeUrl} download>Currículo em PDF <ArrowUpRight size={15} /></a><a href="https://github.com/arthurarga-tech/arthur-ai-builder-journey" target="_blank" rel="noopener noreferrer">Código deste site <ArrowUpRight size={15} /></a></div></div><div className="container footer-bottom">Portfólio pessoal · Desenvolvimento de sistemas, qualidade e visão de negócio.</div></footer>;
}
