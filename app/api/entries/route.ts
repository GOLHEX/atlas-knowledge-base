import { getChatGPTUser } from '../../chatgpt-auth';
import { env } from 'cloudflare:workers';
import { readEntries, writeEntry } from '../../../lib/atlas-store';
import { json, readBody, assertOrigin, failure } from '../../../lib/atlas-http';
export const dynamic='force-dynamic';
export async function GET(){const user=await getChatGPTUser();if(!user)return json({error:'Войди в аккаунт, чтобы открыть базу.'},401);try{return json({entries:await readEntries(env.DB!,user.userId)});}catch(error){return failure(error);}}
export async function PUT(request:Request){const user=await getChatGPTUser();if(!user)return json({error:'Для сохранения нужно войти в аккаунт.'},401);try{assertOrigin(request);return json({entry:await writeEntry(env.DB!,user.userId,await readBody(request))});}catch(error){return failure(error);}}
