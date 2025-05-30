import { Dispatch } from "react";

/**
 * 키위 생성 프로세스의 단계를 나타내는 열거형
 */
export enum Step {
  BasicInfo = 1,
  FileUpload = 2,
  Processing = 3,
  Complete = 4,
}

/**
 * 키위 생성 상태 인터페이스
 */
export interface CreateKiwiState {
  step: Step;
  kiwiName: string;
  kiwiDescription: string;
  kiwiDetailDescription: string;
  passwordProtected: boolean;
  password: string;
  confirmPassword: string;
  passwordError: boolean;
  nameError: boolean;
  maxParticipantsEnabled: boolean;
  maxParticipants: string;
  maxParticipantsError: boolean;
  selectedFile: File | null;
  fileError: boolean;
  shareCode: string;
  copied: boolean;
}

/**
 * 액션 타입 상수
 */
export const ActionTypes = {
  SET_STEP: "SET_STEP",
  SET_KIWI_NAME: "SET_KIWI_NAME",
  SET_KIWI_DESCRIPTION: "SET_KIWI_DESCRIPTION",
  SET_KIWI_DETAIL_DESCRIPTION: "SET_KIWI_DETAIL_DESCRIPTION",
  SET_PASSWORD_PROTECTED: "SET_PASSWORD_PROTECTED",
  SET_PASSWORD: "SET_PASSWORD",
  SET_CONFIRM_PASSWORD: "SET_CONFIRM_PASSWORD",
  SET_PASSWORD_ERROR: "SET_PASSWORD_ERROR",
  SET_NAME_ERROR: "SET_NAME_ERROR",
  SET_MAX_PARTICIPANTS_ENABLED: "SET_MAX_PARTICIPANTS_ENABLED",
  SET_MAX_PARTICIPANTS: "SET_MAX_PARTICIPANTS",
  SET_MAX_PARTICIPANTS_ERROR: "SET_MAX_PARTICIPANTS_ERROR",
  SET_SELECTED_FILE: "SET_SELECTED_FILE",
  SET_FILE_ERROR: "SET_FILE_ERROR",
  VALIDATE_STEP_1: "VALIDATE_STEP_1",
  VALIDATE_STEP_2: "VALIDATE_STEP_2",
  SET_SHARE_CODE: "SET_SHARE_CODE",
  SET_COPIED: "SET_COPIED",
  RESET: "RESET",
} as const;

// 액션 타입 정의 - 관련 액션들을 그룹화
export type NavigationActions =
  | { type: typeof ActionTypes.SET_STEP; payload: Step }
  | { type: typeof ActionTypes.RESET };

export type FormInputActions =
  | { type: typeof ActionTypes.SET_KIWI_NAME; payload: string }
  | { type: typeof ActionTypes.SET_KIWI_DESCRIPTION; payload: string }
  | { type: typeof ActionTypes.SET_KIWI_DETAIL_DESCRIPTION; payload: string }
  | { type: typeof ActionTypes.SET_PASSWORD_PROTECTED; payload: boolean }
  | { type: typeof ActionTypes.SET_PASSWORD; payload: string }
  | { type: typeof ActionTypes.SET_CONFIRM_PASSWORD; payload: string }
  | { type: typeof ActionTypes.SET_MAX_PARTICIPANTS_ENABLED; payload: boolean }
  | { type: typeof ActionTypes.SET_MAX_PARTICIPANTS; payload: string }
  | { type: typeof ActionTypes.SET_SELECTED_FILE; payload: File | null };

export type ValidationActions =
  | { type: typeof ActionTypes.SET_PASSWORD_ERROR; payload: boolean }
  | { type: typeof ActionTypes.SET_NAME_ERROR; payload: boolean }
  | { type: typeof ActionTypes.SET_MAX_PARTICIPANTS_ERROR; payload: boolean }
  | { type: typeof ActionTypes.SET_FILE_ERROR; payload: boolean }
  | { type: typeof ActionTypes.VALIDATE_STEP_1 }
  | { type: typeof ActionTypes.VALIDATE_STEP_2 };

export type ShareActions =
  | { type: typeof ActionTypes.SET_SHARE_CODE; payload: string }
  | { type: typeof ActionTypes.SET_COPIED; payload: boolean };

export type CreateKiwiAction =
  | NavigationActions
  | FormInputActions
  | ValidationActions
  | ShareActions;

// 초기 상태
export const initialState: CreateKiwiState = {
  step: Step.BasicInfo,
  kiwiName: "",
  kiwiDescription: "",
  kiwiDetailDescription: "",
  passwordProtected: false,
  password: "",
  confirmPassword: "",
  passwordError: false,
  nameError: false,
  maxParticipantsEnabled: false,
  maxParticipants: "",
  maxParticipantsError: false,
  selectedFile: null,
  fileError: false,
  shareCode: "",
  copied: false,
};

export interface StateDispatchProps {
  state: CreateKiwiState;
  dispatch: Dispatch<CreateKiwiAction>;
}

/**
 * 기본 정보 단계(Step 1)의 유효성을 검사하는 함수
 */
const validateStep1 = (state: CreateKiwiState): Partial<CreateKiwiState> => {
  const nameError = state.kiwiName.trim() === "";
  const passwordError =
    state.passwordProtected &&
    (state.password === "" || state.password !== state.confirmPassword);
  const maxParticipantsError =
    state.maxParticipantsEnabled &&
    (state.maxParticipants === "" ||
      Number.isNaN(Number(state.maxParticipants)) ||
      Number(state.maxParticipants) <= 0);

  return {
    nameError,
    passwordError,
    maxParticipantsError,
  };
};

/**
 * 파일 업로드 단계(Step 2)의 유효성을 검사하는 함수
 */
const validateStep2 = (state: CreateKiwiState): Partial<CreateKiwiState> => ({
  fileError: !state.selectedFile,
});

// 리듀서 함수
export const createKiwiReducer = (
  state: CreateKiwiState,
  action: CreateKiwiAction,
): CreateKiwiState => {
  const { type } = action;

  switch (type) {
    case ActionTypes.SET_STEP:
      return { ...state, step: action.payload };

    // 폼 입력 관련 액션
    case ActionTypes.SET_KIWI_NAME:
      return { ...state, kiwiName: action.payload, nameError: false };

    case ActionTypes.SET_KIWI_DESCRIPTION:
      return {
        ...state,
        kiwiDescription: action.payload,
      };

    case ActionTypes.SET_KIWI_DETAIL_DESCRIPTION:
      return {
        ...state,
        kiwiDetailDescription: action.payload,
      };
    case ActionTypes.SET_PASSWORD_PROTECTED:
      return { ...state, passwordProtected: action.payload };

    case ActionTypes.SET_PASSWORD:
      return { ...state, password: action.payload, passwordError: false };

    case ActionTypes.SET_CONFIRM_PASSWORD:
      return {
        ...state,
        confirmPassword: action.payload,
        passwordError: false,
      };
    case ActionTypes.SET_MAX_PARTICIPANTS_ENABLED:
      return { ...state, maxParticipantsEnabled: action.payload };

    case ActionTypes.SET_MAX_PARTICIPANTS:
      return {
        ...state,
        maxParticipants: action.payload,
        maxParticipantsError: false,
      };

    case ActionTypes.SET_SELECTED_FILE:
      return { ...state, selectedFile: action.payload, fileError: false };

    // 오류 상태 관련 액션
    case ActionTypes.SET_PASSWORD_ERROR:
      return { ...state, passwordError: action.payload };

    case ActionTypes.SET_NAME_ERROR:
      return { ...state, nameError: action.payload };

    case ActionTypes.SET_MAX_PARTICIPANTS_ERROR:
      return { ...state, maxParticipantsError: action.payload };

    case ActionTypes.SET_FILE_ERROR:
      return { ...state, fileError: action.payload };

    // 유효성 검사 액션
    case ActionTypes.VALIDATE_STEP_1:
      return { ...state, ...validateStep1(state) };

    case ActionTypes.VALIDATE_STEP_2:
      return { ...state, ...validateStep2(state) };

    // 공유 관련 액션
    case ActionTypes.SET_SHARE_CODE:
      return { ...state, shareCode: action.payload };

    case ActionTypes.SET_COPIED:
      return { ...state, copied: action.payload };

    // 초기화 액션
    case ActionTypes.RESET:
      return initialState;

    default:
      return state;
  }
};
