import { atom } from "@bookiwi/jotai";

import { CreateKiwi, Step } from "./types";

export const stepAtom = atom<Step>(Step.One);

export const createKiwiAtom = atom<CreateKiwi>({
  kiwiName: "",
  kiwiDescription: "",
  kiwiDetailDescription: "",
  maxParticipants: 10,
  password: null,
  file: null,
  shareCode: "",
});

// step one

export const stepOneErrorAtom = atom<{
  kiwiName: boolean;
  maxParticipants: boolean;
  password: boolean;
  confirmPassword: boolean;
}>({
  kiwiName: false,
  maxParticipants: false,
  password: false,
  confirmPassword: false,
});

interface Action {
  type:
    | "SET_KIWI_NAME"
    | "SET_KIWI_DESCRIPTION"
    | "SET_KIWI_DETAIL_DESCRIPTION"
    | "SET_MAX_PARTICIPANTS"
    | "SET_PASSWORD"
    | "SET_PASSWORD_CONFIRM"
    | "SET_PASSWORD_PROTECTED";
  value: string | number | null | boolean;
}
export const passwordProtectedAtom = atom<boolean>(false);
export const confirmPasswordAtom = atom<string>("");
export const stepOneAtom = atom(
  (get) => {
    const {
      kiwiName,
      kiwiDescription,
      kiwiDetailDescription,
      maxParticipants,
      password,
    } = get(createKiwiAtom);
    const confirmPassword = get(confirmPasswordAtom);
    const passwordProtected = get(passwordProtectedAtom);
    return {
      kiwiName,
      kiwiDescription,
      kiwiDetailDescription,
      maxParticipants,
      password,
      confirmPassword,
      passwordProtected,
    };
  },
  (get, set, action: Action) => {
    const { type, value } = action;
    switch (type) {
      case "SET_KIWI_NAME":
        set(createKiwiAtom, {
          ...get(createKiwiAtom),
          kiwiName: value as string,
        });
        break;
      case "SET_KIWI_DESCRIPTION":
        set(createKiwiAtom, {
          ...get(createKiwiAtom),
          kiwiDescription: value as string,
        });
        break;
      case "SET_KIWI_DETAIL_DESCRIPTION":
        set(createKiwiAtom, {
          ...get(createKiwiAtom),
          kiwiDetailDescription: value as string,
        });
        break;
      case "SET_MAX_PARTICIPANTS":
        set(createKiwiAtom, {
          ...get(createKiwiAtom),
          maxParticipants: value as number,
        });
        break;
      case "SET_PASSWORD":
        set(createKiwiAtom, {
          ...get(createKiwiAtom),
          password: value as string,
        });
        break;
      case "SET_PASSWORD_CONFIRM":
        set(confirmPasswordAtom, value as string);
        break;
      case "SET_PASSWORD_PROTECTED":
        set(passwordProtectedAtom, value as boolean);
        break;
      default:
    }
  },
);

// step two
export const fileAtom = atom(
  (get) => {
    const { file } = get(createKiwiAtom);
    return file;
  },
  (get, set, file: File | null) => {
    set(createKiwiAtom, {
      ...get(createKiwiAtom),
      file,
    });
  },
);
