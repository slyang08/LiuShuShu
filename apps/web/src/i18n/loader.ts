import en from "../../messages/en";
import ms from "../../messages/ms";
import zhCN from "../../messages/zh-CN";
import zhTW from "../../messages/zh-TW";

export type Messages = typeof en;

export const loaders = {
  en: () => Promise.resolve(en),
  "zh-CN": () => Promise.resolve(zhCN),
  "zh-TW": () => Promise.resolve(zhTW),
  ms: () => Promise.resolve(ms),
};
