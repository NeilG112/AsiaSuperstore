import React from "react";

const CategoryEditor = ({ categories, setCategories }) => {
  // Platzhalter für spätere Erweiterung (Add/Edit/Delete)
  return (
    <div className="my-4">
      <h4 className="font-bold mb-2">Kategorien bearbeiten (Demo)</h4>
      <pre className="bg-gray-100 rounded p-2 text-xs overflow-x-auto max-h-40">{JSON.stringify(categories, null, 2)}</pre>
    </div>
  );
};

export default CategoryEditor;
