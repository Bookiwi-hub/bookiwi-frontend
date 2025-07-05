import { useLoaderData } from "@tanstack/react-router";

import AddParticipantModal from "../-modals/add-participant";
import { ReaderProvider } from "../-reader";

import MobileHeader from "./header";
import MobileMenu from "./menu";
import MobileViewer from "./viewer";

import userManager from "#/managers/user";

function MobileKiwiContent() {
  return (
    <div className="size-full">
      <MobileHeader />
      <MobileViewer />
      <MobileMenu />
    </div>
  );
}

function MobileKiwi() {
  const { epubData, kiwiData, participantsData, annotationsData } =
    useLoaderData({
      from: "/kiwi/$id",
    });

  const currentParticipant = participantsData.find(
    (participant) => participant.userId === userManager.userId,
  );

  if (!currentParticipant) {
    return (
      <AddParticipantModal
        kiwiName={kiwiData.name}
        kiwiId={kiwiData.id}
        takenColors={participantsData.map((participant) => participant.color)}
      />
    );
  }

  return (
    <ReaderProvider
      epubData={epubData}
      kiwiData={kiwiData}
      currentParticipant={currentParticipant}
      participantsData={participantsData}
      annotationsData={annotationsData}
    >
      <MobileKiwiContent />
    </ReaderProvider>
  );
}

export default MobileKiwi;
