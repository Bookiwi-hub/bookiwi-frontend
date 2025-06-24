import { createFileRoute } from "@tanstack/react-router";

import getKiwisFromIndexedDB from "./-apis/get-kiwis";
import Header from "./-header";
import Kiwis from "./-kiwis";

import LoadingPage from "#/components/loading";

export const Route = createFileRoute("/my-kiwis/")({
  loader: async () => {
    const kiwi = await getKiwisFromIndexedDB();
    return kiwi;
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
    <div className="flex size-full flex-col">
      <Header />
      <main className="size-full bg-white p-6 mobile:p-4">
        <Kiwis kiwis={kiwis} />
      </main>
    </div>
  );
}
