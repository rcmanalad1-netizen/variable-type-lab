import type { ReactNode } from "react";
import type { AppSection, MoodFilter } from "../types/typography";
import { Sidebar } from "./Sidebar";

interface AppShellProps {
  activeSection: AppSection;
  activeMoodFilter: MoodFilter;
  children: ReactNode;
  hasRightPanel?: boolean;
  onSectionChange: (section: AppSection) => void;
  onMoodFilterChange: (mood: MoodFilter) => void;
  savedCount: number;
}

export function AppShell({
  activeSection,
  activeMoodFilter,
  children,
  hasRightPanel = false,
  onSectionChange,
  onMoodFilterChange,
  savedCount,
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#F7F5EF] text-ink lg:flex">
      <Sidebar
        activeMoodFilter={activeMoodFilter}
        activeSection={activeSection}
        onMoodFilterChange={onMoodFilterChange}
        onSectionChange={onSectionChange}
        savedCount={savedCount}
      />
      <main className={`min-w-0 flex-1 lg:pl-[220px] ${hasRightPanel ? "xl:pr-[300px]" : ""}`}>
        <div className="mx-auto max-w-[1180px] px-4 py-5 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
