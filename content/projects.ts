export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  problem: string;
  solution: string;
  contribution: string;
  decisions: string[];
  evidence: string[];
  learnings: string[];
  limits: string;
  links: { label: string; url: string }[];
};

export const projects: Project[] = [
  {
    slug: "tavindo",
    title: "TáVindo Delivery + Printer",
    subtitle: "Do marketplace à impressão do pedido no estabelecimento.",
    category: "Delivery e integração",
    tags: ["React", "TypeScript", "Supabase", "APIs"],
    problem: "Conectar a compra no delivery à rotina de quem recebe, prepara e entrega os pedidos. Minha experiência à frente de uma hamburgueria ajudou a identificar essas necessidades.",
    solution: "Plataforma de delivery com marketplace e painel para gestão de pedidos, produtos, clientes e assinaturas. O TáVindoPrinter integra a aplicação e o backend à impressão térmica no Windows.",
    contribution: "Desenvolvo e evoluo o produto, da definição das funcionalidades à integração dos fluxos, com apoio de ChatGPT e Lovable.",
    decisions: [
      "Áreas distintas para marketplace, estabelecimento e administração.",
      "Fila de impressão com controle de duplicidade e confirmação de tarefas por API.",
      "Integração de impressão separada da interface web para atender ao ambiente Windows.",
    ],
    evidence: [
      "Marketplace e gestão de pedidos, produtos, clientes e assinaturas.",
      "Integração entre pedido digital e impressão térmica.",
      "Website de apresentação disponível para consulta.",
    ],
    learnings: [
      "Traduzir a operação de um negócio em funcionalidades.",
      "Relacionar o estado do pedido à confirmação de tarefas no backend.",
    ],
    limits: "Repositório privado. O link abaixo apresenta o produto; dados de estabelecimentos e clientes não são publicados neste portfólio.",
    links: [{ label: "Conhecer o TáVindo", url: "https://tavindodelivery.com.br" }],
  },
  {
    slug: "gos-lr-automacao",
    title: "GOS — LR Automação",
    subtitle: "Ordens de serviço, horas e fechamento operacional e financeiro.",
    category: "Gestão de serviços",
    tags: ["React", "TypeScript", "Supabase", "Regras de negócio"],
    problem: "Reunir as informações do trabalho executado para acompanhar serviços e realizar o fechamento da operação.",
    solution: "Sistema de ordens de serviço, apontamento de horas e fechamento operacional e financeiro, desenvolvido para colaboradores, encarregados e administradores da LR Automação.",
    contribution: "Implementei a solução com assistência de IA, traduzindo as necessidades da empresa em telas e fluxos de gestão.",
    decisions: [
      "Relacionar ordens de serviço aos registros de horas e ao fechamento.",
      "Organizar os módulos em torno das etapas do trabalho e dos diferentes participantes da operação.",
    ],
    evidence: [
      "Gestão de ordens de serviço e apontamento de horas.",
      "Fechamento operacional e financeiro em um mesmo sistema.",
    ],
    learnings: ["Transformar processos administrativos em fluxos de software com registros relacionados."],
    limits: "Repositório privado. Informações da empresa e de seus colaboradores são preservadas.",
    links: [],
  },
  {
    slug: "nutrios",
    title: "NutriOS",
    subtitle: "Gestão nutricional e acompanhamento dedicado ao paciente.",
    category: "Aplicação web para nutrição",
    tags: ["PWA", "Gestão de pacientes", "Acompanhamento"],
    problem: "Organizar o atendimento nutricional e conectar as informações do profissional ao acompanhamento dos resultados pelo paciente.",
    solution: "Plataforma web PWA para nutricionistas gerenciarem pacientes, avaliações antropométricas e planos alimentares, com uma área de acompanhamento dedicada ao paciente.",
    contribution: "Desenvolvi a plataforma como projeto autônomo, estruturando os fluxos de gestão nutricional e de acompanhamento do paciente.",
    decisions: ["Reunir a gestão do atendimento e a área do paciente em uma plataforma web PWA."],
    evidence: [
      "Gestão de pacientes, avaliações antropométricas e planos alimentares.",
      "Área do paciente para acompanhar resultados.",
    ],
    learnings: [],
    limits: "Repositório privado. O portfólio apresenta o escopo do sistema, sem dados de pacientes.",
    links: [],
  },
  {
    slug: "gestao-odontologica",
    title: "Gestão de Clínicas Odontológicas",
    subtitle: "Atendimento, agenda, odontograma e gestão financeira.",
    category: "Sistema SaaS",
    tags: ["SaaS", "Gestão de consultórios", "Odontograma"],
    problem: "Concentrar as informações necessárias para organizar a rotina de um consultório odontológico, do agendamento ao histórico de atendimento.",
    solution: "Sistema com arquitetura SaaS para cadastro de pacientes, consultas, agendamentos, histórico de atendimento com odontograma e gestão financeira.",
    contribution: "Desenvolvi o sistema como projeto autônomo, organizando as operações do consultório em uma aplicação.",
    decisions: ["Reunir agenda, histórico clínico e financeiro no escopo de uma solução SaaS."],
    evidence: [
      "Cadastro de pacientes, consultas e agendamentos.",
      "Histórico de atendimento com odontograma e módulo financeiro.",
    ],
    learnings: [],
    limits: "Repositório privado. Prontuários e dados de pacientes não fazem parte desta apresentação.",
    links: [],
  },
  {
    slug: "financas-para-casais",
    title: "Gestão Financeira para Casais",
    subtitle: "Uma plataforma para organizar finanças compartilhadas.",
    category: "Finanças pessoais",
    tags: ["Finanças compartilhadas", "Gestão"],
    problem: "Dar organização às finanças que fazem parte da vida a dois.",
    solution: "Plataforma estruturada de gestão financeira compartilhada para casais.",
    contribution: "Desenvolvi a plataforma como projeto autônomo voltado à organização financeira em casal.",
    decisions: [],
    evidence: ["Plataforma de finanças compartilhadas."],
    learnings: [],
    limits: "Repositório privado. Esta apresentação resume o escopo do projeto, sem dados financeiros pessoais.",
    links: [],
  },
  {
    slug: "radier-builder",
    title: "Radier Builder",
    subtitle: "Engenharia Civil aplicada à modelagem de uma ferramenta de cálculo.",
    category: "Protótipo experimental",
    tags: ["React", "TypeScript", "Modelagem", "Testes"],
    problem: "Representar em software as entradas e hipóteses de um pré-dimensionamento simplificado de fundação.",
    solution: "Ferramenta experimental de pré-dimensionamento de radier retangular para casas térreas com estrutura monolítica de EPS, com verificação de pressão no solo e limites de aplicação.",
    contribution: "Desenvolvi o protótipo com assistência de IA, aplicando minha formação em Engenharia Civil à definição de entradas, regras e resultados.",
    decisions: [
      "Modelo restrito a radier retangular e hipóteses simplificadas.",
      "Lógica de cálculo com arquivos de teste e apresentação explícita dos limites do modelo.",
    ],
    evidence: ["Interface de entradas e resultados, lógica de cálculo e testes no repositório."],
    learnings: ["Converter hipóteses de engenharia em regras de software com escopo delimitado."],
    limits: "Protótipo experimental, com código privado. Não constitui projeto estrutural nem substitui a análise de um profissional habilitado.",
    links: [],
  },
  {
    slug: "urban-routes",
    title: "Urban Routes — QA",
    subtitle: "Automação de testes para o fluxo de solicitação de uma corrida.",
    category: "Projeto educacional de QA",
    tags: ["Python", "Selenium", "Pytest", "Page Object"],
    problem: "Verificar se as etapas de solicitação de uma corrida apresentam o comportamento esperado ao longo da jornada do usuário.",
    solution: "Projeto da formação de QA da TripleTen com oito testes de fluxo, implementados em Python com Selenium, Pytest e Page Object.",
    contribution: "Implementei os cenários e a estrutura de testes durante minha formação em QA. O código está disponível no GitHub.",
    decisions: [
      "Page Object para organizar elementos e ações da interface.",
      "Selenium para interação com o navegador e Pytest para cenários e verificações.",
    ],
    evidence: ["Repositório público com os oito testes, estrutura e documentação."],
    learnings: ["Definir resultados esperados e organizar testes de interface para facilitar sua compreensão e manutenção."],
    limits: "Projeto educacional. O repositório apresenta a implementação; a execução depende do ambiente de treinamento.",
    links: [{ label: "Ver código no GitHub", url: "https://github.com/arthurarga-tech/urban-routes-automation-test-sprint8" }],
  },
  {
    slug: "assistente-reembolsos",
    title: "Assistente de apoio a reembolsos",
    subtitle: "Estudo independente inspirado no Desafio de GenAI do iFood.",
    category: "Protótipo educacional",
    tags: ["JavaScript", "HTML", "Busca textual", "Regras de decisão"],
    problem: "Orientar cenários de reembolso e cancelamento sem inventar políticas ou concluir decisões com informações incompletas.",
    solution: "Protótipo local que consulta uma base simulada de 20 registros, aplica regras explícitas e apresenta fontes e orientações de revisão humana. Não executa operações financeiras.",
    contribution: "Realizei a atividade em 14/11/2026, por iniciativa própria, após conhecer o desafio em um vídeo da Networkme. Preparei um protótipo demonstrável e um mini-case com arquitetura proposta, critérios de decisão e cenários de validação para aprofundar minha preparação.",
    decisions: ["Separar busca textual de aplicação de regras: os campos de status, motivo e confirmação determinam a orientação.", "Exigir confirmação simulada dos dados e encaminhar situações incertas ou suspeitas de fraude.", "Distinguir a implementação local da evolução proposta com RAG e APIs autorizadas."],
    evidence: ["Demonstração em HTML e JavaScript com base simulada.", "Mini-case técnico e certificado de conclusão da atividade em 14/11/2026."],
    learnings: ["Explicar a origem de uma orientação e reconhecer quando faltam informações.", "Distinguir busca lexical, regras determinísticas e geração por modelos de IA."],
    limits: "Estudo educacional independente; não é etapa confirmada da candidatura atual nem produto oficial do iFood. A base não representa políticas oficiais. Não implementa LLM, embeddings, RAG semântico, n8n ou APIs reais. O texto da pergunta recupera trechos, mas não determina a regra aplicada.",
    links: [
      { label: "Abrir demonstração educacional", url: "/estudos/reembolsos/index.html" },
      { label: "Ler mini-case técnico", url: "/estudos/reembolsos/mini-case.pdf" },
      { label: "Ver certificado de participação", url: "/estudos/reembolsos/certificado.pdf" },
      { label: "Vídeo de origem — Networkme", url: "https://www.youtube.com/watch?v=e8W6osZ8vTc" }
    ]
  },
];
