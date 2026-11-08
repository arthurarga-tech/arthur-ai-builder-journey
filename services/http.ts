import {
  isSameOrigin,
  isWithinBodyLimit,
  MAX_JSON_BODY_BYTES,
} from "../domain/access.ts";
import type { ValidationIssue } from "../domain/order-exercise.ts";

export class HttpError extends Error {
  status: number;
  details?: ValidationIssue[];

  constructor(status: number, message: string, details?: ValidationIssue[]) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.details = details;
  }
}

export function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store, private",
      "X-Content-Type-Options": "nosniff",
      Vary: "Cookie, oai-authenticated-user-id",
    },
  });
}

export function assertWriteOrigin(request: Request): void {
  if (!isSameOrigin(request.headers.get("origin"), request.url)) {
    throw new HttpError(
      403,
      "Esta alteração precisa ser enviada pelo próprio site.",
    );
  }
}

/** Read bytes incrementally; Content-Length is advisory and never the only limit. */
export async function readJsonBody(request: Request): Promise<unknown> {
  const contentType = request.headers
    .get("content-type")
    ?.split(";")[0]
    ?.trim()
    .toLowerCase();
  if (contentType !== "application/json")
    throw new HttpError(415, "Envie os dados no formato JSON.");
  const contentLength = request.headers.get("content-length");
  if (contentLength !== null) {
    if (!/^\d+$/.test(contentLength))
      throw new HttpError(400, "O tamanho informado da requisição é inválido.");
    if (!isWithinBodyLimit(Number(contentLength)))
      throw new HttpError(413, "A resposta ultrapassa o limite de 4 KB.");
  }
  if (!request.body)
    throw new HttpError(400, "Envie as respostas da atividade.");

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let byteLength = 0;
  try {
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      byteLength += chunk.value.byteLength;
      if (!isWithinBodyLimit(byteLength, MAX_JSON_BODY_BYTES)) {
        await reader.cancel();
        throw new HttpError(413, "A resposta ultrapassa o limite de 4 KB.");
      }
      chunks.push(chunk.value);
    }
    const joined = new Uint8Array(byteLength);
    let offset = 0;
    for (const chunk of chunks) {
      joined.set(chunk, offset);
      offset += chunk.byteLength;
    }
    try {
      const text = new TextDecoder("utf-8", { fatal: true }).decode(joined);
      return JSON.parse(text) as unknown;
    } catch {
      throw new HttpError(400, "O conteúdo enviado não é um JSON válido.");
    }
  } catch (error) {
    if (error instanceof HttpError) throw error;
    throw new HttpError(
      400,
      "Não foi possível ler a requisição. Tente novamente.",
    );
  } finally {
    reader.releaseLock();
  }
}

export function errorResponse(error: unknown, fallbackStatus = 503): Response {
  if (error instanceof HttpError) {
    return jsonResponse(
      {
        error: error.message,
        ...(error.details ? { details: error.details } : {}),
      },
      error.status,
    );
  }
  // Never forward stack traces, database messages, credentials, or submitted data.
  return jsonResponse(
    { error: "Não foi possível concluir agora. Tente novamente em instantes." },
    fallbackStatus,
  );
}
