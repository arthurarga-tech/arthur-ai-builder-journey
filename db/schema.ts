import {
  index,
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const attempts = sqliteTable(
  "attempts",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    exerciseId: text("exercise_id").notNull(),
    version: text("version").notNull(),
    fingerprint: text("fingerprint").notNull(),
    score: integer("score").notNull(),
    answersJson: text("answers_json").notNull(),
    createdAt: text("created_at").notNull(),
  },
  (table) => [
    uniqueIndex("attempts_actor_exercise_version_answer_unique").on(
      table.userId,
      table.exerciseId,
      table.version,
      table.fingerprint,
    ),
    index("attempts_actor_created_index").on(table.userId, table.createdAt),
  ],
);
