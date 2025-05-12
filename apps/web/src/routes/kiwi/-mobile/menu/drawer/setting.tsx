import { Check, ChevronRight } from "lucide-react";

export default function SettingDrawer() {
  const settings = [
    { id: "font-size", title: "글자 크기", value: "보통" },
    { id: "theme", title: "테마", value: "밝은 모드" },
    { id: "line-height", title: "줄 간격", value: "1.5" },
    { id: "margin", title: "여백", value: "기본" },
  ];

  const fontOptions = ["작게", "보통", "크게", "매우 크게"];

  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-bold">설정</h2>
      <div className="space-y-4">
        {settings.map((setting) => (
          <div key={setting.id} className="rounded-lg border">
            <button
              type="button"
              className="flex w-full items-center justify-between p-4 text-left"
            >
              <div>
                <p className="font-medium">{setting.title}</p>
                <p className="text-sm text-gray-500">{setting.value}</p>
              </div>
              <ChevronRight className="size-5 text-gray-400" />
            </button>
          </div>
        ))}

        {/* Font size selector example */}
        <div className="mt-6 rounded-lg border p-4">
          <h3 className="mb-2 font-medium">글자 크기</h3>
          <div className="grid grid-cols-4 gap-2">
            {fontOptions.map((option) => (
              <button
                key={option}
                type="button"
                className={`flex items-center justify-center rounded-lg border p-2 ${
                  option === "보통" ? "border-blue-500 bg-blue-50" : ""
                }`}
              >
                {option}
                {option === "보통" && (
                  <Check className="ml-1 size-4 text-blue-500" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
