import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/create-payment-intent":
        "https://authentic-afrobeats-full-stack-project-server.vercel.app/",
      "/orders":
        "https://authentic-afrobeats-full-stack-project-server.vercel.app/",
      "/order":
        "https://authentic-afrobeats-full-stack-project-server.vercel.app/",
    },
  },
});
