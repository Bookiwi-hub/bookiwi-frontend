import { ReactNode } from "react";

import { atom, Provider, createStore } from "@bookiwi/jotai";

import { Kiwi } from "#/types/kiwi";

export const kiwisAtom = atom<Kiwi[]>([]);

export const setNewKiwiAtom = atom(null, (get, set, kiwi: Kiwi) => {
  const kiwis = get(kiwisAtom);
  set(kiwisAtom, [kiwi, ...kiwis]);
});

function KiwisProvider({
  children,
  kiwis,
}: {
  children: ReactNode;
  kiwis: Kiwi[];
}) {
  const store = createStore();
  store.set(kiwisAtom, kiwis);

  return <Provider store={store}>{children}</Provider>;
}

export default KiwisProvider;
