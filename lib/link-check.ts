// Restrict server-side requests to known public source hosts; every redirect is checked again.
const hosts=new Set(['github.com','www.redblobgames.com','redblobgames.com','inkarnate.com','www.inkarnate.com','azgaar.github.io','puter.com','www.puter.com']);
export function allowedLink(value:string){try{const u=new URL(value);return u.protocol==='https:'&&!u.username&&!u.password&&(!u.port||u.port==='443')&&hosts.has(u.hostname);}catch{return false;}}
export async function checkLink(value:string,request:typeof fetch=fetch){
 let url=value;const date=new Date().toISOString();
 for(let hop=0;hop<4;hop++){
  if(!allowedLink(url))return {state:'Не проверено',detail:'Этот адрес вне списка поддерживаемых источников. Открой ссылку вручную.',date};
  try{const r=await request(url,{method:'HEAD',redirect:'manual',signal:AbortSignal.timeout(6000)});
   if([301,302,303,307,308].includes(r.status)){const location=r.headers.get('location');if(!location)break;url=new URL(location,url).href;continue;}
   return {state:r.ok?'Доступна':[404,410].includes(r.status)?'Не найдена':'Не подтверждено',detail:`HTTP ${r.status}. ${r.ok?'Сервер отвечает; содержание и работоспособность инструмента не проверялись.':'Ответ может зависеть от защиты сайта или временной ошибки.'}`,date};
  }catch{return {state:'Не подтверждено',detail:'Не удалось получить ответ. Возможна временная ошибка или тайм-аут.',date};}
 }
 return {state:'Не подтверждено',detail:'Слишком много перенаправлений или нет адреса перехода.',date};
}
