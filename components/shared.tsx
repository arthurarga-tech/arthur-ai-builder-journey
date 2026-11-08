import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  CodeXml,
  BriefcaseBusiness,
} from "lucide-react";
import { profile } from "@/content/profile";
import type { Project } from "@/content/projects";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="eyebrow">
      <span aria-hidden="true" />
      {children}
    </p>
  );
}
export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <Link className="project-card" href={"/projetos/" + project.slug}>
      <div className="card-top">
        <span className="project-number">0{index + 1}</span>
        <span className="pill">{project.category}</span>
        <ArrowUpRight className="card-arrow" size={23} />
      </div>
      <h3>{project.title}</h3>
      <p>{project.subtitle}</p>
      <div className="tags">
        {project.tags.slice(0, 3).map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <span className="text-link">
        Conhecer o projeto <ArrowRight size={17} />
      </span>
    </Link>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div>
          <Link className="footer-brand" href="/">
            arthur guedes<span>.</span>
          </Link>
          <p>Engenharia, ADS e desenvolvimento de produtos.</p>
        </div>
        <div className="footer-links">
          <a
            href={profile.links[0].url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <CodeXml size={17} /> GitHub <ArrowUpRight size={14} />
          </a>
          <a
            href={profile.links[1].url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <BriefcaseBusiness size={17} /> LinkedIn <ArrowUpRight size={14} />
          </a>
          <Link href="/academia">
            Explorar a academia <ArrowRight size={16} />
          </Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>{profile.disclaimer}</span>
      </div>
    </footer>
  );
}
