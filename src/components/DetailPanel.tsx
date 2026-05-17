import { AnimatePresence, motion } from "framer-motion";
import { Bookmark, Check, Download, X } from "lucide-react";
import type { TypeControls, TypographyPreset } from "../types/typography";
import { getPresetTextStyle } from "./TypographyCard";

interface DetailPanelProps {
  direction: {
    preset: TypographyPreset;
    statement: string;
  } | null;
  controls?: TypeControls;
  isSaved: boolean;
  onClose: () => void;
  onExport: () => void;
  onSave: (preset: TypographyPreset, statement: string) => void;
}

const colorSuggestions = [
  { label: "Black", value: "#111111" },
  { label: "Charcoal", value: "#2D2B28" },
  { label: "Cotton", value: "#F8F6F1" },
  { label: "Burnt Orange", value: "#B86128" },
];

function displayFontFamily(fontFamily: string) {
  return fontFamily.split(",")[0].replace(/'/g, "");
}

export function DetailPanel({ controls, direction, isSaved, onClose, onExport, onSave }: DetailPanelProps) {
  return (
    <AnimatePresence>
      {direction ? (
        <>
          <motion.button
            type="button"
            aria-label="Close details"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-ink/20"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.32, ease: "easeOut" }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[620px] flex-col overflow-y-auto border-l border-line bg-[#FBFAF7] shadow-studio"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-[#FBFAF7]/95 px-5 py-4 backdrop-blur">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-700">
                  Detail
                </p>
                <h2 className="mt-1 text-xl font-semibold text-ink">{direction.preset.name}</h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-charcoal transition hover:border-orange-600 hover:text-orange-700"
                aria-label="Close details"
              >
                <X size={18} strokeWidth={1.8} />
              </button>
            </div>

            <div className="space-y-7 p-5 sm:p-7">
              <div className="min-h-[330px] border border-line bg-white p-8">
                <div className="mb-10 h-px w-20 bg-orange-600" />
                <p
                  className="break-words text-5xl text-ink sm:text-6xl"
                  style={getPresetTextStyle(direction.preset, controls)}
                >
                  {direction.statement}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => onSave(direction.preset, direction.statement)}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-orange-600 bg-orange-600 px-4 text-sm font-semibold text-white transition hover:bg-orange-700"
                >
                  {isSaved ? <Check size={17} /> : <Bookmark size={17} />}
                  {isSaved ? "Saved" : "Save Direction"}
                </button>
                <button
                  type="button"
                  onClick={onExport}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-line bg-white px-4 text-sm font-semibold text-charcoal transition hover:border-orange-600 hover:text-orange-700"
                >
                  <Download size={17} />
                  Export
                </button>
              </div>

              <dl className="divide-y divide-line rounded-md border border-line bg-white">
                <DetailRow label="Font Family" value={displayFontFamily(direction.preset.fontFamily)} />
                <DetailRow label="Style" value={`${direction.preset.name} / ${direction.preset.layout}`} />
                <DetailRow label="Tracking" value={direction.preset.letterSpacing} />
                <DetailRow label="Leading" value={direction.preset.lineHeight} />
                <DetailRow label="Transform" value={String(direction.preset.textTransform ?? "none")} />
                <DetailRow label="Placement" value={direction.preset.bestPlacement} />
              </dl>

              <div className="rounded-md border border-line bg-white p-5">
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
                  Color Suggestions
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {colorSuggestions.map((color) => (
                    <div key={color.label} className="flex items-center gap-3">
                      <span
                        className="h-8 w-8 rounded-full border border-line"
                        style={{ backgroundColor: color.value }}
                        aria-hidden="true"
                      />
                      <span className="text-sm font-medium text-charcoal">{color.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[130px_minmax(0,1fr)] gap-4 px-4 py-4">
      <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">{label}</dt>
      <dd className="text-sm font-medium text-charcoal">{value}</dd>
    </div>
  );
}
