import { createFileRoute } from "@tanstack/react-router";
import { memo } from "react";

import Header from "./-components/header";
import ImportBookButton from "./-components/import-book-button";
import Library from "./-components/library";
import LinkInput from "./-components/link-input";

import bookRooms from "#/DB/book-room";

// LinkInput과 ImportBookButton이 모달 활성화 시 리렌더링 되는 문제 해결을 위해 분리 후 메모이제이션
const HeaderSection = memo(() => (
  <div className="mb-7 flex items-center justify-between mobile:mb-5 mobile:flex-col mobile:items-start mobile:gap-4">
    <h1 className="text-2xl font-bold mobile:text-xl">
      내 그룹
      <data className="text-xl text-muted-foreground mobile:text-lg">
        {`(${bookRooms.length})`}
      </data>
    </h1>
    <div className="flex items-center gap-3 mobile:w-full mobile:flex-col mobile:gap-2">
      <LinkInput />
      <ImportBookButton />
    </div>
  </div>
));

HeaderSection.displayName = "HeaderSection"; // 디버깅을 위해 이름 지정 -> memo 사용 시 anonymous 함수로 렌더링 되어 디버깅 어려움

export const Route = createFileRoute("/my-library/")({
  head: () => ({
    meta: [
      {
        title: "Bookiwi | 내 그룹",
      },
    ],
  }),
  component: MyLibrary,
});

function MyLibrary() {
  return (
    <div className="flex size-full flex-col">
      <Header />
      <main className="size-full bg-white p-6 mobile:p-4">
        <HeaderSection />
        <Library bookRooms={bookRooms} />
      </main>
    </div>
  );
}
