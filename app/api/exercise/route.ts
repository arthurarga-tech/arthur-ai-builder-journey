import { evaluateExercise } from "../../../domain/order-exercise.ts";
import {
  assertWriteOrigin,
  errorResponse,
  HttpError,
  jsonResponse,
  readJsonBody,
} from "../../../services/http.ts";

export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<Response> {
  try {
    const input = await readJsonBody(request);
    assertWriteOrigin(request);
    const result = evaluateExercise(input);
    if (!result.success)
      throw new HttpError(400, "Revise os campos indicados.", result.errors);
    return jsonResponse(result.data);
  } catch (error) {
    return errorResponse(error, 500);
  }
}
