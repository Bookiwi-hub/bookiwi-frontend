import { useAtomValue } from "@bookiwi/jotai";

import { deleteKiwi, deleteParticipant, deleteUserKiwi } from "../../-apis";
import { ModalState, modalStateAtom, selectedKiwiAtom } from "../atoms";

import DeleteKiwi from "./delete-kiwi";

import userManager from "#/managers/user";

function DeleteKiwiModal() {
  const modalState = useAtomValue(modalStateAtom);
  const isOpen = modalState === ModalState.DeleteKiwi;
  const kiwi = useAtomValue(selectedKiwiAtom);
  const { userId } = userManager;

  if (!isOpen || !kiwi || !userId) return null;

  const isAdmin = kiwi.admin.id !== userId;
  const participantId = kiwi.participants.find(
    (participant) => participant.userId === userId,
  )?.id;

  const handleAdminDeleteKiwi = async () => {
    await deleteKiwi(kiwi.id);
  };

  const handleNoAdminDeleteKiwi = async () => {
    if (participantId) {
      await deleteParticipant(participantId);
    }
    await deleteUserKiwi(userId, kiwi.id);
  };

  const handleDeleteKiwi = isAdmin
    ? handleAdminDeleteKiwi
    : handleNoAdminDeleteKiwi;

  return (
    <DeleteKiwi kiwi={kiwi} onDelete={handleDeleteKiwi} isAdmin={isAdmin} />
  );
}

export default DeleteKiwiModal;
