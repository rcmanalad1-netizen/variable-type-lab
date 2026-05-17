import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import type { CSSProperties } from "react";
import type { TypeControls, TypographyLayout, TypographyPreset } from "../types/typography";

interface TypographyCardProps {
  index?: number;
  controls?: TypeControls;
  preset: TypographyPreset;
  statement: string;
  onClick: () => void;
}

const layoutClass: Record<TypographyLayout, string> = {
  center: "items-center justify-center text-center",
  stacked: "items-start justify-center text-left",
  label: "items-start justify-between text-left",
  split: "items-center justify-center text-center",
  poster: "items-start justify-end text-left",
  caption: "items-end justify-start text-left",
};

const sizeClass: Record<TypographyLayout, string> = {
  center: "text-3xl sm:text-4xl",
  stacked: "text-3xl sm:text-4xl",
  label: "text-xl sm:text-2xl",
  split: "text-3xl sm:text-4xl",
  poster: "text-4xl sm:text-5xl",
  caption: "text-2xl sm:text-3xl",
};

function splitStatement(statement: string) {
  const words = statement.trim().split(/\s+/).filter(Boolean);
  if (words.length < 4) {
    return [statement];
  }

  const midpoint = Math.ceil(words.length / 2);
  return [words.slice(0, midpoint).join(" "), words.slice(midpoint).join(" ")];
}

export function getPresetTextStyle(preset: TypographyPreset, controls?: TypeControls): CSSProperties {
  const overrideFont = controls?.fontFamily && controls.fontFamily !== "Preset Font";
  const overrideWeight = controls?.fontWeight && controls.fontWeight !== "Preset";
  const transform = controls?.uppercase ? "uppercase" : controls?.textTransform ?? preset.textTransform;

  return {
    color: controls?.textColor ?? "#111111",
    filter: controls?.blur ? "blur(0.7px)" : undefined,
    fontFamily: overrideFont ? controls.fontFamily : preset.fontFamily,
    fontWeight: overrideWeight ? controls.fontWeight : preset.fontWeight,
    letterSpacing: controls && controls.letterSpacing !== 0 ? `${controls.letterSpacing / 100}em` : preset.letterSpacing,
    lineHeight: controls && controls.lineHeight !== 1 ? String(controls.lineHeight) : preset.lineHeight,
    overflowWrap: "anywhere",
    textAlign: controls?.alignment ?? preset.alignment,
    textShadow: controls?.outline ? `0 0 0 ${controls.textColor ?? "#111111"}` : undefined,
    textTransform: transform,
    transform: controls?.distort ? "skewX(-7deg)" : undefined,
    WebkitTextStroke: controls?.outline ? `1px ${controls.textColor ?? "#111111"}` : undefined,
  };
}

export function TypographyCard({ controls, index = 0, preset, statement, onClick }: TypographyCardProps) {
  const safeStatement = statement.trim() || "Untitled statement";
  const textStyle = getPresetTextStyle(preset, controls);
  const lines = splitStatement(safeStatement);

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.34, delay: index * 0.045, ease: "easeOut" }}
      onClick={onClick}
      className="group flex min-h-[290px] flex-col rounded-md border border-[#DDD8CF] bg-white p-3 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#B86128] hover:shadow-card"
    >
      <div
        className={`relative flex min-h-[190px] flex-1 overflow-hidden rounded-sm p-5 ${layoutClass[preset.layout]}`}
        style={{ backgroundColor: controls?.backgroundColor ?? "#FFFFFF" }}
      >
        {preset.layout === "split" ? (
          <div className="w-full" style={textStyle}>
            {lines.map((line) => (
              <div key={line} className={`${sizeClass[preset.layout]} break-words`}>
                {line}
              </div>
            ))}
          </div>
        ) : (
          <p className={`w-full break-words ${sizeClass[preset.layout]}`} style={textStyle}>
            {safeStatement}
          </p>
        )}
      </div>
      <div className="px-2 pb-2 pt-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h3 className="text-xs font-semibold tracking-normal text-ink">{preset.name}</h3>
            <p className="mt-1 text-[11px] leading-4 text-muted">{preset.styleCategory}</p>
          </div>
          <span className="shrink-0 text-stone-500 transition group-hover:text-[#B86128]">
            <Heart size={17} strokeWidth={1.7} />
          </span>
        </div>
      </div>
    </motion.button>
  );
}
