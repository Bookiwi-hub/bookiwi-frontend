import { ChevronRight } from "lucide-react";

export default function TOCDrawer() {
  const chapters = [
    { id: 1, title: "Chapter 1: Introduction", pages: "1-15" },
    { id: 2, title: "Chapter 2: Getting Started", pages: "16-42" },
    { id: 3, title: "Chapter 3: Advanced Concepts", pages: "43-87" },
    { id: 4, title: "Chapter 4: Case Studies", pages: "88-120" },
    { id: 5, title: "Chapter 5: Conclusion", pages: "121-135" },
  ];

  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-bold">목차</h2>
      <div className="space-y-2">
        {chapters.map((chapter) => (
          <button
            key={chapter.id}
            type="button"
            className="flex w-full items-center justify-between rounded-lg border p-3 text-left hover:bg-gray-50"
          >
            <div>
              <p className="font-medium">{chapter.title}</p>
              <p className="text-sm text-gray-500">Pages: {chapter.pages}</p>
            </div>
            <ChevronRight className="size-5 text-gray-400" />
          </button>
        ))}
      </div>
    </div>
  );
}
