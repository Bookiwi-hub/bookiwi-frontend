import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import tempUser from "#/DB/users";
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
import { color } from "#/constants/color";

function ParticipantRegistrationModal() {
  const [nickname, setNickname] = useState(tempUser.name);
  const [selectedColor, setSelectedColor] = useState<(typeof color)[number]>(
    color[0],
  );
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate({ to: "/my-kiwis" });
  };

  return (
    <Dialog open onOpenChange={handleCancel}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>키위 참가</DialogTitle>
          <DialogDescription>
            이 키위에서 활동할 닉네임과 색상을 선택해주세요.
          </DialogDescription>
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
              {color.map((colorOption) => (
                <button
                  key={colorOption}
                  type="button"
                  className={`size-8 rounded-full border-2 transition-all ${
                    selectedColor === colorOption
                      ? "scale-110 border-gray-800"
                      : "border-gray-300 hover:border-gray-500"
                  }`}
                  style={{ backgroundColor: colorOption }}
                  onClick={() => setSelectedColor(colorOption)}
                  aria-label="색상 선택"
                />
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={handleCancel}>
            취소
          </Button>
          <Button disabled={!nickname.trim()}>참가하기</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ParticipantRegistrationModal;
