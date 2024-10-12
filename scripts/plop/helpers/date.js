import { format, getISOWeek, getYear } from "date-fns";
const helper = (plop) => {
  plop.setDefaultInclude({ helpers: true });

  plop.setHelper("date", () => {
    const date = format(Date.now(), "yyyy-MM-dd");
    return date;
  });

  plop.setHelper("week", () => {
    const week = getISOWeek(Date.now());
    return week;
  });

  plop.setHelper("year", () => {
    const year = getYear(Date.now());
    return year;
  });
};

export default helper;
