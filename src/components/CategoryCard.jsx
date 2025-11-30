import React from "react";

const CategoryCard = ({ name, image }) => (
  <div className="bg-white rounded shadow hover:shadow-lg transition overflow-hidden flex flex-col items-center">
    <img
      src={image}
      alt={name}
      loading="lazy"
      className="w-full h-40 object-cover object-center"
    />
    <div className="p-4 w-full text-center">
      <h3 className="font-display text-xl font-bold text-primary mb-1">{name}</h3>
    </div>
  </div>
);

export default CategoryCard;
