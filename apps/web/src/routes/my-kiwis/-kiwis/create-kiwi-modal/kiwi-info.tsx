import { AlertCircle } from "lucide-react";
import { ChangeEvent } from "react";

import { useCreateKiwi } from "./context";
import { ActionTypes } from "./reducer";

import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { Switch } from "#/components/ui/switch";
import { Textarea } from "#/components/ui/textarea";
import { cn } from "#/lib/utils";

function KiwiInfo() {
  const { state, dispatch } = useCreateKiwi();
  const {
    kiwiName,
    kiwiDescription,
    kiwiDetailDescription,
    passwordProtected,
    password,
    confirmPassword,
    passwordError,
    nameError,
    maxParticipantsEnabled,
    maxParticipants,
    maxParticipantsError,
  } = state;

  const handleKiwiNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ActionTypes.SET_KIWI_NAME,
      payload: e.target.value,
    });
  };

  const handleKiwiDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ActionTypes.SET_KIWI_DESCRIPTION,
      payload: e.target.value,
    });
  };

  const handleKiwiDetailDescriptionChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    dispatch({
      type: ActionTypes.SET_KIWI_DETAIL_DESCRIPTION,
      payload: e.target.value,
    });
  };

  const handlePasswordProtectedChange = (checked: boolean) => {
    dispatch({
      type: ActionTypes.SET_PASSWORD_PROTECTED,
      payload: checked,
    });
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ActionTypes.SET_PASSWORD,
      payload: e.target.value,
    });
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ActionTypes.SET_CONFIRM_PASSWORD,
      payload: e.target.value,
    });
  };

  const handleMaxParticipantsEnabledChange = (checked: boolean) => {
    dispatch({
      type: ActionTypes.SET_MAX_PARTICIPANTS_ENABLED,
      payload: checked,
    });
  };

  const handleMaxParticipantsChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ActionTypes.SET_MAX_PARTICIPANTS,
      payload: e.target.value,
    });
  };

  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="kiwi-name" className="flex items-center gap-1">
            키위 이름 <span className="text-xs text-destructive">*</span>
          </Label>
          {nameError && (
            <span className="flex items-center gap-1 text-xs text-destructive">
              <AlertCircle className="size-3" />
              키위 이름을 입력해주세요
            </span>
          )}
        </div>
        <Input
          id="kiwi-name"
          placeholder="키위 이름을 입력하세요"
          value={kiwiName}
          onChange={handleKiwiNameChange}
          className={cn(nameError && "border-destructive")}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="kiwi-description" className="flex items-center gap-1">
            키위 설명
          </Label>
        </div>
        <Input
          id="kiwi-description"
          placeholder="키위에 대한 설명을 입력하세요"
          value={kiwiDescription}
          onChange={handleKiwiDescriptionChange}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label
            htmlFor="kiwi-detail-description"
            className="flex items-center gap-1"
          >
            키위 상세 설명
          </Label>
        </div>
        <Textarea
          id="kiwi-detail-description"
          placeholder="키위에 대한 상세 설명을 입력하세요"
          value={kiwiDetailDescription}
          onChange={handleKiwiDetailDescriptionChange}
          className="min-h-[100px] resize-y"
        />
      </div>

      <div className="flex items-center gap-2 space-y-0">
        <Label htmlFor="max-participants-setting">최대인원 제한</Label>
        <Switch
          id="max-participants-setting"
          checked={maxParticipantsEnabled}
          onCheckedChange={handleMaxParticipantsEnabledChange}
        />
      </div>

      {maxParticipantsEnabled && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="max-participants"
              className="flex items-center gap-1"
            >
              최대인원 <span className="text-xs text-destructive">*</span>
            </Label>
            {maxParticipantsError && (
              <span className="flex items-center gap-1 text-xs text-destructive">
                <AlertCircle className="size-3" />
                올바른 인원수를 입력해주세요
              </span>
            )}
          </div>
          <Input
            id="max-participants"
            type="number"
            placeholder="최대 참여 인원수를 입력하세요"
            value={maxParticipants}
            onChange={handleMaxParticipantsChange}
            className={cn(maxParticipantsError && "border-destructive")}
            min="1"
          />
        </div>
      )}

      <div className="flex items-center gap-2 space-y-0">
        <Label htmlFor="password-protection">암호 설정</Label>
        <Switch
          id="password-protection"
          checked={passwordProtected}
          onCheckedChange={handlePasswordProtectedChange}
        />
      </div>

      {passwordProtected && (
        <div className="space-y-2">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="flex items-center gap-1">
                암호 <span className="text-xs text-destructive">*</span>
              </Label>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="암호를 입력하세요"
              value={password}
              onChange={handlePasswordChange}
              className={cn(passwordError && "border-destructive")}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="confirm-password"
                className="flex items-center gap-1"
              >
                암호 확인
              </Label>
              {passwordError && (
                <span className="flex items-center gap-1 text-xs text-destructive">
                  <AlertCircle className="size-3" />
                  암호가 일치하지 않습니다
                </span>
              )}
            </div>
            <Input
              id="confirm-password"
              type="password"
              placeholder="암호를 다시 입력하세요"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className={cn(passwordError && "border-destructive")}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default KiwiInfo;
