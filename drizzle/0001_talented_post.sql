CREATE TABLE `atlas_contexts` (
	`owner` text PRIMARY KEY NOT NULL,
	`data` text NOT NULL,
	`revision` integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
ALTER TABLE `entries` ADD `url_key` text;--> statement-breakpoint
CREATE UNIQUE INDEX `entries_owner_url` ON `entries` (`owner`,`url_key`);
