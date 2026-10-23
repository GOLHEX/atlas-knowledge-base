import {env} from 'cloudflare:workers';
import {z} from 'zod';
import {getChatGPTUser} from '../../chatgpt-auth';
import {readEntries} from '../../../lib/atlas-store';
import {json,readBody,assertOrigin,failure} from '../../../lib/atlas-http';
import {checkLink} from '../../../lib/link-check';
export async function POST(request:Request){const user=await getChatGPTUser();if(!user)return json({error:'Нужно войти.'},401);try{assertOrigin(request);const {id}=z.object({id:z.string().max(100)}).strict().parse(await readBody(request));const entry=(await readEntries(env.DB!,user.userId)).find(e=>e.id===id);if(!entry)return json({error:'Ресурс не найден.'},404);return json({check:await checkLink(entry.url)});}catch(e){return failure(e);}}
