import { Outlet, createRootRoute, HeadContent } from "@tanstack/react-router";

import { PWA } from "#/components/PWA";

// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

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
      <PWA />
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
});
