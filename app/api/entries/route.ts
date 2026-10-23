import { getChatGPTUser } from '../../chatgpt-auth';
import { env } from 'cloudflare:workers';
import { seed } from '../../data';
import { z } from 'zod';
export const dynamic = 'force-dynamic';
const short=z.string().max(300);
const url=z.string().url().max(2000).refine(x=>/^https?:\/\//i.test(x));
const schema=z.object({id:z.string().regex(/^[a-zA-Z0-9_-]{1,100}$/),name:short.min(1),url,type:z.enum(['Навыки','Приложение','Онлайн-сервис','Библиотека']),category:short.min(1),summary:z.string().max(2000),tags:z.array(short).max(30),use:z.string().max(10000),needs:z.string().max(10000),limits:z.string().max(10000),start:z.string().max(15000),platform:short,cost:z.string().max(2000),license:short,checked:short,sources:z.array(z.object({label:short,url})).max(20),notes:z.string().max(20000),status:z.enum(['В коллекции','Хочу попробовать','Использую','Архив']),favorite:z.boolean(),revision:z.number().int().min(0)});
const json=(data:unknown,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store'}});
export async function GET(){
 const user=await getChatGPTUser();if(!user)return json({error:'Войди в аккаунт, чтобы открыть базу.'},401);
 try{const rows=await env.DB!.prepare('SELECT id,data,revision FROM entries WHERE owner=?').bind(user.userId).all<{id:string;data:string;revision:number}>();const merged=new Map(seed.map(x=>[x.id,x]));for(const r of rows.results)merged.set(r.id,{...JSON.parse(r.data),revision:r.revision});return json({entries:[...merged.values()]});}catch{return json({error:'Не удалось загрузить сохранённую базу. Попробуй ещё раз.'},503);}
}
export async function PUT(request:Request){
 const user=await getChatGPTUser();if(!user)return json({error:'Для сохранения нужно войти в аккаунт.'},401);
 const origin=request.headers.get('origin');if(origin&&origin!==new URL(request.url).origin)return json({error:'Недопустимый источник запроса.'},403);
 let entry;try{const raw=await request.text();if(raw.length>100000)return json({error:'Карточка слишком большая.'},413);entry=schema.parse(JSON.parse(raw));}catch{return json({error:'Проверь поля карточки и адрес ссылки (http или https).'},400);}
 try{const next=entry.revision+1;const result=entry.revision===0?await env.DB!.prepare('INSERT INTO entries (owner,id,data,revision) VALUES (?,?,?,1) ON CONFLICT(owner,id) DO NOTHING').bind(user.userId,entry.id,JSON.stringify(entry)).run():await env.DB!.prepare('UPDATE entries SET data=?,revision=? WHERE owner=? AND id=? AND revision=?').bind(JSON.stringify(entry),next,user.userId,entry.id,entry.revision).run();if(!result.meta.changes)return json({error:'Карточка изменена в другом окне. Скопируй свой текст, закрой карточку и нажми «Обновить».'},409);return json({entry:{...entry,revision:next}});}catch{return json({error:'Не удалось сохранить. Текст остался в форме — попробуй ещё раз.'},503);}
}

