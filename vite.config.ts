import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mockServer from "vite-plugin-mock-server";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",

      manifest: {
        name: "Plan A Visit",
        short_name: "Plan A Visit",
        description: "Plan A Visit",
        theme_color: "#ffffff",

        icons: [
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },

      devOptions: {
        enabled: true,
      },
    }),
    mockServer(),
  ],
  resolve: {
    alias: {
      "@merlin-ui-kit": "merlin-ui-kit/dist",
    },
  },
  preview: {
    port: 5173,
  },
});
