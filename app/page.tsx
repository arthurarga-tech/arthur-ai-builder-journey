import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Braces,
  Check,
  Layers3,
  MapPin,
  ScanLine,
  Sparkles,
  Workflow,
} from "lucide-react";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { Eyebrow, ProjectCard } from "@/components/shared";

export default function Home() {
  return (
    <>
      <section className="hero container" aria-labelledby="apresentacao">
        <div className="hero-copy">
          <Eyebrow>{profile.displayName}</Eyebrow>
          <h1 id="apresentacao">
            Da engenharia
            <br />
            <span>ao software.</span>
          </h1>
          <p className="hero-intro">
            Sou engenheiro civil, empreendedor e estudante de Análise e
            Desenvolvimento de Sistemas. No TáVindo, uso o que aprendi na
            operação de um delivery para desenvolver o caminho entre a compra e
            a impressão do pedido.
          </p>
          <div className="hero-actions">
            <Link className="button primary" href="/projetos">
              Conheça meus projetos <ArrowUpRight size={18} />
            </Link>
            <Link className="button quiet" href="/academia">
              Explore a academia <ArrowRight size={17} />
            </Link>
          </div>
          <div className="hero-note">
            <MapPin size={15} aria-hidden="true" />
            {profile.location}
          </div>
        </div>
        <div
          className="builder-visual"
          aria-label="As áreas e as etapas que reúno nos projetos"
        >
          <div className="visual-top">Meu processo de desenvolvimento</div>
          <div className="visual-orbit">
            <div className="orbit-line line-one" aria-hidden="true" />
            <div className="orbit-line line-two" aria-hidden="true" />
            <div className="orbit-label label-engineer">
              <Layers3 size={17} aria-hidden="true" /> Engenharia
            </div>
            <div className="orbit-label label-business">
              <Workflow size={17} aria-hidden="true" /> Negócios
            </div>
            <div className="orbit-label label-tech">
              <Braces size={17} aria-hidden="true" /> Software
            </div>
            <div className="orbit-core" aria-hidden="true">
              <span>
                a<span>.</span>
              </span>
            </div>
          </div>
          <div className="visual-process">
            <div>
              <strong>Entender</strong>
              <small>o problema</small>
            </div>
            <ArrowRight size={16} aria-hidden="true" />
            <div>
              <strong>Construir</strong>
              <small>a solução</small>
            </div>
            <ArrowRight size={16} aria-hidden="true" />
            <div>
              <strong>Validar</strong>
              <small>o resultado</small>
            </div>
          </div>
          <Link className="visual-caption" href="/projetos/urban-routes">
            <ScanLine size={15} aria-hidden="true" /> Veja os testes do projeto
            Urban Routes <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>

      <div className="principles-strip">
        <div
          className="container"
          role="navigation"
          aria-label="Seções desta página"
        >
          <span>
            <Braces size={18} aria-hidden="true" />
            <a href="#projetos">Projetos</a>
          </span>
          <span>
            <Workflow size={18} aria-hidden="true" />
            <a href="#trajetoria">Trajetória</a>
          </span>
          <span>
            <Layers3 size={18} aria-hidden="true" />
            <a href="#formacao">Formação e competências</a>
          </span>
          <span>
            <BookOpen size={18} aria-hidden="true" />
            <a href="#estudos">Estudos</a>
          </span>
        </div>
      </div>

      <section
        className="section container"
        id="projetos"
        aria-labelledby="projetos-titulo"
      >
        <div className="section-heading">
          <h2 id="projetos-titulo">Projetos de software</h2>
          <Link className="text-link" href="/projetos">
            Todos os projetos <ArrowUpRight size={19} />
          </Link>
        </div>
        <div className="featured-case">
          <div className="featured-copy">
            <h3>
              TáVindo Delivery
              <br />
              <span>+ TáVindoPrinter</span>
            </h3>
            <p>
              O cliente escolhe os itens no marketplace. O estabelecimento
              acompanha o pedido e o Printer busca a tarefa de impressão na
              fila. Desenvolvi esse fluxo com apoio de IA e da minha experiência
              em alimentação.
            </p>
            <div className="tags light">
              <span>React</span>
              <span>TypeScript</span>
              <span>Supabase</span>
            </div>
            <Link href="/projetos/tavindo" className="button white">
              Ler o caso TáVindo <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="delivery-map">
            <span className="map-caption">Fluxo ilustrativo do produto</span>
            <div className="delivery-step">
              <span className="step-icon">
                <Layers3 size={21} />
              </span>
              <div>
                <strong>Marketplace</strong>
                <small>Catálogo e escolha dos itens</small>
              </div>
              <Check size={17} aria-hidden="true" />
            </div>
            <div className="flow-connector" aria-hidden="true" />
            <div className="delivery-step">
              <span className="step-icon">
                <Workflow size={21} />
              </span>
              <div>
                <strong>Estabelecimento</strong>
                <small>Recebimento e gestão dos pedidos</small>
              </div>
              <Check size={17} aria-hidden="true" />
            </div>
            <div className="flow-connector" aria-hidden="true" />
            <div className="delivery-step printer">
              <span className="step-icon">
                <ScanLine size={21} />
              </span>
              <div>
                <strong>TáVindoPrinter</strong>
                <small>Fila, impressão e confirmação</small>
              </div>
            </div>
            <p>
              O Printer identifica tarefas já processadas para evitar impressões
              duplicadas.
            </p>
          </div>
        </div>
        <div className="project-grid secondary-projects">
          {projects.slice(1, 3).map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index + 1}
            />
          ))}
        </div>
      </section>

      <section
        className="story-section"
        id="trajetoria"
        aria-labelledby="trajetoria-titulo"
      >
        <div className="container">
          <div className="story-grid">
            <div>
              <h2 id="trajetoria-titulo">Minha trajetória</h2>
              <p className="lead">
                Meu nome é {profile.name}. Minha experiência reúne projetos de
                engenharia, gestão de um negócio de alimentação e
                desenvolvimento de sistemas.
              </p>
            </div>
            <div className="story-copy">
              <p>
                Desde fevereiro de 2024, elaboro projetos arquitetônicos para
                aprovação municipal, além de projetos elétricos e
                hidrossanitários. Esse trabalho exige entender o que será
                construído e conferir os requisitos de cada entrega.
              </p>
              <p>{profile.story[1]}</p>
            </div>
          </div>
          <div className="timeline">
            {profile.timeline.map((item) => (
              <div key={item.title}>
                <span className="timeline-marker" aria-hidden="true" />
                <small>{item.period}</small>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
          <div className="story-grid" id="formacao">
            <div>
              <details>
                <summary>
                  <strong>Formação acadêmica e técnica</strong>
                </summary>
                <dl>
                  {profile.education.map((item) => (
                    <div key={item.title}>
                      <dt>
                        <strong>{item.title}</strong>
                      </dt>
                      <dd>
                        {item.institution} · {item.period}
                      </dd>
                    </div>
                  ))}
                </dl>
              </details>
            </div>
            <div>
              <details>
                <summary>
                  <strong>Competências e onde as aplico</strong>
                </summary>
                <dl>
                  {profile.skills.map((skill) => (
                    <div key={skill.title}>
                      <dt>
                        <strong>{skill.title}</strong>
                      </dt>
                      <dd>{skill.context}</dd>
                    </div>
                  ))}
                </dl>
              </details>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section container"
        id="estudos"
        aria-labelledby="estudos-titulo"
      >
        <div className="learning-banner">
          <div>
            <h2 id="estudos-titulo">
              Lógica de programação
              <br />
              aplicada a pedidos
            </h2>
            <p>
              Na primeira trilha da academia, você aprende a representar preços
              em centavos, validar quantidades e testar o total de um pedido
              fictício.
            </p>
            <Link href="/academia" className="button primary">
              Ver a academia <ArrowRight size={18} />
            </Link>
          </div>
          <Link className="learning-feature" href="/academia/logica">
            <span className="lesson-symbol">
              <Braces size={34} aria-hidden="true" />
            </span>
            <h3>Do pedido à decisão</h3>
            <div className="learning-meta">
              <span>4 lições</span>
              <span>1 exercício interativo</span>
            </div>
            <span className="text-link">
              Começar a trilha <ArrowUpRight size={18} />
            </span>
          </Link>
        </div>
      </section>

      <section className="container closing-note" aria-labelledby="ia-titulo">
        <Sparkles size={23} aria-hidden="true" />
        <div>
          <h2 id="ia-titulo">Como uso inteligência artificial</h2>
          <p>{profile.aiApproach}</p>
          <p>{profile.genAiMotivation}</p>
        </div>
        <Link href="/laboratorio" className="text-link">
          Laboratório de IA <ArrowUpRight size={18} />
        </Link>
      </section>
    </>
  );
}
