import React from "react";
import SectionHeader from "../components/SectionHeader";
import OfferCard from "../components/OfferCard";
import offersData from "../data/offers.json";

const Offers = () => (
  <div className="container mx-auto px-4 py-8">
    <SectionHeader title="Wöchentliche Angebote" subtitle="Sparen Sie jede Woche mit unseren Top-Angeboten!" />
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {offersData.offers.map((offer) => (
        <OfferCard key={offer.id} {...offer} />
      ))}
    </div>
  </div>
);

export default Offers;
