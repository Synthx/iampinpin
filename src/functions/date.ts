import type { CollectionEntry, DataEntryMap } from "astro:content";

export const formatTime = (date: Date): string => {
  const formatter = new Intl.DateTimeFormat("en", {
    timeZone: "Europe/Paris",
    timeStyle: "short",
  });

  return formatter.format(date);
};

export const sortByDateDesc = <T extends keyof DataEntryMap>(
  a: CollectionEntry<T>,
  b: CollectionEntry<T>,
) => {
  return b.data.date.getTime() - a.data.date.getTime();
};

export const formatDate = (date: Date): string => {
  const formatter = new Intl.DateTimeFormat("en", {
    dateStyle: "long",
  });

  return formatter.format(date);
};
