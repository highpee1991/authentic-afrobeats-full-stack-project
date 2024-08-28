import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/create-payment-intent": "http://localhost:5000",
      "/orders": "http://localhost:5000",
      "/order": "http://localhost:5000",
    },
  },
});
