import { and, count, desc, eq, max } from "drizzle-orm";
import { getDb } from "../db/index";
import { attempts } from "../db/schema";
import {
  answerFingerprint,
  canonicalAnswer,
} from "../domain/attempt-identity.ts";
import { evaluateExercise, EXERCISE_SPEC } from "../domain/order-exercise.ts";
import type { ExerciseAnswer, Result } from "../domain/order-exercise.ts";

export type ProgressSummary = {
  attempts: {
    id: string;
    score: number;
    createdAt: string;
    completed: boolean;
  }[];
  bestScore: number;
  completed: boolean;
  count: number;
};

function currentUserExercise(userId: string) {
  return and(
    eq(attempts.userId, userId),
    eq(attempts.exerciseId, EXERCISE_SPEC.id),
    eq(attempts.version, EXERCISE_SPEC.version),
  );
}

export async function getProgress(userId: string): Promise<ProgressSummary> {
  const db = getDb();
  const predicate = currentUserExercise(userId);
  const [rows, aggregate] = await Promise.all([
    db
      .select({
        id: attempts.id,
        score: attempts.score,
        createdAt: attempts.createdAt,
      })
      .from(attempts)
      .where(predicate)
      .orderBy(desc(attempts.createdAt), desc(attempts.id))
      .limit(50)
      .all(),
    db
      .select({ count: count(), bestScore: max(attempts.score) })
      .from(attempts)
      .where(predicate)
      .get(),
  ]);
  const bestScore = aggregate?.bestScore ?? 0;
  return {
    attempts: rows.map((row) => ({
      ...row,
      completed: row.score === EXERCISE_SPEC.completionScore,
    })),
    bestScore,
    completed: bestScore === EXERCISE_SPEC.completionScore,
    count: aggregate?.count ?? 0,
  };
}

export async function saveProgress(
  userId: string,
  input: unknown,
): Promise<Result<ProgressSummary>> {
  const evaluation = evaluateExercise(input);
  if (!evaluation.success) return evaluation;
  // evaluateExercise validates the complete, strict shape before this narrowing.
  const answer = input as ExerciseAnswer;
  const fingerprint = await answerFingerprint(answer);
  const db = getDb();
  await db
    .insert(attempts)
    .values({
      id: crypto.randomUUID(),
      userId,
      exerciseId: EXERCISE_SPEC.id,
      version: EXERCISE_SPEC.version,
      fingerprint,
      score: evaluation.data.score,
      answersJson: canonicalAnswer(answer),
      createdAt: new Date().toISOString(),
    })
    .onConflictDoNothing({
      target: [
        attempts.userId,
        attempts.exerciseId,
        attempts.version,
        attempts.fingerprint,
      ],
    })
    .run();
  return { success: true, data: await getProgress(userId) };
}

export async function deleteProgress(userId: string): Promise<ProgressSummary> {
  const db = getDb();
  // Clear all this user's versions without touching any other user's records.
  await db.delete(attempts).where(eq(attempts.userId, userId)).run();
  return getProgress(userId);
}
