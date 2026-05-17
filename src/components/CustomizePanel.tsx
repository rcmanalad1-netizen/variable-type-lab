import { AlignCenter, AlignLeft, AlignRight, RotateCcw } from "lucide-react";
import type { ReactNode } from "react";
import { availableFontFamilies } from "../data/typographyPresets";
import type { TypeControls } from "../types/typography";

interface CustomizePanelProps {
  controls: TypeControls;
  onChange: (controls: TypeControls) => void;
  onReset: () => void;
}

const weights = ["400", "500", "600", "700", "800", "900"];
const textColors = ["#111111", "#2D2B28", "#5C5148", "#A9541F", "#B86128"];
const backgroundColors = ["#FFFFFF", "#F8F6F1", "#EFEAE1", "#111111"];

export const defaultTypeControls: TypeControls = {
  fontFamily: "Preset Font",
  fontWeight: "Preset",
  textTransform: "uppercase",
  letterSpacing: 0,
  lineHeight: 1,
  alignment: "left",
  textColor: "#111111",
  backgroundColor: "#FFFFFF",
  uppercase: true,
  distort: false,
  outline: false,
  blur: false,
};

export function CustomizePanel({ controls, onChange, onReset }: CustomizePanelProps) {
  const setControl = <K extends keyof TypeControls>(key: K, value: TypeControls[K]) => {
    onChange({ ...controls, [key]: value });
  };

  return (
    <aside className="border-t border-[#242424] bg-[#0B0B0B] p-5 text-white xl:fixed xl:inset-y-0 xl:right-0 xl:w-[300px] xl:overflow-y-auto xl:border-l xl:border-t-0">
      <div className="mb-7">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF5A22]">Customize</p>
      </div>

      <div className="space-y-5">
        <ControlGroup label="Font Family">
          <select
            value={controls.fontFamily}
            onChange={(event) => setControl("fontFamily", event.target.value)}
            className="h-10 w-full rounded-md border border-[#292929] bg-[#151515] px-3 text-xs text-white outline-none transition focus:border-[#B86128]"
          >
            <option>Preset Font</option>
            {availableFontFamilies.map((font) => (
              <option key={font} value={font}>
                {font.split(",")[0].replace(/'/g, "")}
              </option>
            ))}
          </select>
        </ControlGroup>

        <ControlGroup label="Weight">
          <select
            value={controls.fontWeight}
            onChange={(event) => setControl("fontWeight", event.target.value)}
            className="h-10 w-full rounded-md border border-[#292929] bg-[#151515] px-3 text-xs text-white outline-none transition focus:border-[#B86128]"
          >
            <option>Preset</option>
            {weights.map((weight) => (
              <option key={weight} value={weight}>
                {weight}
              </option>
            ))}
          </select>
        </ControlGroup>

        <ControlGroup label="Text Transform">
          <div className="grid grid-cols-3 overflow-hidden rounded-md border border-[#292929] bg-[#151515]">
            {[
              ["uppercase", "AA"],
              ["lowercase", "aa"],
              ["capitalize", "Aa"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => {
                  onChange({
                    ...controls,
                    textTransform: value as TypeControls["textTransform"],
                    uppercase: value === "uppercase",
                  });
                }}
                className={`h-9 text-xs font-semibold transition ${
                  controls.textTransform === value ? "bg-[#A9541F] text-white" : "text-stone-300 hover:bg-[#1E1E1E]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </ControlGroup>

        <RangeControl
          label="Letter Spacing"
          max={24}
          min={-4}
          value={controls.letterSpacing}
          onChange={(value) => setControl("letterSpacing", value)}
        />

        <RangeControl
          label="Line Height"
          max={1.5}
          min={0.75}
          step={0.05}
          value={controls.lineHeight}
          onChange={(value) => setControl("lineHeight", value)}
        />

        <ControlGroup label="Alignment">
          <div className="grid grid-cols-3 overflow-hidden rounded-md border border-[#292929] bg-[#151515]">
            {([
              ["left", AlignLeft],
              ["center", AlignCenter],
              ["right", AlignRight],
            ] as const).map(([value, Icon]) => (
              <button
                key={String(value)}
                type="button"
                onClick={() => setControl("alignment", value as TypeControls["alignment"])}
                className={`flex h-9 items-center justify-center transition ${
                  controls.alignment === value ? "bg-[#A9541F] text-white" : "text-stone-300 hover:bg-[#1E1E1E]"
                }`}
                aria-label={`Align ${value}`}
              >
                <Icon size={16} strokeWidth={2} />
              </button>
            ))}
          </div>
        </ControlGroup>

        <SwatchSelect
          label="Text Color"
          options={textColors}
          value={controls.textColor}
          onChange={(value) => setControl("textColor", value)}
        />
        <SwatchSelect
          label="Background"
          options={backgroundColors}
          value={controls.backgroundColor}
          onChange={(value) => setControl("backgroundColor", value)}
        />

        <div className="border-t border-[#292929] pt-5">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF5A22]">Effects</p>
          <Toggle label="Uppercase" checked={controls.uppercase} onChange={(checked) => setControl("uppercase", checked)} />
          <Toggle label="Distort" checked={controls.distort} onChange={(checked) => setControl("distort", checked)} />
          <Toggle label="Outline" checked={controls.outline} onChange={(checked) => setControl("outline", checked)} />
          <Toggle label="Blur" checked={controls.blur} onChange={(checked) => setControl("blur", checked)} />
        </div>

        <button
          type="button"
          onClick={onReset}
          className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-[#A9541F] text-xs font-semibold text-[#FF5A22] transition hover:bg-[#A9541F] hover:text-white"
        >
          <RotateCcw size={15} strokeWidth={2} />
          Reset All
        </button>
      </div>
    </aside>
  );
}

function ControlGroup({ children, label }: { children: ReactNode; label: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-medium text-stone-300">{label}</span>
      {children}
    </label>
  );
}

function RangeControl({
  label,
  max,
  min,
  onChange,
  step = 1,
  value,
}: {
  label: string;
  max: number;
  min: number;
  onChange: (value: number) => void;
  step?: number;
  value: number;
}) {
  return (
    <ControlGroup label={label}>
      <div className="flex items-center justify-between text-[11px] text-stone-500">
        <span>{min}</span>
        <span>{value}</span>
      </div>
      <input
        max={max}
        min={min}
        onChange={(event) => onChange(Number(event.target.value))}
        step={step}
        type="range"
        value={value}
        className="mt-2 w-full accent-[#FF5A22]"
      />
    </ControlGroup>
  );
}

function SwatchSelect({
  label,
  onChange,
  options,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  options: string[];
  value: string;
}) {
  return (
    <ControlGroup label={label}>
      <div className="flex gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`flex h-10 flex-1 items-center justify-center rounded-md border transition ${
              value === option ? "border-[#FF5A22]" : "border-[#292929] hover:border-stone-500"
            }`}
            aria-label={`${label} ${option}`}
          >
            <span className="h-5 w-5 rounded border border-stone-500" style={{ backgroundColor: option }} />
          </button>
        ))}
      </div>
    </ControlGroup>
  );
}

function Toggle({
  checked,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between py-2 text-xs text-stone-300"
    >
      <span>{label}</span>
      <span
        className={`flex h-5 w-9 items-center rounded-full border p-0.5 transition ${
          checked ? "justify-end border-[#FF5A22] bg-[#A9541F]" : "justify-start border-[#353535] bg-[#1A1A1A]"
        }`}
      >
        <span className="h-3.5 w-3.5 rounded-full bg-white" />
      </span>
    </button>
  );
}
