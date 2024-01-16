import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string){
  const currentDate = new Date();
  const inputDate = new Date(dateString);

  const timeDifference = currentDate.getTime() - inputDate.getTime();
  const secondDifference =  timeDifference / 1000

  if (secondDifference < 60) return `${Math.floor(secondDifference)} seconds ago`
  else if (secondDifference < 3600){
    const minutes = Math.floor(secondDifference/ 60)
    return `${minutes} ${minutes === 1 ? 'minute':'minutes'} ago`
  }
  else if (secondDifference < 86400){
    const hours = Math.floor(secondDifference/ 3660)
    return `${hours} ${hours === 1 ? 'hour':'hours'} ago`
  }
  else{
    const days = Math.floor(secondDifference/ 86400)
    return `${days} ${days === 1 ? 'day':'days'} ago`
  }
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export function formatDateString(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", options);

  const time = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${formattedDate} at ${time}`;
}
export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList.includes(userId);
};
