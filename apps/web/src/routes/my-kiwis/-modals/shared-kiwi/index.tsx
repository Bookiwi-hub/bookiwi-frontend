import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { useAtomValue, useSetAtom } from "@bookiwi/jotai";

import { addUserKiwi } from "../../-apis";
import InfoCard from "../../-components/info-card";
import {
  closeModalAtom,
  selectedKiwiAtom,
  ModalState,
  modalStateAtom,
} from "../atoms";

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
import { useLoading } from "#/hooks";
import userManager from "#/managers/user";

function SharedKiwiModal() {
  const modalState = useAtomValue(modalStateAtom);
  const isOpen = modalState === ModalState.SharedKiwi;
  const kiwi = useAtomValue(selectedKiwiAtom);
  const closeSharedKiwiModal = useSetAtom(closeModalAtom);
  const router = useRouter();

  const [inputPassword, setInputPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, handleLoad] = useLoading(addUserKiwi);

  if (!isOpen || !kiwi) return null;

  const { password } = kiwi;
  const hasPassword = password && password.trim() !== "";

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setInputPassword("");
      setPasswordError("");
      closeSharedKiwiModal();
    }
  };

  const handleJoinKiwi = async () => {
    if (hasPassword) {
      if (!inputPassword.trim()) {
        setPasswordError("비밀번호를 입력해주세요.");
        return;
      }

      if (inputPassword !== password) {
        setPasswordError("비밀번호가 일치하지 않습니다.");
        return;
      }
    }

    setPasswordError("");

    try {
      if (!userManager.userId) throw new Error("User ID is not found");

      await handleLoad(userManager.userId, kiwi.id);
      closeSharedKiwiModal();
      toast.success("키위를 가져왔습니다.");
      await router.invalidate();
    } catch (error) {
      toast.error("오류가 발생했습니다.");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPassword(e.target.value);
    if (passwordError) {
      setPasswordError("");
    }
  };

  return (
    <Dialog open onOpenChange={handleOpenChange}>
      <DialogContent className="min-w-[500px] mobile:min-w-full">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            키위 가져오기
          </DialogTitle>
          <DialogDescription>
            {hasPassword
              ? "이 키위는 비밀번호로 보호되어 있습니다. 비밀번호를 입력해주세요."
              : "키위를 가져오시겠습니까?"}
          </DialogDescription>
        </DialogHeader>

        {/* 키위 정보 카드 */}
        <InfoCard kiwi={kiwi} />

        {/* 비밀번호 입력 필드 */}
        {hasPassword && (
          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={inputPassword}
              onChange={handlePasswordChange}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isLoading) {
                  handleJoinKiwi();
                }
              }}
              className={passwordError ? "border-red-500" : ""}
            />
            {passwordError && (
              <p className="text-sm text-red-500">{passwordError}</p>
            )}
          </div>
        )}

        <DialogFooter className="border-t pt-4">
          <Button
            variant="outline"
            onClick={closeSharedKiwiModal}
            disabled={isLoading}
            onFocus={(e) => e.target.blur()}
          >
            취소
          </Button>
          <Button
            variant="destructive"
            onClick={handleJoinKiwi}
            disabled={isLoading}
          >
            {isLoading ? "가져오는 중..." : "가져오기"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SharedKiwiModal;
