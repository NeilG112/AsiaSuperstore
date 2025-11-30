import React from "react";
import SectionHeader from "../components/SectionHeader";
import CategoryCard from "../components/CategoryCard";
import categoriesData from "../data/categories.json";

const Products = () => (
  <div className="container mx-auto px-4 py-8">
    <SectionHeader title="Unsere Produkte" subtitle="Entdecken Sie unser vielfältiges Sortiment." />
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {categoriesData.categories.map((cat) => (
        <CategoryCard key={cat.id} name={cat.name} image={cat.image} />
      ))}
    </div>
  </div>
);

export default Products;
