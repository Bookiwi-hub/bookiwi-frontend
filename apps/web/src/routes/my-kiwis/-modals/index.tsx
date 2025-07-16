import CreateKiwiModal from "./create-kiwi";
import DeleteKiwiModal from "./delete-kiwi";
import DetailKiwiModal from "./detail-kiwi";
import LeaveKiwiModal from "./leave-kiwi";
import SharedKiwiModal from "./shared-kiwi";

function Modals() {
  return (
    <>
      <DetailKiwiModal />
      <CreateKiwiModal />
      <DeleteKiwiModal />
      <LeaveKiwiModal />
      <SharedKiwiModal />
    </>
  );
}

export default Modals;
