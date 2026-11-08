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
    subtitle: "Da operação de delivery ao produto digital.",
    category: "Produto para negócios",
    tags: ["React", "TypeScript", "Supabase", "APIs", "Desenvolvimento com IA"],
    problem:
      "Estabelecimentos precisam organizar catálogo, pedidos e atendimento, conectando o que acontece na tela à rotina de quem prepara e entrega. Minha experiência no setor de alimentação é uma referência para entender essas necessidades.",
    solution:
      "Uma plataforma de delivery com marketplace, área do estabelecimento, pedidos e painel administrativo. O TáVindoPrinter conecta a aplicação e o backend à impressão térmica no Windows por meio de fila e confirmação de tarefas.",
    contribution:
      "Sou responsável pelo desenvolvimento e pela evolução do produto, com apoio de ChatGPT e Lovable. Trabalho na definição de funcionalidades e na conexão entre as necessidades da operação e os fluxos do sistema.",
    decisions: [
      "O produto organiza fluxos de catálogo, pedidos, clientes e assinaturas em áreas da aplicação.",
      "O Printer consulta tarefas, controla duplicidade e confirma o processamento por API/RPC. Esse mecanismo é uma automação operacional.",
      "A impressão funciona como uma integração com o ambiente Windows, separada da interface web.",
    ],
    evidence: [
      "O website apresenta o produto. O código permanece privado.",
      "A implementação examinada contém fluxos de marketplace e gestão; o Printer possui fila, controle de duplicidade e confirmação de tarefas.",
      "O projeto foi desenvolvido para a rotina de negócios reais. Resultados comerciais quantitativos não são apresentados neste estudo de caso.",
    ],
    learnings: [
      "Relacionar uma funcionalidade à rotina de quem recebe e prepara o pedido.",
      "Distinguir o estado exibido na interface da confirmação de uma tarefa no backend.",
      "Usar assistência de IA sem deixar de revisar o comportamento da solução.",
    ],
    limits:
      "Este estudo de caso preserva código e dados privados. O link é o website de apresentação, sem promessa de uma demonstração interativa. O Printer não é apresentado como agente de IA. Uma demonstração de impressão com dados fictícios será uma próxima evidência.",
    links: [
      { label: "Website do TáVindo", url: "https://tavindodelivery.com.br" },
    ],
  },
  {
    slug: "gos-lr-automacao",
    title: "GOS — LR Automação",
    subtitle: "Ordens de serviço, horas e fechamento em um mesmo fluxo.",
    category: "Sistema de gestão",
    tags: ["React", "TypeScript", "Supabase", "Regras de negócio"],
    problem:
      "A gestão de serviços exige relacionar cada ordem ao trabalho realizado e às informações necessárias para o fechamento operacional.",
    solution:
      "Sistema de gestão de ordens de serviço, apontamento de horas e fechamento operacional, desenvolvido para a LR Automação.",
    contribution:
      "Desenvolvi a solução com assistência de IA, traduzindo necessidades de um negócio em telas e fluxos de gestão. GOS e LR Automação representam o mesmo projeto neste portfólio.",
    decisions: [
      "A organização do sistema conecta ordens de serviço, registros de horas e fechamento operacional.",
      "Os módulos permitem acompanhar o trabalho em etapas, mantendo a relação entre os registros do processo.",
    ],
    evidence: [
      "A estrutura de módulos, o código e a documentação foram examinados no repositório privado.",
      "O caso apresenta o escopo implementado sem divulgar registros do negócio ou dados de colaboradores.",
    ],
    learnings: [
      "Transformar uma necessidade administrativa em etapas de uma aplicação.",
      "Explicar a relação entre regras de negócio, registros e resultado esperado.",
      "Documentar o funcionamento sem expor informações da operação.",
    ],
    limits:
      "Código privado. Uso atual, quantidade de usuários e ganhos de eficiência não foram verificados para publicação. O caso não representa vínculo empregatício nem uma certificação de segurança do sistema.",
    links: [],
  },
  {
    slug: "radier-builder",
    title: "Radier Builder",
    subtitle: "Engenharia e software com hipóteses explícitas.",
    category: "Protótipo experimental",
    tags: ["React", "TypeScript", "Modelagem", "Testes"],
    problem:
      "Um cálculo só faz sentido quando suas entradas, hipóteses e limites estão claros. Representar essas condições em software é um desafio que conecta minha formação em engenharia ao desenvolvimento.",
    solution:
      "Ferramenta experimental de pré-dimensionamento simplificado de radier retangular e verificação de pressão no solo, com uma lógica de cálculo delimitada.",
    contribution:
      "Desenvolvi o protótipo com assistência de IA, aproximando conhecimentos de Engenharia Civil da modelagem de entradas, regras e saídas em uma aplicação.",
    decisions: [
      "O modelo se restringe a um radier retangular e a hipóteses simplificadas.",
      "A lógica de cálculo possui testes no repositório; a interface apresenta as entradas e os resultados do modelo.",
      "O escopo precisa acompanhar qualquer apresentação do resultado para evitar interpretações além do que o protótipo calcula.",
    ],
    evidence: [
      "Interface, lógica de cálculo e arquivos de teste examinados no repositório privado.",
      "O estudo de caso descreve o protótipo; não publica dados de projetos de clientes.",
    ],
    learnings: [
      "Converter uma hipótese de cálculo em uma regra explícita de software.",
      "Separar um experimento de programação de uma solução validada para uso profissional.",
      "Tratar limites e casos inválidos como parte da experiência de uso.",
    ],
    limits:
      "Protótipo experimental. Não constitui projeto estrutural completo, validação normativa ou recomendação de dimensionamento para uma construção. Não substitui a análise e a responsabilidade de um profissional habilitado.",
    links: [],
  },
  {
    slug: "urban-routes",
    title: "Urban Routes — QA",
    subtitle: "Prática de automação para verificar um fluxo de ponta a ponta.",
    category: "Projeto educacional",
    tags: ["Python", "Selenium", "Pytest", "Page Object"],
    problem:
      "Uma aplicação pode parecer correta em uma tela e falhar ao longo de uma jornada. Testes de interface ajudam a verificar se os passos de uma solicitação produzem os resultados esperados.",
    solution:
      "Projeto educacional da formação de QA com oito testes de cenários de solicitação de corrida, usando Python, Selenium, Pytest e organização em Page Object.",
    contribution:
      "Implementei o projeto de testes durante minha formação em QA. O código e a documentação estão disponíveis no GitHub como evidência dessa prática educacional.",
    decisions: [
      "Page Object organiza as ações e os elementos da interface usados pelos testes.",
      "Pytest estrutura os cenários e as verificações; Selenium realiza a interação com o navegador.",
    ],
    evidence: [
      "Repositório público com código e documentação.",
      "Oito testes identificados no código. Uma execução atual da suíte ainda não foi registrada neste portfólio.",
    ],
    learnings: [
      "Definir o resultado esperado antes de avaliar uma interação.",
      "Organizar testes para tornar cenários e ações compreensíveis.",
      "Distinguir a existência de um teste da evidência de sua execução em um ambiente específico.",
    ],
    limits:
      "Projeto de formação, sem vínculo profissional com o produto de treinamento. O repositório permite examinar os testes; sua presença não comprova aprovação atual da suíte.",
    links: [
      {
        label: "Ver código no GitHub",
        url: "https://github.com/arthurarga-tech/urban-routes-automation-test-sprint8",
      },
    ],
  },
];
