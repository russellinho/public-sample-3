import { atom } from "recoil";

export const isContractDetailEnabledState = atom<boolean>({
  key: "isContractDetailEnabledState" + String(+new Date()),
  default: true,
});
