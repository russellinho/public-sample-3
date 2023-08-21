import { atom } from "recoil";

export const isAuthenticatingState = atom<boolean>({
  key: "isAuthenticatingState" + String(+new Date()),
  default: false,
});
