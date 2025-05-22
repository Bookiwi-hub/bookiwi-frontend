import { Dispatch } from "react";

// 상태 타입 정의
export type Step = 1 | 2 | 3 | 4;

export interface KiwiState {
  step: Step;
  kiwiName: string;
  kiwiDescription: string;
  passwordProtected: boolean;
  password: string;
  confirmPassword: string;
  passwordError: boolean;
  nameError: boolean;
  descriptionError: boolean;
  selectedFile: File | null;
  fileError: boolean;
  shareCode: string;
  copied: boolean;
}

// 액션 타입 정의
export type KiwiAction =
  | { type: "SET_STEP"; payload: Step }
  | { type: "SET_KIWI_NAME"; payload: string }
  | { type: "SET_KIWI_DESCRIPTION"; payload: string }
  | { type: "SET_PASSWORD_PROTECTED"; payload: boolean }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "SET_CONFIRM_PASSWORD"; payload: string }
  | { type: "SET_PASSWORD_ERROR"; payload: boolean }
  | { type: "SET_NAME_ERROR"; payload: boolean }
  | { type: "SET_DESCRIPTION_ERROR"; payload: boolean }
  | { type: "SET_SELECTED_FILE"; payload: File | null }
  | { type: "SET_FILE_ERROR"; payload: boolean }
  | { type: "SET_SHARE_CODE"; payload: string }
  | { type: "SET_COPIED"; payload: boolean }
  | { type: "VALIDATE_STEP_1" }
  | { type: "VALIDATE_STEP_2" }
  | { type: "RESET" };

// 초기 상태
export const initialState: KiwiState = {
  step: 1,
  kiwiName: "",
  kiwiDescription: "",
  passwordProtected: false,
  password: "",
  confirmPassword: "",
  passwordError: false,
  nameError: false,
  descriptionError: false,
  selectedFile: null,
  fileError: false,
  shareCode: "",
  copied: false,
};

export interface StateDispatchProps {
  state: KiwiState;
  dispatch: Dispatch<KiwiAction>;
}

// 리듀서 함수
export const kiwiReducer = (
  state: KiwiState,
  action: KiwiAction,
): KiwiState => {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, step: action.payload };
    case "SET_KIWI_NAME":
      return { ...state, kiwiName: action.payload, nameError: false };
    case "SET_KIWI_DESCRIPTION":
      return {
        ...state,
        kiwiDescription: action.payload,
        descriptionError: false,
      };
    case "SET_PASSWORD_PROTECTED":
      return { ...state, passwordProtected: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload, passwordError: false };
    case "SET_CONFIRM_PASSWORD":
      return {
        ...state,
        confirmPassword: action.payload,
        passwordError: false,
      };
    case "SET_PASSWORD_ERROR":
      return { ...state, passwordError: action.payload };
    case "SET_NAME_ERROR":
      return { ...state, nameError: action.payload };
    case "SET_DESCRIPTION_ERROR":
      return { ...state, descriptionError: action.payload };
    case "SET_SELECTED_FILE":
      return { ...state, selectedFile: action.payload, fileError: false };
    case "SET_FILE_ERROR":
      return { ...state, fileError: action.payload };
    case "SET_SHARE_CODE":
      return { ...state, shareCode: action.payload };
    case "SET_COPIED":
      return { ...state, copied: action.payload };
    case "VALIDATE_STEP_1": {
      const nameError = state.kiwiName.trim() === "";
      const passwordError =
        state.passwordProtected &&
        (state.password === "" || state.password !== state.confirmPassword);

      return {
        ...state,
        nameError,
        descriptionError: false,
        passwordError,
      };
    }
    case "VALIDATE_STEP_2": {
      const fileError = !state.selectedFile;
      return { ...state, fileError };
    }
    case "RESET":
      return initialState;
    default:
      return state;
  }
};
