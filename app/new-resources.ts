import type { Entry } from './data';

const defaults = { notes: '', status: 'В коллекции', favorite: false, revision: 0, checked: '2026-10-23' };

export const newResources: Entry[] = [
  { ...defaults, ...{
  "id": "everything-toolbar",
  "name": "EverythingToolbar",
  "url": "https://github.com/srwi/EverythingToolbar",
  "type": "Приложение",
  "category": "Разработка",
  "license": "MIT у EverythingToolbar; включённые компоненты — см. LICENSE",
  "summary": "Быстрый поиск файлов через Everything прямо с панели задач Windows.",
  "tags": [
    "Windows",
    "поиск файлов",
    "Everything",
    "панель задач",
    "продуктивность",
    "search"
  ],
  "use": "Быстро находить исходники, документы и материалы проектов, копировать пути и открывать файлы нужным приложением. Подходит для повседневной работы на Windows рядом с редактором и агентом.",
  "needs": "Windows 10/11, .NET Desktop Runtime 8.0+ и установленный, запущенный Everything версии 1.4.1 или новее. Everything Lite не поддерживается.",
  "limits": "Это приложение для Windows, а не пакет для WSL. Индексация файлов зависит от настроек Everything; поиск внутри файловой системы WSL здесь не проверялся. Установка и работа на твоём компьютере не тестировались.",
  "start": "1. Установи и запусти обычный Everything с voidtools.com.\n2. Установи .NET Desktop Runtime 8.0+.\n3. Для Windows 11 в PowerShell:\nwinget install srwi.everythingtoolbar.launcher\n4. Пройди мастер и выбери поле поиска или значок панели задач.\n5. Для Windows 10 смотри вариант Deskband в README.",
  "platform": "Windows 10 / 11",
  "cost": "Открытый код; отдельная платная подписка для Toolbar не требуется",
  "sources": [
    {
      "label": "README: требования и установка",
      "url": "https://github.com/srwi/EverythingToolbar/blob/develop/README.md"
    },
    {
      "label": "Лицензии компонентов",
      "url": "https://github.com/srwi/EverythingToolbar/blob/develop/LICENSE"
    }
  ],
  "relevance": {
    "horizon": "Сейчас",
    "project": "Рабочая среда Windows",
    "reason": "Ресурс добавлен пользователем; помогает находить файлы и материалы проектов."
  },
  "addedBy": "user",
  "addedAt": "2026-10-23"
} },
  { ...defaults, ...{
  "id": "witr",
  "name": "witr",
  "url": "https://github.com/pranshuparmar/witr",
  "type": "Приложение",
  "category": "Разработка",
  "license": "Apache-2.0",
  "summary": "Объясняет, кто запустил процесс, что занимает порт и какой сервис или контейнер за этим стоит.",
  "tags": [
    "диагностика",
    "процессы",
    "порты",
    "WSL2",
    "CLI",
    "JSON",
    "DevOps",
    "agent skill"
  ],
  "use": "Разобраться с занятым портом, забытым dev-сервером или перезапускающимся контейнером. JSON-вывод и официальный навык помогают агенту опираться на диагностику системы.",
  "needs": "Бинарник под свою ОС. Для контейнеров нужен соответствующий runtime CLI в PATH. Подробности чужих процессов могут требовать sudo или прав администратора.",
  "limits": "Возможности отличаются по ОС. В WSL порт может принадлежать процессу другой дистрибуции; полный источник запуска не всегда удаётся восстановить. Код выхода 1 означает найденный процесс с предупреждениями, а не сбой. На этой машине не тестировался.",
  "start": "Windows:\nwinget install -e --id PranshuParmar.witr\n\nПосле установки:\nwitr --port 5173 --json\nwitr node --json\nwitr --pid 1234 --tree\n\nДля Ubuntu 22.04 выбери Linux-бинарник из Releases или способ установки из README: apt-вариант в README рассчитан на Ubuntu 26.04+.\nНавык агента: plugins/witr/skills/witr; бинарник устанавливается отдельно.",
  "platform": "Linux / WSL / Windows / macOS / FreeBSD",
  "cost": "Открытый код; диагностика локальная",
  "sources": [
    {
      "label": "README, JSON и агентный навык",
      "url": "https://github.com/pranshuparmar/witr/blob/main/README.md"
    },
    {
      "label": "Релизы",
      "url": "https://github.com/pranshuparmar/witr/releases"
    }
  ],
  "relevance": {
    "horizon": "Сейчас",
    "project": "Разработка и WSL",
    "reason": "Диагностика dev-серверов и портов может помочь при работе над Атласом и другими локальными проектами."
  },
  "addedBy": "user",
  "addedAt": "2026-10-23"
} },
  { ...defaults, ...{
  "id": "boardui",
  "name": "BoardUI",
  "url": "https://github.com/BoardUI/boardui",
  "type": "Библиотека",
  "category": "Разработка",
  "license": "MIT у бесплатного репозитория",
  "summary": "React-компоненты для AI-интерфейсов и панелей: чат, журнал агента, таблицы, формы и общие дизайн-токены.",
  "tags": [
    "React",
    "UI",
    "дизайн-система",
    "Tailwind",
    "MCP",
    "Claude",
    "GPT",
    "прототип"
  ],
  "use": "Ускорить прототипирование собственных AI-продуктов и админок. Компоненты копируются в проект как исходники; официальный MCP помогает агенту выбирать и добавлять нужные элементы.",
  "needs": "React/Next.js-проект, Node.js/npm; используются Tailwind CSS v4 и React Aria Components. Для рабочего AI-чата нужен собственный серверный API-ключ провайдера.",
  "limits": "Репозиторий содержит бесплатную часть системы. MCP, навык и готовый чат заявлены автором; интеграция с Атласом или твоим проектом не тестировалась. Демо-чат с ключом доступен посетителям его URL — перед публикацией нужны контроль доступа и лимиты расходов.",
  "start": "Посмотреть каталог компонентов:\nnpx boardui@latest list\n\nДобавить компонент в Next.js-проект:\nnpx boardui@latest add data-table\n\nОфициальный MCP для Claude Code:\nclaude mcp add boardui -- npx -y boardui@latest mcp\n\nДля чата: скопируй .env.example в .env.local и настрой AI_API_KEY на сервере; другие клиенты — по boardui.com/mcp.",
  "platform": "React / Next.js; MCP для поддерживаемых агентов",
  "cost": "Бесплатный репозиторий MIT; модель, хостинг и платные предложения BoardUI отдельно",
  "sources": [
    {
      "label": "README: компоненты, ключи и MCP",
      "url": "https://github.com/BoardUI/boardui/blob/main/README.md"
    },
    {
      "label": "MIT License",
      "url": "https://github.com/BoardUI/boardui/blob/main/LICENSE"
    },
    {
      "label": "Настройка MCP",
      "url": "https://www.boardui.com/mcp"
    }
  ],
  "relevance": {
    "horizon": "Прототип",
    "project": "Атлас и интерфейсы AI-продуктов",
    "reason": "Близкий по назначению пример UI-компонентов, чата и подключения инструментов для агентов."
  },
  "addedBy": "user",
  "addedAt": "2026-10-23"
} },
  { ...defaults, ...{
  "id": "rybbit",
  "name": "Rybbit",
  "url": "https://github.com/rybbit-io/rybbit",
  "type": "Приложение",
  "category": "Исследования",
  "license": "AGPL-3.0",
  "summary": "Веб- и продуктовая аналитика: события, воронки, удержание, пути пользователей и записи сессий.",
  "tags": [
    "аналитика",
    "self-hosted",
    "метрики",
    "воронки",
    "MCP",
    "продукт",
    "retention"
  ],
  "use": "Понять, как используют создаваемый продукт, найти точки оттока и оценить изменения. Официальный MCP позволяет подключённому агенту читать аналитику и выполнять разрешённые операции.",
  "needs": "Для облака — аккаунт; для self-host — Docker на VPS, домен и HTTPS. Руководство рекомендует от 2 ГБ RAM; проверено авторами на Ubuntu 24 LTS x86_64. Для ARM указан минимум ARMv8.2-A.",
  "limits": "Облако и self-host имеют разный набор функций: Web Vitals в README обозначены как cloud-only. Заявленная работа без cookies не отменяет настройки собираемых данных. Развёртывание, трекинг и MCP здесь не подключались.",
  "start": "1. Посмотри демо и выбери облако или собственный сервер.\n2. Для self-host следуй официальному Quick start: Docker, DNS, clone, setup.sh с твоим доменом.\n3. Добавь сайт и его tracking script.\n4. Для агента открой документацию MCP: OAuth или отдельный API-ключ с нужными scopes.\n5. Начни с чтения метрик и сверки результатов с панелью.",
  "platform": "Веб-панель; Linux / Docker для self-host",
  "cost": "Self-host: расходы на сервер и домен; облако — по текущему тарифу",
  "sources": [
    {
      "label": "README и доступные функции",
      "url": "https://github.com/rybbit-io/rybbit/blob/master/README.md"
    },
    {
      "label": "Self-host: требования и запуск",
      "url": "https://rybbit.com/docs/self-hosting"
    },
    {
      "label": "MCP: клиенты и права доступа",
      "url": "https://rybbit.com/docs/mcp"
    }
  ],
  "relevance": {
    "horizon": "Скоро",
    "project": "Веб-продукты",
    "reason": "Может пригодиться после запуска продукта для проверки востребованности функций; потребность в аналитике пока не подтверждена."
  },
  "addedBy": "user",
  "addedAt": "2026-10-23"
} },
  { ...defaults, ...{
  "id": "red-blob-games",
  "name": "Red Blob Games",
  "url": "https://www.redblobgames.com/",
  "type": "Онлайн-сервис",
  "category": "Карты и миры",
  "license": "Код примеров — MIT или Apache-2.0; проверяй конкретный проект",
  "summary": "Интерактивные объяснения алгоритмов: поиск пути, гексагональные сетки, генерация карт и геометрия.",
  "tags": [
    "алгоритмы",
    "A*",
    "pathfinding",
    "гексагональная сетка",
    "генерация карт",
    "gamedev",
    "прототип"
  ],
  "use": "Визуально разобраться в алгоритме перед реализацией игры, карты или симуляции. Агенту можно дать конкретное руководство как технический ориентир для собственного прототипа.",
  "needs": "Браузер для чтения и экспериментов; язык и инструменты разработки для переноса алгоритма в свой проект.",
  "limits": "Это образовательная коллекция и демонстрации, а не единый готовый игровой движок. Условия кода проверяются у конкретного примера; тексты и иллюстрации не следует автоматически считать лицензированными как код.",
  "start": "1. Открой Introduction to A* или Hexagonal grid reference.\n2. Измени параметры интерактивной схемы и проверь поведение.\n3. Перейди к implementation guide.\n4. Дай агенту ссылку и задачу: адаптировать алгоритм к твоим данным, объяснить ограничения и проверить на небольших примерах.",
  "platform": "В браузере; материалы для разработчиков",
  "cost": "Статьи доступны бесплатно, без регистрации и рекламы",
  "sources": [
    {
      "label": "Официальный сайт: разделы и условия кода",
      "url": "https://www.redblobgames.com/"
    },
    {
      "label": "Введение в A*",
      "url": "https://www.redblobgames.com/pathfinding/a-star/introduction.html"
    },
    {
      "label": "Гексагональные сетки",
      "url": "https://www.redblobgames.com/grids/hexagons/"
    }
  ],
  "relevance": {
    "horizon": "На будущее",
    "project": "Карты и миры",
    "reason": "Связан с уже выбранными пользователем Inkarnate и Fantasy Map Generator; применимость к собственной игре — гипотеза."
  },
  "addedBy": "user",
  "addedAt": "2026-10-23"
} },
  { ...defaults, ...{
  "id": "mirofish",
  "name": "MiroFish",
  "url": "https://github.com/666ghj/MiroFish",
  "type": "Приложение",
  "category": "AI-агенты",
  "license": "AGPL-3.0",
  "summary": "Многоагентная песочница: строит персонажей и связи из материалов, моделирует взаимодействия и выпускает отчёт.",
  "tags": [
    "multi-agent",
    "симуляция",
    "сценарии",
    "GraphRAG",
    "OASIS",
    "Zep",
    "прототип"
  ],
  "use": "Исследовать сценарии «что если», моделировать реакции условных персонажей или изучать архитектуру многоагентного продукта. Полезен как прототип для систем с памятью, графом связей и отчётным агентом.",
  "needs": "По README: Node.js 18+, Python 3.11–3.12, uv; API модели в формате OpenAI SDK и ZEP_API_KEY. Есть Docker-вариант. Модели и облачная память требуют собственных учётных данных.",
  "limits": "Заявления автора о предсказании будущего не являются подтверждением точности. Результаты — модельные сценарии, зависящие от исходных данных и LLM. README предупреждает о высоком расходе API и советует сначала меньше 40 раундов. На твоей WSL запуск не проверялся.",
  "start": "После клонирования проекта:\ncp .env.example .env\n\nВ .env настрой LLM_API_KEY, LLM_BASE_URL, LLM_MODEL_NAME и ZEP_API_KEY.\nnpm run setup:all\nnpm run dev\n\nFrontend: http://localhost:3000\nBackend: http://localhost:5001\nНачни с небольшого набора материалов и короткой симуляции; сравни выводы с исходными предположениями.",
  "platform": "Node.js + Python; Docker-вариант",
  "cost": "Код открытый; LLM API, Zep и вычислительные ресурсы оплачиваются по их условиям",
  "sources": [
    {
      "label": "README: архитектура, требования и запуск",
      "url": "https://github.com/666ghj/MiroFish/blob/main/README.md"
    },
    {
      "label": "AGPL License",
      "url": "https://github.com/666ghj/MiroFish/blob/main/LICENSE"
    },
    {
      "label": "Демо сценария",
      "url": "https://666ghj.github.io/mirofish-demo/"
    }
  ],
  "relevance": {
    "horizon": "Прототип",
    "project": "Многоагентные приложения",
    "reason": "Архитектурный ориентир для систем с несколькими агентами; конкретный проект симулятора пользователем не заявлен."
  },
  "addedBy": "user",
  "addedAt": "2026-10-23"
} }
];
