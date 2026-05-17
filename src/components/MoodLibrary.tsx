import { motion } from "framer-motion";
import { moodDefinitions, typographyPresets } from "../data/typographyPresets";
import type { Mood } from "../types/typography";

interface MoodLibraryProps {
  selectedMood: Mood;
  onMoodChange: (mood: Mood) => void;
}

export function MoodLibrary({ selectedMood, onMoodChange }: MoodLibraryProps) {
  return (
    <section className="space-y-8">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-700">
          Mood Library
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-normal text-ink">Curated Tone System</h2>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {moodDefinitions.map((mood, index) => {
          const active = selectedMood === mood.name;
          const count = typographyPresets.filter((preset) => preset.mood === mood.name).length;

          return (
            <motion.button
              key={mood.name}
              type="button"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.035 }}
              onClick={() => onMoodChange(mood.name)}
              className={`group min-h-[360px] rounded-md border bg-[#FBFAF7] p-5 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-card ${
                active ? "border-orange-600" : "border-line hover:border-orange-600"
              }`}
            >
              <div className="relative mb-6 h-40 overflow-hidden rounded-sm border border-line bg-white p-4">
                <div className="absolute left-4 top-4 h-px w-16 bg-orange-600" />
                <div className="absolute bottom-4 left-4 h-14 w-24 border border-line bg-paper" />
                <div className="absolute bottom-10 right-5 h-20 w-16 bg-[#2D2B28]" />
                <div className="absolute right-9 top-8 h-10 w-24 border border-orange-600/60" />
                <div className="absolute bottom-8 right-24 h-px w-14 bg-stone-300" />
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
                    {count} presets
                  </p>
                  <h3
                    className={`mt-3 text-2xl font-semibold tracking-normal ${
                      active ? "text-orange-700" : "text-ink"
                    }`}
                  >
                    {mood.name}
                  </h3>
                </div>
                <span
                  className={`mt-1 h-3 w-3 rounded-full border ${
                    active ? "border-orange-600 bg-orange-600" : "border-line bg-white"
                  }`}
                  aria-hidden="true"
                />
              </div>
              <p className="mt-4 text-sm font-medium text-charcoal">{mood.tone}</p>
              <p className="mt-2 text-sm leading-6 text-muted">{mood.detail}</p>
              <div
                className={`mt-8 h-px transition-all ${
                  active ? "w-28 bg-orange-600" : "w-14 bg-line group-hover:w-24 group-hover:bg-orange-600"
                }`}
              />
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
