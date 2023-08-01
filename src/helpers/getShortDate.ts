export const getShortDate = (date: string) => {
  if (date == undefined) return "";
  const [year, month, day] = date.split("-");
  const monthStr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Jun",
    "Jul",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${day} ${monthStr[Number(month) - 1]}`;
};
