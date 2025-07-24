import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { toast } from "sonner";

import { Participant } from "@bookiwi/supabase/types";

import { getKiwiReader } from "./-apis";
import Header from "./-header";
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
    const result = await getKiwiReader(params.id);
    return result;
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `Kiwi | ${loaderData?.kiwi.name}`,
      },
    ],
  }),
  component: Kiwi,
  pendingComponent: () => (
    <LoadingPage
      title="키위를 불러오는 중입니다"
      message="잠시만 기다려주세요..."
    />
  ),
});

function Kiwi() {
  const { epub, kiwi, participants } = Route.useLoaderData();
  const navigate = useNavigate();
  const currentParticipant = participants.find(
    (participant) => participant.userId === userManager.userId,
  );

  useEffect(() => {
    if (!isDesktop) {
      toast(
        <div>
          PC나 노트북으로만 접속해 주세요.
          <br />
          (크롬 권장)
        </div>,
        {
          action: {
            label: "돌아가기",
            onClick: () => {
              navigate({ to: "/my-kiwis" });
            },
          },
        },
      );
    }
  }, [navigate]);

  if (!currentParticipant) {
    return (
      <AddParticipantModal
        kiwiName={kiwi.name}
        kiwiId={kiwi.id}
        takenColors={participants.map((participant) => participant.color)}
      />
    );
  }
  const otherParticipants = participants.filter(
    (participant) => participant.userId !== userManager.userId,
  );

  return (
    <ReaderProvider
      epub={epub}
      kiwi={kiwi}
      otherParticipants={otherParticipants}
      currentParticipant={currentParticipant}
    >
      <KiwiContent participants={participants} />
    </ReaderProvider>
  );
}

function KiwiContent({ participants }: { participants: Participant[] }) {
  return (
    <main className="flex size-full select-none flex-col overflow-hidden">
      <Header participants={participants} />
      <SplitView />
    </main>
  );
}
