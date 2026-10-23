import { env } from 'cloudflare:workers';
import { z } from 'zod';
import { atlasTools, atlasInstructions, callAtlasTool } from '../../lib/atlas-tools';
import { AtlasError } from '../../lib/atlas-store';
import { readBody, assertOrigin, json } from '../../lib/atlas-http';
export const dynamic='force-dynamic';
const versions=['2026-07-28','2025-11-25','2025-06-18','2025-03-26','2024-11-05'];
const envelope=z.object({jsonrpc:z.literal('2.0'),id:z.union([z.string(),z.number(),z.null()]).optional(),method:z.string(),params:z.record(z.unknown()).optional()});
export async function POST(request:Request) {
 let message;
 try {assertOrigin(request);message=envelope.parse(await readBody(request));}catch(error){return json({jsonrpc:'2.0',id:null,error:{code:error instanceof AtlasError&&error.status===413?-32600:-32700,message:'Invalid or oversized request'}},error instanceof AtlasError?error.status:400);}
 const {id,method,params={}}=message;
 const reply=(result:unknown)=>json({jsonrpc:'2.0',id:id??null,result});
 if(method.startsWith('notifications/'))return new Response(null,{status:202});
 if(id===undefined)return json({jsonrpc:'2.0',id:null,error:{code:-32600,message:'Request id required'}},400);
 if(method==='server/discover')return reply({supportedVersions:versions,capabilities:{tools:{}},serverInfo:{name:'atlas',version:'2.0.0'},instructions:atlasInstructions});
 if(method==='initialize')return reply({protocolVersion:versions.includes(String(params.protocolVersion))?params.protocolVersion:'2025-06-18',capabilities:{tools:{}},serverInfo:{name:'atlas',version:'2.0.0'},instructions:atlasInstructions});
 if(method==='ping')return reply({});
 if(method==='tools/list')return reply({tools:atlasTools});
 if(method!=='tools/call')return json({jsonrpc:'2.0',id,error:{code:-32601,message:'Method not found'}});
 // Hosted dispatch verifies the identity header. Never accept owner IDs in tool arguments.
 const owner=request.headers.get('oai-authenticated-user-id');
 if(!owner)return json({jsonrpc:'2.0',id,error:{code:-32001,message:'Sign in to Atlas to use its tools.'}},401);
 try {
  const p=z.object({name:z.string(),arguments:z.record(z.unknown()).default({})}).passthrough().parse(params);
  const result=await callAtlasTool(env.DB!,owner,p.name,p.arguments);
  return reply({content:[{type:'text',text:JSON.stringify(result)}],structuredContent:result,isError:false});
 }catch(error){const message=error instanceof AtlasError?error.message:error instanceof z.ZodError?'Invalid arguments: '+error.issues.map(i=>i.path.join('.')+': '+i.message).join('; '):'Atlas database unavailable. Retry later.';return reply({content:[{type:'text',text:message}],isError:true});}
}
// Stateless Streamable HTTP: clients should use POST; no event stream or session to delete.
export async function GET(){return new Response(null,{status:405,headers:{Allow:'POST'}});}
export async function DELETE(){return new Response(null,{status:405,headers:{Allow:'POST'}});}
