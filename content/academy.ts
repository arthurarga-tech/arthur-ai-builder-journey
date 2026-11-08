export type Lesson = {
  id: string;
  title: string;
  objective: string;
  theory: string[];
  example: string;
  takeaway: string;
  practice: string;
};

export const logicTrack = {
  id: "logica-pedidos-v1",
  title: "Lógica aplicada",
  subtitle: "Do pedido à decisão",
  level: "Fundamentos",
  description:
    "Aprenda a representar informações, validar entradas e organizar regras usando um pedido de uma loja fictícia. A prática é isolada: nenhum pedido real será criado.",
  objectives: [
    "Representar preços e quantidades sem confundir seus significados.",
    "Definir condições para aceitar ou rejeitar uma entrada.",
    "Usar repetição e funções para organizar um cálculo.",
    "Conferir o comportamento com casos válidos e inválidos.",
  ],
  lessons: [
    {
      id: "entradas-e-valores",
      title: "1. Comece pelas entradas",
      objective: "Identificar os dados necessários para calcular um pedido.",
      theory: [
        "Um algoritmo transforma entradas em uma saída seguindo regras. Para calcular um pedido, precisamos identificar cada produto, sua quantidade e o preço do catálogo. A taxa de entrega entra uma única vez no total.",
        "Uma variável dá nome a um valor. Use nomes que expliquem o conteúdo, como quantidade e precoEmCentavos. Para este exercício, R$ 18,90 é representado pelo inteiro 1890; assim, os cálculos usam centavos.",
        "O catálogo do exercício contém hambúrguer a 1890 centavos e batata a 790 centavos. A taxa é de 500 centavos na entrega e zero na retirada. Esses dados são fictícios e fixos nesta versão.",
      ],
      example:
        "precoHamburguer = 1890\nquantidadeHamburguer = 2\nsubtotalHamburguer = precoHamburguer × quantidadeHamburguer\n// Resultado: 3780 centavos = R$ 37,80",
      takeaway: "Nomeie os dados e defina sua unidade antes de calcular.",
      practice:
        "Qual é a diferença entre o preço de um hambúrguer e o subtotal de dois? Explique antes de avançar.",
    },
    {
      id: "condicoes-e-validacao",
      title: "2. Decida o que é válido",
      objective:
        "Criar uma condição que rejeite entradas sem sentido para a regra.",
      theory: [
        "Uma condição escolhe um caminho. Nesta loja fictícia, o produto precisa existir no catálogo e sua quantidade deve ser um número inteiro entre 1 e 20, incluindo os dois limites.",
        "Quantidades menores que 1, maiores que 20 ou fracionárias são inválidas. Um produto desconhecido também deve gerar uma mensagem clara antes do cálculo.",
        "Validar significa conferir a entrada recebida. Não troque silenciosamente um valor inválido por outro: isso esconderia o erro de quem está usando o sistema.",
      ],
      example:
        "se produto não existe no catálogo:\n    retornar erro: produto desconhecido\n\nse quantidade não é inteira ou quantidade < 1 ou quantidade > 20:\n    retornar erro: quantidade inválida\n\nsubtotal = preço do catálogo × quantidade",
      takeaway: "Uma entrada inválida precisa de um caminho de erro explícito.",
      practice:
        "Compare as quantidades 0, 1, 1,5, 20 e 21. Quais podem seguir para o cálculo?",
    },
    {
      id: "repeticao-e-funcoes",
      title: "3. Organize as etapas",
      objective: "Somar uma lista de itens sem duplicar a taxa de entrega.",
      theory: [
        "A repetição permite aplicar a mesma regra a cada item da lista. Comece o acumulador em zero e acrescente preço vezes quantidade para cada item válido.",
        "Uma função reúne uma responsabilidade com entradas e saída claras. Uma função calcularPedido pode validar os itens, somar os subtotais e retornar o total. A taxa de entrega é somada depois da repetição.",
        "No exemplo, dois hambúrgueres e uma batata somam 4570 centavos. Com a taxa de 500 centavos, o total é 5070 centavos, ou R$ 50,70.",
      ],
      example:
        "função calcularPedido(itens, modalidade):\n    validar todos os itens\n    subtotal = 0\n\n    para cada item em itens:\n        subtotal = subtotal + preço do catálogo × quantidade\n\n    taxa = 500 se modalidade é entrega, senão 0 na retirada\n    retornar subtotal + taxa\n\n// Com entrega: 2 × 1890 + 1 × 790 + 500 = 5070",
      takeaway:
        "Separe a regra de cada item da regra aplicada ao pedido inteiro.",
      practice:
        "O que aconteceria se a taxa de entrega fosse somada dentro da repetição? Compare com a regra de cobrá-la uma única vez.",
    },
    {
      id: "casos-de-teste",
      title: "4. Teste sua decisão",
      objective:
        "Comparar o resultado observado com um resultado esperado definido antes da execução.",
      theory: [
        "Um caso de teste combina entrada, ação e resultado esperado. O resultado esperado vem da regra do exercício, não da saída produzida pelo programa.",
        "Confira um caminho válido e caminhos de erro. Dois hambúrgueres e uma batata devem totalizar R$ 50,70 com entrega. Teste também os limites de quantidade: 1 e 20 são válidos, enquanto 0 e 21 recebem erro. Um produto desconhecido também recebe erro.",
        "Passar em um caso não prova que todos os pedidos funcionam. Depois de corrigir um erro, execute novamente os casos relacionados e registre o que foi verificado.",
      ],
      example:
        "caso válido:\n    entrada: 2 hambúrgueres + 1 batata\n    esperado: 5070 centavos com entrega\n\ncaso inválido:\n    entrada: hambúrguer, quantidade 0\n    esperado: erro de quantidade; sem total válido\n\ncaso inválido:\n    entrada: produto ausente do catálogo\n    esperado: erro de produto desconhecido",
      takeaway: "Teste também as entradas que a sua solução deve recusar.",
      practice:
        "Monte suas respostas no exercício. Use o feedback para localizar qual regra precisa ser revista e faça uma nova tentativa.",
    },
  ] satisfies Lesson[],
  exercise: {
    title: "Valide e calcule um pedido",
    description:
      "Aplique as regras a uma loja fictícia: dois hambúrgueres de R$ 18,90, uma batata de R$ 7,90 e entrega de R$ 5,00. Preveja o total e reconheça entradas inválidas.",
  },
  nextTracks: [
    "Python e JavaScript/TypeScript",
    "APIs, HTTP, JSON e integrações",
    "Git, GitHub e fundamentos de engenharia de software",
    "Fundamentos de inteligência artificial e LLMs",
    "Engenharia de prompts",
    "Agentes de IA, ferramentas e automações",
    "RAG, embeddings e busca semântica",
    "Desenvolvimento de aplicações com IA",
    "Segurança, avaliação e boas práticas de IA",
    "Resolução de problemas e desafios práticos",
    "Preparação para testes técnicos e entrevistas",
  ],
};
