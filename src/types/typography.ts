import type { CSSProperties } from "react";

export const moods = [
  "Emotional / Reflective",
  "Streetwear",
  "Minimal",
  "Tech Signal",
  "Faith",
  "Racing",
  "Archive",
  "Luxury",
  "STEM Meme",
  "Editorial",
] as const;

export type Mood = (typeof moods)[number];

export type AppSection = "generator" | "saved" | "mood-library" | "collections" | "settings";

export type TypographyLayout = "center" | "stacked" | "label" | "split" | "poster" | "caption";

export type ShirtPlacement = "Front chest" | "Back large" | "Sleeve" | "Center print";

export const styleCategories = [
  "All Styles",
  "Minimal",
  "Futuristic",
  "Brutalist",
  "Racing",
  "Emotional",
  "Underground",
  "Editorial",
  "Archive",
  "Luxury",
] as const;

export type StyleCategory = (typeof styleCategories)[number];

export type MoodFilter = Mood | "All";

export interface TypeControls {
  fontFamily: string;
  fontWeight: string;
  textTransform: "uppercase" | "lowercase" | "none" | "capitalize";
  letterSpacing: number;
  lineHeight: number;
  alignment: "left" | "center" | "right";
  textColor: string;
  backgroundColor: string;
  uppercase: boolean;
  distort: boolean;
  outline: boolean;
  blur: boolean;
}

export interface MoodDefinition {
  name: Mood;
  tone: string;
  detail: string;
}

export interface TypographyPreset {
  id: string;
  name: string;
  mood: Mood;
  styleCategory: Exclude<StyleCategory, "All Styles">;
  fontFamily: string;
  fontWeight: CSSProperties["fontWeight"];
  textTransform: CSSProperties["textTransform"];
  letterSpacing: string;
  lineHeight: string;
  alignment: "left" | "center" | "right";
  layout: TypographyLayout;
  description: string;
  bestPlacement: ShirtPlacement;
}

export interface SavedDirection {
  id: string;
  statement: string;
  preset: TypographyPreset;
  savedAt: string;
}
