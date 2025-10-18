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
const ChatThread = React.lazy(() => import("@/pages/chats/ChatThread"));
const Notifications = React.lazy(
  () => import("@/pages/chatbot/NotificationsPage")
);
const Initiatives = React.lazy(
  () => import("@/pages/integrations/Initiatives")
);
const TokensPage = React.lazy(
  () => import("@/pages/integrations/TokensPage")
);
const VoteHistoryPage = React.lazy(
  () => import("@/pages/integrations/VoteHistoryPage")
);
// New authentication pages (SMS)
const PhoneEnter = React.lazy(() => import("@/pages/auth/PhoneEnter"));
const CodeVerify = React.lazy(() => import("@/pages/auth/CodeVerify"));
const RegisterInfo = React.lazy(() => import("@/pages/auth/RegisterInfo"));
// Basic authentication (email/password)
const Login = React.lazy(() => import("@/pages/auth/Login"));
// Add email-based signup
const Signup = React.lazy(() => import("@/pages/auth/Signup"));
// Email OTP (passwordless) flow
const EmailEnter = React.lazy(() => import("@/pages/auth/EmailEnter"));
const EmailCodeVerify = React.lazy(() => import("@/pages/auth/EmailCodeVerify"));
// 404 Not Found page
const NotFound = React.lazy(() => import("@/pages/errors/404"));

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

const TokensRoute = new Route({
  getParentRoute: () => adminLayoutRoute,
  path: "/tokens",
  component: () => (
    <React.Suspense fallback={<div className="p-6">Загрузка…</div>}>
      <TokensPage />
    </React.Suspense>
  ),
});

const VoteHistoryRoute = new Route({
  getParentRoute: () => adminLayoutRoute,
  path: "/vote-history",
  component: () => (
    <React.Suspense fallback={<div className="p-6">Загрузка…</div>}>
      <VoteHistoryPage />
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

// Email OTP routes
const emailEnterRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/auth/email",
  component: () => (
    <React.Suspense fallback={<div className="p-6">Загрузка…</div>}>
      <EmailEnter />
    </React.Suspense>
  ),
});

const emailVerifyRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/auth/email-verify",
  component: () => (
    <React.Suspense fallback={<div className="p-6">Загрузка…</div>}>
      <EmailCodeVerify />
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
    TokensRoute,
    VoteHistoryRoute,
  ]),
  phoneRoute,
  verifyRoute,
  registerRoute,
  loginRoute,
  signupRoute,
  emailEnterRoute,
  emailVerifyRoute,
]);

export const router = new Router({ routeTree });
