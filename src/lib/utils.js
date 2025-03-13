import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formateDateAndTime(dateTime) {
  const date = new Date(dateTime);
  const options = {
    day: "numeric",
    month: "short",
    year: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const formattedDate = date
    .toLocaleString("en-GB", options)
    .replace(",", "")
    .replace("AM", "AM")
    .replace("PM", "PM");

  return formattedDate;
}
