import test from "node:test";
import assert from "node:assert/strict";
import {
  actorIdFromIdentity,
  isSameOrigin,
  isWithinBodyLimit,
  MAX_JSON_BODY_BYTES,
} from "../domain/access.ts";
import {
  answerFingerprint,
  canonicalAnswer,
} from "../domain/attempt-identity.ts";
import {
  assertWriteOrigin,
  errorResponse,
  HttpError,
  jsonResponse,
  readJsonBody,
} from "../services/http.ts";

const answer = {
  totalInCents: 5070,
  validationRule: "positive-integer",
  sumRule: "price-times-quantity",
  rejectedOrder: "zero-quantity",
} as const;

function requestWithJson(
  body: string,
  headers: Record<string, string> = {},
): Request {
  return new Request("https://example.test/api/exercise", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: "https://example.test",
      ...headers,
    },
    body,
  });
}

test("origem deve coincidir exatamente em protocolo, hostname e porta", () => {
  assert.equal(
    isSameOrigin("https://example.test", "https://example.test/api/progress"),
    true,
  );
  assert.equal(
    isSameOrigin("http://127.0.0.1:3000", "http://127.0.0.1:3000/api/progress"),
    true,
  );
  for (const origin of [
    null,
    "",
    "null",
    "https://attacker.test",
    "http://example.test",
    "https://example.test:4000",
    "https://example.test.attacker.test",
    "https://example.test/path",
    "https://user@example.test",
    "https://example.test/",
  ]) {
    assert.equal(
      isSameOrigin(origin, "https://example.test/api/progress"),
      false,
    );
  }
  assert.equal(isSameOrigin("https://example.test", "not-a-url"), false);
  assert.equal(isSameOrigin("null", "file:///tmp/test"), false);
});

test("requisição sem origem e origem externa são rejeitadas antes de alterações", () => {
  assert.doesNotThrow(() => assertWriteOrigin(requestWithJson("{}")));
  for (const request of [
    new Request("https://example.test/api/progress", { method: "POST" }),
    requestWithJson("{}", { origin: "https://attacker.test" }),
  ]) {
    assert.throws(
      () => assertWriteOrigin(request),
      (error: unknown) => error instanceof HttpError && error.status === 403,
    );
  }
});

test("identidade ausente ou malformada nunca ganha titularidade", () => {
  for (const identity of [
    null,
    undefined,
    {},
    [],
    "user-a",
    { userId: "" },
    { userId: " " },
    { userId: 7 },
    { userId: " user-a" },
    { userId: "x".repeat(513) },
  ]) {
    assert.equal(actorIdFromIdentity(identity), null);
  }
  assert.equal(
    actorIdFromIdentity({ userId: "user-a", email: "not-used@example.test" }),
    "user-a",
  );
});

test("limite de corpo conta bytes inteiros e aceita exatamente 4096", () => {
  assert.equal(isWithinBodyLimit(0), true);
  assert.equal(isWithinBodyLimit(MAX_JSON_BODY_BYTES), true);
  for (const size of [-1, 0.5, NaN, Infinity, 4097])
    assert.equal(isWithinBodyLimit(size), false);
});

test("JSON válido é lido sem depender de Content-Length", async () => {
  assert.deepEqual(
    await readJsonBody(requestWithJson(JSON.stringify(answer))),
    answer,
  );
  assert.deepEqual(
    await readJsonBody(
      requestWithJson("{}", {
        "content-type": "Application/JSON; charset=UTF-8",
      }),
    ),
    {},
  );
});

test("tipo incorreto, JSON inválido e corpo vazio têm erros públicos específicos", async () => {
  await assert.rejects(
    readJsonBody(requestWithJson("{}", { "content-type": "text/plain" })),
    (error: unknown) => error instanceof HttpError && error.status === 415,
  );
  for (const body of ["", "{invalid", '{"a":}']) {
    await assert.rejects(
      readJsonBody(requestWithJson(body)),
      (error: unknown) => error instanceof HttpError && error.status === 400,
    );
  }
});

test("corpo grande é rejeitado mesmo sem tamanho declarado ou com tamanho falso", async () => {
  const sizeHeaders: Record<string, string>[] = [
    {},
    { "content-length": "2" },
    { "content-length": "4097" },
  ];
  for (const headers of sizeHeaders) {
    await assert.rejects(
      readJsonBody(
        requestWithJson(JSON.stringify({ text: "x".repeat(5000) }), headers),
      ),
      (error: unknown) => error instanceof HttpError && error.status === 413,
    );
  }
  await assert.rejects(
    readJsonBody(requestWithJson("{}", { "content-length": "2e3" })),
    (error: unknown) => error instanceof HttpError && error.status === 400,
  );
});

test("texto multibyte usa tamanho UTF-8 real", async () => {
  const unicodeBody = JSON.stringify({ text: "á".repeat(2200) });
  assert.ok(unicodeBody.length < 4096);
  assert.ok(new TextEncoder().encode(unicodeBody).byteLength > 4096);
  await assert.rejects(
    readJsonBody(requestWithJson(unicodeBody)),
    (error: unknown) => error instanceof HttpError && error.status === 413,
  );
});

test("hash canônico ignora ordem das propriedades e diferencia respostas", async () => {
  const reordered = {
    rejectedOrder: "zero-quantity",
    sumRule: "price-times-quantity",
    validationRule: "positive-integer",
    totalInCents: 5070,
  } as const;
  assert.equal(canonicalAnswer(answer), canonicalAnswer(reordered));
  assert.equal(
    await answerFingerprint(answer),
    await answerFingerprint(reordered),
  );
  assert.notEqual(
    await answerFingerprint(answer),
    await answerFingerprint({ ...answer, totalInCents: 4570 }),
  );
  assert.match(await answerFingerprint(answer), /^[a-f0-9]{64}$/);
});

test("respostas privadas não são armazenáveis e erros não vazam detalhes internos", async () => {
  const response = jsonResponse({ count: 0 });
  assert.match(response.headers.get("cache-control") ?? "", /no-store/);
  const failure = errorResponse(new Error("segredo, SQL e stack interno"));
  assert.equal(failure.status, 503);
  assert.deepEqual(await failure.json(), {
    error: "Não foi possível concluir agora. Tente novamente em instantes.",
  });
  const validation = errorResponse(
    new HttpError(400, "Resposta inválida.", [
      {
        path: "totalInCents",
        code: "invalid_value",
        message: "Revise o valor.",
      },
    ]),
  );
  assert.equal(validation.status, 400);
  assert.equal(
    ((await validation.json()) as { details: unknown[] }).details.length,
    1,
  );
});
