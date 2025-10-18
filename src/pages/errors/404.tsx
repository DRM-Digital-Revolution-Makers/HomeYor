import { Link } from "@tanstack/react-router";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-50 text-center px-6">
      {/* SVG иллюстрация */}
      <div className="w-full max-w-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 500"
          className="w-full h-auto"
        >
          <circle cx="250" cy="250" r="200" fill="#e6f0ff" />
          <path
            d="M160 260c10-40 50-70 90-70s80 30 90 70"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <circle cx="200" cy="220" r="10" fill="#3b82f6" />
          <circle cx="300" cy="220" r="10" fill="#3b82f6" />
          <path
            d="M210 300c20 20 60 20 80 0"
            stroke="#3b82f6"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          <text
            x="250"
            y="400"
            textAnchor="middle"
            fontSize="80"
            fontWeight="bold"
            fill="#cbd5e1"
          >
            404
          </text>
        </svg>
      </div>

      {/* Заголовок и текст */}
      <h1 className="mt-6 text-3xl font-semibold text-gray-800">
        Упс! Такой страницы нет
      </h1>
      <p className="mt-2 text-gray-500 max-w-md">
        Похоже, вы забрели не туда. Попробуйте вернуться на главную страницу.
      </p>

      {/* Кнопка */}
      <Link
        to="/"
        className="mt-8 inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-6 rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
      >
        Вернуться на главную
      </Link>

      {/* Подпись */}
      <footer className="mt-16 text-sm text-gray-400">
        © {new Date().getFullYear()} ВашаКомпания
      </footer>
    </div>
  );
}