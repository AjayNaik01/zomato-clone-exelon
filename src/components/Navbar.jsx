import user from "../data/user.json";
import { WalletIcon, ChevronDownIcon, MapPinIcon } from "@heroicons/react/24/solid";

function Navbar() {
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Left Section */}
        <div className="flex items-center gap-3">

          {/* Zomato logo — hidden on mobile */}
          <h1 className="hidden sm:block text-2xl font-bold text-red-500 cursor-pointer">
            zomato
          </h1>

          {/* Location — always visible */}
          <div className="flex items-center gap-1.5 cursor-pointer">
            <MapPinIcon className="w-5 h-5 text-red-500 shrink-0" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-800">
                {user.location.area}
              </span>
              <span className="text-xs text-gray-500">
                {user.location.city}, {user.location.state}
              </span>
            </div>
            <ChevronDownIcon className="w-4 h-4 text-gray-500 mt-1 shrink-0" />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          {/* Wallet — hidden on mobile */}
          <div className="hidden sm:flex items-center gap-2 text-gray-600 hover:text-black cursor-pointer transition">
            <WalletIcon className="w-6 h-6" />
          </div>

          {/* Profile Avatar */}
          <div className="w-9 h-9 rounded-full bg-red-500 text-white flex items-center justify-center font-semibold text-sm cursor-pointer">
            {getInitials(user.fullName)}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Navbar;