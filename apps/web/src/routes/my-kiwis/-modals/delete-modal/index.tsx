import { useAtomValue } from "@bookiwi/jotai";

import { ModalState, modalStateAtom, selectedKiwiAtom } from "../atoms";

import DeleteKiwi from "./delete-kiwi";
import LeaveKiwi from "./leave-kiwi";

import userManager from "#/managers/user";

function DeleteKiwiModal() {
  const modalState = useAtomValue(modalStateAtom);
  const isOpen = modalState === ModalState.DeleteKiwi;
  const kiwi = useAtomValue(selectedKiwiAtom);

  if (!isOpen || !kiwi) return null;

  const isAdmin = kiwi.admin.id !== userManager.userId;

  return isAdmin ? <DeleteKiwi kiwi={kiwi} /> : <LeaveKiwi kiwi={kiwi} />;
}

export default DeleteKiwiModal;
