import test from "node:test";
import assert from "node:assert/strict";
import { calculateOrder, evaluateExercise } from "../domain/order-exercise.ts";

const order = {
  fulfillment: "delivery",
  items: [
    { productId: "burger", quantity: 2 },
    { productId: "batata", quantity: 1 },
  ],
};
const correctAnswer = {
  totalInCents: 5070,
  validationRule: "positive-integer",
  sumRule: "price-times-quantity",
  rejectedOrder: "zero-quantity",
};

test("pedido de referência custa R$ 50,70, com subtotal e taxa separados", () => {
  const result = calculateOrder(order);
  assert.equal(result.success, true);
  if (!result.success) return;
  assert.equal(result.data.totalInCents, 5070);
  assert.equal(result.data.subtotalInCents, 4570);
  assert.equal(result.data.deliveryFeeInCents, 500);
  assert.equal(result.data.lines[0]?.lineTotalInCents, 3780);
  assert.equal(result.data.lines[1]?.lineTotalInCents, 790);
});

test("retirada preserva os itens e remove a taxa", () => {
  const result = calculateOrder({ ...order, fulfillment: "pickup" });
  assert.equal(result.success, true);
  if (!result.success) return;
  assert.equal(result.data.totalInCents, 4570);
  assert.equal(result.data.deliveryFeeInCents, 0);
});

test("a taxa é aplicada uma vez, mesmo com várias linhas", () => {
  const result = calculateOrder({
    fulfillment: "delivery",
    items: [
      { productId: "batata", quantity: 3 },
      { productId: "batata", quantity: 1 },
    ],
  });
  assert.equal(result.success, true);
  if (!result.success) return;
  assert.equal(result.data.totalInCents, 3660);
  assert.ok(Number.isInteger(result.data.totalInCents));
});

test("limites inclusivos 1 e 20 e até 10 linhas são aceitos", () => {
  const result = calculateOrder({
    fulfillment: "pickup",
    items: Array.from({ length: 10 }, (_, index) => ({
      productId: "burger",
      quantity: index === 0 ? 1 : 20,
    })),
  });
  assert.equal(result.success, true);
  if (!result.success) return;
  assert.equal(result.data.totalInCents, 342090);
  assert.ok(Number.isSafeInteger(result.data.totalInCents));
});

test("rejeita payloads malformados e formas de recebimento desconhecidas", () => {
  for (const payload of [
    null,
    undefined,
    [],
    "pedido",
    1,
    new Date(),
    {},
    { ...order, fulfillment: "drone" },
    { ...order, items: {} },
    { ...order, items: [] },
    { ...order, items: [null] },
  ]) {
    const result = calculateOrder(payload);
    assert.equal(result.success, false);
    if (!result.success) assert.ok(result.errors.length > 0);
  }
});

test("produto desconhecido não recebe preço implícito", () => {
  const result = calculateOrder({
    fulfillment: "delivery",
    items: [{ productId: "pizza", quantity: 1 }],
  });
  assert.equal(result.success, false);
  if (!result.success)
    assert.ok(
      result.errors.some((error) => error.path === "items.0.productId"),
    );
});

test("quantidades não são coagidas nem arredondadas", () => {
  for (const quantity of [
    0,
    -1,
    21,
    1.5,
    "2",
    true,
    null,
    undefined,
    NaN,
    Infinity,
    Number.MAX_SAFE_INTEGER + 1,
  ]) {
    const result = calculateOrder({
      fulfillment: "delivery",
      items: [{ productId: "burger", quantity }],
    });
    assert.equal(
      result.success,
      false,
      `Quantidade inválida aceita: ${String(quantity)}`,
    );
  }
});

test("11 linhas e campos de preço ou total enviados pelo cliente são rejeitados", () => {
  for (const payload of [
    {
      ...order,
      items: Array.from({ length: 11 }, () => ({
        productId: "burger",
        quantity: 1,
      })),
    },
    { ...order, totalInCents: 1 },
    { ...order, deliveryFeeInCents: 0 },
    {
      ...order,
      items: [{ productId: "burger", quantity: 1, unitPriceInCents: 1 }],
    },
  ])
    assert.equal(calculateOrder(payload).success, false);
});

test("resposta correta produz 100 pontos e uma prática concluída", () => {
  const result = evaluateExercise(correctAnswer);
  assert.equal(result.success, true);
  if (!result.success) return;
  assert.equal(result.data.score, 100);
  assert.equal(result.data.completed, true);
  assert.equal(result.data.feedback.length, 4);
  assert.ok(
    result.data.feedback.every(
      (feedback) => feedback.correct && feedback.points === 25,
    ),
  );
  assert.equal(result.data.nextStep.kind, "challenge");
});

test("cada erro afeta apenas seu critério e indica revisão específica", () => {
  const cases = [
    {
      answer: { ...correctAnswer, totalInCents: 4570 },
      topic: "values",
      criterion: "total",
    },
    {
      answer: { ...correctAnswer, validationRule: "non-negative" },
      topic: "validation",
      criterion: "validation",
    },
    {
      answer: { ...correctAnswer, sumRule: "prices-only" },
      topic: "functions",
      criterion: "sum",
    },
    {
      answer: { ...correctAnswer, rejectedOrder: "pickup" },
      topic: "testing",
      criterion: "test",
    },
  ];
  for (const scenario of cases) {
    const result = evaluateExercise(scenario.answer);
    assert.equal(result.success, true);
    if (!result.success) continue;
    assert.equal(result.data.score, 75);
    assert.equal(result.data.completed, false);
    assert.equal(result.data.nextStep.topic, scenario.topic);
    assert.equal(
      result.data.feedback.find((feedback) => !feedback.correct)?.id,
      scenario.criterion,
    );
  }
});

test("respostas incorretas válidas recebem zero e feedback, não erro de formulário", () => {
  const result = evaluateExercise({
    totalInCents: 0,
    validationRule: "number-only",
    sumRule: "quantities-only",
    rejectedOrder: "two-burgers",
  });
  assert.equal(result.success, true);
  if (!result.success) return;
  assert.equal(result.data.score, 0);
  assert.equal(result.data.completed, false);
  assert.ok(
    result.data.feedback.every((feedback) => feedback.explanation.length > 30),
  );
});

test("reenvio idêntico é determinístico e não altera entradas", () => {
  const frozenAnswer = Object.freeze({ ...correctAnswer });
  const first = evaluateExercise(frozenAnswer);
  const second = evaluateExercise(frozenAnswer);
  assert.deepEqual(first, second);
  const frozenOrder = Object.freeze({
    fulfillment: "delivery",
    items: Object.freeze([
      Object.freeze({ productId: "burger", quantity: 2 }),
      Object.freeze({ productId: "batata", quantity: 1 }),
    ]),
  });
  assert.deepEqual(calculateOrder(frozenOrder), calculateOrder(frozenOrder));
});

test("não aceita nota, conclusão ou identidade enviadas pelo navegador", () => {
  for (const field of [
    { score: 100 },
    { completed: true },
    { userId: "outro-usuario" },
    { version: "falsa" },
  ]) {
    const result = evaluateExercise({ ...correctAnswer, ...field });
    assert.equal(result.success, false);
    if (!result.success)
      assert.ok(result.errors.some((error) => error.code === "unknown_field"));
  }
});

test("rejeita respostas incompletas, tipos coercíveis, valores inseguros e alternativas inventadas", () => {
  for (const payload of [
    null,
    [],
    {},
    "resposta",
    { ...correctAnswer, totalInCents: "5070" },
    { ...correctAnswer, totalInCents: true },
    { ...correctAnswer, totalInCents: 50.7 },
    { ...correctAnswer, totalInCents: -1 },
    { ...correctAnswer, totalInCents: NaN },
    { ...correctAnswer, totalInCents: Number.MAX_SAFE_INTEGER + 1 },
    { ...correctAnswer, validationRule: "qualquer-coisa" },
    { ...correctAnswer, sumRule: undefined },
    { ...correctAnswer, rejectedOrder: [] },
  ])
    assert.equal(evaluateExercise(payload).success, false);
});
