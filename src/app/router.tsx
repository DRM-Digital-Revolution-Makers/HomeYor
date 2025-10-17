import React from "react";
import { Router, Route, RootRoute } from "@tanstack/react-router";
import AdminLayout from "@/components/layout/AdminLayout";

const MainPage = React.lazy(() => import("@/pages/dashboard/MainPage"));
const Chats = React.lazy(() => import("@/pages/chats/Chats"));
const Chatbot = React.lazy(() => import("@/pages/chatbot/Chatbot"));
const Initiatives = React.lazy(
  () => import("@/pages/integrations/Initiatives")
);
// Новые страницы аутентификации (SMS)
const PhoneEnter = React.lazy(() => import("@/pages/auth/PhoneEnter"));
const CodeVerify = React.lazy(() => import("@/pages/auth/CodeVerify"));
const RegisterInfo = React.lazy(() => import("@/pages/auth/RegisterInfo"));

const rootRoute = new RootRoute();

const adminLayoutRoute = new Route({
  getParentRoute: () => rootRoute,
  id: "admin",
  component: () => <AdminLayout />,
});

const MainPageRoute = new Route({
  getParentRoute: () => adminLayoutRoute,
  path: "/",
  component: () => (
    <React.Suspense fallback={<div className="p-6">Загрузка…</div>}>
      <MainPage />
    </React.Suspense>
  ),
});

const chatsRoute = new Route({
  getParentRoute: () => adminLayoutRoute,
  path: "/chats",
  component: () => (
    <React.Suspense fallback={<div className="p-6">Загрузка…</div>}>
      <Chats />
    </React.Suspense>
  ),
});

const chatbotRoute = new Route({
  getParentRoute: () => adminLayoutRoute,
  path: "/chatbot",
  component: () => (
    <React.Suspense fallback={<div className="p-6">Загрузка…</div>}>
      <Chatbot />
    </React.Suspense>
  ),
});

const InitiativesRoute = new Route({
  getParentRoute: () => adminLayoutRoute,
  path: "/initiatives",
  component: () => (
    <React.Suspense fallback={<div className="p-6">Загрузка…</div>}>
      <Initiatives />
    </React.Suspense>
  ),
});

// Новые маршруты аутентификации
const phoneRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/auth/phone",
  component: () => (
    <React.Suspense fallback={<div className="p-6">Загрузка…</div>}>
      <PhoneEnter />
    </React.Suspense>
  ),
});

const verifyRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/auth/verify",
  component: () => (
    <React.Suspense fallback={<div className="p-6">Загрузка…</div>}>
      <CodeVerify />
    </React.Suspense>
  ),
});

const registerRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/auth/register",
  component: () => (
    <React.Suspense fallback={<div className="p-6">Загрузка…</div>}>
      <RegisterInfo />
    </React.Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  adminLayoutRoute.addChildren([
    MainPageRoute,
    chatsRoute,
    chatbotRoute,
    InitiativesRoute,
  ]),
  phoneRoute,
  verifyRoute,
  registerRoute,
]);

export const router = new Router({ routeTree });
