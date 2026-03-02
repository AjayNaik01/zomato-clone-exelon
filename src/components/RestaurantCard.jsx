import { ClockIcon, MapPinIcon } from "@heroicons/react/24/outline";

function RestaurantCard({ restaurant }) {
  return (
    <div className="min-w-[160px] w-[160px] cursor-pointer">
      <div className="relative w-full h-[120px] rounded-xl overflow-hidden">
        <img src={restaurant.image} alt={restaurant.name}
          className="w-full h-full object-cover" loading="lazy" />
        {restaurant.offer && (
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/70 to-transparent px-2 py-1.5">
            <p className="text-white text-[10px] font-bold leading-tight">
              {restaurant.offer.description}
            </p>
          </div>
        )}
        {!restaurant.isOpen && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white text-xs font-semibold">Closed</span>
          </div>
        )}
      </div>

      <div className="mt-2">
        <span className="bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
          {restaurant.rating} ★
        </span>
        <p className="text-[13px] font-bold text-gray-900 truncate mt-0.5">{restaurant.name}</p>
        <p className="text-[11px] text-gray-500 truncate">{restaurant.cuisines.join(", ")}</p>
        <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
          <span className="text-[11px] text-gray-500 flex items-center gap-0.5">
            <ClockIcon className="w-3 h-3 shrink-0" />
            {restaurant.deliveryTime}–{restaurant.deliveryTime + 5} mins
          </span>
          <span className="text-gray-300 text-[10px]">•</span>
          <span className="text-[11px] text-gray-500 flex items-center gap-0.5">
            <MapPinIcon className="w-3 h-3 shrink-0" />
            {restaurant.distance} km
          </span>
        </div>
        <p className="text-[11px] text-gray-400 mt-0.5">₹{restaurant.priceForTwo} for two</p>
      </div>
    </div>
  );
}

export default RestaurantCard;