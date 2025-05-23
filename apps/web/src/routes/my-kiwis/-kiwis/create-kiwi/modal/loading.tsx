import { Loader2 } from "lucide-react";

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-10">
      <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>

      <div className="space-y-3 text-center">
        <h3 className="text-lg font-medium">키위를 만들고 있습니다</h3>
        <p className="text-sm text-muted-foreground">
          EPUB 파일을 처리하고 있습니다
        </p>
      </div>
    </div>
  );
}

export default Loading;
