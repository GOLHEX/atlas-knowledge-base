import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core';
export const entries = sqliteTable('entries', {
 owner: text('owner').notNull(), id: text('id').notNull(), data: text('data').notNull(), revision: integer('revision').notNull().default(1),
}, table => [primaryKey({columns: [table.owner, table.id]})]);
