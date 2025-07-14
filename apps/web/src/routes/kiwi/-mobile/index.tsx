// import { useLoaderData } from "@tanstack/react-router";

// import AddParticipantModal from "../-modals/add-participant";
// import { ReaderProvider } from "../-reader";

// import MobileHeader from "./header";
// import MobileMenu from "./menu";
// import MobileViewer from "./viewer";

// import userManager from "#/managers/user";

// function MobileKiwiContent() {
//   return (
//     <div className="size-full">
//       <MobileHeader />
//       <MobileViewer />
//       <MobileMenu />
//     </div>
//   );
// }

// function MobileKiwi() {
//   const { epubData, kiwiData, participantsData, annotationsData } =
//     useLoaderData({
//       from: "/kiwi/$id",
//     });

//   const currentParticipant = participantsData.find(
//     (participant) => participant.userId === userManager.userId,
//   );

//   if (!currentParticipant) {
//     return (
//       <AddParticipantModal
//         kiwiName={kiwiData.name}
//         kiwiId={kiwiData.id}
//         takenColors={participantsData.map((participant) => participant.color)}
//       />
//     );
//   }

//   return (
//     <ReaderProvider
//       epubData={epubData}
//       kiwiData={kiwiData}
//       currentParticipant={currentParticipant}
//       participantsData={participantsData}
//       annotationsData={annotationsData}
//     >
//       <MobileKiwiContent />
//     </ReaderProvider>
//   );
// }

import ErrorPage from "../../../components/error";

function MobileKiwi() {
  return (
    <ErrorPage
      title="모바일 버전 개발 중 🚧"
      message="죄송합니다! 현재 모바일 버전은 개발 중입니다. 더 나은 경험을 위해 데스크톱이나 노트북으로 접속해 주세요."
      showHomeButton
    />
  );
}

export default MobileKiwi;
