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
