import { useState, useEffect, useRef } from "react";
import {
  MagnifyingGlassIcon,
  MicrophoneIcon,
  XMarkIcon,
  BuildingStorefrontIcon,
  TagIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import searchData from "../data/searchData.json";
import restaurants from "../data/restaurants.json";

function SearchSection({ onVegChange, onSearchChange }) {
  const [search, setSearch] = useState("");
  const [vegOnly, setVegOnly] = useState(false);
  const [showVegModal, setShowVegModal] = useState(false);
  const [vegOption, setVegOption] = useState("all");
  const [index, setIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isFocused) { clearInterval(intervalRef.current); return; }
    intervalRef.current = setInterval(() => {
      setIndex((prev) => prev === searchData.placeholders.length - 1 ? 0 : prev + 1);
    }, 1500);
    return () => clearInterval(intervalRef.current);
  }, [isFocused]);

  useEffect(() => {
    if (!search.trim()) {
      setSuggestions([]);
      onSearchChange?.("");
      return;
    }
    const q = search.trim().toLowerCase();
    const matches = [];
    const seen = new Set();

    restaurants.forEach((r) => {
      if (r.name.toLowerCase().includes(q) && !seen.has(r.name)) {
        seen.add(r.name);
        matches.push({ type: "restaurant", label: r.name, sub: r.cuisines.join(", ") });
      }
      if (r.category?.toLowerCase().includes(q) && !seen.has(r.category)) {
        seen.add(r.category);
        matches.push({ type: "category", label: r.category, sub: "Category" });
      }
      r.cuisines?.forEach((c) => {
        if (c.toLowerCase().includes(q) && !seen.has(c)) {
          seen.add(c);
          matches.push({ type: "cuisine", label: c, sub: "Cuisine" });
        }
      });
    });

    setSuggestions(matches.slice(0, 6));
  }, [search]);

  const handleSelect = (label) => {
    setSearch(label);
    setSuggestions([]);
    onSearchChange?.(label.trim().toLowerCase());
  };

  const handleClear = () => {
    setSearch("");
    setSuggestions([]);
    onSearchChange?.("");
  };

  const handleToggle = () => {
    if (!vegOnly) setShowVegModal(true);
    else { setVegOnly(false); onVegChange?.(false); }
  };

  const handleApply = () => {
    setVegOnly(true);
    setShowVegModal(false);
    onVegChange?.(true);
  };

  const getIcon = (type) => {
    if (type === "restaurant") return <BuildingStorefrontIcon className="w-4 h-4 text-red-400" />;
    if (type === "category") return <TagIcon className="w-4 h-4 text-orange-400" />;
    return <SparklesIcon className="w-4 h-4 text-green-500" />;
  };

  const getIconBg = (type) => {
    if (type === "restaurant") return "bg-red-50";
    if (type === "category") return "bg-orange-50";
    return "bg-green-50";
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <div className="relative flex items-center bg-gray-100 rounded-2xl px-5 h-12 border border-gray-300 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
            <MagnifyingGlassIcon className="w-5 h-5 text-red-500 mr-3 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => { setIsFocused(false); setSuggestions([]); }, 150)}
              className="bg-transparent w-full outline-none text-gray-700 text-sm z-10"
            />

            {!search && !isFocused && (
              <div className="absolute left-12 inset-y-0 right-12 overflow-hidden pointer-events-none flex items-center">
                <div
                  className="transition-transform duration-500 ease-in-out w-full"
                  style={{ transform: `translateY(-${index * 48}px)` }}
                >
                  {searchData.placeholders.map((text, i) => (
                    <div key={i} style={{ height: "48px", lineHeight: "48px" }}
                      className="text-gray-400 text-sm whitespace-nowrap overflow-hidden">
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="h-6 w-px bg-gray-300 mx-3 shrink-0" />

            {search ? (
              <XMarkIcon onClick={handleClear}
                className="w-5 h-5 text-gray-400 cursor-pointer shrink-0 hover:text-gray-600" />
            ) : (
              <MicrophoneIcon className="w-5 h-5 text-red-500 cursor-pointer shrink-0" />
            )}
          </div>

          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && isFocused && (
            <div className="absolute top-14 left-0 right-0 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-40">
              {suggestions.map((s, i) => (
                <div
                  key={i}
                  onMouseDown={() => handleSelect(s.label)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0 transition-colors"
                >
                  {/* Icon box */}
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${getIconBg(s.type)}`}>
                    {getIcon(s.type)}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-gray-800 truncate">{s.label}</p>
                    <p className="text-[11px] text-gray-400 truncate">{s.sub}</p>
                  </div>

                  {/* Arrow */}
                  <MagnifyingGlassIcon className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Veg Mode */}
        <div className="flex flex-col items-center justify-center min-w-[70px]">
          <span className="text-[11px] font-bold text-gray-800">VEG</span>
          <span className="text-[11px] font-bold text-gray-800 -mt-1">MODE</span>
          <button onClick={handleToggle}
            className={`relative mt-1 w-10 h-5 rounded-full transition-all duration-300 ${vegOnly ? "bg-green-600" : "bg-gray-300"}`}>
            <span className={`absolute top-[2px] left-[2px] w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${vegOnly ? "translate-x-5" : ""}`} />
          </button>
        </div>
      </div>

      {/* Veg Modal */}
      {showVegModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center"
          onClick={() => setShowVegModal(false)}>
          <div className="bg-white w-full sm:max-w-sm sm:rounded-2xl rounded-t-2xl px-5 pt-4 pb-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}>
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4 sm:hidden" />
            <h2 className="text-[16px] font-bold text-gray-900 mb-4">See veg dishes from</h2>
            {[
              { value: "all", label: "All restaurants" },
              { value: "pure", label: "Pure Veg restaurants only" },
            ].map((opt, i, arr) => (
              <div key={opt.value} onClick={() => setVegOption(opt.value)}
                className={`flex items-center gap-3 py-3 cursor-pointer ${i < arr.length - 1 ? "border-b border-gray-100" : ""}`}>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${vegOption === opt.value ? "border-green-600" : "border-gray-300"}`}>
                  {vegOption === opt.value && <div className="w-2.5 h-2.5 rounded-full bg-green-600" />}
                </div>
                <span className="text-[14px] text-gray-800">{opt.label}</span>
              </div>
            ))}
            <button onClick={handleApply}
              className="mt-5 w-full bg-green-600 hover:bg-green-700 text-white font-semibold text-[14px] py-3 rounded-xl transition-colors">
              Apply
            </button>
            <p className="text-center text-green-600 text-[13px] font-medium mt-3 cursor-pointer">More settings</p>
          </div>
        </div>
      )}
    </>
  );
}

export default SearchSection;