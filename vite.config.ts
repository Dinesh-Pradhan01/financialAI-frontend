// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    server: {
      // Proxy /api/* through the Vite dev-server to the Railway backend.
      // The browser sees all requests as same-origin (localhost:8080) so
      // there are zero CORS / preflight issues regardless of the backend's
      // allowed-origins list. No local FastAPI instance is required.
      proxy: {
        "/api": {
          target: "https://financialai-backend-production.up.railway.app",
          changeOrigin: true,
          secure: true,
        },
        // Also proxy /docs and /redoc for convenience during development
        "/docs": {
          target: "https://financialai-backend-production.up.railway.app",
          changeOrigin: true,
          secure: true,
        },
      },
    },
  },
});
