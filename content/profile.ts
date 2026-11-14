export type ProfileLink = { label: string; url: string };

export const profile = {
  name: "Arthur Augusto Reis Guedes Alves",
  displayName: "Arthur Alves",
  headline: "Desenvolvimento de sistemas com visão de negócio.",
  intro: "Engenharia, empreendedorismo e qualidade de software aplicados à construção de soluções digitais.",
  bio: "Sou estudante de Análise e Desenvolvimento de Sistemas, engenheiro civil e técnico em Mecatrônica. Desenvolvo aplicações e integrações com apoio de IA, combinando experiência na operação de negócios com formação prática em qualidade de software.",
  objective: "Busco oportunidades em tecnologia e desenvolvimento de sistemas para contribuir com soluções para necessidades de negócio, crescer profissionalmente e continuar aprendendo novas tecnologias.",
  location: "Jesuânia, Minas Gerais",
  email: "arthur.aarga@gmail.com",
  story: [
    "Minha transição para tecnologia parte da prática: elaborar projetos de engenharia, administrar uma hamburgueria e entender o que uma operação precisa para funcionar.",
    "No TáVindo, essa experiência se transformou em uma plataforma de delivery e em uma integração de impressão de pedidos. Também desenvolvi sistemas para gestão de serviços, nutrição, finanças e consultórios.",
    "A formação em QA acrescentou uma visão de qualidade ao desenvolvimento. Hoje curso ADS e busco ampliar minha atuação em software, reunindo entendimento do negócio, construção e validação.",
  ],
  aiApproach: "Utilizo ChatGPT e Lovable como ferramentas de apoio no desenvolvimento. Meu papel envolve entender a necessidade, definir os fluxos, revisar as soluções e verificar seu comportamento.",
  skills: [
    {
      title: "Desenvolvimento web",
      context: "Aplicações com React, TypeScript e Supabase, com assistência de IA no processo de desenvolvimento.",
    },
    {
      title: "APIs e integrações",
      context: "Integração entre aplicação web, backend e impressão térmica no TáVindoPrinter.",
    },
    {
      title: "Testes de software",
      context: "Formação em testes manuais, APIs e SQL; projeto educacional de automação com Python, Selenium, Pytest e Page Object.",
    },
    {
      title: "Negócios e processos",
      context: "Vivência com atendimento, precificação, estoque, finanças e operação de delivery na gestão da Dom Burguer.",
    },
    {
      title: "Engenharia e planejamento",
      context: "Projetos arquitetônicos e complementares, levantamento de necessidades e acompanhamento de obra.",
    },
    {
      title: "Inglês intermediário",
      context: "Estudo na Greenwich, em Sydney, e seis meses de experiência de estudo e trabalho na Austrália.",
    },
  ],
  experience: [
    {
      period: "Abr. 2025 — atual",
      title: "Desenvolvimento de aplicações e integrações",
      organization: "Projetos autônomos",
      description: "Construção e evolução de sistemas para delivery, serviços, nutrição, finanças e clínicas, além de uma ferramenta experimental para engenharia.",
    },
    {
      period: "Fev. 2024 — atual",
      title: "Projetos de Engenharia Civil",
      organization: "Atuação autônoma",
      description: "Projetos arquitetônicos para aprovação municipal e orçamento de construções em EPS em parceria com a BHU Construtora; projetos elétricos, hidrossanitários e de adequação.",
    },
    {
      period: "Mai. 2024 — mai. 2026",
      title: "Fundador e gestor",
      organization: "Dom Burguer",
      description: "Gestão de cardápio, precificação, atendimento e delivery, com acompanhamento de estoque, finanças e logística.",
    },
    {
      period: "Set. — dez. 2023",
      title: "Estagiário de Engenharia Civil",
      organization: "MRV&CO",
      description: "Leitura de projetos, acompanhamento de cronograma e materiais e registro de não conformidades em obra.",
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
      title: "Bootcamp de Analista de QA",
      institution: "TripleTen",
      period: "Concluído em junho de 2025",
      status: "Formação complementar",
    },
    {
      title: "Engenharia Civil",
      institution: "Universidade Federal de Lavras — UFLA",
      period: "Concluída em 2024",
      status: "Graduação",
    },
    {
      title: "Ensino médio e técnico em Mecatrônica",
      institution: "ETEP",
      period: "2010–2013",
      status: "Formação técnica",
    },
  ],
  internationalExperience: {
    title: "Estudo e trabalho na Austrália",
    period: "Set. 2022 — mar. 2023",
    description: "Seis meses em Sydney, com estudo de inglês na Greenwich e trabalhos em delivery, atendimento, eventos e obras. Inglês intermediário.",
  },
  links: [
    { label: "GitHub", url: "https://github.com/arthurarga-tech" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/arthur-guedes96/" },
  ] satisfies ProfileLink[],
  disclaimer: "Portfólio pessoal de Arthur Alves.",
};
