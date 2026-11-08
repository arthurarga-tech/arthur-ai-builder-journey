import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import http from "node:http";

const usage = "Uso: node scripts/smoke-progress.mjs http://127.0.0.1:8787";
const correct = {
  totalInCents: 5070,
  validationRule: "positive-integer",
  sumRule: "price-times-quantity",
  rejectedOrder: "zero-quantity",
};
const reordered = {
  rejectedOrder: correct.rejectedOrder,
  sumRule: correct.sumRule,
  validationRule: correct.validationRule,
  totalInCents: correct.totalInCents,
};

function localOrigin(arg) {
  // Check the literal input first, before URL normalization or any request.
  if (
    typeof arg !== "string" ||
    !/^http:\/\/(?:127\.0\.0\.1|localhost)(?::\d{1,5})?\/?$/.test(arg)
  ) {
    throw new Error(
      `Destino recusado. Use HTTP em 127.0.0.1 ou localhost, apenas com porta opcional. ${usage}`,
    );
  }
  const url = new URL(arg);
  if (url.port && (Number(url.port) < 1 || Number(url.port) > 65535))
    throw new Error("Porta local inválida.");
  return url;
}

function client(origin) {
  return (
    method,
    path,
    { actor, body, expected = 200, writeOrigin = origin.origin } = {},
  ) => {
    assert.ok(
      path === "/api/exercise" || path === "/api/progress",
      "Rota fora do teste.",
    );
    const headers = { host: origin.host, accept: "application/json" };
    const serializedBody =
      body === undefined ? undefined : JSON.stringify(body);
    if (serializedBody !== undefined) {
      // Node does not frame a DELETE body automatically as it does for POST.
      headers["content-length"] = String(Buffer.byteLength(serializedBody));
    }
    if (actor) {
      headers["oai-authenticated-user-id"] = actor;
      headers["oai-authenticated-user-email"] = `${actor}@example.invalid`;
    }
    if (method !== "GET") {
      headers.origin = writeOrigin;
      headers["content-type"] = "application/json";
    }
    return new Promise((resolve, reject) => {
      // Direct TCP to loopback, no proxy, DNS lookup, cookie jar or redirect following.
      const req = http.request(
        {
          hostname: "127.0.0.1",
          port: Number(origin.port || 80),
          path,
          method,
          headers,
          agent: false,
        },
        (res) => {
          const chunks = [];
          let bytes = 0;
          res.on("data", (chunk) => {
            bytes += chunk.length;
            if (bytes > 65536) {
              req.destroy(
                new Error("Resposta inesperadamente grande do servidor local."),
              );
              return;
            }
            chunks.push(chunk);
          });
          res.on("error", reject);
          res.on("end", () => {
            try {
              assert.equal(
                res.statusCode,
                expected,
                `${method} ${path}: esperava HTTP ${expected}, recebeu ${res.statusCode}.`,
              );
              assert.match(
                String(res.headers["content-type"] ?? ""),
                /^application\/json\b/i,
                `${method} ${path} não retornou JSON.`,
              );
              assert.match(
                String(res.headers["cache-control"] ?? ""),
                /\bno-store\b/i,
                `${method} ${path} precisa de no-store.`,
              );
              let payload;
              try {
                payload = JSON.parse(Buffer.concat(chunks).toString("utf8"));
              } catch {
                throw new Error(`${method} ${path} retornou JSON inválido.`);
              }
              if (expected >= 400)
                assert.equal(
                  typeof payload.error,
                  "string",
                  "Faltou a mensagem pública de erro.",
                );
              resolve(payload);
            } catch (error) {
              reject(error);
            }
          });
        },
      );
      req.setTimeout(10000, () =>
        req.destroy(new Error(`${method} ${path} excedeu 10 segundos.`)),
      );
      req.on("error", reject);
      req.end(serializedBody);
    });
  };
}

function verifySummary(summary, score) {
  assert.deepEqual(Object.keys(summary).sort(), [
    "attempts",
    "bestScore",
    "completed",
    "count",
  ]);
  const count = score === undefined ? 0 : 1;
  assert.equal(
    summary.count,
    count,
    "A conta de teste tem um número inesperado de tentativas.",
  );
  assert.equal(summary.attempts.length, count);
  assert.equal(summary.bestScore, score ?? 0);
  assert.equal(summary.completed, score === 100);
  if (count > 0) {
    const row = summary.attempts[0];
    assert.deepEqual(Object.keys(row).sort(), [
      "completed",
      "createdAt",
      "id",
      "score",
    ]);
    assert.equal(typeof row.id, "string");
    assert.ok(row.id.length > 0);
    assert.equal(row.score, score);
    assert.equal(row.completed, score === 100);
    assert.equal(typeof row.createdAt, "string");
    assert.ok(
      Number.isFinite(Date.parse(row.createdAt)),
      "A data da tentativa é inválida.",
    );
    assert.equal(
      new Date(row.createdAt).toISOString(),
      row.createdAt,
      "A data deve ser ISO 8601 UTC.",
    );
  }
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 1 && args[0] === "--help") {
    console.log(usage);
    return;
  }
  if (args.length !== 1) throw new Error(usage);
  const origin = localOrigin(args[0]);
  const request = client(origin);
  const runId = `journey-smoke-${randomUUID()}`;
  const actorA = `${runId}-a`;
  const actorB = `${runId}-b`;
  const read = (actor) => request("GET", "/api/progress", { actor });
  const save = (actor, body) =>
    request("POST", "/api/progress", { actor, body });
  const erase = (actor) =>
    request("DELETE", "/api/progress", { actor, body: {} });
  // Cleanup is restricted to freshly generated identities with verified empty baselines
  // and record IDs returned by our own successful writes. No caller-supplied user IDs.
  const knownRows = new Map();
  try {
    await request("GET", "/api/progress", { expected: 401 });
    await request("POST", "/api/progress", { body: correct, expected: 401 });
    const evaluation = await request("POST", "/api/exercise", {
      body: correct,
    });
    assert.equal(evaluation.score, 100);
    assert.equal(evaluation.completed, true);
    assert.equal(evaluation.feedback.length, 4);
    assert.equal(evaluation.nextStep.kind, "challenge");
    console.log("OK: correção anônima e exigência de login para o histórico.");

    verifySummary(await read(actorA));
    verifySummary(await read(actorB));
    await request("POST", "/api/progress", {
      actor: actorA,
      body: { ...correct, userId: actorB },
      expected: 400,
    });
    await request("POST", "/api/progress", {
      actor: actorA,
      body: correct,
      writeOrigin: "https://example.invalid",
      expected: 403,
    });
    // Keep a POST directly after the 403 to catch the local proxy/body regression.
    assert.equal(
      (await request("POST", "/api/exercise", { body: correct })).score,
      100,
    );
    await request("POST", "/api/exercise", {
      body: correct,
      writeOrigin: "https://example.invalid",
      expected: 403,
    });
    assert.equal(
      (await request("POST", "/api/exercise", { body: correct })).score,
      100,
    );
    verifySummary(await read(actorA));
    console.log(
      "OK: identidades iniciam vazias e escritas forjadas são rejeitadas.",
    );

    const concurrent = await Promise.allSettled([
      save(actorA, correct),
      save(actorA, reordered),
      save(actorA, correct),
    ]);
    const aIds = new Set();
    // Remember only a validated response containing precisely this practice.
    // Unexpected rows stay outside the cleanup allowlist.
    for (const item of concurrent) {
      if (item.status !== "fulfilled") continue;
      assert.equal(item.value.saved, true);
      verifySummary(item.value.progress, 100);
      aIds.add(item.value.progress.attempts[0].id);
      knownRows.set(actorA, aIds);
    }
    for (const item of concurrent) {
      if (item.status === "rejected") throw item.reason;
    }
    assert.equal(
      aIds.size,
      1,
      "Reenvios concorrentes precisam ter o mesmo ID.",
    );
    const firstA = await read(actorA);
    verifySummary(firstA, 100);
    assert.ok(aIds.has(firstA.attempts[0].id));
    verifySummary(await read(actorB));
    console.log(
      "OK: três envios paralelos com ordem de campos diferente geraram uma tentativa privada.",
    );

    const writtenB = await save(actorB, { ...correct, totalInCents: 4570 });
    assert.equal(writtenB.saved, true);
    verifySummary(writtenB.progress, 75);
    const bId = writtenB.progress.attempts[0].id;
    knownRows.set(actorB, new Set([bId]));
    assert.ok(!aIds.has(bId));
    verifySummary(await read(actorA), 100);
    verifySummary(await read(actorB), 75);
    await request("DELETE", "/api/progress", {
      actor: actorA,
      body: { userId: actorB },
      expected: 400,
    });
    verifySummary(await read(actorB), 75);
    console.log("OK: as contas veem notas e tentativas próprias.");

    const deletedA = await erase(actorA);
    assert.equal(deletedA.deleted, true);
    verifySummary(deletedA.progress);
    verifySummary(await read(actorA));
    const afterDeleteB = await read(actorB);
    verifySummary(afterDeleteB, 75);
    assert.equal(afterDeleteB.attempts[0].id, bId);
    knownRows.delete(actorA);
    console.log(
      "OK: apagar o progresso da primeira conta preservou o registro da segunda.",
    );
  } finally {
    const cleanupErrors = [];
    for (const [actor, ids] of knownRows) {
      try {
        const current = await read(actor);
        if (current.count === 0 && current.attempts.length === 0) continue;
        assert.ok(
          current.count === current.attempts.length &&
            current.attempts.every((row) => ids.has(row.id)),
          "Limpeza interrompida por registro alheio ao teste.",
        );
        const deleted = await erase(actor);
        assert.equal(deleted.deleted, true);
        verifySummary(deleted.progress);
        verifySummary(await read(actor));
      } catch (error) {
        cleanupErrors.push(error.message);
      }
    }
    if (cleanupErrors.length)
      throw new Error(
        `Falha ao limpar identidades sintéticas: ${cleanupErrors.join(" | ")}`,
      );
  }
  console.log(
    "Smoke de progresso concluído. Os registros sintéticos desta execução foram removidos.",
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
