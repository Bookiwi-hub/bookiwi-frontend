/* eslint-disable import/no-unresolved */
import { resolve } from "node:path";

import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite({ autoCodeSplitting: true }), viteReact()],
  test: {
    globals: true,
    environment: "jsdom",
  },
  build: {
    outDir: "dist",
  },
  resolve: {
    alias: {
      "#": resolve(__dirname, "./src"),
    },
  },
  server: {
    hmr: {
      // ngrok 터널을 통한 HMR 허용
      clientPort: 443,
    },
    // 모든 호스트 접근 허용 (ngrok 포함)
    host: true,
    // 특정 호스트 허용
    cors: true,
    allowedHosts: "all",
  },
});
