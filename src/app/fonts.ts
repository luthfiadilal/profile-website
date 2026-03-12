import localFont from "next/font/local";
import { Outfit, Inter } from "next/font/google";

export const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const ganky = localFont({
  src: "./fonts/Ganky-Regular.ttf",
  variable: "--font-ganky",
  display: "swap",
});
