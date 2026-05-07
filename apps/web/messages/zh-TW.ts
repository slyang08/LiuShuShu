import { Messages } from "./schema";

export const zhTW: Messages = {
  home: {
    title: "榴蓮樹樹",
    subtitle: "新鮮榴蓮每日更新中",
    todayDurian: "今日榴蓮",
    location: "店鋪位置",
    contact: "聯絡我們",
  },
  admin: {
    login: "登入",
  },
  durians: {
    today: "今天",
    title: "今日榴蓮",
    empty: "榴蓮暫無進貨或已賣光 😢",
    emptyDesc: "請明天再來看看新鮮的榴蓮！",
    perKg: "(RM / 1000克)",
    pcs: "粒",
  },
  nav: {
    switchLang: "語言",
  },
} satisfies Messages;

export default zhTW;
