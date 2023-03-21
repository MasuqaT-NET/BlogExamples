import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    react(),
    federation({
      name: "team_with_originjs_vite_plugin_federation",
      filename: "entry.js",
      exposes: {
        "./OriginjsComponent": "./src/OriginjsComponent.tsx",
      },
      remotes: {
        team_with_webpack: "http://localhost:8080/entry.js",
      },
    }),
  ],
});
