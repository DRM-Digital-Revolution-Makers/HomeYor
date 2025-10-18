import React from "react";
import {
  Router,
  Route,
  RootRoute,
  NotFoundRoute,
} from "@tanstack/react-router";
import AdminLayout from "@/components/layout/AdminLayout";

const MainPage = React.lazy(() => import("@/pages/dashboard/MainPage"));
const Chats = React.lazy(() => import("@/pages/chat/Chats"));
const ChatThread = React.lazy(() => import("@/pages/chat/ChatThread"));
const Notifications = React.lazy(
  () => import("@/pages/notifications/NotificationsPage")
);
const Initiatives = React.lazy(
  () => import("@/pages/integrations/Initiatives")
);
// New authentication pages (SMS)
const PhoneEnter = React.lazy(() => import("@/pages/auth/PhoneEnter"));
const CodeVerify = React.lazy(() => import("@/pages/auth/CodeVerify"));
const RegisterInfo = React.lazy(() => import("@/pages/auth/RegisterInfo"));
const NotFound = React.lazy(() => import("@/pages/errors/404"));
// Basic authentication (email/password)
const Login = React.lazy(() => import("@/pages/auth/Login"));
// Add email-based signup
const Signup = React.lazy(() => import("@/pages/auth/Signup"));

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
  path: "/chat",
  component: () => (
    <React.Suspense fallback={<div className="p-6">Загрузка…</div>}>
      <Chats />
    </React.Suspense>
  ),
});

const chatGeneralRoute = new Route({
  getParentRoute: () => adminLayoutRoute,
  path: "/chat/general",
  component: () => (
    <React.Suspense fallback={<div className="p-6">Загрузка…</div>}>
      <ChatThread />
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

// Authentication routes
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

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/auth/login",
  component: () => (
    <React.Suspense fallback={<div className="p-6">Загрузка…</div>}>
      <Login />
    </React.Suspense>
  ),
});

// New route for email signup
const signupRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/auth/signup",
  component: () => (
    <React.Suspense fallback={<div className="p-6">Загрузка…</div>}>
      <Signup />
    </React.Suspense>
  ),
});

// NotFound под админ-лейаут (ловит неизвестные пути внутри /)
// const adminNotFoundRoute = new NotFoundRoute({
//   getParentRoute: () => adminLayoutRoute,
//   component: () => (
//     <React.Suspense fallback={<div className="p-6">Загрузка...</div>}>
//       <NotFound />
//     </React.Suspense>
//   ),
// });

// 404 на уровне root (на случай путей вне админ-группы)
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
    chatGeneralRoute,
    NotificationsRoute,
    InitiativesRoute,
  ]),
  phoneRoute,
  verifyRoute,
  registerRoute,
  loginRoute,
  signupRoute,
  // 404 на уровне root (на случай путей вне админ-группы)
  notFoundRoute,
]);

export const router = new Router({ routeTree });
