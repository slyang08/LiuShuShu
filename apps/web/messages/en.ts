import { Messages } from "./schema";

export const en = {
  home: {
    title: "Liu Shu Shu",
    subtitle: "Fresh durians updated daily",
    todayDurian: "Today's Durian",
    location: "Store Location",
    contactUs: "Contact Us",
  },
  contact: {
    address: "Address",
    businessTime: "Business Time",
    contact: "Contact",
    problem: "Deposit durian or problems? Feel free to reach out to us!",
    wechat: "WeChat",
  },
  map: {
    location: "Store Location",
  },
  durians: {
    today: "Today",
    title: "Today's Durian",
    inventories: "We still have",
    empty: "No durians yet or sold out 😢",
    emptyDesc: "Please wait for a second!",
    perKg: "(RM / 1000g)",
    pcs: "pcs",
  },
  admin: {
    login: "Login",
  },
  nav: {
    switchLang: "Language",
  },
} satisfies Messages;

export default en;
