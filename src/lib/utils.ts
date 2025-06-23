import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const integrantes = [
  "Fabián Gustavo Quintana",
  "Geraldine Janet Rodríguez",
  "Geronimo Serial",
  "Leonel Francisco Alegre",
  "Máximo Tomás Riveros",
];
