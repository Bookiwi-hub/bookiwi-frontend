import { Bookmark } from "lucide-react";

import dummyBookmarks from "#/DB/bookmarks";

function BookmarksPanel() {
  return (
    <div>
      <h3 className="mb-4 text-lg font-medium">책갈피</h3>
      <ul className="space-y-3">
        {dummyBookmarks.map((bookmark) => (
          <li key={bookmark.id}>
            <button
              type="button"
              className="flex w-full items-start gap-2 rounded-md p-2 text-left transition-colors hover:bg-accent/50"
              onClick={() => {}}
            >
              <Bookmark size={16} className="mt-1 text-primary" />
              <div>
                <p className="font-medium">{bookmark.title}</p>
                <p className="text-sm text-muted-foreground">
                  {bookmark.page} 페이지
                </p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookmarksPanel;
