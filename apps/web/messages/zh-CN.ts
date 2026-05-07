import { Messages } from "./schema";

export const zhCN: Messages = {
  home: {
    title: "榴莲树树",
    subtitle: "新鲜榴莲每日更新中",
    todayDurian: "今日榴莲",
    location: "店铺位置",
    contact: "联络我们",
  },
  admin: {
    login: "登录",
  },
  durians: {
    today: "今天",
    title: "今日榴莲",
    empty: "榴莲暂无进货或已卖光 😢",
    emptyDesc: "请明天再来看看新鲜的榴莲哦！",
    perKg: "(RM / 1000克)",
    pcs: "粒",
  },
  nav: {
    switchLang: "语言",
  },
} satisfies Messages;

export default zhCN;
