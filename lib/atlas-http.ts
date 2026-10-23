import { AtlasError } from './atlas-store';
import { ZodError } from 'zod';
export const json=(data:unknown,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store'}});
export async function readBody(request:Request) {
 const reader=request.body?.getReader();if(!reader)throw new AtlasError('Пустой запрос.');
 let size=0;const chunks:Uint8Array[]=[];
 try {while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>100000){await reader.cancel();throw new AtlasError('Запрос слишком большой.',413);}chunks.push(value);}} finally {reader.releaseLock();}
 const bytes=new Uint8Array(size);let at=0;for(const chunk of chunks){bytes.set(chunk,at);at+=chunk.length;}
 try{return JSON.parse(new TextDecoder().decode(bytes));}catch{throw new AtlasError('Неверный JSON.');}
}
export function assertOrigin(request:Request) {
 const origin=request.headers.get('origin');
 if(origin&&origin!==new URL(request.url).origin)throw new AtlasError('Недопустимый источник запроса.',403);
}
export function failure(error:unknown) {
 if(error instanceof AtlasError)return json({error:error.message},error.status);
 if(error instanceof ZodError)return json({error:'Проверь поля запроса.',fields:error.issues.map(x=>({path:x.path.join('.'),message:x.message}))},400);
 return json({error:'База временно недоступна. Попробуй ещё раз.'},503);
}
