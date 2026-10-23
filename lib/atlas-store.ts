import { seed, type Entry } from '../app/data';
import { canonicalUrl, entrySchema, contextSchema, emptyContext, projectSchema, enrichmentSchema, type AtlasProject } from './atlas-schema';

export class AtlasError extends Error {constructor(message:string,public status=400){super(message);}}
export async function readEntries(db:D1Database,owner:string):Promise<Entry[]> {
 const rows=await db.prepare('SELECT id,data,revision FROM entries WHERE owner=?').bind(owner).all<{id:string;data:string;revision:number}>();
 const merged=new Map(seed.map(e=>[e.id,e]));
 for(const row of rows.results)merged.set(row.id,{...JSON.parse(row.data),revision:row.revision});
 return [...merged.values()];
}
export async function writeEntry(db:D1Database,owner:string,input:unknown):Promise<Entry> {
 const entry=entrySchema.parse(input),key=canonicalUrl(entry.url);
 if(entry.pendingUpdate){entry.pendingUpdate.patch=enrichmentSchema.parse(entry.pendingUpdate.patch);}
 if(entry.projectIds?.length){const projects=await readProjects(db,owner);if(entry.projectIds.some(id=>!projects.some(p=>p.id===id)))throw new AtlasError('Выбранный проект не найден в твоём аккаунте.');}
 const current=await readEntries(db,owner);
 if(current.some(e=>e.id!==entry.id&&canonicalUrl(e.url)===key))throw new AtlasError('Эта ссылка уже есть в Атласе.',409);
 const previous=current.find(e=>e.id===entry.id);
 if((previous?.revision??0)!==entry.revision)throw new AtlasError('Карточка изменилась. Обнови её перед сохранением.',409);
 // Provenance is set on creation and cannot be rewritten through the editor.
 const saved={...entry,addedBy:previous?.addedBy??entry.addedBy,addedAt:previous?.addedAt??entry.addedAt,revision:entry.revision+1};
 let result;
 try {
 result=entry.revision===0
 ?await db.prepare('INSERT INTO entries (owner,id,data,revision,url_key) VALUES (?,?,?,1,?) ON CONFLICT DO NOTHING').bind(owner,entry.id,JSON.stringify(saved),key).run()
 :await db.prepare('UPDATE entries SET data=?,revision=?,url_key=? WHERE owner=? AND id=? AND revision=?').bind(JSON.stringify(saved),saved.revision,key,owner,entry.id,entry.revision).run();
 } catch(error) {
 if(String(error).includes('UNIQUE'))throw new AtlasError('Эта ссылка уже сохранена в другом окне.',409);
 throw error;
 }
 if(!result.meta.changes)throw new AtlasError('Карточка или ссылка уже изменена. Обнови базу.',409);
 return saved;
}
export async function readProjects(db:D1Database,owner:string):Promise<AtlasProject[]> {
 const rows=await db.prepare('SELECT data,revision FROM atlas_projects WHERE owner=?').bind(owner).all<{data:string;revision:number}>();
 return rows.results.map(r=>projectSchema.parse({...JSON.parse(r.data),revision:r.revision}));
}
export async function writeProject(db:D1Database,owner:string,input:unknown){
 const project=projectSchema.parse(input),next={...project,revision:project.revision+1};
 const result=project.revision===0
 ?await db.prepare('INSERT INTO atlas_projects(owner,id,data,revision) VALUES(?,?,?,1) ON CONFLICT DO NOTHING').bind(owner,project.id,JSON.stringify(next)).run()
 :await db.prepare('UPDATE atlas_projects SET data=?,revision=? WHERE owner=? AND id=? AND revision=?').bind(JSON.stringify(next),next.revision,owner,project.id,project.revision).run();
 if(!result.meta.changes)throw new AtlasError('Проект изменён в другом окне. Обнови данные перед сохранением.',409);
 return next;
}
export async function readContext(db:D1Database,owner:string) {
 const row=await db.prepare('SELECT data,revision FROM atlas_contexts WHERE owner=?').bind(owner).first<{data:string;revision:number}>();
 return row?contextSchema.parse({...JSON.parse(row.data),revision:row.revision}):{...emptyContext};
}
export async function writeContext(db:D1Database,owner:string,input:unknown) {
 const context=contextSchema.parse(input),next={...context,revision:context.revision+1};
 const result=context.revision===0
 ?await db.prepare('INSERT INTO atlas_contexts (owner,data,revision) VALUES (?,?,1) ON CONFLICT DO NOTHING').bind(owner,JSON.stringify(next)).run()
 :await db.prepare('UPDATE atlas_contexts SET data=?,revision=? WHERE owner=? AND revision=?').bind(JSON.stringify(next),next.revision,owner,context.revision).run();
 if(!result.meta.changes)throw new AtlasError('Контекст изменён в другом окне. Обнови страницу, сохранив свой текст.',409);
 return next;
}
