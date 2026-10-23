import {getChatGPTUser} from '../../chatgpt-auth';
import {env} from 'cloudflare:workers';
import {readProjects,writeProject} from '../../../lib/atlas-store';
import {json,readBody,assertOrigin,failure} from '../../../lib/atlas-http';
export const dynamic='force-dynamic';
export async function GET(){const u=await getChatGPTUser();if(!u)return json({error:'Нужно войти.'},401);try{return json({projects:await readProjects(env.DB!,u.userId)});}catch(e){return failure(e);}}
export async function PUT(r:Request){const u=await getChatGPTUser();if(!u)return json({error:'Нужно войти.'},401);try{assertOrigin(r);return json({project:await writeProject(env.DB!,u.userId,await readBody(r))});}catch(e){return failure(e);}}
