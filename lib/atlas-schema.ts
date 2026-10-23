import { z } from 'zod';

export const horizons = ['Сейчас', 'Скоро', 'На будущее', 'Прототип'] as const;
export const resourceTypes = ['Навыки','Приложение','Онлайн-сервис','Библиотека'] as const;
export const resourceStatuses = ['В коллекции','Хочу попробовать','Использую','Архив','Предложено агентом'] as const;
const short = z.string().max(300);
const url = z.string().url().max(2000).refine(value => {
 try { const parsed = new URL(value); return ['http:', 'https:'].includes(parsed.protocol) && !parsed.username && !parsed.password; } catch { return false; }
}, 'Нужна ссылка http(s) без логина и пароля.');
export const relevanceSchema = z.object({horizon:z.enum(horizons),project:short,reason:z.string().max(3000)});
export const entrySchema = z.object({
 id:z.string().regex(/^[a-zA-Z0-9_-]{1,100}$/),name:short.min(1),url,type:z.enum(resourceTypes),category:short.min(1),
 summary:z.string().max(2000),tags:z.array(short).max(30),use:z.string().max(10000),needs:z.string().max(10000),
 limits:z.string().max(10000),start:z.string().max(15000),platform:short,cost:z.string().max(2000),license:short,checked:short,
 sources:z.array(z.object({label:short,url})).max(20),notes:z.string().max(20000),status:z.enum(resourceStatuses),
 favorite:z.boolean(),revision:z.number().int().min(0),relevance:relevanceSchema.optional(),addedBy:short.optional(),addedAt:short.optional(),
});
export const proposalSchema = entrySchema.omit({id:true,notes:true,status:true,favorite:true,revision:true,addedBy:true,addedAt:true}).extend({
 summary:z.string().min(10).max(2000),
 sources:z.array(z.object({label:short.min(1),url})).min(1).max(20),
 checked:z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
 relevance:relevanceSchema.extend({reason:z.string().min(10).max(3000)}),
}).strict();
export const enrichmentSchema = proposalSchema.omit({name:true,url:true,type:true,category:true}).partial().strict().refine(x=>Object.keys(x).length>0,'Нужны изменённые поля.');
export const contextSchema = z.object({
 activities:z.string().max(5000),projects:z.string().max(8000),plans:z.string().max(5000),constraints:z.string().max(5000),
 revision:z.number().int().min(0),
});
export type AtlasContext = z.infer<typeof contextSchema>;
export const emptyContext:AtlasContext = {activities:'',projects:'',plans:'',constraints:'',revision:0};

export function canonicalUrl(value:string) {
 const u=new URL(value);u.hash='';
 u.hostname=u.hostname.toLowerCase();
 u.pathname=u.pathname.replace(/\/+$/,'').replace(/\.git$/i,'');
 if(u.hostname==='github.com')u.pathname=u.pathname.toLowerCase();
 // Preserve path case and query parameters on sites where they identify distinct resources.
 return u.toString().replace(/\/$/,'');
}
export function latin(value:string) {
 const alphabet:Record<string,string>={а:'a',б:'b',в:'v',г:'g',д:'d',е:'e',ё:'e',ж:'zh',з:'z',и:'i',й:'y',к:'k',л:'l',м:'m',н:'n',о:'o',п:'p',р:'r',с:'s',т:'t',у:'u',ф:'f',х:'h',ц:'ts',ч:'ch',ш:'sh',щ:'sch',ъ:'',ы:'y',ь:'',э:'e',ю:'yu',я:'ya'};
 return value.toLowerCase().split('').map(c=>alphabet[c]??c).join('');
}
