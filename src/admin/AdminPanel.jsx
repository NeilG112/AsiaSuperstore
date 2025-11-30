import React from "react";
import CategoryEditor from "./CategoryEditor";
import OfferEditor from "./OfferEditor";

const AdminPanel = ({ categories, setCategories, offers, setOffers }) => (
  <div className="bg-white rounded shadow p-6 max-w-2xl mx-auto flex flex-col gap-6">
    <CategoryEditor categories={categories} setCategories={setCategories} />
    <OfferEditor offers={offers} setOffers={setOffers} />
  </div>
);

export default AdminPanel;
