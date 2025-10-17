import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // Разрешаем подключение с ngrok
    allowedHosts: ["12dcf00ffe93.ngrok-free.app"],
    // Для удобства разработки можно разрешить все хосты
    // allowedHosts: 'all',
  },
});
