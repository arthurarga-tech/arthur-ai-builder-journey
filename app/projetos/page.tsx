import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/shared";

export const metadata = { title: "Projetos de software" };

export default function Projects() {
  return (
    <div className="container page-section">
      <h1>
        Projetos de <span>software</span>
      </h1>
      <p className="page-intro">
        O TáVindo atende à rotina de delivery. O GOS organiza serviços para a LR
        Automação. Os outros casos mostram como aplico programação à engenharia
        e pratico testes de software.
      </p>
      <div className="project-grid">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
      <p className="small-note">
        Cada caso descreve minha participação, as decisões do projeto e as
        evidências disponíveis. O repositório público do Urban Routes permite
        consultar os testes e sua estrutura.
      </p>
    </div>
  );
}
