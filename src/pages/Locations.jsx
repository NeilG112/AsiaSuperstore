import React from "react";
import SectionHeader from "../components/SectionHeader";

const Locations = () => (
  <div className="container mx-auto px-4 py-8">
    <SectionHeader title="Unsere Standorte" subtitle="Besuchen Sie uns an einem unserer Standorte." />
    <div className="max-w-2xl mx-auto text-lg text-dark/80">
      <ul className="list-disc pl-6">
        <li>Hauptstraße 1, 12345 Musterstadt</li>
        <li>Bahnhofstraße 10, 54321 Beispielstadt</li>
        <li>Marktplatz 5, 67890 Testhausen</li>
      </ul>
    </div>
  </div>
);

export default Locations;
