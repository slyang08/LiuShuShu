// apps/web/messages/schema.ts
export type Messages = {
  home: {
    title: string;
    subtitle: string;
    todayDurian: string;
    location: string;
    contactUs: string;
  };
  contact: {
    address: string;
    businessTime: string;
    contact: string;
    problem: string;
    wechat: string;
  };
  durians: {
    today: string;
    title: string;
    inventories: string;
    empty: string;
    emptyDesc: string;
    perKg: string;
    pcs: string;
  };
  map: {
    location: string;
  };
  admin: {
    login: string;
  };
  nav: {
    switchLang: string;
  };
};
