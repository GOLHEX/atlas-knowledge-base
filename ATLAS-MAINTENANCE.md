# Atlas maintenance

Site project: appgprj_6ada7631fcdc819186db29f3140fd449
Private URL: https://tool-atlas-kb-oct22.chicguppy1.chatgpt.site

This checkout is the source of the user's knowledge base. New researched resources should be added to app/additional.ts (included by app/data.ts) with stable IDs and dated primary source links. GET merges these base records with user-owned D1 overrides. Never overwrite saved user notes when adding records. Existing user overrides take precedence over seed changes. To change an already edited live card, use the authenticated UI after reading its current contents.

GitHub source repository: https://github.com/GOLHEX/atlas-knowledge-base (private). GitHub push does not deploy the Site. Personal D1 records are not included in Git; use the authenticated UI export to back them up. See docs/AI-WORKFLOW.md for catalog maintenance with an agent.

Records, favorites, statuses and notes are stored in D1 by the stable authenticated user ID. No API keys should be saved in the knowledge base. New resources can also be added or edited in the UI. Import adds missing IDs/URLs; it does not overwrite current records. Concurrent updates use revisions and return a conflict instead of silently overwriting another tab.

Use the Sites skill for subsequent source updates and private publication. Preserve project ID and access. The Windows npm.cmd invocation in the plugin helper failed on this host. Verified portable fallback: node scripts/run-framework.mjs build. Dependency installation used the installed npm JS entrypoint and the starter install:ci script. Keep the existing lockfile.

Local auth simulation: /signin-with-chatgpt?return_to=/
Generate schema changes with drizzle-kit; do not edit applied migrations. Local and hosted databases are separate.
