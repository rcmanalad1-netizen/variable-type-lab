import { AnimatePresence, motion } from "framer-motion";
import { Download, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "./components/AppShell";
import { CustomizePanel, defaultTypeControls } from "./components/CustomizePanel";
import { DetailPanel } from "./components/DetailPanel";
import { MoodLibrary } from "./components/MoodLibrary";
import { SavedView } from "./components/SavedView";
import { StatementInput } from "./components/StatementInput";
import { TypographyGrid } from "./components/TypographyGrid";
import { moodDefinitions, typographyPresets } from "./data/typographyPresets";
import {
  styleCategories,
  type AppSection,
  type Mood,
  type MoodFilter,
  type SavedDirection,
  type StyleCategory,
  type TypeControls,
  type TypographyPreset,
} from "./types/typography";

const DEFAULT_STATEMENT = "You are allowed to change.";
const SAVED_KEY = "variable-type-lab:saved-directions";

type SelectedDirection = {
  preset: TypographyPreset;
  statement: string;
} | null;

const sectionTitles: Record<AppSection, string> = {
  generator: "Generate",
  saved: "Saved",
  "mood-library": "Browse Styles",
  collections: "Collections",
  settings: "Typography Library",
};

function makeId() {
  return globalThis.crypto?.randomUUID
    ? globalThis.crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function readSavedDirections(): SavedDirection[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(SAVED_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as SavedDirection[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function App() {
  const [activeSection, setActiveSection] = useState<AppSection>("generator");
  const [statement, setStatement] = useState(DEFAULT_STATEMENT);
  const [activeMoodFilter, setActiveMoodFilter] = useState<MoodFilter>("All");
  const [selectedMood, setSelectedMood] = useState<Mood>("Emotional / Reflective");
  const [activeStyleCategory, setActiveStyleCategory] = useState<StyleCategory>("All Styles");
  const [controls, setControls] = useState<TypeControls>(defaultTypeControls);
  const [selectedDirection, setSelectedDirection] = useState<SelectedDirection>(null);
  const [savedDirections, setSavedDirections] = useState<SavedDirection[]>(readSavedDirections);
  const [toast, setToast] = useState<string | null>(null);

  const activePresets = useMemo(() => {
    return typographyPresets.filter((preset) => {
      const moodMatches = activeMoodFilter === "All" || preset.mood === activeMoodFilter;
      const styleMatches =
        activeStyleCategory === "All Styles" || preset.styleCategory === activeStyleCategory;

      return moodMatches && styleMatches;
    });
  }, [activeMoodFilter, activeStyleCategory]);

  useEffect(() => {
    window.localStorage.setItem(SAVED_KEY, JSON.stringify(savedDirections));
  }, [savedDirections]);

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timeout = window.setTimeout(() => setToast(null), 2200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const showToast = (message: string) => {
    setToast(message);
  };

  const handleSave = (preset: TypographyPreset, text = statement) => {
    const savedStatement = text.trim() || DEFAULT_STATEMENT;
    const alreadySaved = savedDirections.some(
      (item) => item.preset.id === preset.id && item.statement === savedStatement,
    );

    if (alreadySaved) {
      showToast("Already saved.");
      return;
    }

    setSavedDirections((current) => [
      {
        id: makeId(),
        statement: savedStatement,
        preset,
        savedAt: new Date().toISOString(),
      },
      ...current,
    ]);
    showToast("Direction saved.");
  };

  const handleRemoveSaved = (id: string) => {
    setSavedDirections((current) => current.filter((item) => item.id !== id));
    showToast("Saved direction removed.");
  };

  const handleExport = () => {
    showToast("Export feature coming soon.");
  };

  const selectMood = (mood: Mood) => {
    setSelectedMood(mood);
    setActiveMoodFilter(mood);
  };

  const renderSection = () => {
    if (activeSection === "saved") {
      return (
        <SavedView
          directions={savedDirections}
          onExport={handleExport}
          onOpen={(direction) =>
            setSelectedDirection({ preset: direction.preset, statement: direction.statement })
          }
          onRemove={handleRemoveSaved}
        />
      );
    }

    if (activeSection === "mood-library") {
      return <MoodLibrary selectedMood={selectedMood} onMoodChange={selectMood} />;
    }

    if (activeSection === "collections") {
      return (
        <section className="space-y-8">
          <PageHeader eyebrow="Collections" title="Mood Sets" />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {moodDefinitions.map((mood) => {
              const presetCount = typographyPresets.filter((preset) => preset.mood === mood.name).length;
              const savedCount = savedDirections.filter((direction) => direction.preset.mood === mood.name).length;

              return (
                <button
                  key={mood.name}
                  type="button"
                  onClick={() => {
                    setSelectedMood(mood.name);
                    setActiveSection("generator");
                  }}
                  className="group min-h-[220px] rounded-md border border-line bg-[#FBFAF7] p-6 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-600 hover:shadow-card"
                >
                  <div className="mb-8 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
                    <span>{presetCount} presets</span>
                    <span className="text-orange-700">{savedCount} saved</span>
                  </div>
                  <h2 className="text-2xl font-semibold tracking-normal text-ink">{mood.name}</h2>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-muted">{mood.tone}</p>
                  <div className="mt-8 h-px w-16 bg-orange-600 transition-all group-hover:w-28" />
                </button>
              );
            })}
          </div>
        </section>
      );
    }

    if (activeSection === "settings") {
      return (
        <section className="space-y-8">
          <PageHeader eyebrow="Settings" title="Studio Defaults" />
          <div className="max-w-3xl rounded-md border border-line bg-[#FBFAF7] shadow-sm">
            {[
              ["Accent", "#B86128"],
              ["Preview Count", "120 directions"],
              ["Storage", "Local browser"],
              ["Export", "Placeholder"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between border-b border-line px-6 py-5 last:border-b-0"
              >
                <span className="text-sm font-medium text-charcoal">{label}</span>
                <span className="text-sm text-muted">{value}</span>
              </div>
            ))}
          </div>
        </section>
      );
    }

    return (
      <section className="space-y-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-normal text-ink">Generate</h2>
            <p className="mt-2 text-sm text-muted">
              Type your statement. Explore typography that matches the mood.
            </p>
          </div>
          <button
            type="button"
            onClick={handleExport}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-line bg-white px-4 text-xs font-semibold text-charcoal shadow-sm transition hover:border-orange-600 hover:text-orange-700"
          >
            <Download size={15} strokeWidth={1.8} />
            Export
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_150px]">
          <StatementInput value={statement} onChange={setStatement} />
          <button
            type="button"
            onClick={() => showToast("Typography directions refreshed.")}
            className="inline-flex h-[64px] items-center justify-center gap-2 rounded-md bg-[#FF4F1F] px-5 text-sm font-bold text-black shadow-sm transition hover:bg-[#C56A2D]"
          >
            Generate
            <Sparkles size={15} strokeWidth={2} />
          </button>
        </div>

        <div className="flex flex-col gap-4 border-t border-line pt-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="studio-scrollbar flex gap-2 overflow-x-auto pb-1">
            {styleCategories.map((category) => {
              const active = activeStyleCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveStyleCategory(category)}
                  className={`h-9 shrink-0 rounded-md px-3 text-xs font-semibold transition ${
                    active
                      ? "bg-[#070707] text-[#FF5A22]"
                      : "border border-transparent text-charcoal hover:border-line hover:bg-white"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
          <div className="flex items-center justify-between gap-4 text-xs text-charcoal">
            <span>
              {activePresets.length} styles
              {activeMoodFilter !== "All" ? ` / ${activeMoodFilter}` : ""}
            </span>
            <button
              type="button"
              className="rounded-md px-2 py-1 text-xs text-muted transition hover:bg-white hover:text-orange-700"
              onClick={() => showToast("Sort controls coming soon.")}
            >
              Sort: Newest
            </button>
          </div>
        </div>

        <TypographyGrid
          key={`${activeMoodFilter}-${activeStyleCategory}`}
          controls={controls}
          mood={activeMoodFilter}
          presets={activePresets}
          statement={statement}
          onCardClick={(preset) => setSelectedDirection({ preset, statement })}
        />

        <div className="sticky bottom-4 z-20 hidden rounded-md border border-[#1B1B1B] bg-[#0B0B0B] px-5 py-4 text-white shadow-studio lg:flex lg:items-center lg:justify-between">
          <div className="flex divide-x divide-[#2A2A2A] text-xs">
            <span className="pr-6 text-stone-400">
              Saved Styles <strong className="ml-2 text-[#FF5A22]">{savedDirections.length}</strong>
            </span>
            <span className="px-6 text-stone-400">
              Favorites <strong className="ml-2 text-[#FF5A22]">{savedDirections.length}</strong>
            </span>
          </div>
          <button
            type="button"
            onClick={() => setActiveSection("saved")}
            className="text-xs font-semibold text-white transition hover:text-[#FF5A22]"
          >
            View All
          </button>
        </div>
      </section>
    );
  };

  return (
    <>
      <AppShell
        activeMoodFilter={activeMoodFilter}
        activeSection={activeSection}
        hasRightPanel={activeSection === "generator"}
        onMoodFilterChange={setActiveMoodFilter}
        onSectionChange={setActiveSection}
        savedCount={savedDirections.length}
      >
        {activeSection !== "generator" ? (
          <div className="mb-8 flex items-center justify-between border-b border-line pb-5">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted">
                VARIABLE Type Lab
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-normal text-ink sm:text-4xl">
                {sectionTitles[activeSection]}
              </h1>
            </div>
            <div className="hidden h-10 items-center rounded-full border border-line bg-[#FBFAF7] px-4 text-xs font-semibold uppercase tracking-[0.18em] text-charcoal sm:flex">
              Apparel Type Studio
            </div>
          </div>
        ) : null}
        {renderSection()}
      </AppShell>

      {activeSection === "generator" ? (
        <CustomizePanel
          controls={controls}
          onChange={setControls}
          onReset={() => setControls(defaultTypeControls)}
        />
      ) : null}

      <DetailPanel
        controls={controls}
        direction={selectedDirection}
        isSaved={
          selectedDirection
            ? savedDirections.some(
                (item) =>
                  item.preset.id === selectedDirection.preset.id &&
                  item.statement === selectedDirection.statement,
              )
            : false
        }
        onClose={() => setSelectedDirection(null)}
        onExport={handleExport}
        onSave={(preset, text) => handleSave(preset, text)}
      />

      <AnimatePresence>
        {toast ? (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full border border-line bg-[#FBFAF7] px-5 py-3 text-sm font-medium text-charcoal shadow-studio"
          >
            {toast}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function GeneratorHeader() {
  const steps = ["01 Input Statement", "02 Choose Mood", "03 Generate Ideas"];

  return (
    <div className="flex flex-wrap gap-3">
      {steps.map((step, index) => (
        <div
          key={step}
          className={`rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] ${
            index === 0
              ? "border-orange-600 text-orange-700"
              : "border-line bg-[#FBFAF7] text-muted"
          }`}
        >
          {step}
        </div>
      ))}
    </div>
  );
}

function PageHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-700">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-semibold tracking-normal text-ink">{title}</h2>
    </div>
  );
}

export default App;
