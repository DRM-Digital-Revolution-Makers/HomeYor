import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      // Разрешаем подключение с ngrok
      allowedHosts: ["9d3bf5ed6ce0.ngrok-free.app"],
      // Для удобства разработки можно разрешить все хосты
      // allowedHosts: 'all',
    },
    define: {
      // Прокидываем SUPABASE_* из .env в import.meta.env (НЕБЕЗОПАСНО для service role)
      "import.meta.env.SUPABASE_URL": JSON.stringify(env.SUPABASE_URL),
      "import.meta.env.SUPABASE_SERVICE_ROLE_KEY": JSON.stringify(env.SUPABASE_SERVICE_ROLE_KEY),
      // Фолбэки на VITE_* для совместимости, если решите использовать безопасные клиентские ключи
      "import.meta.env.VITE_SUPABASE_URL": JSON.stringify(env.VITE_SUPABASE_URL || env.SUPABASE_URL || ""),
      "import.meta.env.VITE_SUPABASE_ANON_KEY": JSON.stringify(env.VITE_SUPABASE_ANON_KEY || ""),
    },
  }
})
