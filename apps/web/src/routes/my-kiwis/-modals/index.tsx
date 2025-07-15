import CreateKiwiModal from "./create-kiwi";
import DeleteKiwiModal from "./delete-kiwi";
import DetailKiwiModal from "./detail-kiwi";
import JoinKiwiModal from "./join-kiwi";
import LeaveKiwiModal from "./leave-kiwi";

function Modals() {
  return (
    <>
      <DetailKiwiModal />
      <CreateKiwiModal />
      <DeleteKiwiModal />
      <LeaveKiwiModal />
      <JoinKiwiModal />
    </>
  );
}

export default Modals;
