// components/BottomNav.jsx
import { TruckIcon, BuildingStorefrontIcon } from "@heroicons/react/24/outline";
import { TruckIcon as TruckSolid } from "@heroicons/react/24/solid";
import { useState } from "react";

function BottomNav() {
  const [active, setActive] = useState("delivery");

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center bg-white rounded-full shadow-2xl border border-gray-100 overflow-hidden">
        
        {/* Delivery */}
        <button
          onClick={() => setActive("delivery")}
          className={`flex items-center gap-2 px-6 py-3 transition-all duration-200 ${
            active === "delivery" ? "text-red-500" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {active === "delivery"
            ? <TruckSolid className="w-5 h-5 text-red-500" />
            : <TruckIcon className="w-5 h-5" />
          }
          <span className={`text-[13px] font-semibold ${active === "delivery" ? "text-red-500" : "text-gray-600"}`}>
            Delivery
          </span>
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-200" />

        {/* Dining */}
        <button
          onClick={() => setActive("dining")}
          className={`flex items-center gap-2 px-6 py-3 transition-all duration-200 ${
            active === "dining" ? "text-red-500" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <BuildingStorefrontIcon className={`w-5 h-5 ${active === "dining" ? "text-red-500" : ""}`} />
          <span className={`text-[13px] font-semibold ${active === "dining" ? "text-red-500" : "text-gray-600"}`}>
            Dining
          </span>
        </button>
      </div>
    </div>
  );
}

export default BottomNav;