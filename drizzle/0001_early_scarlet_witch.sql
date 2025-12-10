CREATE TABLE `quiz_sessions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`score` integer NOT NULL,
	`total` integer NOT NULL,
	`created_at` integer NOT NULL
);
