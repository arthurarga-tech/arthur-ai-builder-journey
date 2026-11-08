import { getChatGPTUser } from "../../chatgpt-auth";
import { actorIdFromIdentity } from "../../../domain/access.ts";
import {
  deleteProgress,
  getProgress,
  saveProgress,
} from "../../../services/progress";
import {
  assertWriteOrigin,
  errorResponse,
  HttpError,
  jsonResponse,
  readJsonBody,
} from "../../../services/http.ts";

export const dynamic = "force-dynamic";

async function requireActor(): Promise<string> {
  const actorId = actorIdFromIdentity(await getChatGPTUser());
  if (!actorId)
    throw new HttpError(
      401,
      "Entre na sua conta para acessar seu progresso privado.",
    );
  return actorId;
}

export async function GET(): Promise<Response> {
  try {
    const actorId = await requireActor();
    return jsonResponse(await getProgress(actorId));
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: Request): Promise<Response> {
  try {
    // Finish the bounded request body before an early 401/403 response. Wrangler's
    // local proxy otherwise leaves a stale downstream connection for the next POST.
    const input = await readJsonBody(request);
    assertWriteOrigin(request);
    const actorId = await requireActor();
    const result = await saveProgress(actorId, input);
    if (!result.success)
      throw new HttpError(400, "Revise os campos indicados.", result.errors);
    return jsonResponse({ progress: result.data, saved: true });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(request: Request): Promise<Response> {
  try {
    const input = await readJsonBody(request);
    assertWriteOrigin(request);
    const actorId = await requireActor();
    if (
      typeof input !== "object" ||
      input === null ||
      Array.isArray(input) ||
      Object.keys(input).length !== 0
    ) {
      throw new HttpError(
        400,
        "Envie um objeto vazio para apagar apenas o seu progresso.",
      );
    }
    return jsonResponse({
      progress: await deleteProgress(actorId),
      deleted: true,
    });
  } catch (error) {
    return errorResponse(error);
  }
}
