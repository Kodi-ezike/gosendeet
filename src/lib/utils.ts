import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { TWClassNames } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function arrayToString(data: string[], separator: string) {
  return data.join(separator);
}

export function cls(
  ...classNames: (TWClassNames | string | null | undefined | false)[]
) {
  const validClasses = classNames.filter(
    (className) => !!className
  ) as string[];
  return arrayToString(validClasses, " ");
}

export function formatTimestampToReadable(dateString: string): string {
  const date = new Date(dateString);

  // Extract parts
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12; // Convert to 12-hour format

  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();

  return `${hours}:${minutes} ${ampm}, ${day} ${month} ${year}`;
}


export function timeAgo(timestamp: string): string {
  const now = new Date();
  const past = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (isNaN(diffInSeconds)) return "Invalid date";

  const seconds = diffInSeconds;
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(seconds / 3600);
  const days = Math.floor(seconds / 86400);
  const weeks = Math.floor(seconds / 604800);
  const months = Math.floor(seconds / 2629800); // Approx: 30.44 days
  const years = Math.floor(seconds / 31557600); // Approx: 365.25 days

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  if (days < 7) return `${days} day${days !== 1 ? "s" : ""} ago`;
  if (weeks < 4) return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
  if (months < 12) return `${months} month${months !== 1 ? "s" : ""} ago`;
  return `${years} year${years !== 1 ? "s" : ""} ago`;
}
