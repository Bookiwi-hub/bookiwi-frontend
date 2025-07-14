function Message() {
  return (
    <div className="flex gap-3 rounded-lg bg-secondary p-4">
      <div className="space-y-1">
        <p className="text-sm font-medium text-destructive">주의사항</p>
        <p className="text-sm text-muted-foreground">
          키위를 삭제하면 <strong>모든 참가자의 데이터</strong>가
          <strong className="text-destructive"> 영구적으로 삭제</strong>되며
          복구할 수 없습니다.
        </p>
      </div>
    </div>
  );
}

export default Message;
