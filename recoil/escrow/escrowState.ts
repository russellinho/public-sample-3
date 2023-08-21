import { atom } from "recoil";

export const escrowState = atom<number>({
  key: "escrowState" + String(+new Date()),
  default: -1,
});
