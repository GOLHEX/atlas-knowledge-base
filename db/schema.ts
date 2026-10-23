import { sqliteTable, text, integer, primaryKey, uniqueIndex } from 'drizzle-orm/sqlite-core';
export const entries = sqliteTable('entries', {
 owner: text('owner').notNull(), id: text('id').notNull(), data: text('data').notNull(), revision: integer('revision').notNull().default(1),
 urlKey: text('url_key'),
}, table => [primaryKey({columns: [table.owner, table.id]}), uniqueIndex('entries_owner_url').on(table.owner, table.urlKey)]);
export const atlasContexts = sqliteTable('atlas_contexts', {
 owner: text('owner').primaryKey(), data: text('data').notNull(), revision: integer('revision').notNull().default(1),
});
export const atlasProjects=sqliteTable('atlas_projects',{
 owner:text('owner').notNull(),id:text('id').notNull(),data:text('data').notNull(),revision:integer('revision').notNull().default(1),
},table=>[primaryKey({columns:[table.owner,table.id]})]);
