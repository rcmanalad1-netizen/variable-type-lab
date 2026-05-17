import { Download, Trash2 } from "lucide-react";
import type { SavedDirection } from "../types/typography";
import { getPresetTextStyle } from "./TypographyCard";

interface SavedViewProps {
  directions: SavedDirection[];
  onExport: () => void;
  onOpen: (direction: SavedDirection) => void;
  onRemove: (id: string) => void;
}

export function SavedView({ directions, onExport, onOpen, onRemove }: SavedViewProps) {
  if (directions.length === 0) {
    return (
      <section className="flex min-h-[520px] items-center justify-center rounded-md border border-line bg-[#FBFAF7] p-8 text-center shadow-sm">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-700">
            Saved
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-normal text-ink">
            No saved directions yet.
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted">
            Open any typography direction and save it from the detail panel.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-8">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-700">
          Saved
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-normal text-ink">
          Favorite Directions
        </h2>
      </div>
      <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
        {directions.map((direction) => (
          <article
            key={direction.id}
            className="rounded-md border border-line bg-[#FBFAF7] p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-600 hover:shadow-card"
          >
            <button
              type="button"
              onClick={() => onOpen(direction)}
              className="flex min-h-[220px] w-full items-center justify-center overflow-hidden border border-line bg-white p-5 text-center"
            >
              <p
                className="w-full break-words text-3xl text-ink sm:text-4xl"
                style={getPresetTextStyle(direction.preset)}
              >
                {direction.statement}
              </p>
            </button>
            <div className="pt-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-700">
                    {direction.preset.mood}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-ink">{direction.preset.name}</h3>
                  <p className="mt-2 text-xs text-muted">
                    {new Date(direction.savedAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={onExport}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-charcoal transition hover:border-orange-600 hover:text-orange-700"
                    aria-label="Export saved direction"
                  >
                    <Download size={17} strokeWidth={1.8} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemove(direction.id)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-charcoal transition hover:border-orange-600 hover:text-orange-700"
                    aria-label="Remove saved direction"
                  >
                    <Trash2 size={17} strokeWidth={1.8} />
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
