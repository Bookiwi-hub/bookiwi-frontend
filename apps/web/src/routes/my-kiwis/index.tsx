import { createFileRoute, redirect } from "@tanstack/react-router";

import { Provider } from "@bookiwi/jotai";

import { getMyKiwis } from "./-apis";
import Kiwis from "./-kiwis";
import Modals from "./-modals";

import Header from "#/components/header";
import LoadingPage from "#/components/loading";
import userManager from "#/managers/user";

export const Route = createFileRoute("/my-kiwis/")({
  beforeLoad: async () => {
    const loggedIn = await userManager.isLoggedIn();
    if (!loggedIn) {
      throw redirect({ to: "/auth" });
    }
  },

  loader: async () => {
    if (!userManager.userId) {
      throw new Error("User ID is not found");
    }
    const kiwis = await getMyKiwis(userManager.userId);
    return kiwis;
  },
  head: () => ({
    meta: [
      {
        title: "Bookiwi | 내 키위 컬렉션",
      },
    ],
  }),
  component: MyKiwis,
  pendingComponent: () => (
    <LoadingPage
      title="북키위에 오신 것을 환영합니다"
      message="잠시만 기다려주세요..."
    />
  ),
});

function MyKiwis() {
  const kiwis = Route.useLoaderData();

  return (
    <Provider>
      <div className="flex size-full flex-col">
        <Header />
        <main className="size-full bg-white p-6 mobile:p-4">
          <Kiwis kiwis={kiwis} />
        </main>
      </div>
      <Modals />
    </Provider>
  );
}
