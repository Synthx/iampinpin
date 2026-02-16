export const formatTime = (date: Date): string => {
  const formatter = new Intl.DateTimeFormat("en", {
    timeZone: "Europe/Paris",
    timeStyle: "short",
  });

  return formatter.format(date);
};

export const formatRelativeDate = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = diff / 1000 / 60 / 60 / 24;
  const normalizedDays = days > 1 ? Math.round(days) : 0;

  const formatter = new Intl.RelativeTimeFormat("en", {
    style: "long",
    numeric: "auto",
  });

  return formatter.format(-normalizedDays, "day");
};

export const formatDate = (date: Date): string => {
  const formatter = new Intl.DateTimeFormat("en", {
    dateStyle: "long",
  });

  return formatter.format(date);
};
