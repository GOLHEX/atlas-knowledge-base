import type {Entry} from '../app/data';
import {latin} from './atlas-schema';

// Transparent bilingual topic expansion. No embedding/model API and no private data leaves the app.
const concepts:[string,string[]][]=[
 ['Видео',['video','видео','монтаж','ролик','ffmpeg','shorts','reels','youtube','конвертация']],
 ['Интерфейсы',['ui','интерфейс','dashboard','панель','компонент','react','frontend','фронтенд']],
 ['Агенты',['agent','агент','mcp','навык','skill','claude','gpt','llm']],
 ['Карты и миры',['карта','карты','map','world','мир','hex','гекс','геометрия','pathfinding','поиск пути']],
 ['Диагностика',['debug','диагност','процесс','порт','port','process','отладка']],
 ['Аналитика',['analytics','аналитик','метрик','retention','удержание','воронк','funnel']],
 ['Серверы',['server','сервер','self-host','docker','облак','cloud','linux','wsl']],
 ['Почта',['email','почта','mail','smtp']],
];
const stop=new Set(['мне','нужен','нужна','нужно','для','и','или','в','на','с','как','найти','сделать','хочу','ищу','the','a','for','and','with','need','i','to','my'].map(latin));
export function matchResource(entry:Entry,query:string,mode:'exact'|'topics'='exact'){
 const normalize=(s:string)=>latin(s).replace(/[^a-z0-9]+/g,' ').trim();
 const hay=latin([entry.name,entry.summary,entry.category,...entry.tags,entry.use,entry.needs,entry.platform,entry.notes,entry.relevance?.project,entry.relevance?.reason,entry.experience?.task,entry.experience?.lesson,entry.url].join(' '));
 const terms=latin(query).trim().split(/\s+/).filter(Boolean);
 if(!terms.length)return {score:0,reasons:[] as string[]};
 if(mode==='exact')return terms.every(t=>hay.includes(t))?{score:terms.length,reasons:['Совпадение слов запроса']}:null;
 const contains=(text:string,word:string)=>word.length<=3?normalize(text).split(' ').includes(word):text.includes(word);
 const meaningful=normalize(query).split(' ').filter(t=>t.length>1&&!stop.has(t));
 const title=latin(entry.name+' '+entry.summary+' '+entry.tags.join(' '));
 let score=0;const reasons:string[]=[];
 for(const term of meaningful)if(contains(hay,term)){score+=contains(title,term)?4:1;reasons.push('Слово: '+term);}
 for(const [label,words] of concepts){const variants=words.map(latin);if(variants.some(w=>contains(latin(query),w))&&variants.some(w=>contains(hay,w))){score+=2;reasons.push('Тема: '+label);}}
 return score>0?{score,reasons:[...new Set(reasons)].slice(0,4)}:null;
}
export function freshness(entry:Entry,now=Date.now()){
 const parsed=Date.parse(entry.checked);if(!/^\d{4}-\d{2}-\d{2}$/.test(entry.checked)||!Number.isFinite(parsed))return 'Нет проверки';
 const days=Math.floor((now-parsed)/86400000);return days<0?'Проверь дату':days>90?'Пора перепроверить':'Проверено недавно';
}
