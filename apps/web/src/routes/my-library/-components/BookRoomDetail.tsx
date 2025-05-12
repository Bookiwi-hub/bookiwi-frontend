import { Link } from "@tanstack/react-router";
import {
  Clock,
  ChevronRight,
  User,
  Calendar,
  Book,
  MessageSquare,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "#/components/ui/dialog";
import { Separator } from "#/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#/components/ui/tabs";
import { BookRoom, Member } from "#/types/book-room";

interface BookRoomDetailProps {
  bookRoom: BookRoom;
  isOpen: boolean;
  onClose: () => void;
}

function BookRoomDetail({ bookRoom, isOpen, onClose }: BookRoomDetailProps) {
  const {
    id,
    name,
    description,
    image,
    lastActivityAt,
    detailDescription,
    isPrivate,
    memberCount = 0,
    progress = 0,
    book,
    discussions = [],
    events = [],
    activities = [],
    createdAt,
    admin,
    members = [
      {
        id: 1,
        name: "임진조",
        avatar: "https://github.com/shadcn.png",
        progress: 75,
      },
      { id: 2, name: "채종민", avatar: "", progress: 45 },
      { id: 3, name: "한상우", avatar: "", progress: 60 },
    ],
  } = bookRoom;

  const fallbackImageUrl =
    "https://placehold.co/300x400/e2e8f0/64748b?text=No+Cover";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="fixed left-1/2 top-1/2 z-50 grid w-full max-w-[800px] -translate-x-2/4 -translate-y-2/4 gap-0 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
        <DialogHeader className="border-b pb-4">
          <div className="flex items-center gap-2">
            <DialogTitle className="text-xl">{name}</DialogTitle>
            <Badge variant="outline" className="text-xs font-normal">
              {isPrivate ? "비공개 그룹" : "공개 그룹"}
            </Badge>
          </div>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue="info"
          className="flex h-[calc(85vh-180px)] flex-col pt-4"
        >
          <TabsList className="mb-4 grid w-full grid-cols-3">
            <TabsTrigger value="info">기본 정보</TabsTrigger>
            <TabsTrigger value="activities">활동 내역</TabsTrigger>
            <TabsTrigger value="discussions">토론 및 이벤트</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto">
            {/* 기본 정보 탭 */}
            <TabsContent
              value="info"
              className="mb-10 space-y-6 data-[state=inactive]:hidden"
            >
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <div className="aspect-[3/4] overflow-hidden rounded-md bg-gray-100">
                    <img
                      src={image || fallbackImageUrl}
                      alt="Book cover"
                      className="size-full object-cover"
                    />
                  </div>
                </div>

                <div className="col-span-2 space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">그룹 정보</h3>
                    <ul className="space-y-2 text-sm">
                      {admin && (
                        <li className="flex items-center gap-2">
                          <User size={16} className="text-muted-foreground" />
                          <span>관리자: {admin}</span>
                        </li>
                      )}
                      <li className="flex items-center gap-2">
                        <Users size={16} className="text-muted-foreground" />
                        <span className="flex items-center gap-1">
                          <span className="font-medium text-primary">
                            {members.length}명
                          </span>
                          <span className="text-muted-foreground">
                            / {memberCount}명
                          </span>
                        </span>
                      </li>
                      {book && (
                        <li className="flex items-center gap-2">
                          <Book size={16} className="text-muted-foreground" />
                          <span>
                            {book.title} - {book.author}
                          </span>
                        </li>
                      )}
                      {createdAt && (
                        <li className="flex items-center gap-2">
                          <Calendar
                            size={16}
                            className="text-muted-foreground"
                          />
                          <span>생성일: {createdAt}</span>
                        </li>
                      )}
                      <li className="flex items-center gap-2">
                        <Clock size={16} className="text-muted-foreground" />
                        <span>최근 활동: {lastActivityAt}</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium">진행 상황</h3>
                    <div className="mt-2">
                      <div className="flex justify-between text-xs">
                        <span>{progress}% 완료</span>
                      </div>
                      <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="font-medium">목차</h3>
                <div className="space-y-2 rounded-lg border bg-muted/30 px-6 py-4 text-sm">
                  <div className="flex justify-between">
                    <span>서문</span>
                    <span className="text-muted-foreground">7</span>
                  </div>
                  <div className="flex justify-between">
                    <span>1. 두 세계</span>
                    <span className="text-muted-foreground">11</span>
                  </div>
                  <div className="flex justify-between">
                    <span>2. 카인</span>
                    <span className="text-muted-foreground">39</span>
                  </div>
                  <div className="flex justify-between">
                    <span>3. 아벨라르트</span>
                    <span className="text-muted-foreground">67</span>
                  </div>
                  <div className="flex justify-between">
                    <span>4. 베아트리체</span>
                    <span className="text-muted-foreground">103</span>
                  </div>
                  <div className="flex justify-between">
                    <span>5. 새의 투쟁</span>
                    <span className="text-muted-foreground">131</span>
                  </div>
                  <div className="flex justify-between">
                    <span>6. 야곱의 싸움</span>
                    <span className="text-muted-foreground">159</span>
                  </div>
                  <div className="flex justify-between">
                    <span>7. 어머니 에바</span>
                    <span className="text-muted-foreground">187</span>
                  </div>
                  <div className="flex justify-between">
                    <span>8. 종말의 시작</span>
                    <span className="text-muted-foreground">215</span>
                  </div>
                </div>
              </div>

              {detailDescription && (
                <div className="space-y-2">
                  <h3 className="font-medium">그룹 소개</h3>
                  <p className="text-sm text-muted-foreground">
                    {detailDescription}
                  </p>
                </div>
              )}
            </TabsContent>

            {/* 활동 내역 탭 */}
            <TabsContent
              value="activities"
              className="space-y-6 data-[state=inactive]:hidden"
            >
              {/* 팀원 진도율 */}
              <div className="space-y-3">
                <h3 className="font-medium">팀원 진도율</h3>
                <div className="space-y-3 rounded-lg border p-4">
                  {members.map((member: Member) => (
                    <div key={member.id} className="flex items-center gap-3">
                      <Avatar className="size-8">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-1 items-center gap-3">
                        <span className="min-w-20 text-sm">{member.name}</span>
                        <div className="flex-1">
                          <div className="h-2 overflow-hidden rounded-full bg-muted">
                            <div
                              className="h-full rounded-full bg-primary transition-all"
                              style={{ width: `${member.progress}%` }}
                            />
                          </div>
                        </div>
                        <span className="min-w-12 text-right text-sm tabular-nums text-muted-foreground">
                          {member.progress}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h3 className="font-medium">최근 활동</h3>
                {activities.length === 0 ? (
                  <div className="rounded-lg border border-dashed p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      아직 활동 내역이 없습니다.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {activities.map((activity) => (
                      <div key={activity.id} className="rounded-lg border p-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex size-8 items-center justify-center rounded-full bg-primary/20">
                              <span className="text-xs font-medium">
                                {activity.user.slice(0, 1)}
                              </span>
                            </div>
                            <div>
                              <p className="text-sm font-medium">
                                {activity.user}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {activity.action}
                              </p>
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {activity.time}
                          </span>
                        </div>
                        {activity.content && (
                          <div className="mt-2 rounded bg-muted/30 p-2 text-sm">
                            {activity.content}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {activities.length > 0 && (
                  <div className="text-center">
                    <Button variant="ghost" size="sm" className="text-xs">
                      더 많은 활동 보기
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* 토론 및 이벤트 탭 */}
            <TabsContent
              value="discussions"
              className="space-y-6 data-[state=inactive]:hidden"
            >
              <div className="space-y-3">
                <h3 className="font-medium">진행 중인 토론</h3>

                {discussions.length === 0 ? (
                  <div className="rounded-lg border border-dashed p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      아직 진행 중인 토론이 없습니다.
                    </p>
                  </div>
                ) : (
                  discussions.map((discussion) => (
                    <div
                      key={discussion.id}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div className="flex items-center gap-3">
                        <MessageSquare className="size-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium">
                            {discussion.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            댓글 {discussion.comments}개 •{" "}
                            {discussion.lastActive}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-xs">
                        참여
                      </Button>
                    </div>
                  ))
                )}
              </div>

              <Separator />

              <div className="space-y-3">
                <h3 className="font-medium">다가오는 이벤트</h3>

                {events.length === 0 ? (
                  <div className="rounded-lg border border-dashed p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      예정된 이벤트가 없습니다.
                    </p>
                  </div>
                ) : (
                  events.map((event) => (
                    <div key={event.id} className="rounded-lg border p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <Calendar className="size-5 text-primary" />
                            <p className="text-sm font-medium">{event.title}</p>
                          </div>
                          <div className="mt-1 text-xs text-muted-foreground">
                            <p>
                              {event.date} {event.time}
                            </p>
                            <p className="mt-1 flex items-center gap-1">
                              <Users className="size-3" />
                              <span>{event.participants}명 참여 예정</span>
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="text-xs">
                          알림 설정
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="rounded-lg border border-dashed p-4 text-center">
                <p className="text-sm font-medium">
                  새 토론이나 이벤트를 만들고 싶으신가요?
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  그룹에 참여하여 새로운 주제를 시작하세요.
                </p>
              </div>
            </TabsContent>
          </div>
        </Tabs>

        <DialogFooter className="border-t pt-4">
          <Button variant="outline" onClick={onClose}>
            닫기
          </Button>
          <Link to="/kiwi/$id" params={{ id }} className="w-full sm:w-auto">
            <Button className="w-full">
              입장하기
              <ChevronRight className="ml-2 size-4" />
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default BookRoomDetail;
