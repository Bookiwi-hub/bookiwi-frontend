import { Separator } from "#/components/ui/separator";

function DiscussionsTab() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="font-medium">진행 중인 토론</h3>

        <div className="rounded-lg border border-dashed p-4 text-center">
          <p className="text-sm text-muted-foreground">
            아직 진행 중인 토론이 없습니다.
          </p>
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <h3 className="font-medium">다가오는 이벤트</h3>

        <div className="rounded-lg border border-dashed p-4 text-center">
          <p className="text-sm text-muted-foreground">
            예정된 이벤트가 없습니다.
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-dashed p-4 text-center">
        <p className="text-sm font-medium">
          새 토론이나 이벤트를 만들고 싶으신가요?
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          그룹에 참여하여 새로운 주제를 시작하세요.
        </p>
      </div>
    </div>
  );
}

export default DiscussionsTab;
