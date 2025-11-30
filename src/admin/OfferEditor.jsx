import React from "react";

const OfferEditor = ({ offers, setOffers }) => {
  // Platzhalter für spätere Erweiterung (Add/Edit/Delete)
  return (
    <div className="my-4">
      <h4 className="font-bold mb-2">Angebote bearbeiten (Demo)</h4>
      <pre className="bg-gray-100 rounded p-2 text-xs overflow-x-auto max-h-40">{JSON.stringify(offers, null, 2)}</pre>
    </div>
  );
};

export default OfferEditor;
