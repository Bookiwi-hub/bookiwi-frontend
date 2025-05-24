import { createFileRoute } from "@tanstack/react-router";

import { KiwisProvider, useKiwis } from "./-context";
import Header from "./-header";
import Kiwis from "./-kiwis";

export const Route = createFileRoute("/my-kiwis/")({
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
  const { kiwis } = useKiwis();
  return (
    <div className="flex size-full flex-col">
      <Header />
      <main className="size-full bg-white p-6 mobile:p-4">
        <Kiwis kiwis={kiwis} />
      </main>
    </div>
  );
}

function MyKiwisPage() {
  return (
    <KiwisProvider>
      <MyKiwis />
    </KiwisProvider>
  );
}
