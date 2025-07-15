function Message() {
  return (
    <div className="flex gap-3 rounded-lg bg-secondary p-4">
      <div className="space-y-1">
        <p className="text-sm font-medium text-destructive">주의사항</p>
        <p className="text-sm text-muted-foreground">
          키위를 탈퇴하면 <strong>기록이 모두 사라지며</strong>
          <strong className="text-destructive"> 복구할 수 없습니다</strong>.
        </p>
      </div>
    </div>
  );
}

export default Message;
