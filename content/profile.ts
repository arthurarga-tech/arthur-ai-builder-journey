export type ProfileLink = { label: string; url: string };

export const profile = {
  name: "Arthur Augusto Reis Guedes Alves",
  displayName: "Arthur Guedes",
  headline: "Conecto problemas reais a soluções digitais.",
  intro:
    "Engenharia, negócios e tecnologia. Uma trajetória que continua em construção.",
  bio: "Sou engenheiro civil, técnico em Mecatrônica, estudante de Análise e Desenvolvimento de Sistemas e empreendedor. Desenvolvo aplicações com apoio de IA e aprofundo os fundamentos para entender, testar e melhorar o que construo.",
  location: "Jesuânia, Minas Gerais",
  story: [
    "Minha trajetória passa pela Mecatrônica, pela Engenharia Civil e pela gestão de um negócio de alimentação. São experiências diferentes que me aproximaram de uma mesma pergunta: como organizar processos e resolver problemas de quem está na operação?",
    "No TáVindo Delivery, conecto essa vivência à construção de software. Uso ChatGPT e Lovable como ferramentas de apoio para transformar necessidades em funcionalidades, revisar alternativas e avançar no desenvolvimento.",
    "Hoje curso Análise e Desenvolvimento de Sistemas. Quero crescer profissionalmente em tecnologia, consolidar minha base e acompanhar novas ferramentas sem perder o cuidado com o problema, o usuário e a qualidade da solução.",
  ],
  aiApproach:
    "A IA faz parte do meu processo de desenvolvimento. Meu compromisso é compreender as sugestões, verificar resultados e reconhecer o que ainda preciso aprender. Integrações com modelos, agentes e RAG são próximos passos desta jornada.",
  genAiMotivation:
    "O programa GenAI do iFood me interessa pela conexão entre tecnologia, aprendizado e problemas de negócio. Quero desenvolver minha capacidade de construir soluções com IA, aprender com outras pessoas e apresentar evidências do meu progresso.",
  skills: [
    {
      title: "Produtos e processos",
      context:
        "Vivência em empreendedorismo, operação de delivery e definição de funcionalidades para necessidades de negócio.",
    },
    {
      title: "Desenvolvimento com IA",
      context:
        "ChatGPT e Lovable como apoio na construção de aplicações com React, TypeScript e Supabase.",
    },
    {
      title: "Integrações",
      context:
        "Experiência no ecossistema TáVindo com APIs e automação operacional de impressão.",
    },
    {
      title: "Qualidade de software",
      context:
        "Formação em testes manuais, APIs e SQL; prática educacional com Python, Pytest e Selenium.",
    },
    {
      title: "Engenharia e planejamento",
      context:
        "Projetos de Engenharia Civil, organização de requisitos e atenção às hipóteses e aos limites de uma solução.",
    },
    {
      title: "Aprendizado e adaptação",
      context:
        "Formação em ADS em andamento, inglês intermediário e experiência de estudo e trabalho na Austrália.",
    },
  ],
  education: [
    {
      title: "Análise e Desenvolvimento de Sistemas",
      institution: "Gran Faculdade",
      period: "Conclusão prevista: dezembro de 2027",
      status: "Em andamento",
    },
    {
      title: "Engenharia Civil",
      institution: "UFLA",
      period: "Concluída em 2024",
      status: "Graduação",
    },
    {
      title: "Ensino médio e técnico em Mecatrônica",
      institution: "ETEP",
      period: "2010–2013",
      status: "Formação técnica",
    },
    {
      title: "Formação em QA",
      institution: "TripleTen",
      period: "Concluída em junho de 2025",
      status: "Formação complementar",
    },
  ],
  timeline: [
    {
      period: "2010–2013",
      title: "Base técnica",
      description:
        "Formação em Mecatrônica na ETEP e contato com a relação entre sistemas, processos e operação.",
    },
    {
      period: "Set. 2022–mar. 2023",
      title: "Estudo e trabalho na Austrália",
      description:
        "Seis meses dedicados ao inglês, com trabalhos em delivery, atendimento, eventos e obras para me manter.",
    },
    {
      period: "2024",
      title: "Engenharia e empreendedorismo",
      description:
        "Conclusão de Engenharia Civil na UFLA, atuação com projetos e início da Dom Burguer.",
    },
    {
      period: "Hoje",
      title: "Construção de produtos digitais",
      description:
        "ADS em andamento, evolução de projetos com assistência de IA e aprofundamento em desenvolvimento e testes.",
    },
  ],
  links: [
    { label: "GitHub", url: "https://github.com/arthurarga-tech" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/arthur-guedes96/" },
  ] satisfies ProfileLink[],
  disclaimer:
    "Projeto pessoal de Arthur. Independente, sem vínculo oficial com o iFood.",
};
