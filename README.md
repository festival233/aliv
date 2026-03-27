```txt
npm install
npm run dev
```

```txt
npm run deploy
```

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```txt
npm run cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiation `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```

## Cloudflare Pages deployability guardrails

When making changes, keep Cloudflare Pages deployment compatibility intact:

- Keep `wrangler.json` Pages-compatible and avoid unsupported fields.
- Keep `npm run build` working.
- Keep the output directory as `dist`.
