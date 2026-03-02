import { useState } from "react";
import { AdjustmentsHorizontalIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

const FILTERS = [
  { id: "sort", label: "Filters", icon: true, dropdown: true },
  { id: "under200", label: "Under ₹200", value: "under200" },
  { id: "schedule", label: "Schedule", dropdown: true },
  { id: "rating4", label: "Rating 4.0+", value: "rating4" },
  { id: "freeDelivery", label: "Free Delivery", value: "freeDelivery" },
  { id: "pureVeg", label: "Pure Veg", value: "pureVeg" },
];

function Filters({ onFilterChange }) {
  const [active, setActive] = useState([]);

  const toggle = (value) => {
    if (!value) return;
    const updated = active.includes(value)
      ? active.filter((v) => v !== value)
      : [...active, value];
    setActive(updated);
    onFilterChange?.(updated);
  };

  return (
    <div
      className="flex gap-2 overflow-x-auto pb-1 mt-4"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {FILTERS.map((f) => {
        const isActive = f.value && active.includes(f.value);
        return (
          <button
            key={f.id}
            onClick={() => toggle(f.value)}
            className={`shrink-0 h-9 px-3 flex items-center gap-1 text-[12px] font-medium rounded-2xl border transition-all duration-200 whitespace-nowrap ${
              isActive
                ? "bg-red-50 border-red-400 text-red-500"
                : "bg-white border-gray-300 text-gray-700 hover:border-gray-400"
            }`}
          >
            {f.icon && <AdjustmentsHorizontalIcon className="w-3.5 h-3.5" />}
            {f.label}
            {f.dropdown && <ChevronDownIcon className="w-3 h-3" />}
          </button>
        );
      })}
    </div>
  );
}

export default Filters;