import { memo, useEffect, useRef, useState } from "react";

import { useAtomValue } from "@bookiwi/jotai";
import { Comment, Highlight, NewComment } from "@bookiwi/supabase/types";

import CommentForm from "./comment-form";
import Comments from "./comments";
import HighlightedText from "./highlighted-text";

import { ScrollArea } from "#/components/ui/scroll-area";
import { useLoadingError } from "#/hooks";
import {
  addComment,
  getHighlightComments,
} from "#/routes/kiwi/-reader/apis/comment";
import { participantInfoAtom, navAtom } from "#/routes/kiwi/-reader/atoms";

interface CommentProps {
  highlight: Highlight;
}
function AnnotationTab({ highlight }: CommentProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, isError, fetchComments] =
    useLoadingError(getHighlightComments);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const prevCommentsLengthRef = useRef<number>(comments.length);
  const participantInfo = useAtomValue(participantInfoAtom);
  const navItems = useAtomValue(navAtom);
  const annotationNav = navItems?.find(
    (item) => item.href === highlight.sectionHref,
  );
  const sectionLabel = annotationNav?.label;

  useEffect(() => {
    if (!highlight.id) return;
    const fetchData = async () => {
      const highlightComments = await fetchComments(highlight.id);
      if (!highlightComments) return;
      setComments(highlightComments);
    };
    fetchData();
  }, [highlight.id, fetchComments]);

  useEffect(
    () => {
      // 새 코멘트가 추가되었을 때만 스크롤을 맨 아래로 이동
      if (comments.length > prevCommentsLengthRef.current) {
        if (scrollAreaRef.current) {
          const scrollContainer = scrollAreaRef.current.querySelector(
            "[data-radix-scroll-area-viewport]",
          );
          if (scrollContainer) {
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
          }
        }
      }
      prevCommentsLengthRef.current = comments.length;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [comments],
  );

  if (!participantInfo) return null;

  const handleCommentSubmit = async (commentText: string) => {
    const currentDate = new Date().toISOString();
    const newComment: NewComment = {
      highlightId: highlight.id,
      text: commentText,
      createdAt: currentDate,
      updatedAt: currentDate,
      participantId: participantInfo.id,
    };

    const { id } = await addComment(newComment);
    if (!id) return;
    const createdComment: Comment = {
      ...newComment,
      id,
      name: participantInfo.name,
      profileImage: participantInfo.profileImage,
      color: participantInfo.color,
    };
    setComments([...comments, createdComment]);
  };

  return (
    <div className="flex size-full flex-col justify-between">
      <ScrollArea className="flex flex-col p-4" ref={scrollAreaRef}>
        <HighlightedText
          color={highlight.color}
          text={highlight.text}
          date={highlight.updatedAt}
          creatorName={highlight.name}
          sectionLabel={sectionLabel}
        />
        {isLoading && null}
        {isError && (
          <div className="flex justify-center py-4">
            <div className="text-sm text-red-500">
              댓글을 불러오는데 실패했습니다.
            </div>
          </div>
        )}
        {!isLoading && !isError && <Comments comments={comments} />}
      </ScrollArea>
      <CommentForm
        onSubmit={handleCommentSubmit}
        participantColor={participantInfo.color}
      />
    </div>
  );
}

export default memo(AnnotationTab);
