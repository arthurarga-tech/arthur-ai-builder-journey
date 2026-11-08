import type { ExerciseAnswer } from "./order-exercise.ts";

/** Stable property order makes retries independent of the incoming JSON key order. */
export function canonicalAnswer(answer: ExerciseAnswer): string {
  return JSON.stringify({
    totalInCents: answer.totalInCents,
    validationRule: answer.validationRule,
    sumRule: answer.sumRule,
    rejectedOrder: answer.rejectedOrder,
  });
}

export async function answerFingerprint(
  answer: ExerciseAnswer,
): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(canonicalAnswer(answer)),
  );
  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}
