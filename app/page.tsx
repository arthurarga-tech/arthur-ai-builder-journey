import Link from "next/link";
import { ArrowDown, ArrowUpRight, Download, MapPin, Mail, FileText } from "lucide-react";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { Eyebrow, ProjectCard, resumeUrl } from "@/components/shared";

export default function Home() {
  return <>
    <section className="hero container" aria-labelledby="apresentacao">
      <div className="hero-copy">
        <Eyebrow>Desenvolvimento · Qualidade · Negócios</Eyebrow>
        <h1 id="apresentacao">Arthur Alves<span>.</span></h1>
        <p className="hero-headline">{profile.headline}</p>
        <p className="hero-intro">{profile.bio}</p>
        <div className="hero-actions">
          <a className="button primary" href="#projetos">Ver meus projetos <ArrowDown size={17} /></a>
          <a className="button secondary" href={resumeUrl} download>Baixar currículo <Download size={17} /></a>
        </div>
        <p className="hero-note"><MapPin size={15} />{profile.location}</p>
      </div>
      <aside className="profile-readme" aria-label="Perfil em resumo">
        <div className="readme-title"><FileText size={17} /> SOBRE MIM <span>README.md</span></div>
        <p className="readme-intro">Da operação de um negócio<br />à construção do sistema.</p>
        <dl className="readme-facts">
          <div><dt>Hoje</dt><dd>Estudante de ADS e desenvolvedor de projetos autônomos.</dd></div>
          <div><dt>Minha base</dt><dd>Engenharia Civil, Mecatrônica e formação em QA.</dd></div>
          <div><dt>Na prática</dt><dd>Delivery, gestão de serviços, saúde, finanças e testes de software.</dd></div>
        </dl>
        <div className="readme-footer">Entender o negócio. Construir. Verificar.</div>
      </aside>
    </section>

    <section className="section container" id="projetos" aria-labelledby="projetos-titulo">
      <div className="section-heading"><div><Eyebrow>O que já construí</Eyebrow><h2 id="projetos-titulo">Projetos em destaque.</h2></div><Link className="text-link" href="/projetos">Todos os projetos <ArrowUpRight size={18} /></Link></div>
      <article className="featured-case">
        <div><span className="project-kicker">01 / DELIVERY E INTEGRAÇÃO</span><h3>TáVindo Delivery<br /><span>+ TáVindoPrinter</span></h3><p>{projects[0].solution}</p><div className="tags light">{projects[0].tags.map(tag => <span key={tag}>{tag}</span>)}</div><Link className="button white" href="/projetos/tavindo">Conhecer o projeto <ArrowUpRight size={17} /></Link></div>
        <div className="product-outline"><p className="outline-label">O que compõe o produto</p><dl><div><dt>Marketplace</dt><dd>Catálogo e jornada de compra.</dd></div><div><dt>Gestão</dt><dd>Pedidos, produtos, clientes e assinaturas.</dd></div><div><dt>Impressão</dt><dd>Fila, controle de duplicidade e confirmação por API.</dd></div></dl><p className="outline-foot">Um projeto que conecta minha vivência no delivery ao desenvolvimento de software.</p></div>
      </article>
      <div className="project-grid">{projects.slice(1, 3).map((p, i) => <ProjectCard key={p.slug} project={p} index={i + 1} />)}</div>
      <div className="more-projects"><h3>Outros projetos</h3>{projects.slice(3).map(p => <Link className="project-row" href={`/projetos/${p.slug}`} key={p.slug}><div><strong>{p.title}</strong><span>{p.subtitle}</span></div><ArrowUpRight size={20} aria-hidden="true" /></Link>)}</div>
      <p className="small-note">Alguns repositórios são privados. Os resumos apresentam o problema, minha participação e o que desenvolvi, preservando código e dados dos negócios.</p>
    </section>

    <section className="about-band" id="sobre" aria-labelledby="sobre-titulo"><div className="container section">
      <div className="about-grid"><div><Eyebrow>Trajetória</Eyebrow><h2 id="sobre-titulo">Experiência que vira<br />contexto para construir.</h2></div><div className="about-copy"><p>{profile.story[0]}</p><p>{profile.story[2]}</p><p className="objective">{profile.objective}</p></div></div>
      <div className="experience-list">{profile.experience.map(item => <article className="experience-row" key={item.title}><p className="period">{item.period}</p><div><h3>{item.title}</h3><p className="organization">{item.organization}</p><p>{item.description}</p></div></article>)}</div>
    </div></section>

    <section className="section container" id="curriculo" aria-labelledby="formacao-titulo">
      <div className="section-heading"><div><Eyebrow>Currículo em resumo</Eyebrow><h2 id="formacao-titulo">Formação e competências.</h2></div><a className="text-link" href={resumeUrl} target="_blank" rel="noopener noreferrer">Ver currículo em PDF <ArrowUpRight size={18} /></a></div>
      <div className="resume-grid"><div className="education-list">{profile.education.map(item => <article key={item.title}><p className="education-status">{item.status}</p><h3>{item.title}</h3><p>{item.institution}</p><small>{item.period}</small></article>)}<article><p className="education-status">Vivência internacional</p><h3>Inglês intermediário</h3><p>{profile.internationalExperience.description}</p><small>{profile.internationalExperience.period}</small></article></div><div className="skills-list">{profile.skills.slice(0, 5).map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.context}</p></article>)}<div className="ai-note"><strong>IA como ferramenta de trabalho</strong><p>{profile.aiApproach}</p></div></div></div>
    </section>

    <section className="contact-band" id="contato" aria-labelledby="contato-titulo"><div className="container contact-inner"><div><Eyebrow>Próximo passo</Eyebrow><h2 id="contato-titulo">Vamos conversar.</h2><p>Busco oportunidades em tecnologia e desenvolvimento de sistemas. Meu currículo e meus projetos são o ponto de partida.</p></div><div className="contact-links"><a className="button primary" href={`mailto:${profile.email}`}><Mail size={18} /> Entrar em contato</a><a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}</a><div className="social-links">{profile.links.map(link => <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">{link.label} <ArrowUpRight size={16} /></a>)}</div></div></div></section>
  </>;
}
