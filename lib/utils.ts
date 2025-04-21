import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDistance(meters: number): string {
  const kilometers = meters / 1000;
  return `${kilometers.toFixed(2)} km`;
}

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  }
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export function formatSpeed(metersPerSecond: number): string {
  const kilometersPerHour = (metersPerSecond * 3.6).toFixed(1);
  return `${kilometersPerHour} km/h`;
}

export function calculatePace(metersPerSecond: number): string {
  const minutesPerKilometer = 16.6667 / metersPerSecond;
  const minutes = Math.floor(minutesPerKilometer);
  const seconds = Math.floor((minutesPerKilometer - minutes) * 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
