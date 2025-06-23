import { AlertCircle } from "lucide-react";
import { ChangeEvent } from "react";

import { useAtom, useSetAtom } from "@bookiwi/jotai";

import { errorAtom, stepAtom, stepOneAtom } from "../atom";
import { Step } from "../types";

import { Button } from "#/components/ui/button";
import { DialogFooter } from "#/components/ui/dialog";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { Switch } from "#/components/ui/switch";
import { Textarea } from "#/components/ui/textarea";
import { cn } from "#/lib/utils";

function StepOne() {
  const [state, dispatch] = useAtom(stepOneAtom);
  const [error, setError] = useAtom(errorAtom);
  const setStep = useSetAtom(stepAtom);

  const validateStepOne = () => {
    let isValid = true;
    const errorState = {
      kiwiName: false,
      kiwiDescription: false,
      kiwiDetailDescription: false,
      maxParticipants: false,
      password: false,
      confirmPassword: false,
    };
    if (state.kiwiName.trim() === "") {
      errorState.kiwiName = true;
      isValid = false;
    }
    if (state.kiwiDescription.trim() === "") {
      errorState.kiwiDescription = true;
      isValid = false;
    }
    if (state.kiwiDetailDescription.trim() === "") {
      errorState.kiwiDetailDescription = true;
      isValid = false;
    }
    if (state.maxParticipants <= 0 || state.maxParticipants > 10) {
      errorState.maxParticipants = true;
      isValid = false;
    }
    if (state.passwordProtected) {
      if (state.password?.trim() === "" || state.password === null) {
        errorState.password = true;
        isValid = false;
      } else if (state.password !== state.confirmPassword) {
        errorState.confirmPassword = true;
        isValid = false;
      }
    }
    setError(errorState);
    return isValid;
  };

  const handleClickNext = () => {
    if (validateStepOne()) {
      setStep(Step.Two);
    }
  };

  return (
    <>
      <div className="space-y-4 py-4">
        <KiwiInfoInput
          label="키위 이름"
          id="kiwi-name"
          placeholder="키위 이름을 입력하세요"
          value={state.kiwiName}
          onChange={(e) =>
            dispatch({ type: "SET_KIWI_NAME", value: e.target.value })
          }
          error={{
            status: error.kiwiName,
            message: "키위 이름을 입력해주세요",
          }}
          required
        />

        <KiwiInfoInput
          label="키위 설명"
          id="kiwi-description"
          placeholder="키위에 대한 설명을 입력하세요"
          value={state.kiwiDescription}
          onChange={(e) =>
            dispatch({ type: "SET_KIWI_DESCRIPTION", value: e.target.value })
          }
          error={{
            status: error.kiwiDescription,
            message: "키위 설명을 입력해주세요",
          }}
          required
        />

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
            value={state.kiwiDetailDescription}
            onChange={(e) =>
              dispatch({
                type: "SET_KIWI_DETAIL_DESCRIPTION",
                value: e.target.value,
              })
            }
            className="min-h-[100px] resize-y"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="max-participants"
              className="flex items-center gap-1"
            >
              최대인원 <span className="text-xs text-destructive">*</span>
            </Label>
            {error.maxParticipants && (
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
            value={state.maxParticipants}
            onChange={(e) =>
              dispatch({
                type: "SET_MAX_PARTICIPANTS",
                value: Number(e.target.value),
              })
            }
            className={cn(false && "border-destructive")}
            min={1}
            max={10}
          />
        </div>

        <div className="flex items-center gap-2 space-y-0">
          <Label htmlFor="password-protection">암호 설정</Label>
          <Switch
            id="password-protection"
            checked={state.passwordProtected}
            onCheckedChange={(checked) =>
              dispatch({
                type: "SET_PASSWORD_PROTECTED",
                value: checked,
              })
            }
          />
        </div>

        {state.passwordProtected && (
          <div className="space-y-2">
            <KiwiInfoInput
              label="암호"
              id="password"
              placeholder="암호를 입력하세요"
              value={state.password ?? ""}
              onChange={(e) =>
                dispatch({ type: "SET_PASSWORD", value: e.target.value })
              }
              error={{
                status: error.password,
                message: "비밀번호를 입력해주세요",
              }}
            />
            <KiwiInfoInput
              label="암호 확인"
              id="confirm-password"
              placeholder="암호를 다시 입력하세요"
              value={state.confirmPassword}
              onChange={(e) =>
                dispatch({
                  type: "SET_PASSWORD_CONFIRM",
                  value: e.target.value,
                })
              }
              error={{
                status: error.confirmPassword,
                message: "비밀번호가 일치하지 않습니다",
              }}
            />
          </div>
        )}
      </div>
      <DialogFooter className="sm:justify-between">
        <Button onClick={handleClickNext} className="ml-auto">
          다음
        </Button>
      </DialogFooter>
    </>
  );
}

interface KiwiInfoInputProps {
  label: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error: { status: boolean; message: string };
  required?: boolean;
}

function KiwiInfoInput({
  label,
  id,
  placeholder,
  value,
  onChange,
  error,
  required,
}: KiwiInfoInputProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={id} className="flex items-center gap-1">
          {label}{" "}
          {required && <span className="text-xs text-destructive">*</span>}
        </Label>
        {error.status && (
          <span className="flex items-center gap-1 text-xs text-destructive">
            <AlertCircle className="size-3" />
            {error.message}
          </span>
        )}
      </div>
      <Input
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={cn(error.status && "border-destructive")}
      />
    </div>
  );
}

export default StepOne;
