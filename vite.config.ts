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
        name: "Fresh Market Prices",
        short_name: "Fresh Prices",
        description: "Fresh Market Prices is a web application that helps you to get the latest prices of fresh products.",
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
  },
  preview: {
    port: 5173,
  },
});
