```txt
npm install
npm run dev
```

```txt
npm run deploy
```

Cloudflare Pages (Git integration) build settings:

```txt
Framework preset: Vite
Build command: npm run build
Output directory: dist
Root directory: /
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
