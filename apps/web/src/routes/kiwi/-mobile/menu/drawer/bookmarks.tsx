import { Bookmark, ChevronRight } from "lucide-react";

export default function BookmarksDrawer() {
  const bookmarks = [
    { id: 1, title: "Important concept", page: 24, date: "2023-06-15" },
    { id: 2, title: "Remember this", page: 57, date: "2023-06-18" },
    { id: 3, title: "Key insight", page: 112, date: "2023-06-20" },
  ];

  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-bold">책갈피</h2>
      {bookmarks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <Bookmark className="mb-2 size-10 text-gray-400" />
          <p className="text-gray-500">책갈피가 없습니다.</p>
          <p className="text-sm text-gray-400">
            책을 읽으면서 중요한 부분을 책갈피로 저장하세요.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {bookmarks.map((bookmark) => (
            <button
              key={bookmark.id}
              type="button"
              className="flex w-full items-center justify-between rounded-lg border p-3 text-left hover:bg-gray-50"
            >
              <div>
                <p className="font-medium">{bookmark.title}</p>
                <p className="text-sm text-gray-500">
                  Page {bookmark.page} · {bookmark.date}
                </p>
              </div>
              <ChevronRight className="size-5 text-gray-400" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
