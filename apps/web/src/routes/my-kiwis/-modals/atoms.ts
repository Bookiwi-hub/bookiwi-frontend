import { atom } from "@bookiwi/jotai";
import { MyKiwi } from "@bookiwi/supabase/types";

import { createKiwiAtom, stepAtom } from "./create-kiwi/atoms";
import { Step } from "./create-kiwi/types";
import { targetKiwiAtom } from "./delete-modal/atoms";
import { selectedKiwiAtom } from "./detail-kiwi/atoms";

export enum ModalState {
  CreateKiwi,
  DetailKiwi,
  DeleteKiwi,
  Closed,
}

export const modalStateAtom = atom<ModalState>(ModalState.Closed);

export const openCreateKiwiModalAtom = atom(null, (get, set) => {
  set(modalStateAtom, ModalState.CreateKiwi);
});

export const closeCreateKiwiModalAtom = atom(null, (get, set) => {
  set(modalStateAtom, ModalState.Closed);
  set(stepAtom, Step.One);
  set(createKiwiAtom, {
    kiwiName: "",
    kiwiDescription: "",
    kiwiDetailDescription: "",
    maxParticipants: 10,
    password: null,
    file: null,
    shareCode: null,
  });
});

export const openKiwiDetailModalAtom = atom(null, (get, set, kiwi: MyKiwi) => {
  set(modalStateAtom, ModalState.DetailKiwi);
  set(selectedKiwiAtom, kiwi);
});

export const closeKiwiDetailModalAtom = atom(null, (get, set) => {
  set(modalStateAtom, ModalState.Closed);
  set(selectedKiwiAtom, null);
});

export const openDeleteKiwiModalAtom = atom(null, (get, set, kiwi: MyKiwi) => {
  set(targetKiwiAtom, kiwi);
  set(modalStateAtom, ModalState.DeleteKiwi);
});

export const closeDeleteKiwiModalAtom = atom(null, (get, set) => {
  set(modalStateAtom, ModalState.Closed);
  set(targetKiwiAtom, null);
});
