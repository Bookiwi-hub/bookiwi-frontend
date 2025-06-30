import { redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { colors } from "@bookiwi/color";

import { addParticipant } from "../-apis/add-participant";

import { Button } from "#/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "#/components/ui/dialog";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import userManager from "#/managers/user";

interface AddParticipantModalProps {
  kiwiId: string;
  kiwiName: string;
  takenColors: string[];
}

function AddParticipantModal({
  kiwiName,
  kiwiId,
  takenColors,
}: AddParticipantModalProps) {
  const { user } = userManager;
  if (!user) {
    throw redirect({ to: "/auth" });
  }
  const [nickname, setNickname] = useState(user.name);
  const [selectedColor, setSelectedColor] = useState<(typeof colors)[number]>(
    () => {
      const availableColor = colors.find((c) => !takenColors.includes(c));
      return availableColor || colors[0];
    },
  );
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate({ to: "/my-kiwis" });
  };

  const isColorTaken = (colorOption: string) =>
    takenColors.includes(colorOption);

  const handleAddParticipant = async () => {
    try {
      await addParticipant(kiwiId, {
        kiwiId,
        userId: user.id,
        name: nickname.trim(),
        profileImage: user.profileImage,
        color: selectedColor,
        settings: {
          isSinglePage: false,
          fontFamily: null,
          fontSize: null,
          lineHeight: null,
          fontWeight: null,
        },
        record: {
          currentCfi: null,
          percentage: null,
          bookmarks: [],
        },
        lastActivityAt: new Date().toISOString(),
      });
      toast.success(`${kiwiName}에 오신 것을 환영합니다!`);
      navigate({ to: `/kiwi/${kiwiId}` });
    } catch (error) {
      toast.error("참가에 실패했습니다. 다시 시도해주세요.", {
        action: {
          label: "Home",
          onClick: () => navigate({ to: "/" }),
        },
      });
    }
  };

  return (
    <Dialog open onOpenChange={handleCancel}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{kiwiName}에 참가하기</DialogTitle>
          <DialogDescription>닉네임과 색상을 선택해주세요.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nickname">닉네임</Label>
            <Input
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="참가할 닉네임을 입력하세요"
            />
          </div>

          <div className="space-y-2">
            <Label>색상</Label>
            <div className="flex flex-wrap gap-2">
              {colors.map((colorOption) => {
                const isTaken = isColorTaken(colorOption);
                const isSelected = selectedColor === colorOption;

                return (
                  <button
                    key={colorOption}
                    type="button"
                    disabled={isTaken}
                    className={`relative size-8 rounded-full border-2 transition-all ${
                      isSelected
                        ? "scale-110 border-gray-800"
                        : "border-gray-300 hover:border-gray-500"
                    } ${
                      isTaken
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer"
                    }`}
                    style={{ backgroundColor: colorOption }}
                    onClick={() => !isTaken && setSelectedColor(colorOption)}
                    aria-label={isTaken ? "이미 사용중인 색상" : "색상 선택"}
                    title={
                      isTaken
                        ? "이미 다른 사용자가 선택한 색상입니다"
                        : undefined
                    }
                  >
                    {isTaken && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-6 w-0.5 rotate-45 bg-gray-600" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={handleCancel}>
            취소
          </Button>
          <Button
            disabled={!nickname.trim() || !selectedColor}
            onClick={handleAddParticipant}
          >
            참가하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddParticipantModal;
