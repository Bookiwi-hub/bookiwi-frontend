import { createFileRoute, redirect } from "@tanstack/react-router";

import Header from "./-header";
import MobileKiwi from "./-mobile";
import AddParticipantModal from "./-modals/add-participant";
import { ReaderProvider } from "./-reader";
import SplitView from "./-split-view";

import LoadingPage from "#/components/loading";
import { isDesktop } from "#/constants/device-type";
import supabaseManager from "#/managers/supabase";
import userManager from "#/managers/user";

export const Route = createFileRoute("/kiwi/$id")({
  beforeLoad: async () => {
    const loggedIn = await userManager.isLoggedIn();
    if (!loggedIn) {
      throw redirect({ to: "/auth" });
    }
  },

  loader: async ({ params }) => {
    const result = await supabaseManager.reader.getKiwiReader(params.id);
    return result;
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `Kiwi | ${loaderData?.kiwi.name}`,
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
  const { epub, kiwi, participants, annotations } = Route.useLoaderData();
  const currentParticipant = participants.find(
    (participant) => participant.userId === userManager.userId,
  );

  if (!currentParticipant) {
    return (
      <AddParticipantModal
        kiwiName={kiwi.name}
        kiwiId={kiwi.id}
        takenColors={participants.map((participant) => participant.color)}
      />
    );
  }

  return (
    <ReaderProvider
      epub={epub}
      kiwi={kiwi}
      participants={participants}
      annotations={annotations}
      currentParticipant={currentParticipant}
    >
      <KiwiContent />
    </ReaderProvider>
  );

  // return null;
}

function KiwiContent() {
  return (
    <main className="flex size-full select-none flex-col overflow-hidden">
      <Header />
      <SplitView />
    </main>
  );
}
