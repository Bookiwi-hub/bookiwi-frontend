import { createFileRoute, redirect } from "@tanstack/react-router";

import getBook from "./-apis/get-book";
import Header from "./-header";
import MobileKiwi from "./-mobile";
import AddParticipantModal from "./-modals/add-participant";
import { ReaderProvider } from "./-reader";
import SplitView from "./-split-view";

import LoadingPage from "#/components/loading";
import { isDesktop } from "#/constants/device-type";
import userManager from "#/managers/user";

export const Route = createFileRoute("/kiwi/$id")({
  beforeLoad: async () => {
    const loggedIn = await userManager.isLoggedIn();
    if (!loggedIn) {
      throw redirect({ to: "/auth" });
    }
  },

  loader: async ({ params }) => {
    const result = await getBook(params.id);
    return result;
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `Kiwi | ${loaderData.kiwiData.name}`,
      },
    ],
  }),
  component: isDesktop ? Kiwi : MobileKiwi,
  pendingComponent: () => (
    <LoadingPage
      title="키위를 불러오는 중입니다"
      message="잠시만 기다려주세요..."
    />
  ),
});

function Kiwi() {
  const { epubData, kiwiData, participantsData, annotationsData } =
    Route.useLoaderData();
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
      <KiwiContent />
    </ReaderProvider>
  );
}

function KiwiContent() {
  return (
    <main className="flex size-full select-none flex-col overflow-hidden">
      <Header />
      <SplitView />
    </main>
  );
}
