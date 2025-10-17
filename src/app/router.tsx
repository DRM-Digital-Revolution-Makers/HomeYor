import React from "react";
import {
  Router,
  Route,
  RootRoute,
  NotFoundRoute,
} from "@tanstack/react-router";
import AdminLayout from "@/components/layout/AdminLayout";

const MainPage = React.lazy(() => import("@/pages/dashboard/MainPage"));
const Chats = React.lazy(() => import("@/pages/chats/Chats"));
const Notifications = React.lazy(
  () => import("@/pages/chatbot/NotificationsPage")
);
const Initiatives = React.lazy(
  () => import("@/pages/integrations/Initiatives")
);
const Login = React.lazy(() => import("@/features/auth/LoginForm"));
const Signup = React.lazy(() => import("@/features/auth/SignupForm"));
const NotFound = React.lazy(() => import("@/pages/errorPages/404"));

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
  path: "/chat",
  component: () => (
    <React.Suspense fallback={<div className="p-6">Загрузка…</div>}>
      <Chats />
    </React.Suspense>
  ),
});

const NotificationsRoute = new Route({
  getParentRoute: () => adminLayoutRoute,
  path: "/notifications",
  component: () => (
    <React.Suspense fallback={<div className="p-6">Загрузка…</div>}>
      <Notifications />
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

const signupRoute = new Route({
  getParentRoute: () => loginLayoutRoute,
  path: "/signup",
  component: () => (
    <React.Suspense fallback={<div className="p-6">Загрузка…</div>}>
      <Signup />
    </React.Suspense>
  ),
});

const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: () => (
    <React.Suspense fallback={<div className="p-6">Загрузка...</div>}>
      <NotFound />
    </React.Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  adminLayoutRoute.addChildren([
    MainPageRoute,
    chatsRoute,
    NotificationsRoute,
    InitiativesRoute,
  ]),
  loginLayoutRoute.addChildren([loginRoute, signupRoute]),
  notFoundRoute,
]);

export const router = new Router({ routeTree });
