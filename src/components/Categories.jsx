import { useState, useEffect, useRef, useCallback } from "react";
import categories from "../data/categories.json";

const ITEM_WIDTH = 56;
const ITEM_GAP = 24;
const ITEM_FULL_WIDTH = ITEM_WIDTH + ITEM_GAP;

function CategoryItem({ item, selected, onSelect }) {
  return (
    <div
      onClick={() => onSelect(item.id, item.name)}
      className="relative flex flex-col items-center min-w-[56px] pb-3 cursor-pointer"
      style={{ width: 56 }}
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-[56px] h-[56px] object-cover rounded-full"
        loading="lazy"
      />
      <span className={`mt-1.5 text-[11px] font-medium text-center leading-tight ${
        selected === item.id ? "text-gray-900" : "text-gray-600"
      }`}>
        {item.name}
      </span>
      {selected === item.id && (
        <div className="absolute bottom-0 left-0 w-full h-[2.5px] bg-red-500 rounded-full" />
      )}
    </div>
  );
}

function SkeletonItem() {
  return (
    <div className="flex flex-col items-center min-w-[56px] pb-3 animate-pulse" style={{ width: 56 }}>
      <div className="w-[56px] h-[56px] bg-gray-200 rounded-full" />
      <div className="mt-2 w-10 h-2.5 bg-gray-200 rounded" />
    </div>
  );
}

function Categories({ onCategoryChange }) {
  const [selected, setSelected] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 10 });
  const scrollRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSelect = (id, name) => {
    setSelected(id);
    onCategoryChange?.(name === "All" ? null : name.trim());
  };

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const start = Math.max(0, Math.floor(el.scrollLeft / ITEM_FULL_WIDTH) - 2);
    const end = Math.min(
      categories.length - 1,
      Math.ceil((el.scrollLeft + el.clientWidth) / ITEM_FULL_WIDTH) + 2
    );
    setVisibleRange({ start, end });
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="-mt-2">
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
      >
        {isLoading
          ? Array(8).fill().map((_, i) => <SkeletonItem key={i} />)
          : categories.map((item, i) =>
              i >= visibleRange.start && i <= visibleRange.end ? (
                <CategoryItem key={item.id} item={item} selected={selected} onSelect={handleSelect} />
              ) : (
                <div key={item.id} style={{ minWidth: 56, width: 56 }} className="pb-3">
                  <div className="w-[56px] h-[56px] bg-gray-100 rounded-full" />
                  <div className="mt-2 w-10 h-2.5 bg-gray-100 rounded mx-auto" />
                </div>
              )
            )}
      </div>
      <div className="w-full h-px bg-gray-200" />
    </div>
  );
}

export default Categories;