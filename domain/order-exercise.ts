/**
 * Regras do simulador de pedidos e da avaliação da primeira trilha.
 * Dados fictícios; nenhuma operação de marketplace ou chamada de IA.
 * Valores monetários são inteiros em centavos.
 */
export type ValidationIssue = {
  path: string;
  code:
    | "invalid_type"
    | "required"
    | "unknown_field"
    | "invalid_value"
    | "out_of_range";
  message: string;
};

export type Result<T> =
  | { success: true; data: T }
  | { success: false; errors: ValidationIssue[] };

export const CATALOG = [
  { id: "burger", name: "Hambúrguer", priceInCents: 1890 },
  { id: "batata", name: "Batata", priceInCents: 790 },
] as const;

export type ProductId = (typeof CATALOG)[number]["id"];
export type Fulfillment = "delivery" | "pickup";
export type OrderLine = {
  productId: ProductId;
  name: string;
  quantity: number;
  unitPriceInCents: number;
  lineTotalInCents: number;
};
export type OrderCalculation = {
  fulfillment: Fulfillment;
  lines: OrderLine[];
  subtotalInCents: number;
  deliveryFeeInCents: number;
  totalInCents: number;
};

const DELIVERY_FEE_IN_CENTS = 500;
const MAX_ORDER_LINES = 10;
const MAX_QUANTITY_PER_LINE = 20;

function isRecord(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value))
    return false;
  const prototype: unknown = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function validateKeys(
  input: Record<string, unknown>,
  allowed: readonly string[],
  path: string,
): ValidationIssue[] {
  return Object.keys(input)
    .filter((key) => !allowed.includes(key))
    .map((key) => ({
      path: path ? `${path}.${key}` : key,
      code: "unknown_field" as const,
      message: "Este campo não faz parte da atividade.",
    }));
}

export function calculateOrder(input: unknown): Result<OrderCalculation> {
  if (!isRecord(input)) {
    return {
      success: false,
      errors: [
        {
          path: "",
          code: "invalid_type",
          message: "Informe um pedido com itens e forma de recebimento.",
        },
      ],
    };
  }

  const errors = validateKeys(input, ["fulfillment", "items"], "");
  const fulfillment = input.fulfillment;
  if (fulfillment !== "delivery" && fulfillment !== "pickup") {
    errors.push({
      path: "fulfillment",
      code: "invalid_value",
      message: "Escolha entrega ou retirada.",
    });
  }
  if (!Array.isArray(input.items)) {
    errors.push({
      path: "items",
      code: "invalid_type",
      message: "Informe os itens do pedido em uma lista.",
    });
    return { success: false, errors };
  }
  if (input.items.length < 1 || input.items.length > MAX_ORDER_LINES) {
    errors.push({
      path: "items",
      code: "out_of_range",
      message: "O pedido deve ter de 1 a 10 linhas de itens.",
    });
    return { success: false, errors };
  }

  const lines: OrderLine[] = [];
  for (let index = 0; index < input.items.length; index += 1) {
    const item: unknown = input.items[index];
    const itemPath = `items.${index}`;
    if (!isRecord(item)) {
      errors.push({
        path: itemPath,
        code: "invalid_type",
        message: "Cada item deve informar produto e quantidade.",
      });
      continue;
    }
    errors.push(...validateKeys(item, ["productId", "quantity"], itemPath));
    const product = CATALOG.find(
      (candidate) => candidate.id === item.productId,
    );
    if (!product) {
      errors.push({
        path: `${itemPath}.productId`,
        code: "invalid_value",
        message: "Escolha um produto do catálogo fictício.",
      });
    }
    const quantity = item.quantity;
    if (typeof quantity !== "number" || !Number.isSafeInteger(quantity)) {
      errors.push({
        path: `${itemPath}.quantity`,
        code: "invalid_type",
        message: "A quantidade deve ser um número inteiro.",
      });
      continue;
    }
    if (quantity < 1 || quantity > MAX_QUANTITY_PER_LINE) {
      errors.push({
        path: `${itemPath}.quantity`,
        code: "out_of_range",
        message: "Use uma quantidade de 1 a 20 por linha.",
      });
      continue;
    }
    if (product) {
      lines.push({
        productId: product.id,
        name: product.name,
        quantity,
        unitPriceInCents: product.priceInCents,
        lineTotalInCents: product.priceInCents * quantity,
      });
    }
  }

  if (
    errors.length > 0 ||
    (fulfillment !== "delivery" && fulfillment !== "pickup")
  )
    return { success: false, errors };

  const subtotalInCents = lines.reduce(
    (sum, line) => sum + line.lineTotalInCents,
    0,
  );
  const deliveryFeeInCents =
    fulfillment === "delivery" ? DELIVERY_FEE_IN_CENTS : 0;
  return {
    success: true,
    data: {
      fulfillment,
      lines,
      subtotalInCents,
      deliveryFeeInCents,
      totalInCents: subtotalInCents + deliveryFeeInCents,
    },
  };
}

export const EXERCISE_SPEC = {
  id: "pedido-logica",
  version: "1.0.0",
  title: "Do pedido à decisão",
  description:
    "Preveja o total e escolha as regras para validar e calcular um pedido fictício.",
  scenario: {
    fulfillment: "delivery",
    items: [
      { productId: "burger", quantity: 2 },
      { productId: "batata", quantity: 1 },
    ],
    deliveryFeeInCents: DELIVERY_FEE_IN_CENTS,
  },
  validationOptions: [
    {
      value: "positive-integer",
      label: "Quantidade inteira de 1 a 20 e produto do catálogo",
    },
    { value: "non-negative", label: "Quantidade maior ou igual a zero" },
    { value: "number-only", label: "Qualquer quantidade que seja um número" },
  ],
  sumOptions: [
    {
      value: "price-times-quantity",
      label: "Somar preço × quantidade de cada item e adicionar a taxa uma vez",
    },
    {
      value: "prices-only",
      label: "Somar o preço de cada produto e adicionar a taxa",
    },
    {
      value: "quantities-only",
      label: "Somar as quantidades e adicionar a taxa",
    },
  ],
  rejectedOrderOptions: [
    { value: "zero-quantity", label: "Um hambúrguer com quantidade zero" },
    { value: "two-burgers", label: "Dois hambúrgueres para entrega" },
    { value: "pickup", label: "Uma batata para retirada" },
  ],
  pointsPerCriterion: 25,
  maxScore: 100,
  completionScore: 100,
  completionNote:
    "Concluir este exercício registra uma prática; não é certificação ou comprovação de domínio profissional.",
} as const;

export type ExerciseAnswer = {
  totalInCents: number;
  validationRule: (typeof EXERCISE_SPEC.validationOptions)[number]["value"];
  sumRule: (typeof EXERCISE_SPEC.sumOptions)[number]["value"];
  rejectedOrder: (typeof EXERCISE_SPEC.rejectedOrderOptions)[number]["value"];
};
export type CriterionId = "total" | "validation" | "sum" | "test";
export type CriterionFeedback = {
  id: CriterionId;
  label: string;
  correct: boolean;
  points: number;
  maxPoints: number;
  explanation: string;
};
export type ExerciseEvaluation = {
  exerciseId: typeof EXERCISE_SPEC.id;
  version: typeof EXERCISE_SPEC.version;
  score: number;
  maxScore: number;
  completed: boolean;
  feedback: CriterionFeedback[];
  nextStep: {
    kind: "review" | "challenge";
    topic: "values" | "validation" | "functions" | "testing" | "consolidation";
    title: string;
    description: string;
  };
};

export function evaluateExercise(input: unknown): Result<ExerciseEvaluation> {
  if (!isRecord(input)) {
    return {
      success: false,
      errors: [
        {
          path: "",
          code: "invalid_type",
          message: "Preencha as quatro respostas do exercício.",
        },
      ],
    };
  }
  const errors = validateKeys(
    input,
    ["totalInCents", "validationRule", "sumRule", "rejectedOrder"],
    "",
  );
  if (
    typeof input.totalInCents !== "number" ||
    !Number.isSafeInteger(input.totalInCents) ||
    input.totalInCents < 0 ||
    input.totalInCents > 1_000_000
  ) {
    errors.push({
      path: "totalInCents",
      code: "invalid_value",
      message:
        "Informe um total válido de até R$ 10.000,00, com no máximo duas casas decimais.",
    });
  }
  const answerFields = [
    ["validationRule", EXERCISE_SPEC.validationOptions],
    ["sumRule", EXERCISE_SPEC.sumOptions],
    ["rejectedOrder", EXERCISE_SPEC.rejectedOrderOptions],
  ] as const;
  for (const [field, options] of answerFields) {
    if (!options.some((option) => option.value === input[field])) {
      errors.push({
        path: field,
        code: "invalid_value",
        message: "Selecione uma das alternativas apresentadas.",
      });
    }
  }
  if (errors.length > 0) return { success: false, errors };

  const feedback: CriterionFeedback[] = [
    {
      id: "total",
      label: "Previsão do total",
      correct: input.totalInCents === 5070,
      points: 0,
      maxPoints: 25,
      explanation:
        "2 × 1.890 + 1 × 790 + 500 = 5.070 centavos, ou R$ 50,70. O preço é multiplicado pela quantidade antes de somar a taxa.",
    },
    {
      id: "validation",
      label: "Validação das entradas",
      correct: input.validationRule === "positive-integer",
      points: 0,
      maxPoints: 25,
      explanation:
        "Cada linha precisa de um produto do catálogo e quantidade inteira de 1 a 20. Zero, valores negativos e quantidades fracionadas são inválidos nesta regra de negócio.",
    },
    {
      id: "sum",
      label: "Repetição e cálculo",
      correct: input.sumRule === "price-times-quantity",
      points: 0,
      maxPoints: 25,
      explanation:
        "Para cada item, some preço × quantidade ao subtotal. Depois adicione a taxa uma única vez; na retirada, a taxa é zero.",
    },
    {
      id: "test",
      label: "Caso de teste inválido",
      correct: input.rejectedOrder === "zero-quantity",
      points: 0,
      maxPoints: 25,
      explanation:
        "Quantidade zero deve ser rejeitada. Dois hambúrgueres para entrega e uma batata para retirada são pedidos válidos. Um teste também deve cobrir entradas que precisam falhar.",
    },
  ].map((criterion) => ({
    ...criterion,
    points: criterion.correct ? criterion.maxPoints : 0,
  })) as CriterionFeedback[];
  const score = feedback.reduce((sum, criterion) => sum + criterion.points, 0);
  const completed = score === EXERCISE_SPEC.completionScore;

  // A orientação depende de regras visíveis, não de inferências de uma IA.
  const firstMissing = feedback.find((criterion) => !criterion.correct)?.id;
  const reviewSteps: Record<CriterionId, ExerciseEvaluation["nextStep"]> = {
    total: {
      kind: "review",
      topic: "values",
      title: "Revise valores e quantidades",
      description:
        "Escreva o subtotal de cada linha em centavos. Some os subtotais e só então a taxa. Tente prever novamente antes de consultar o simulador.",
    },
    validation: {
      kind: "review",
      topic: "validation",
      title: "Revise as condições",
      description:
        "Compare 0, 1, 1,5 e 21 com a regra: número inteiro entre 1 e 20. Depois confira se o produto existe no catálogo.",
    },
    sum: {
      kind: "review",
      topic: "functions",
      title: "Revise repetição e funções",
      description:
        "Percorra cada item, multiplique preço por quantidade e acumule o subtotal. A taxa fica fora da repetição.",
    },
    test: {
      kind: "review",
      topic: "testing",
      title: "Revise casos de teste",
      description:
        "Separe exemplos válidos de entradas que devem ser rejeitadas. Comece pelos limites: quantidade 0, 1, 20 e 21.",
    },
  };
  const nextStep: ExerciseEvaluation["nextStep"] = firstMissing
    ? reviewSteps[firstMissing]
    : {
        kind: "challenge",
        topic: "consolidation",
        title: "Experimente uma variação",
        description:
          "Troque a entrega por retirada e preveja o novo total. Depois explique, com suas palavras, por que a taxa não deve ser somada dentro da repetição.",
      };

  return {
    success: true,
    data: {
      exerciseId: EXERCISE_SPEC.id,
      version: EXERCISE_SPEC.version,
      score,
      maxScore: EXERCISE_SPEC.maxScore,
      completed,
      feedback,
      nextStep,
    },
  };
}
