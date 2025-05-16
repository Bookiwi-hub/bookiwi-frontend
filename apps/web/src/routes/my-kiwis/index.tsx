import { createFileRoute } from "@tanstack/react-router";

import Header from "./-header";
import Kiwis from "./-kiwis";

import kiwis from "#/DB/kiwis";

export const Route = createFileRoute("/my-kiwis/")({
  head: () => ({
    meta: [
      {
        title: "Bookiwi | 내 키위 컬렉션",
      },
    ],
  }),
  component: MyKiwis,
});

function MyKiwis() {
  return (
    <div className="flex size-full flex-col">
      <Header />
      <main className="size-full bg-white p-6 mobile:p-4">
        <Kiwis kiwis={kiwis} />
      </main>
    </div>
  );
}
