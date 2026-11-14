import { projects } from "@/content/projects";
import { Eyebrow, ProjectCard } from "@/components/shared";
export const metadata = { title: "Projetos", description: "Aplicações e integrações desenvolvidas por Arthur Alves: delivery, gestão, saúde, finanças, engenharia e testes de software." };
export default function Projects() {
  return <div className="container page-section"><Eyebrow>Portfólio de software</Eyebrow><h1>O que já <span>construí.</span></h1><p className="page-intro">De uma necessidade de negócio a uma aplicação. Conheça o objetivo, as entregas e minha participação em cada projeto.</p><div className="project-grid all-projects">{projects.map((p, i) => <ProjectCard key={p.slug} project={p} index={i} />)}</div><p className="small-note">Alguns repositórios são privados. Aqui, os resumos funcionais permitem conhecer os projetos sem acessar código ou informações dos negócios.</p></div>;
}
