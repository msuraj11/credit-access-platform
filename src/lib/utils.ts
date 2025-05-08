
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format as fnsFormat, parse } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  // Parse the input date string (expected format: YYYY-MM-DD)
  const date = parse(dateString, 'yyyy-MM-dd', new Date());
  
  // Return the date in DD.MM.YYYY format
  return fnsFormat(date, 'dd.MM.yyyy');
}
