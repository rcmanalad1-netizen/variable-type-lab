import {
  Archive,
  Bookmark,
  Box,
  Circle,
  CircleDot,
  Library,
  Moon,
  Sparkles,
  Settings,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";
import { moodDefinitions } from "../data/typographyPresets";
import type { AppSection, MoodFilter } from "../types/typography";

interface SidebarProps {
  activeMoodFilter: MoodFilter;
  activeSection: AppSection;
  onMoodFilterChange: (mood: MoodFilter) => void;
  onSectionChange: (section: AppSection) => void;
  savedCount: number;
}

const navItems: Array<{ id: AppSection; label: string; icon: LucideIcon }> = [
  { id: "generator", label: "Generator", icon: SlidersHorizontal },
  { id: "mood-library", label: "Browse Styles", icon: Library },
  { id: "settings", label: "Typography Library", icon: Box },
  { id: "saved", label: "Saved", icon: Bookmark },
  { id: "collections", label: "Collections", icon: Archive },
];

export function Sidebar({
  activeMoodFilter,
  activeSection,
  onMoodFilterChange,
  onSectionChange,
  savedCount,
}: SidebarProps) {
  const moodItems: Array<{ label: string; value: MoodFilter }> = [
    { label: "All", value: "All" },
    ...moodDefinitions.map((mood) => ({ label: mood.name.replace("Emotional / Reflective", "Emotional"), value: mood.name })),
  ];

  return (
    <>
      <aside className="fixed inset-y-0 left-0 hidden w-[220px] flex-col border-r border-[#242424] bg-[#080808] px-4 py-6 text-white lg:flex">
        <button
          type="button"
          onClick={() => onSectionChange("generator")}
          className="mb-8 text-left"
          aria-label="Open generator"
        >
          <div className="text-xl font-extrabold uppercase leading-5 tracking-normal text-[#FF4F1F]">
            VARIABLE<span className="align-top text-[10px]">®</span>
          </div>
          <div className="mt-1 text-[10px] font-semibold uppercase leading-4 tracking-[0.2em] text-stone-500">
            Type Lab
          </div>
        </button>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSectionChange(item.id)}
                className={`flex w-full items-center gap-3 rounded-md border px-3 py-3 text-[13px] font-medium transition duration-200 ${
                  isActive
                    ? "border-[#1C1C1C] bg-[#171717] text-[#FF5A22]"
                    : "border-transparent text-stone-300 hover:border-[#242424] hover:bg-[#111111] hover:text-white"
                }`}
              >
                <Icon size={17} strokeWidth={1.8} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-8 border-t border-[#1F1F1F] pt-6">
          <p className="mb-4 text-[10px] font-semibold uppercase leading-5 tracking-[0.22em] text-stone-500">
            Moods
          </p>
          <div className="space-y-1">
            {moodItems.map((item) => {
              const active = activeMoodFilter === item.value;
              const Icon = item.value === "All" ? CircleDot : Circle;

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => {
                    onMoodFilterChange(item.value);
                    onSectionChange("generator");
                  }}
                  className={`flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-xs transition ${
                    active ? "text-[#FF5A22]" : "text-stone-400 hover:bg-[#111111] hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Icon size={12} strokeWidth={2} />
                    {item.label}
                  </span>
                  {active ? <span className="h-3 w-3 rounded-full border border-[#FF5A22]" /> : null}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-auto rounded-md border border-[#262626] bg-[#101010] p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-white">Unlock more styles</p>
            <Moon size={14} className="text-stone-400" />
          </div>
          <p className="mt-3 text-xs leading-5 text-stone-500">
            Browse expanded type directions and premium-style font moods.
          </p>
          <button
            type="button"
            onClick={() => onSectionChange("collections")}
            className="mt-5 text-xs font-semibold text-[#FF5A22]"
          >
            Upgrade
          </button>
        </div>

        <div className="mt-5 flex items-center justify-between text-stone-500">
          <Sparkles size={16} className="text-[#FF5A22]" />
          <span className="text-xs">{savedCount} saved</span>
          <Settings size={16} />
        </div>
      </aside>

      <div className="sticky top-0 z-30 border-b border-[#242424] bg-[#080808]/95 px-4 py-3 text-white backdrop-blur lg:hidden">
        <div className="mb-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() => onSectionChange("generator")}
            className="text-left"
            aria-label="Open generator"
          >
            <div className="text-sm font-extrabold uppercase tracking-normal text-[#FF5A22]">
              VARIABLE
            </div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-500">
              Type Lab
            </div>
          </button>
        </div>
        <nav className="studio-scrollbar flex gap-2 overflow-x-auto pb-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSectionChange(item.id)}
                className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-md border px-3 text-xs font-semibold ${
                  isActive
                    ? "border-[#FF5A22] bg-[#151515] text-[#FF5A22]"
                    : "border-[#242424] bg-[#111111] text-stone-300"
                }`}
              >
                <Icon size={15} strokeWidth={1.8} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
}
