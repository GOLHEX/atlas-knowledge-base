import fs from 'node:fs';
import ts from 'typescript';
const compiled=ts.transpileModule(fs.readFileSync('app/new-resources.ts','utf8').replace(/import type \{ Entry \} from '.\/data';/, '') + '\n' + fs.readFileSync('app/additional.ts','utf8') + '\n' + fs.readFileSync('app/data.ts','utf8').replace(/import \{ additional \} from '.\/additional';/, '').replace(/import \{ newResources \} from '.\/new-resources';/, ''),{compilerOptions:{module:ts.ModuleKind.ESNext}}).outputText;
const {seed}=await import('data:text/javascript;base64,'+Buffer.from(compiled).toString('base64'));
fs.mkdirSync('../outputs',{recursive:true});
fs.writeFileSync('../outputs/atlas-backup.json',JSON.stringify({version:1,exportedAt:'2026-10-23',entries:seed},null,2));
let md='# Атлас инструментов\n\nПроверено по источникам: 22–23.10.2026. Инструменты не устанавливались и не запускались.\n\n';
md+='Онлайн-база: https://tool-atlas-kb-oct22.chicguppy1.chatgpt.site\n\n';
md+='## Как пользоваться\n\nИщи по названию, задаче, тегам и заметкам. Сохраняй избранное и статусы. Новые ссылки можно добавлять через «Добавить ресурс» или присылать в этот чат для изучения и обновления базы. JSON-экспорт содержит личные заметки; импорт добавляет отсутствующие карточки и не перезаписывает существующие.\n\n';
for(const e of seed){md+=`## ${e.name}\n\n**${e.type} · ${e.category}**\n\n${e.summary}\n\n**Когда использовать:** ${e.use}\n\n**Нужно:** ${e.needs}\n\n**Среда:** ${e.platform}\n\n**Стоимость:** ${e.cost}\n\n**Ограничения:** ${e.limits}\n\n### Как начать\n\n\`\`\`text\n${e.start}\n\`\`\`\n\n**Источники:** ${e.sources.map(s=>`[${s.label}](${s.url})`).join(', ')}\n\n`;}
md+='## Предлагаемый процесс\n\n1. Social Media Research Skills — исследование аудитории и конкурентов.\n2. YouTube Agent Skill — сценарий, заголовок и обложка.\n3. MoneyPrinterTurbo — сборка видео.\n4. Cheat on Content — прогнозы и разбор фактических результатов.\n\nЭто организационная схема; готовая автоматическая интеграция между этими проектами не проверена. Hermes — отдельная среда агента, Inkarnate — редактор карт.\n';
fs.writeFileSync('../outputs/atlas-knowledge.md',md);
console.log('Baseline exported: ' + seed.length + ' entries, JSON + Markdown.');
