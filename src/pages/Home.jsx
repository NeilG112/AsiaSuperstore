import React from "react";
import SectionHeader from "../components/SectionHeader";
import CategoryCard from "../components/CategoryCard";
import categoriesData from "../data/categories.json";

const Home = () => (
  <div className="container mx-auto px-4 py-8">
    <SectionHeader title="Willkommen im Supermarkt" subtitle="Frische Produkte, tolle Angebote und freundlicher Service!" />
    <h3 className="text-xl font-bold mb-4">Kategorien</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {categoriesData.categories.map((cat) => (
        <CategoryCard key={cat.id} name={cat.name} image={cat.image} />
      ))}
    </div>
  </div>
);

export default Home;
