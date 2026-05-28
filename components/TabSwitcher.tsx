"use client";

import { useState } from "react";

interface Props {
  tabs: { id: string; label: string }[];
  panels: Record<string, React.ReactNode>;
  defaultTab?: string;
}

export default function TabSwitcher({ tabs, panels, defaultTab }: Props) {
  const [active, setActive] = useState<string>(defaultTab ?? tabs[0]?.id ?? "");
  return (
    <div>
      <div className="flex flex-wrap justify-center gap-3 md:gap-6">
        {tabs.map((t) => {
          const on = active === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActive(t.id)}
              aria-pressed={on ? "true" : "false"}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                on
                  ? "bg-appleGray-900 text-white"
                  : "bg-appleGray-200 text-appleGray-900 hover:bg-appleGray-300"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      <div className="mt-10">{panels[active]}</div>
    </div>
  );
}
