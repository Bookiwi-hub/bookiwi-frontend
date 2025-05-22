import { AlertCircle } from "lucide-react";

import { StateDispatchProps } from "./reducer";

import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { Switch } from "#/components/ui/switch";
import { cn } from "#/lib/utils";

function KiwiInfo({ state, dispatch }: StateDispatchProps) {
  const {
    kiwiName,
    kiwiDescription,
    passwordProtected,
    password,
    confirmPassword,
    passwordError,
    nameError,
  } = state;

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
          onChange={(e) =>
            dispatch({ type: "SET_KIWI_NAME", payload: e.target.value })
          }
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
          onChange={(e) =>
            dispatch({ type: "SET_KIWI_DESCRIPTION", payload: e.target.value })
          }
        />
      </div>

      <div className="flex items-center gap-2 space-y-0">
        <Label htmlFor="password-protection">암호 설정</Label>
        <Switch
          id="password-protection"
          checked={passwordProtected}
          onCheckedChange={(checked) =>
            dispatch({ type: "SET_PASSWORD_PROTECTED", payload: checked })
          }
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
              onChange={(e) =>
                dispatch({ type: "SET_PASSWORD", payload: e.target.value })
              }
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
              onChange={(e) =>
                dispatch({
                  type: "SET_CONFIRM_PASSWORD",
                  payload: e.target.value,
                })
              }
              className={cn(passwordError && "border-destructive")}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default KiwiInfo;
