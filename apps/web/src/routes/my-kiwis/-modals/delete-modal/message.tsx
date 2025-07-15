interface MessageProps {
  isAdmin: boolean;
}

function Message({ isAdmin }: MessageProps) {
  return (
    <div className="flex gap-3 rounded-lg bg-secondary p-4">
      <div className="space-y-1">
        <p className="text-sm font-medium text-destructive">주의사항</p>
        <p className="text-sm text-muted-foreground">
          {isAdmin ? (
            <>
              키위를 삭제하면 <strong>모든 참가자의 데이터</strong>가
              <strong className="text-destructive"> 영구적으로 삭제</strong>되며
              복구할 수 없습니다.
            </>
          ) : (
            <>
              키위에서 나가면 <strong>독서 기록이 모두 사라지며</strong>
              <strong className="text-destructive"> 복구할 수 없습니다</strong>.
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default Message;
