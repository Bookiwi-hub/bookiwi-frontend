import { createFileRoute } from "@tanstack/react-router";

import getKiwisFromIndexedDB from "./-apis/get-kiwis";
import { KiwisProvider } from "./-context";
import Header from "./-header";
import Kiwis from "./-kiwis";

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
  component: MyKiwisPage,
});

function MyKiwis() {
  return (
    <div className="flex size-full flex-col">
      <Header />
      <main className="size-full bg-white p-6 mobile:p-4">
        <Kiwis />
      </main>
    </div>
  );
}

function MyKiwisPage() {
  const kiwis = Route.useLoaderData();
  return (
    <KiwisProvider kiwis={kiwis}>
      <MyKiwis />
    </KiwisProvider>
  );
}
