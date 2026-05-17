import { ChevronDown } from "lucide-react";
import { moodDefinitions } from "../data/typographyPresets";
import { moods, type Mood } from "../types/typography";

interface MoodSelectorProps {
  selectedMood: Mood;
  onMoodChange: (mood: Mood) => void;
}

export function MoodSelector({ selectedMood, onMoodChange }: MoodSelectorProps) {
  const activeMood = moodDefinitions.find((mood) => mood.name === selectedMood);

  return (
    <section className="rounded-md border border-line bg-[#FBFAF7] p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
          Mood
        </h2>
        <ChevronDown size={16} strokeWidth={1.8} className="text-orange-700" />
      </div>
      <select
        value={selectedMood}
        onChange={(event) => onMoodChange(event.target.value as Mood)}
        className="h-12 w-full rounded-md border border-line bg-white px-3 text-sm font-semibold text-ink outline-none transition focus:border-orange-600"
      >
        {moods.map((mood) => (
          <option key={mood} value={mood}>
            {mood}
          </option>
        ))}
      </select>
      <div className="mt-6 border-t border-line pt-5">
        <p className="text-lg font-semibold text-ink">{activeMood?.tone}</p>
        <p className="mt-2 text-sm leading-6 text-muted">{activeMood?.detail}</p>
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {moods.map((mood) => {
          const active = mood === selectedMood;

          return (
            <button
              key={mood}
              type="button"
              onClick={() => onMoodChange(mood)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                active
                  ? "border-orange-600 bg-white text-orange-700"
                  : "border-line text-muted hover:border-orange-600 hover:text-orange-700"
              }`}
            >
              {mood}
            </button>
          );
        })}
      </div>
    </section>
  );
}
