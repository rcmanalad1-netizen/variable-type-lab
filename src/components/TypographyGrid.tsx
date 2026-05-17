import type { MoodFilter, TypeControls, TypographyPreset } from "../types/typography";
import { TypographyCard } from "./TypographyCard";

interface TypographyGridProps {
  controls?: TypeControls;
  mood: MoodFilter;
  presets: TypographyPreset[];
  statement: string;
  onCardClick: (preset: TypographyPreset) => void;
}

export function TypographyGrid({ controls, mood, presets, statement, onCardClick }: TypographyGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3" aria-label={`${mood} typography directions`}>
      {presets.map((preset, index) => (
        <TypographyCard
          key={preset.id}
          controls={controls}
          index={index}
          preset={preset}
          statement={statement}
          onClick={() => onCardClick(preset)}
        />
      ))}
    </div>
  );
}
