import { getChatGPTUser } from '../../chatgpt-auth';
import { env } from 'cloudflare:workers';
import { readContext, writeContext } from '../../../lib/atlas-store';
import { json, readBody, assertOrigin, failure } from '../../../lib/atlas-http';
export const dynamic='force-dynamic';
export async function GET(){const user=await getChatGPTUser();if(!user)return json({error:'Нужно войти в аккаунт.'},401);try{return json({context:await readContext(env.DB!,user.userId)});}catch(error){return failure(error);}}
export async function PUT(request:Request){const user=await getChatGPTUser();if(!user)return json({error:'Нужно войти в аккаунт.'},401);try{assertOrigin(request);return json({context:await writeContext(env.DB!,user.userId,await readBody(request))});}catch(error){return failure(error);}}
