import { Outlet, createRootRoute, HeadContent } from "@tanstack/react-router";

import ErrorPage from "#/components/error";
// import { PWA } from "#/components/pwa";
import { Toaster } from "#/components/ui/sonner";

// import { TanStackRouterDevtools } from "@tanstack/router-plugin-vite";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        name: "description",
        content: "소셜 이북 리더기, 함께 읽는 즐거움",
      },
      {
        title: "Bookiwi",
      },
    ],
    links: [],
    scripts: [],
  }),
  component: () => (
    <>
      <HeadContent />
      {/* <PWA /> */}
      <Outlet />
      <Toaster />
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
  errorComponent: ({ error }) => <ErrorPage error={error} />,
  notFoundComponent: () => (
    <ErrorPage
      title="페이지를 찾을 수 없어요"
      message="홈으로 돌아가 볼까요?"
    />
  ),
});
