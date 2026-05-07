import { Messages } from "./schema";

export const ms: Messages = {
  home: {
    title: "Liu Shu Shu",
    subtitle: "Durian segar dikemas kini setiap hari",
    todayDurian: "Durian Hari Ini",
    location: "Lokasi Kedai",
    contact: "Hubungi Kami",
  },
  admin: {
    login: "Log Masuk",
  },
  durians: {
    today: "Hari Ini",
    title: "Durian Hari Ini",
    empty: "Tiada durian tersedia hari ini",
    emptyDesc: "Sila kembali esok untuk durian segar!",
    perKg: "(RM / 1000g)",
    pcs: "biji",
  },
  nav: {
    switchLang: "Bahasa",
  },
} satisfies Messages;

export default ms;
