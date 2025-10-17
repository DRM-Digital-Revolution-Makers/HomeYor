import React from "react";
import { Router, Route, RootRoute } from "@tanstack/react-router";
import AdminLayout from "@/components/layout/AdminLayout";

const MainPage = React.lazy(() => import("@/pages/dashboard/MainPage"));
const Chats = React.lazy(() => import("@/pages/chats/Chats"));
const Chatbot = React.lazy(() => import("@/pages/chatbot/Chatbot"));
const Initiatives = React.lazy(
  () => import("@/pages/integrations/Initiatives")
);
const Login = React.lazy(() => import("@/features/auth/LoginForm"));

const rootRoute = new RootRoute();

const adminLayoutRoute = new Route({
  getParentRoute: () => rootRoute,
  id: "admin",
  component: () => <AdminLayout />,
});

const loginLayoutRoute = new Route({
  getParentRoute: () => rootRoute,
  id: "loginLayout",
  component: () => (
    <React.Suspense fallback={<div className="p-6">Загрузка…</div>}>
      <Login />
    </React.Suspense>
  ),
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

const loginRoute = new Route({
  getParentRoute: () => loginLayoutRoute,
  path: "/login",
  component: () => (
    <React.Suspense fallback={<div className="p-6">Загрузка…</div>}>
      <Login />
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
  loginLayoutRoute.addChildren([loginRoute]),
]);

export const router = new Router({ routeTree });
