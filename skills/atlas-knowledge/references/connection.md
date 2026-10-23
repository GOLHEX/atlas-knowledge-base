# Connect to Atlas

Site: https://tool-atlas-kb-oct22.chicguppy1.chatgpt.site/

Remote MCP endpoint: https://tool-atlas-kb-oct22.chicguppy1.chatgpt.site/mcp

## ChatGPT / Codex

Use the personal Atlas plugin provisioned by Sites. Install/connect it from Plugins → Personal → Created by you. Do not create a duplicate plugin or a local MCP configuration for that connection. If installed tools are missing, start a new chat. Verify using `atlas_get_context` and `atlas_search`.

## Claude

Use a client supporting remote HTTP MCP and the endpoint above. Authenticate with the same account authorized for this private Site. Client-side OAuth compatibility must be verified; a copied URL is not a successful connection.

Claude Code configuration:

```sh
claude mcp add --transport http --scope user atlas https://tool-atlas-kb-oct22.chicguppy1.chatgpt.site/mcp
```

Then use `/mcp` to connect and verify with `atlas_get_context`. In Claude clients with a custom remote connector UI, enter the MCP URL there. If the client cannot complete the Site's OAuth flow, report the failure; do not bypass privacy or forge identity headers. A JSON export can still be used as a snapshot, with proposed cards returned for import.

## Resource schema

`atlas_add_resource` accepts `{agent, resource}`. Required resource fields: `name`, `url`, `type`, `category`, `summary`, `tags`, `use`, `needs`, `limits`, `start`, `platform`, `cost`, `license`, `checked`, `sources`, `relevance`.

- `type`: `Навыки`, `Приложение`, `Онлайн-сервис`, `Библиотека`.
- Prefer categories: `AI-агенты`, `Видео и YouTube`, `Контент-стратегия`, `Исследования`, `Карты и миры`, `Локальные модели`, `Разработка`, `Облако и серверы`.
- `checked`: date `YYYY-MM-DD`; `sources`: at least one `{label,url}`.
- `relevance`: `{horizon,project,reason}` with a concrete reason of at least 10 characters.
- Unknown cost/license/requirements should be marked as unknown, not fabricated. Tool schemas enforce field length limits.
- ID, initial status, notes, revision and provenance timestamp are assigned by the server.

`atlas_enrich_resource` accepts `{id,revision,patch}`. It can change descriptive fields, sources and relevance; it cannot change personal notes, status, favorite, URL, name or creation provenance.

`atlas_search` accepts query/category/type/status/horizon/project, offset, limit (1–50), includeArchived. Search results are summaries; `atlas_get_resource({id})` returns full details.
