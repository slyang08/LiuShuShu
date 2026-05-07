// apps/web/messages/schema.ts
export type Messages = {
  home: {
    title: string;
    subtitle: string;
    todayDurian: string;
    location: string;
    contact: string;
  };
  admin: {
    login: string;
  };
  durians: {
    today: string;
    title: string;
    empty: string;
    emptyDesc: string;
    perKg: string;
    pcs: string;
  };
  nav: {
    switchLang: string;
  };
};
