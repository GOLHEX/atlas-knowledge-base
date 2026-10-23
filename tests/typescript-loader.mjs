import fs from 'node:fs/promises';
import ts from 'typescript';
export async function resolve(specifier,context,nextResolve){
 if(specifier==='cloudflare:workers')return {url:'data:text/javascript,export const env = globalThis.__atlasTestEnv;',shortCircuit:true};
 try{return await nextResolve(specifier,context);}catch(error){if(specifier.startsWith('.')&&!/\.[a-z]+$/i.test(specifier))return nextResolve(specifier+'.ts',context);throw error;}
}
export async function load(url,context,nextLoad){
 if(url.endsWith('.ts')&&!url.includes('/node_modules/'))return {format:'module',shortCircuit:true,source:ts.transpileModule(await fs.readFile(new URL(url),'utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText};
 return nextLoad(url,context);
}
