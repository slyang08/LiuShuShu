import { Messages } from "./schema";

export const zhCN: Messages = {
  home: {
    title: "榴莲树树",
    subtitle: "新鲜榴莲每日更新中",
    todayDurian: "今日榴莲",
    location: "店铺位置",
    contactUs: "联繫我们",
  },
  contact: {
    address: "地址",
    businessTime: "营业时间",
    contact: "联繫",
    problem: "如果想预留榴莲或有任何问题，可以透过以下方式联繫我们。",
    wechat: "微信",
  },
  map: {
    location: "位置",
  },
  durians: {
    today: "今天",
    title: "今日榴莲",
    inventories: "還有的果",
    empty: "榴莲暂无进货或已卖光 😢",
    emptyDesc: "请再稍等一下哦！",
    perKg: "(RM / 1000克)",
    pcs: "粒",
  },
  admin: {
    login: "登录",
  },
  nav: {
    switchLang: "语言",
  },
} satisfies Messages;

export default zhCN;
