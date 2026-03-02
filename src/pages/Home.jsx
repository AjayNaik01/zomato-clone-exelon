import { useState } from "react";
import Categories from "../components/Categories";
import Navbar from "../components/Navbar";
import SearchSection from "../components/SearchSection";
import Filters from "../components/Filters";
import RestaurantSection from "../components/RestaurantSection";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";
import restaurants from "../data/restaurants.json";

function Home() {
  const [activeFilters, setActiveFilters] = useState([]);
  const [vegOnly, setVegOnly] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const recommended = restaurants.filter((r) => r.rating >= 4.1 && r.isOpen);
  const exploreMore = restaurants;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <SearchSection
          onVegChange={(isVeg) => setVegOnly(isVeg)}
          onSearchChange={setSearchQuery}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-6">
        <Categories onCategoryChange={setSelectedCategory} />
        <Filters onFilterChange={setActiveFilters} />
        <RestaurantSection
          title="Recommended for you"
          data={recommended}
          filters={activeFilters}
          vegOnly={vegOnly}
          category={selectedCategory}
          searchQuery={searchQuery}
        />
        <RestaurantSection
          title="Explore More"
          data={exploreMore}
          filters={activeFilters}
          vegOnly={vegOnly}
          category={selectedCategory}
          searchQuery={searchQuery}
        />
      </div>

      <Footer />

      {/* Spacer so footer content doesn't hide behind BottomNav */}
      <div className="h-20" />

      <BottomNav />
    </div>
  );
}

export default Home;