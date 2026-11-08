CREATE TABLE `attempts` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`exercise_id` text NOT NULL,
	`version` text NOT NULL,
	`fingerprint` text NOT NULL,
	`score` integer NOT NULL,
	`answers_json` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `attempts_actor_exercise_version_answer_unique` ON `attempts` (`user_id`,`exercise_id`,`version`,`fingerprint`);--> statement-breakpoint
CREATE INDEX `attempts_actor_created_index` ON `attempts` (`user_id`,`created_at`);