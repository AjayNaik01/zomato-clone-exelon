import { useState, useEffect, useRef, useCallback } from "react";
import RestaurantCard from "./RestaurantCard";
import { NoSymbolIcon } from "@heroicons/react/24/outline";

const CARD_WIDTH = 160;
const CARD_GAP = 12;
const CARD_FULL_WIDTH = CARD_WIDTH + CARD_GAP;
const ROWS = 2;

function SkeletonCard() {
  return (
    <div className="min-w-[160px] w-[160px] animate-pulse">
      <div className="w-full h-[120px] bg-gray-200 rounded-xl" />
      <div className="mt-2 w-16 h-4 bg-gray-200 rounded" />
      <div className="mt-1 w-24 h-3 bg-gray-200 rounded" />
      <div className="mt-1 w-20 h-3 bg-gray-200 rounded" />
      <div className="mt-1 w-16 h-3 bg-gray-200 rounded" />
    </div>
  );
}

function RestaurantSection({ title, data, filters = [], vegOnly = false, category = null, searchQuery = "" }) {
  const [isLoading, setIsLoading] = useState(true);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 6 });
  const scrollRef = useRef(null);
  const timerRef = useRef(null);

  // Initial load
  useEffect(() => {
    timerRef.current = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timerRef.current);
  }, []);

  // Re-trigger skeleton on every filter/search/category change
  useEffect(() => {
    setIsLoading(true);
    if (scrollRef.current) scrollRef.current.scrollLeft = 0;
    setVisibleRange({ start: 0, end: 6 });

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setIsLoading(false), 600);

    return () => clearTimeout(timerRef.current);
  }, [category, filters, vegOnly, searchQuery]);

  const filtered = data.filter((r) => {
    if (searchQuery) {
      const q = searchQuery.trim().toLowerCase();
      const matchesName = r.name.toLowerCase().includes(q);
      const matchesCategory = r.category?.toLowerCase().includes(q);
      const matchesCuisine = r.cuisines?.some((c) => c.toLowerCase().includes(q));
      if (!matchesName && !matchesCategory && !matchesCuisine) return false;
    }
    if (category) {
      const sel = category.trim().toLowerCase();
      const matchesCategory = r.category?.trim().toLowerCase() === sel;
      const matchesCuisine = r.cuisines?.some((c) => c.trim().toLowerCase() === sel);
      if (!matchesCategory && !matchesCuisine) return false;
    }
    if (vegOnly && !r.isPureVeg) return false;
    if (filters.includes("pureVeg") && !r.isPureVeg) return false;
    if (filters.includes("under200") && r.priceForTwo >= 200) return false;
    if (filters.includes("rating4") && r.rating < 4.0) return false;
    if (filters.includes("freeDelivery") && !r.hasFreeDelivery) return false;
    return true;
  });

  const columns = [];
  for (let i = 0; i < filtered.length; i += ROWS) {
    columns.push(filtered.slice(i, i + ROWS));
  }

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const start = Math.max(0, Math.floor(el.scrollLeft / CARD_FULL_WIDTH) - 1);
    const end = Math.min(
      columns.length - 1,
      Math.ceil((el.scrollLeft + el.clientWidth) / CARD_FULL_WIDTH) + 1
    );
    setVisibleRange({ start, end });
  }, [columns.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll, isLoading]);

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[13px] font-bold text-gray-500 uppercase tracking-widest">{title}</h2>
        {!isLoading && (
          <span className="text-[11px] text-gray-400">
            {filtered.length} place{filtered.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {!isLoading && filtered.length === 0 ? (
        <div className="py-10 text-center border border-dashed border-gray-200 rounded-2xl">

          <NoSymbolIcon className="w-12 h-12 mx-auto text-gray-300" />
          <p className="text-gray-500 text-sm font-medium">No restaurants found</p>
          <p className="text-gray-400 text-xs mt-1">Try a different category or remove some filters</p>
        </div>
      ) : (
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
        >
          {isLoading
            ? Array(6).fill().map((_, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <SkeletonCard /><SkeletonCard />
                </div>
              ))
            : columns.map((col, colIdx) =>
                colIdx >= visibleRange.start && colIdx <= visibleRange.end ? (
                  <div key={colIdx} className="flex flex-col gap-3">
                    {col.map((r) => <RestaurantCard key={r.id} restaurant={r} />)}
                  </div>
                ) : (
                  <div key={colIdx} style={{ minWidth: CARD_WIDTH, width: CARD_WIDTH }} className="flex flex-col gap-3">
                    {col.map((r) => <div key={r.id} className="h-[180px] rounded-xl bg-gray-50" />)}
                  </div>
                )
              )}
        </div>
      )}
      <div className="mt-3 w-full h-px bg-gray-200" />
    </div>
  );
}

export default RestaurantSection;