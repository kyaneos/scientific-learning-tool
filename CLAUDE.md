# ALWAYS Remember the Following

- Remember the User's Broad Goals which set the bigger picture for all of their queries:
  - We are developing web app to host an open source educational tool utilizing dual processing theory to enhance learning about research methods and cognitive psychology. Combines visual and verbal learning approaches for improved understanding and retention.
  - Our "tech-stack" is as follows:
    - We're using Svelte 5 for UI reactivity (runes syntax) and building a static site with SvelteKit
    - We're using Tailwindcss 4, DaisyUI, and Tailwind Typography for styles
- We're aiming for **simplicity** especially for new non-technical users. That means:
  - Picking good default css styles to avoid adding Tailwind when users don't need to (see src/app.css)
  - Using svelte-stores to share data easily across the app (see src/lib/stores.js)
  - Not over-engineering solutions or adopting "best practices" just because they're industry standard. This is a project that doesn't need to operate on a massive scale or with a large engeineering team. I always prefer simple solutions that get the job done reliably and robustly.
- Always answer user queries using the following process:
    1. Understand what the query is requesting and use your context7 mcp tool to gather additional information about any libraries relevant to the query or listed in @package.json. ALWAYS ask follow up questions if anything is ambiguous or unclear. Say "RESEARCHING" when you start this step, however, you can skip step if you feel like you have enough context, in which case say "PREVIOUS RESEARCH SUFFICIENT". 
    2. Use that information along with relevant code-base files to MAKE A PLAN for what exact changes needed to be made
    3. PRESENT THE PLAN to the user for review along with any additional questions you have that would help further clarify the plan. Do not write/change any code yet. Say "PLANNING" when you start this step.
    4. Wait for the user's feedback and update the plan. This may take several iteration cycles
    5. Once you have the user's explicit approval, say "EXECUTING" and implement the plan
    6. Provide the user with a succinct summary of what you did and ask them if there are any modifications they would like made
    7. Apply the requested modifications from the user. This may take several iteration cycles.
- Document and update DEVELOPMENT_LOG.md as needed. Periodically check and update.
- When pushing to GitHub, do not include the default "created with the help of Claude Code" or any adjacent messages.
- Don't use emojis in web app.
- Expect more courses and lessons in the future, so don't hardcode entries. Dynamic solutions should automatically scale with new content, eliminate manual maintenance, and prevent errors from forgetting to update the config.

## GitHub Pages Deployment Rules

**CRITICAL**: This site deploys to GitHub Pages at `/scientific-learning-tool` subdirectory, NOT the root domain. ALL paths must account for this:

- **ALWAYS use `base` from `$app/paths`** for internal links and asset paths
  - Links: `<a href="{base}/about">` NOT `<a href="/about">`
  - Images: `<img src="{base}/svg/logo.svg">` NOT `<img src="/svg/logo.svg">`
  - Data fetching: `` fetch(`${base}/data/courses.json`) `` NOT `fetch('/data/courses.json')`
  - Redirects: `` window.location.href = `${base}/` `` NOT `window.location.href = '/'`

- **Import base path at top of every component/page that uses links or assets:**
  ```typescript
  import { base } from '$app/paths';
  ```

- **Static Site Configuration:**
  - This is a client-side only app (no SSR) deployed to GitHub Pages
  - `src/routes/+layout.ts` has `export const ssr = false` and `export const prerender = true`
  - NO `+page.server.ts`, `+layout.server.ts`, or `hooks.server.ts` files - these break static builds
  - All auth and data fetching happens client-side using PocketBase

- **Testing locally:** In dev mode, `base` is empty string (''), in production it's '/scientific-learning-tool'

# ALWAYS FOLLOW THESE DEVELOPMENT RULES

- NEVER use `npm run dev` or other `npm` commands yourself. Always ask the user to run them instead
- ALWAYS use `npm run lint` after making code changes to check and fix formatting
- ALWAYS use `npm run format` to fix formatting related errors
- **Framework First:** Always work within existing jsPsych/Svelte patterns
- **Backward Compatibility:** Enhance existing functions rather than replace
- **Error Resilience:** Plan for missing files and server issues
- **User Experience:** Focus on simplicity and consistency
- **Documentation:** Update DEVELOPMENT_LOG.md log for all significant changes. Do not mark changes/updates as FINISHED or WORKING unless it has been verified by me/can run in npm run dev without breaking. If you are unsure, ask.